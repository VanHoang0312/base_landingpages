import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { adminPostService, adminMediaService, type Post } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import QuillEditor from "@/components/admin/QuillEditor";

type FormData = { title: string; excerpt: string; content: string; thumbnail: string; status: "DRAFT" | "PUBLISHED" };
const emptyForm: FormData = { title: "", excerpt: "", content: "", thumbnail: "", status: "DRAFT" };

export default function AdminPosts() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["admin-posts", filterStatus, page],
    queryFn: () => adminPostService.getAll({ status: filterStatus || undefined, page, pageSize: PAGE_SIZE }),
  });

  const createMutation = useMutation({
    mutationFn: adminPostService.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-posts"] }); toast.success("Đã tạo bài viết"); setOpen(false); },
    onError: (e: unknown) => toast.error((e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Lỗi"),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Post> }) => adminPostService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-posts"] }); toast.success("Đã cập nhật"); setOpen(false); },
    onError: (e: unknown) => toast.error((e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Lỗi"),
  });
  const deleteMutation = useMutation({
    mutationFn: adminPostService.delete,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-posts"] }); toast.success("Đã xóa"); },
    onError: () => toast.error("Lỗi khi xóa"),
  });

  const openCreate = () => { setEditing(null); setForm(emptyForm); setOpen(true); };
  const openEdit = async (post: Post) => {
    setEditing(post);
    const full = await adminPostService.getById(post._id);
    setForm({ title: full.title, excerpt: full.excerpt ?? "", content: full.content ?? "", thumbnail: full.thumbnail ?? "", status: full.status });
    setOpen(true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await adminMediaService.upload(file);
      setForm((f) => ({ ...f, thumbnail: result.url }));
      toast.success("Đã upload ảnh");
    } catch { toast.error("Upload thất bại"); }
    finally { setUploading(false); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Tiêu đề là bắt buộc"); return; }
    if (editing) updateMutation.mutate({ id: editing._id, data: form });
    else createMutation.mutate(form);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Bài viết</h1>
            <p className="text-gray-500 text-sm mt-1">{data?.total ?? 0} bài viết</p>
          </div>
          <Button onClick={openCreate} className="brand-gradient text-white">
            <Plus className="w-4 h-4 mr-2" /> Viết bài mới
          </Button>
        </div>

        <div className="mb-5">
          <Select value={filterStatus || "all"} onValueChange={(v) => { setFilterStatus(v === "all" ? "" : v); setPage(1); }}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Tất cả trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="PUBLISHED">Đã xuất bản</SelectItem>
              <SelectItem value="DRAFT">Bản nháp</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-3">
            {data?.rows.map((post) => (
              <div key={post._id} className="bg-white rounded-xl p-5 shadow-sm flex gap-4 items-start hover:shadow-md transition-shadow">
                {post.thumbnail ? (
                  <img src={post.thumbnail} alt={post.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-3xl flex-shrink-0">📝</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{post.title}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(post)} className="h-8 w-8 text-gray-400 hover:text-primary">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => { if (confirm("Xóa bài này?")) deleteMutation.mutate(post._id); }} className="h-8 w-8 text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {post.excerpt && <p className="text-sm text-gray-400 line-clamp-1 mt-1">{post.excerpt}</p>}
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant={post.status === "PUBLISHED" ? "default" : "secondary"} className={post.status === "PUBLISHED" ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}>
                      {post.status === "PUBLISHED" ? "Đã xuất bản" : "Bản nháp"}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {format(new Date(post.createdAt), "dd/MM/yyyy", { locale: vi })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {!data?.rows.length && (
              <div className="py-20 text-center text-gray-400 bg-white rounded-2xl">Chưa có bài viết nào</div>
            )}
          </div>
        )}
        <AdminPagination page={page} total={data?.total ?? 0} pageSize={PAGE_SIZE} onChange={setPage} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Sửa bài viết" : "Viết bài mới"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Tiêu đề <span className="text-red-500">*</span></Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Tiêu đề bài viết" />
            </div>
            <div className="space-y-2">
              <Label>Mô tả ngắn</Label>
              <Input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Tóm tắt bài viết" />
            </div>
            <div className="space-y-2">
              <Label>Nội dung</Label>
              <QuillEditor
                value={form.content}
                onChange={(val) => setForm({ ...form, content: val })}
                placeholder="Nội dung bài viết..."
              />
            </div>
            <div className="space-y-2">
              <Label>Ảnh đại diện</Label>
              <div className="flex gap-3 items-start">
                {form.thumbnail && (
                  <div className="relative">
                    <img src={form.thumbnail} alt="" className="w-24 h-24 rounded-xl object-cover border" />
                    <button type="button" onClick={() => setForm({ ...form, thumbnail: "" })} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <label className="flex-1">
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 transition-colors">
                    {uploading ? <Loader2 className="w-5 h-5 animate-spin mx-auto text-primary" /> : <Upload className="w-5 h-5 mx-auto text-gray-400 mb-1" />}
                    <p className="text-xs text-gray-400">{uploading ? "Đang upload..." : "Chọn ảnh"}</p>
                  </div>
                  <input type="file" accept="image/*" className="sr-only" onChange={handleUpload} />
                </label>
                <Input className="flex-1 text-sm" value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} placeholder="Hoặc nhập URL ảnh" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as "DRAFT" | "PUBLISHED" })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Bản nháp</SelectItem>
                  <SelectItem value="PUBLISHED">Xuất bản</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
              <Button type="submit" className="brand-gradient text-white" disabled={isSaving}>
                {isSaving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {editing ? "Cập nhật" : "Tạo bài viết"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
