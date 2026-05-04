import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { adminMediaService, type Media } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, Loader2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function AdminMedia() {
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["admin-media", page],
    queryFn: () => adminMediaService.getAll({ page, pageSize: PAGE_SIZE }),
  });

  const deleteMutation = useMutation({
    mutationFn: adminMediaService.delete,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-media"] }); toast.success("Đã xóa ảnh"); },
    onError: () => toast.error("Lỗi khi xóa"),
  });

  const uploadFiles = async (files: File[]) => {
    if (!files.length) return;
    setUploading(true);
    let success = 0;
    for (const file of files) {
      try {
        await adminMediaService.upload(file);
        success++;
      } catch { toast.error(`Upload thất bại: ${file.name}`); }
    }
    if (success) {
      toast.success(`Đã upload ${success} ảnh`);
      qc.invalidateQueries({ queryKey: ["admin-media"] });
    }
    setUploading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadFiles(Array.from(e.target.files ?? []));
    e.target.value = "";
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    uploadFiles(files);
  }, []);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Thư viện ảnh</h1>
            <p className="text-gray-500 text-sm mt-1">{data?.total ?? 0} ảnh</p>
          </div>
          <label>
            <Button className="brand-gradient text-white" asChild>
              <span>
                {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                Upload ảnh
              </span>
            </Button>
            <input type="file" accept="image/*" multiple className="sr-only" onChange={handleFileChange} disabled={uploading} />
          </label>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          className={`mb-6 border-2 border-dashed rounded-2xl p-8 text-center transition-all ${isDragging ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"}`}
        >
          <Upload className="w-8 h-8 mx-auto text-gray-300 mb-2" />
          <p className="text-gray-400 text-sm">Kéo thả ảnh vào đây hoặc{" "}
            <label className="text-primary cursor-pointer hover:underline">
              chọn từ máy tính
              <input type="file" accept="image/*" multiple className="sr-only" onChange={handleFileChange} disabled={uploading} />
            </label>
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data?.rows.map((media: Media) => (
              <div key={media._id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square">
                  <img src={media.url} alt={media.originalName} className="w-full h-full object-cover" />
                </div>
                <div className="p-2">
                  <p className="text-xs text-gray-500 truncate">{media.originalName}</p>
                  <p className="text-xs text-gray-400">{formatSize(media.size ?? 0)}</p>
                  <p className="text-xs text-gray-300">{format(new Date(media.createdAt), "dd/MM/yy", { locale: vi })}</p>
                </div>
                {/* Actions overlay */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => copyUrl(media.url)} className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white shadow-sm">
                    {copied === media.url ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-gray-600" />}
                  </button>
                  <button onClick={() => { if (confirm("Xóa ảnh này?")) deleteMutation.mutate(media._id); }} disabled={deleteMutation.isPending} className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-red-50 shadow-sm">
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
            {!data?.rows.length && (
              <div className="col-span-full py-20 text-center text-gray-400">Chưa có ảnh nào</div>
            )}
          </div>
        )}
        <AdminPagination page={page} total={data?.total ?? 0} pageSize={PAGE_SIZE} onChange={setPage} />
      </div>
    </AdminLayout>
  );
}
