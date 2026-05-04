import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminCategoryService, adminMenuItemService, adminPostService, adminContactService } from "@/services/api";
import { UtensilsCrossed, ListTree, FileText, Mail, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

function StatCard({ icon: Icon, label, value, href, color }: {
  icon: React.ElementType;
  label: string;
  value: number;
  href: string;
  color: string;
}) {
  return (
    <Link to={href} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div>
        <p className="text-3xl font-bold font-display text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      </div>
    </Link>
  );
}

export default function AdminDashboard() {
  const { data: categories } = useQuery({ queryKey: ["admin-categories"], queryFn: adminCategoryService.getAll });
  const { data: menuItems } = useQuery({ queryKey: ["admin-menu-items"], queryFn: () => adminMenuItemService.getAll({ pageSize: 1 }) });
  const { data: posts } = useQuery({ queryKey: ["admin-posts"], queryFn: () => adminPostService.getAll({ pageSize: 1 }) });
  const { data: contacts } = useQuery({ queryKey: ["admin-contacts"], queryFn: () => adminContactService.getAll({ pageSize: 1 }) });
  const { data: newContacts } = useQuery({ queryKey: ["admin-contacts-new"], queryFn: () => adminContactService.getAll({ status: "NEW", pageSize: 1 }) });

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Tổng quan hệ thống quản trị</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard icon={ListTree} label="Danh mục" value={categories?.total ?? 0} href="/admin/categories" color="bg-blue-500" />
          <StatCard icon={UtensilsCrossed} label="Món ăn" value={menuItems?.total ?? 0} href="/admin/menu-items" color="bg-primary" />
          <StatCard icon={FileText} label="Bài viết" value={posts?.total ?? 0} href="/admin/posts" color="bg-green-500" />
          <StatCard icon={Mail} label="Liên hệ mới" value={newContacts?.total ?? 0} href="/admin/contacts" color="bg-orange-500" />
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Thao tác nhanh
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Thêm món ăn", href: "/admin/menu-items", icon: UtensilsCrossed, color: "bg-red-50 text-primary hover:bg-red-100" },
              { label: "Thêm danh mục", href: "/admin/categories", icon: ListTree, color: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
              { label: "Viết bài mới", href: "/admin/posts", icon: FileText, color: "bg-green-50 text-green-600 hover:bg-green-100" },
              { label: "Xem liên hệ", href: "/admin/contacts", icon: Mail, color: "bg-orange-50 text-orange-600 hover:bg-orange-100" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} to={item.href} className={`flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-colors ${item.color}`}>
                  <Icon className="w-6 h-6" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Info box */}
        <div className="mt-5 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-5">
          <p className="text-sm text-gray-700">
            <strong className="text-primary">Tổng quan:</strong> {categories?.total ?? 0} danh mục · {menuItems?.total ?? 0} món ăn · {posts?.total ?? 0} bài viết · {contacts?.total ?? 0} liên hệ tổng ({newContacts?.total ?? 0} chưa đọc)
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
