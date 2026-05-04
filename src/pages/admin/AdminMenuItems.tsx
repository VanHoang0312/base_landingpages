import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { adminMenuItemService, adminCategoryService, adminMediaService, type MenuItem, type Category } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2, Upload, Star, X } from "lucide-react";
import { toast } from "sonner";

type FormData = {
  name: string; description: string; longDescription: string;
  price: number; salePrice: number | ""; categoryId: string;
  thumbnail: string; tags: string; isFeatured: boolean; isAvailable: boolean; newArrival: boolean; sortOrder: number;
};
const emptyForm: FormData = { name: "", description: "", longDescription: "", price: 0, salePrice: "", categoryId: "", thumbnail: "", tags: "", isFeatured: false, isAvailable: true, newArrival: false, sortOrder: 0 };

export default function AdminMenuItems() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const { data: categories } = useQuery({ queryKey: ["admin-categories"], queryFn: adminCategoryService.getAll });
  const { data, isLoading } = useQuery({
    queryKey: ["admin-menu-items", filterCat, search, page],
    queryFn: () => adminMenuItemService.getAll({ categoryId: filterCat || undefined, search: search || undefined, page, pageSize: PAGE_SIZE }),
  });

  const createMutation = useMutation({
    mutationFn: adminMenuItemService.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-menu-items"] }); toast.success("Đã thêm món ăn"); setOpen(false); },
    onError: (e: unknown) => toast.error((e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Lỗi"),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<MenuItem> }) => adminMenuItemService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-menu-items"] }); toast.success("Đã cập nhật"); setOpen(false); },
    onError: (e: unknown) => toast.error((e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Lỗi"),
  });
  const deleteMutation = useMutation({
    mutationFn: adminMenuItemService.delete,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-menu-items"] }); toast.success("Đã xóa"); },
    onError: () => toast.error("Lỗi khi xóa"),
  });

  const openCreate = () => { setEditing(null); setForm(emptyForm); setOpen(true); };
  const openEdit = (item: MenuItem) => {
    setEditing(item);
    const cat = typeof item.categoryId === "object" ? (item.categoryId as Category)._id : item.categoryId;
    setForm({ name: item.name, description: item.description ?? "", longDescription: item.longDescription ?? "", price: item.price, salePrice: item.salePrice ?? "", categoryId: cat, thumbnail: item.thumbnail ?? "", tags: item.tags?.join(", ") ?? "", isFeatured: item.isFeatured, isAvailable: item.isAvailable, newArrival: item.newArrival, sortOrder: item.sortOrder });
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
    if (!form.name.trim() || !form.price || !form.categoryId) {
      toast.error("Tên, giá và danh mục là bắt buộc"); return;
    }
    const payload = {
      ...form,
      price: Number(form.price),
      salePrice: form.salePrice !== "" ? Number(form.salePrice) : undefined,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    };
    if (editing) updateMutation.mutate({ id: editing._id, data: payload });
    else createMutation.mutate(payload);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const formatPrice = (n: number) => n.toLocaleString("vi-VN") + "đ";

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Món ăn</h1>
            <p className="text-gray-500 text-sm mt-1">{data?.total ?? 0} món ăn</p>
          </div>
          <Button onClick={openCreate} className="brand-gradient text-white">
            <Plus className="w-4 h-4 mr-2" /> Thêm món
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-5">
          <Input placeholder="Tìm món ăn..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="max-w-xs" />
          <Select value={filterCat || "all"} onValueChange={(v) => { setFilterCat(v === "all" ? "" : v); setPage(1); }}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Tất cả danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả danh mục</SelectItem>
              {categories?.rows.map((c) => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Món ăn</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Danh mục</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Giá</th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Trạng thái</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data?.rows.map((item) => {
                  const cat = typeof item.categoryId === "object" ? (item.categoryId as Category) : null;
                  return (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {item.thumbnail ? (
                            <img src={item.thumbnail} alt={item.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl">🍽️</div>
                          )}
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium text-gray-900">{item.name}</span>
                              {item.isFeatured && <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />}
                              {item.newArrival && <span className="badge-new">MỚI</span>}
                            </div>
                            {item.description && <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{item.description}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{cat?.name ?? "—"}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-semibold text-primary text-sm">{formatPrice(item.price)}</div>
                        {item.salePrice && <div className="text-xs text-gray-400 line-through">{formatPrice(item.salePrice)}</div>}
                      </td>
                      <td className="px-6 py-4 text-center hidden sm:table-cell">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${item.isAvailable ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {item.isAvailable ? "Có sẵn" : "Hết"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(item)} className="h-8 w-8 text-gray-400 hover:text-primary">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => { if (confirm(`Xóa "${item.name}"?`)) deleteMutation.mutate(item._id); }} disabled={deleteMutation.isPending} className="h-8 w-8 text-gray-400 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!data?.rows.length && (
                  <tr><td colSpan={5} className="py-12 text-center text-gray-400">Chưa có món ăn nào</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        <AdminPagination page={page} total={data?.total ?? 0} pageSize={PAGE_SIZE} onChange={setPage} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Sửa món ăn" : "Thêm món ăn"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label>Tên món ăn <span className="text-red-500">*</span></Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="VD: Phở Bò Tái" />
              </div>
              <div className="space-y-2">
                <Label>Giá (VNĐ) <span className="text-red-500">*</span></Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} min={0} placeholder="75000" />
              </div>
              <div className="space-y-2">
                <Label>Giá gốc (nếu có giảm)</Label>
                <Input type="number" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value ? Number(e.target.value) : "" })} min={0} placeholder="100000" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Danh mục <span className="text-red-500">*</span></Label>
                <Select value={form.categoryId} onValueChange={(v) => setForm({ ...form, categoryId: v })}>
                  <SelectTrigger><SelectValue placeholder="Chọn danh mục" /></SelectTrigger>
                  <SelectContent>
                    {categories?.rows.map((c) => <SelectItem key={c._id} value={c._id}>{c.icon} {c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Mô tả ngắn</Label>
                <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Mô tả ngắn gọn về món ăn" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Mô tả chi tiết</Label>
                <Textarea value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} placeholder="Mô tả đầy đủ..." rows={3} />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Ảnh đại diện</Label>
                <div className="flex gap-3 items-start">
                  {form.thumbnail ? (
                    <div className="relative">
                      <img src={form.thumbnail} alt="preview" className="w-24 h-24 rounded-xl object-cover border" />
                      <button type="button" onClick={() => setForm({ ...form, thumbnail: "" })} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : null}
                  <label className="flex-1">
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 transition-colors">
                      {uploading ? <Loader2 className="w-5 h-5 animate-spin mx-auto text-primary" /> : <Upload className="w-5 h-5 mx-auto text-gray-400 mb-1" />}
                      <p className="text-xs text-gray-400">{uploading ? "Đang upload..." : "Chọn ảnh"}</p>
                    </div>
                    <input type="file" accept="image/*" className="sr-only" onChange={handleUpload} disabled={uploading} />
                  </label>
                  <div className="flex-1 space-y-1">
                    <p className="text-xs text-gray-400">Hoặc nhập URL:</p>
                    <Input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} placeholder="https://..." className="text-sm" />
                  </div>
                </div>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Tags (ngăn cách bởi dấu phẩy)</Label>
                <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="phở, bò, truyền thống" />
              </div>
              <div className="space-y-2">
                <Label>Thứ tự hiển thị</Label>
                <Input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} min={0} />
              </div>
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2">
                  <Switch checked={form.isFeatured} onCheckedChange={(v) => setForm({ ...form, isFeatured: v })} id="featured" />
                  <Label htmlFor="featured">Nổi bật</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.newArrival} onCheckedChange={(v) => setForm({ ...form, newArrival: v })} id="newArrival" />
                  <Label htmlFor="newArrival">Món mới</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.isAvailable} onCheckedChange={(v) => setForm({ ...form, isAvailable: v })} id="available" />
                  <Label htmlFor="available">Còn hàng</Label>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
              <Button type="submit" className="brand-gradient text-white" disabled={isSaving}>
                {isSaving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {editing ? "Cập nhật" : "Thêm món"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
