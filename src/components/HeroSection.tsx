import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { settingService } from "@/services/api";

export const HeroSection = () => {
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: settingService.getAll,
    staleTime: 10 * 60 * 1000,
  });

  const heroTitle = settings?.heroTitle || "Ẩm Thực Hoàng Ẩm Thực";
  const heroSubtitle = settings?.heroSubtitle || "Trải nghiệm hương vị ẩm thực đích thực với những nguyên liệu tươi ngon nhất, được chế biến bởi đầu bếp nhiều kinh nghiệm";

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-red-950/80 to-gray-900" />

      {/* Background food image overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80')] bg-cover bg-center" />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6"
            >
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-medium text-accent">
                Nhà hàng 5 sao · 15 năm kinh nghiệm
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6"
            >
              {heroTitle.includes(" ") ? (
                <>
                  {heroTitle.split(" ").slice(0, 2).join(" ")}
                  <span className="block brand-text">{heroTitle.split(" ").slice(2).join(" ")}</span>
                </>
              ) : (
                <span className="brand-text">{heroTitle}</span>
              )}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/70 max-w-lg mb-10 leading-relaxed"
            >
              {heroSubtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link to="/thuc-don">
                <Button className="brand-gradient text-white px-8 py-6 text-base shadow-lg hover:opacity-90 transition-all">
                  Xem thực đơn
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/lien-he">
                <Button variant="outline" className="bg-transparent border-white/60 text-white hover:bg-white/10 px-8 py-6 text-base">
                  Đặt bàn ngay
                </Button>
              </Link>
            </motion.div>

            {/* Info badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Clock className="w-4 h-4 text-accent" />
                <span>{settings?.openHours || "07:00 - 22:00 hàng ngày"}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-accent" />
                <span>{settings?.address || "TP. Hồ Chí Minh"}</span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-8 mt-10 pt-8 border-t border-white/10"
            >
              {[
                { value: "15+", label: "Năm kinh nghiệm" },
                { value: "200+", label: "Món đặc sắc" },
                { value: "5000+", label: "Khách hài lòng" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold font-display text-white">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            {/* Main food image */}
            <div className="relative">
              <div className="aspect-square max-w-lg ml-auto rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=85"
                  alt="Món ăn đặc sắc"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Floating card 1 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-1/4 bg-white rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">⭐</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Đánh giá 4.9/5</p>
                    <p className="text-xs text-gray-400">5,000+ đánh giá</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card 2 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 bottom-1/4 bg-white rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🔥</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Món hot nhất</p>
                    <p className="text-xs text-gray-400">Phở Bò Đặc Biệt</p>
                  </div>
                </div>
              </motion.div>

              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-brand rounded-3xl blur-3xl opacity-20 scale-110" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
