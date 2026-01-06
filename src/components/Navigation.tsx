import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Dịch Vụ", href: "#services" },
  { name: "Dự Án", href: "#projects" },
  { name: "Quy Trình", href: "#process" },
  { name: "Đánh Giá", href: "#testimonials" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-effect shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
              <span className="font-display text-2xl font-bold text-charcoal">
                ĐH
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-lg font-semibold text-foreground leading-tight">
                Đại Hà Thanh
              </p>
              <p className="text-xs text-muted-foreground">
                Kiến Trúc & Nội Thất
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="navCta" size="default">
              <Phone className="w-4 h-4" />
              Liên Hệ Ngay
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background">
                <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>
                <div className="flex flex-col gap-8 mt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <span className="font-display text-xl font-bold text-charcoal">
                        ĐH
                      </span>
                    </div>
                    <div>
                      <p className="font-display font-semibold text-foreground">
                        Đại Hà Thanh
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Kiến Trúc & Nội Thất
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {navLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-foreground hover:text-accent transition-colors py-2 border-b border-border"
                      >
                        {link.name}
                      </motion.a>
                    ))}
                  </div>

                  <Button variant="gold" size="lg" className="w-full mt-4">
                    <Phone className="w-4 h-4" />
                    Liên Hệ Ngay
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};
