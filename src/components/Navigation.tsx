import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Phone, ShoppingBag, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/api";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Thực đơn", href: "/thuc-don" },
  { label: "Về chúng tôi", href: "/gioi-thieu" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuDropOpen, setMenuDropOpen] = useState(false);
  const location = useLocation();

  const { data: categoriesData } = useQuery({
    queryKey: ["categories-nav"],
    queryFn: categoryService.getAll,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 glass-effect",
        isScrolled ? "shadow-sm" : "shadow-none"
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground leading-tight">Hoàng Ẩm Thực</p>
              <p className="text-xs text-muted-foreground leading-none">Ẩm thực truyền thống</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.label === "Thực đơn" ? (
                <HoverCard key={link.href} openDelay={0} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <div className={cn(
                      "inline-flex h-10 items-center px-4 text-sm font-medium rounded-lg cursor-pointer transition-colors",
                      isActive(link.href) ? "text-primary bg-primary/5" : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    )}>
                      {link.label}
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent align="start" className="w-52 p-2">
                    <Link to="/thuc-don" className="block px-3 py-2 text-sm rounded-lg hover:bg-primary/5 hover:text-primary font-medium">
                      Tất cả món ăn
                    </Link>
                    <div className="border-t border-border my-1" />
                    {categoriesData?.rows.map((cat) => (
                      <Link
                        key={cat._id}
                        to={`/thuc-don?cat=${cat.slug}`}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-primary/5 hover:text-primary"
                      >
                        {cat.icon && <span>{cat.icon}</span>}
                        {cat.name}
                      </Link>
                    ))}
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "inline-flex h-10 items-center px-4 text-sm font-medium rounded-lg transition-colors",
                    isActive(link.href) ? "text-primary bg-primary/5" : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:0909123456" className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>0909 123 456</span>
            </a>
            <Link to="/lien-he">
              <Button className="brand-gradient text-white shadow-md hover:opacity-90 transition-opacity">
                Đặt bàn ngay
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col gap-6 mt-6">
                  <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                    <div className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold">Hoàng Ẩm Thực</p>
                      <p className="text-xs text-muted-foreground">Ẩm thực truyền thống</p>
                    </div>
                  </Link>
                  <div className="flex flex-col">
                    {navLinks.map((link) =>
                      link.label === "Thực đơn" ? (
                        <div key={link.href} className="border-b border-border">
                          <button
                            onClick={() => setMenuDropOpen(!menuDropOpen)}
                            className="flex items-center justify-between w-full py-3 text-lg font-medium hover:text-primary transition-colors"
                          >
                            {link.label}
                            <ChevronDown className={cn("w-5 h-5 transition-transform", menuDropOpen && "rotate-180")} />
                          </button>
                          {menuDropOpen && (
                            <div className="pl-4 pb-3 space-y-1">
                              <Link to="/thuc-don" onClick={() => setIsOpen(false)} className="block py-1.5 text-sm text-muted-foreground hover:text-primary">
                                Tất cả món ăn
                              </Link>
                              {categoriesData?.rows.map((cat) => (
                                <Link key={cat._id} to={`/thuc-don?cat=${cat.slug}`} onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-primary">
                                  {cat.icon} {cat.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "py-3 border-b border-border text-lg font-medium transition-colors",
                            isActive(link.href) ? "text-primary" : "hover:text-primary"
                          )}
                        >
                          {link.label}
                        </Link>
                      )
                    )}
                  </div>
                  <Link to="/lien-he" onClick={() => setIsOpen(false)}>
                    <Button className="w-full brand-gradient text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Đặt bàn ngay
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};
