import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ListTree,
  FileText,
  Image,
  Settings,
  Mail,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Danh mục", href: "/admin/categories", icon: ListTree },
  { label: "Món ăn", href: "/admin/menu-items", icon: UtensilsCrossed },
  { label: "Bài viết", href: "/admin/posts", icon: FileText },
  { label: "Thư viện ảnh", href: "/admin/media", icon: Image },
  { label: "Liên hệ", href: "/admin/contacts", icon: Mail },
  { label: "Cài đặt", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const isActive = (href: string) =>
    href === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-50 w-64 bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] flex flex-col transition-transform duration-300",
          "lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-[hsl(var(--sidebar-border))]">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-[hsl(var(--sidebar-foreground))]">
                Hoàng Ẩm Thực
              </p>
              <p className="text-xs text-[hsl(var(--sidebar-foreground)/0.6)]">
                Quản trị
              </p>
            </div>
          </Link>
          <button
            className="lg:hidden text-[hsl(var(--sidebar-foreground)/0.6)] hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 mx-3 mb-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-primary text-white shadow-md"
                    : "text-[hsl(var(--sidebar-foreground)/0.7)] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
                {active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-[hsl(var(--sidebar-border))]">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
              {user?.username?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[hsl(var(--sidebar-foreground))] truncate">
                {user?.username}
              </p>
              <p className="text-xs text-[hsl(var(--sidebar-foreground)/0.5)] truncate">
                {user?.role === "admin" ? "Quản trị viên" : "Biên tập viên"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[hsl(var(--sidebar-foreground)/0.6)] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 gap-4 sticky top-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex-1" />
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Xem website →
          </a>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
