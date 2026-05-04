import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminContactService, type Contact } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Loader2, Phone, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const statusConfig = {
  NEW: { label: "Mới", color: "bg-blue-100 text-blue-700" },
  READ: { label: "Đã đọc", color: "bg-yellow-100 text-yellow-700" },
  REPLIED: { label: "Đã trả lời", color: "bg-green-100 text-green-700" },
} as const;

export default function AdminContacts() {
  const qc = useQueryClient();
  const [filterStatus, setFilterStatus] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-contacts", filterStatus],
    queryFn: () => adminContactService.getAll({ status: filterStatus || undefined, pageSize: 50 }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Contact["status"] }) => adminContactService.updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-contacts"] }),
    onError: () => toast.error("Lỗi khi cập nhật"),
  });

  const deleteMutation = useMutation({
    mutationFn: adminContactService.delete,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-contacts"] }); toast.success("Đã xóa"); },
    onError: () => toast.error("Lỗi khi xóa"),
  });

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Liên hệ</h1>
            <p className="text-gray-500 text-sm mt-1">{data?.total ?? 0} liên hệ</p>
          </div>
        </div>

        <div className="mb-5">
          <Select value={filterStatus || "all"} onValueChange={(v) => setFilterStatus(v === "all" ? "" : v)}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Tất cả trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="NEW">Mới</SelectItem>
              <SelectItem value="READ">Đã đọc</SelectItem>
              <SelectItem value="REPLIED">Đã trả lời</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-3">
            {data?.rows.map((contact) => {
              const st = statusConfig[contact.status];
              return (
                <div key={contact._id} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-semibold text-gray-900">{contact.name}</span>
                        <Badge className={`${st.color} font-medium`}>{st.label}</Badge>
                        <span className="text-xs text-gray-400">
                          {format(new Date(contact.createdAt), "dd/MM/yyyy HH:mm", { locale: vi })}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-primary" />
                          <a href={`tel:${contact.phone}`} className="hover:text-primary">{contact.phone}</a>
                        </span>
                        {contact.email && (
                          <span className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-primary" />
                            <a href={`mailto:${contact.email}`} className="hover:text-primary">{contact.email}</a>
                          </span>
                        )}
                      </div>
                      {contact.message && (
                        <div className="mt-3 flex items-start gap-2 text-sm text-gray-500">
                          <MessageSquare className="w-4 h-4 mt-0.5 text-gray-300 flex-shrink-0" />
                          <p>{contact.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Select
                        value={contact.status}
                        onValueChange={(v) => updateMutation.mutate({ id: contact._id, status: v as Contact["status"] })}
                      >
                        <SelectTrigger className="w-36 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NEW">Mới</SelectItem>
                          <SelectItem value="READ">Đã đọc</SelectItem>
                          <SelectItem value="REPLIED">Đã trả lời</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" onClick={() => { if (confirm("Xóa liên hệ này?")) deleteMutation.mutate(contact._id); }} className="h-8 w-8 text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            {!data?.rows.length && (
              <div className="py-20 text-center text-gray-400 bg-white rounded-2xl">Chưa có liên hệ nào</div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
