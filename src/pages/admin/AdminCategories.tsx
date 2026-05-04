import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { adminCategoryService, type Category } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

type FormData = { name: string; description: string; icon: string; sortOrder: number; isActive: boolean };
const emptyForm: FormData = { name: "", description: "", icon: "", sortOrder: 0, isActive: true };

export default function AdminCategories() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const { data, isLoading } = useQuery({ queryKey: ["admin-categories"], queryFn: adminCategoryService.getAll });
  const allRows = data?.rows ?? [];
  const pagedRows = allRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const createMutation = useMutation({
    mutationFn: adminCategoryService.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-categories"] }); toast.success("Đã tạo danh mục"); setOpen(false); },
    onError: (e: unknown) => toast.error((e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Lỗi"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Category> }) => adminCategoryService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-categories"] }); toast.success("Đã cập nhật"); setOpen(false); },
    onError: (e: unknown) => toast.error((e as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Lỗi"),
  });

  const deleteMutation = useMutation({
    mutationFn: adminCategoryService.delete,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-categories"] }); toast.success("Đã xóa danh mục"); },
    onError: () => toast.error("Lỗi khi xóa"),
  });

  const openCreate = () => { setEditing(null); setForm(emptyForm); setOpen(true); };
  const openEdit = (cat: Category) => { setEditing(cat); setForm({ name: cat.name, description: cat.description ?? "", icon: cat.icon ?? "", sortOrder: cat.sortOrder, isActive: cat.isActive }); setOpen(true); };
  const handleDelete = (cat: Category) => { if (confirm(`Xóa danh mục "${cat.name}"?`)) deleteMutation.mutate(cat._id); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Tên danh mục là bắt buộc"); return; }
    if (editing) updateMutation.mutate({ id: editing._id, data: form });
    else createMutation.mutate(form);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Danh mục</h1>
            <p className="text-gray-500 text-sm mt-1">{data?.total ?? 0} danh mục</p>
          </div>
          <Button onClick={openCreate} className="brand-gradient text-white">
            <Plus className="w-4 h-4 mr-2" /> Thêm danh mục
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Danh mục</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Mô tả</th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Thứ tự</th>
                  <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kích hoạt</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pagedRows.map((cat) => (
                  <tr key={cat._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {cat.icon && <span className="text-2xl">{cat.icon}</span>}
                        <span className="font-medium text-gray-900">{cat.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm hidden md:table-cell">{cat.description || "—"}</td>
                    <td className="px-6 py-4 text-center text-gray-500 text-sm">{cat.sortOrder}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${cat.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {cat.isActive ? "Hiện" : "Ẩn"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(cat)} className="h-8 w-8 text-gray-400 hover:text-primary">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(cat)} disabled={deleteMutation.isPending} className="h-8 w-8 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!allRows.length && (
                  <tr><td colSpan={5} className="py-12 text-center text-gray-400">Chưa có danh mục nào</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        <AdminPagination page={page} total={allRows.length} pageSize={PAGE_SIZE} onChange={setPage} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Sửa danh mục" : "Thêm danh mục"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Tên danh mục <span className="text-red-500">*</span></Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="VD: Món Chính" />
            </div>
            <div className="space-y-2">
              <Label>Icon (emoji)</Label>
              <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="VD: 🍜" className="text-xl" />
            </div>
            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Mô tả ngắn về danh mục" />
            </div>
            <div className="space-y-2">
              <Label>Thứ tự hiển thị</Label>
              <Input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} min={0} />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} id="isActive" />
              <Label htmlFor="isActive">Kích hoạt danh mục</Label>
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
              <Button type="submit" className="brand-gradient text-white" disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editing ? "Cập nhật" : "Tạo mới"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
