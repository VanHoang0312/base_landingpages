import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  services: [
    { name: "Thiết Kế Kiến Trúc", href: "#" },
    { name: "Thiết Kế Nội Thất", href: "#" },
    { name: "Xây Dựng Nhà Mới", href: "#" },
    { name: "Cải Tạo & Sửa Chữa", href: "#" },
  ],
  company: [
    { name: "Về Chúng Tôi", href: "#" },
    { name: "Đội Ngũ", href: "#" },
    { name: "Dự Án", href: "#du-an" },
    { name: "Tin Tức", href: "#" },
  ],
  support: [
    { name: "Liên Hệ", href: "#bao-gia" },
    { name: "Câu Hỏi Thường Gặp", href: "#" },
    { name: "Chính Sách Bảo Hành", href: "#" },
    { name: "Quy Trình Hợp Tác", href: "#process" },
  ],
};

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain rounded-lg" />
              <div>
                <p className="font-display text-lg font-semibold leading-tight">
                  Đại Hà Thanh
                </p>
                <p className="text-xs text-primary-foreground/60">
                  Kiến Trúc & Nội Thất
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Công ty TNHH Đại Hà Thanh - Đơn vị hàng đầu trong lĩnh vực thiết kế
              kiến trúc và thi công nội thất tại Thanh Hóa.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/70">
                  Lô 13 - LK3 - KĐT An Phú Hưng, Thanh Hóa
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/70">0237 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/70">
                  contact@daihathanh.vn
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">
              Dịch Vụ
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">
              Công Ty
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Hỗ Trợ</h4>
            <ul className="space-y-3 mb-8">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <p className="text-sm font-medium mb-4">Theo dõi chúng tôi</p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-charcoal-light flex items-center justify-center hover:bg-accent hover:text-charcoal transition-colors duration-300"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-charcoal-light flex items-center justify-center hover:bg-accent hover:text-charcoal transition-colors duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-charcoal-light flex items-center justify-center hover:bg-accent hover:text-charcoal transition-colors duration-300"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60 text-center md:text-left">
              © 2024 Công ty TNHH Đại Hà Thanh. Bản quyền thuộc về Đại Hà Thanh.
            </p>

            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-primary-foreground/60 hover:text-accent hover:bg-charcoal-light"
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              Về đầu trang
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
