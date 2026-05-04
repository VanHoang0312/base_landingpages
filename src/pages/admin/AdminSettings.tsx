import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminSettingService, type SiteSettings } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

const settingGroups = [
  {
    title: "Thông tin chung",
    fields: [
      { key: "siteName", label: "Tên nhà hàng", type: "text", placeholder: "Hoàng Ẩm Thực" },
      { key: "siteTagline", label: "Slogan", type: "text", placeholder: "Hương Vị Truyền Thống..." },
    ],
  },
  {
    title: "Trang chủ",
    fields: [
      { key: "heroTitle", label: "Tiêu đề Hero", type: "text", placeholder: "Ẩm Thực Hoàng Ẩm Thực" },
      { key: "heroSubtitle", label: "Mô tả Hero", type: "textarea", placeholder: "Trải nghiệm hương vị..." },
      { key: "aboutText", label: "Giới thiệu ngắn", type: "textarea", placeholder: "Với hơn 15 năm kinh nghiệm..." },
    ],
  },
  {
    title: "Thông tin liên hệ",
    fields: [
      { key: "phone", label: "Số điện thoại", type: "text", placeholder: "0909 123 456" },
      { key: "email", label: "Email", type: "text", placeholder: "info@daihathanh.vn" },
      { key: "address", label: "Địa chỉ", type: "text", placeholder: "123 Nguyễn Huệ, Q1, TP.HCM" },
      { key: "openHours", label: "Giờ mở cửa", type: "text", placeholder: "07:00 - 22:00 hàng ngày" },
    ],
  },
  {
    title: "Mạng xã hội",
    fields: [
      { key: "facebook", label: "Facebook URL", type: "text", placeholder: "https://facebook.com/..." },
      { key: "instagram", label: "Instagram URL", type: "text", placeholder: "https://instagram.com/..." },
      { key: "zalo", label: "Zalo số", type: "text", placeholder: "0909 123 456" },
    ],
  },
];

export default function AdminSettings() {
  const [form, setForm] = useState<SiteSettings>({});

  const { data, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: adminSettingService.getAll,
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: adminSettingService.update,
    onSuccess: () => toast.success("Đã lưu cài đặt"),
    onError: () => toast.error("Lỗi khi lưu"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(form);
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-gray-900">Cài đặt</h1>
          <p className="text-gray-500 text-sm mt-1">Cấu hình thông tin website</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {settingGroups.map((group) => (
              <div key={group.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-display font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  {group.title}
                </h2>
                <div className="space-y-4">
                  {group.fields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label>{field.label}</Label>
                      {field.type === "textarea" ? (
                        <Textarea
                          value={form[field.key] ?? ""}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          placeholder={field.placeholder}
                          rows={3}
                        />
                      ) : (
                        <Input
                          type={field.type}
                          value={form[field.key] ?? ""}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <Button type="submit" className="brand-gradient text-white px-8" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                Lưu cài đặt
              </Button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
