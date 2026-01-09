import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Phone, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const projectCategories = [
  { name: "Đã thi công", href: "/mau-nha-dep/da-thi-cong" },
  { name: "Thiết kế", href: "/mau-nha-dep/thiet-ke" },
  { name: "Nội thất", href: "/mau-nha-dep/noi-that" },
  { name: "Xây mới", href: "/mau-nha-dep/xay-moi" },
  { name: "Sửa nhà", href: "/mau-nha-dep/sua-nha" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;
  const isProjectsActive = location.pathname.startsWith("/mau-nha-dep");

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "glass-effect shadow-md" : "bg-background/80 backdrop-blur-sm"
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain rounded-lg" />
            <div className="hidden sm:block">
              <p className="font-display text-lg font-semibold text-foreground leading-tight">
                Đại Hà Thanh
              </p>
              <p className="text-xs text-muted-foreground">
                Kiến Trúc & Nội Thất
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {/* Trang chủ */}
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-accent focus:text-accent focus:outline-none",
                        isActive("/") ? "text-accent" : "text-foreground/80"
                      )}
                    >
                      Trang chủ
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Dịch vụ */}
                <NavigationMenuItem>
                  <a href="/#dich-vu">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-accent focus:text-accent focus:outline-none",
                        isActive("/#dich-vu") ? "text-accent" : "text-foreground/80"
                      )}
                    >
                      Dịch vụ
                    </NavigationMenuLink>
                  </a>
                </NavigationMenuItem>

                {/* Mẫu nhà đẹp - Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "bg-transparent hover:bg-transparent hover:text-accent data-[state=open]:bg-transparent",
                      isProjectsActive ? "text-accent" : "text-foreground/80"
                    )}
                  >
                    Mẫu nhà đẹp
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2">
                      {projectCategories.map((category) => (
                        <li key={category.href}>
                          <Link to={category.href}>
                            <NavigationMenuLink
                              className={cn(
                                "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent focus:bg-accent/10",
                                isActive(category.href)
                                  ? "bg-accent/10 text-accent"
                                  : "text-foreground/80"
                              )}
                            >
                              {category.name}
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Báo giá */}
                <NavigationMenuItem>
                  <a href="/#bao-gia">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-accent focus:text-accent focus:outline-none",
                        isActive("/bao-gia") ? "text-accent" : "text-foreground/80"
                      )}
                    >
                      Báo giá
                    </NavigationMenuLink>
                  </a>
                </NavigationMenuItem>

                {/* Giới thiệu */}
                <NavigationMenuItem>
                  <Link to="/gioi-thieu">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-accent focus:text-accent focus:outline-none",
                        isActive("/gioi-thieu") ? "text-accent" : "text-foreground/80"
                      )}
                    >
                      Giới thiệu
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="/#bao-gia">
              <Button variant="navCta" size="default">
                <Phone className="w-4 h-4" />
                Liên Hệ
              </Button>
            </a>
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
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain rounded-lg" />
                    <div>
                      <p className="font-display font-semibold text-foreground">
                        Đại Hà Thanh
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Kiến Trúc & Nội Thất
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {/* Trang chủ */}
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-medium py-3 border-b border-border transition-colors",
                        isActive("/") ? "text-accent" : "text-foreground hover:text-accent"
                      )}
                    >
                      Trang chủ
                    </Link>

                    {/* Dịch vụ */}
                    <a
                      href="/#dich-vu"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium py-3 border-b border-border transition-colors text-foreground hover:text-accent"
                    >
                      Dịch vụ
                    </a>

                    {/* Mẫu nhà đẹp - Dropdown */}
                    <div className="border-b border-border">
                      <button
                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                        className={cn(
                          "flex items-center justify-between w-full text-lg font-medium py-3 transition-colors",
                          isProjectsActive ? "text-accent" : "text-foreground hover:text-accent"
                        )}
                      >
                        Mẫu nhà đẹp
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 transition-transform",
                            mobileDropdownOpen && "rotate-180"
                          )}
                        />
                      </button>
                      {mobileDropdownOpen && (
                        <div className="pl-4 pb-3 flex flex-col gap-2">
                          {projectCategories.map((category) => (
                            <Link
                              key={category.href}
                              to={category.href}
                              onClick={() => {
                                setIsOpen(false);
                                setMobileDropdownOpen(false);
                              }}
                              className={cn(
                                "py-2 text-base transition-colors",
                                isActive(category.href)
                                  ? "text-accent"
                                  : "text-muted-foreground hover:text-accent"
                              )}
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Báo giá */}
                    <a
                      href="/#bao-gia"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-medium py-3 border-b border-border transition-colors",
                        isActive("/bao-gia") ? "text-accent" : "text-foreground hover:text-accent"
                      )}
                    >
                      Báo giá
                    </a>

                    {/* Giới thiệu */}
                    <Link
                      to="/gioi-thieu"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-medium py-3 border-b border-border transition-colors",
                        isActive("/gioi-thieu") ? "text-accent" : "text-foreground hover:text-accent"
                      )}
                    >
                      Giới thiệu
                    </Link>
                  </div>

                  <a href="/#bao-gia" onClick={() => setIsOpen(false)}>
                    <Button variant="gold" size="lg" className="w-full mt-4">
                      <Phone className="w-4 h-4" />
                      Liên Hệ Ngay
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};
