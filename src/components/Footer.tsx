import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ShoppingBag, Facebook, Instagram } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { settingService } from "@/services/api";

export const Footer = () => {
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: settingService.getAll,
    staleTime: 10 * 60 * 1000,
  });

  return (
    <footer className="bg-foreground text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display text-xl font-bold">{settings?.siteName || "Hoàng Ẩm Thực"}</p>
                <p className="text-xs text-white/40">Ẩm thực truyền thống</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              {settings?.siteTagline || "Hương Vị Truyền Thống - Đẳng Cấp Hiện Đại"}. Nơi mang đến những bữa ăn ngon với nguyên liệu tươi ngon nhất mỗi ngày.
            </p>
            <div className="flex gap-3">
              {settings?.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings?.zalo && (
                <a href={`https://zalo.me/${settings.zalo}`} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors text-xs font-bold">
                  Za
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/40 mb-5">Điều hướng</h3>
            <ul className="space-y-3">
              {[
                { label: "Trang chủ", href: "/" },
                { label: "Thực đơn", href: "/thuc-don" },
                { label: "Về chúng tôi", href: "/gioi-thieu" },
                { label: "Tin tức", href: "/tin-tuc" },
                { label: "Liên hệ", href: "/lien-he" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-white/40 mb-5">Liên hệ</h3>
            <ul className="space-y-3">
              {settings?.phone && (
                <li>
                  <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.address && (
                <li className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  {settings.address}
                </li>
              )}
              {settings?.openHours && (
                <li className="flex items-center gap-2 text-white/60 text-sm">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  {settings.openHours}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} {settings?.siteName || "Hoàng Ẩm Thực"}. Tất cả quyền được bảo lưu.
          </p>
          <Link to="/admin/login" className="text-white/20 hover:text-white/40 text-xs transition-colors">
            Quản trị
          </Link>
        </div>
      </div>
    </footer>
  );
};
