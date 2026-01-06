import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-interior.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury interior design"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-primary-foreground"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">
                Công ty TNHH Đại Hà Thanh
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              Kiến Tạo
              <span className="block text-accent">Không Gian,</span>
              Nâng Tầm
              <span className="block">Cuộc Sống</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mb-8 leading-relaxed"
            >
              Chúng tôi mang đến giải pháp thiết kế kiến trúc và nội thất cao
              cấp, kết hợp sự tinh tế trong từng chi tiết với công nghệ xây dựng
              hiện đại.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="heroPrimary" size="xl">
                Xem Dự Án
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="heroSecondary" size="xl">
                Nhận Báo Giá
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex items-center gap-8 mt-12 pt-8 border-t border-primary-foreground/20"
            >
              <div>
                <p className="text-3xl font-bold text-accent">10+</p>
                <p className="text-sm text-primary-foreground/60">
                  Năm Kinh Nghiệm
                </p>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20" />
              <div>
                <p className="text-3xl font-bold text-accent">500+</p>
                <p className="text-sm text-primary-foreground/60">
                  Dự Án Hoàn Thành
                </p>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20 hidden sm:block" />
              <div className="hidden sm:block">
                <p className="text-3xl font-bold text-accent">100%</p>
                <p className="text-sm text-primary-foreground/60">
                  Hài Lòng
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Premium interior design"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -bottom-8 -left-8 bg-background rounded-xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
                    <Play className="w-6 h-6 text-accent fill-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Video Tour</p>
                    <p className="text-sm text-muted-foreground">
                      Khám phá dự án
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Gold Accent Border */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-accent/30 rounded-2xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-primary-foreground/50 uppercase tracking-widest">
            Cuộn xuống
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-accent rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
