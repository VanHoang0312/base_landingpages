import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/banner.png";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import images for carousel
import slide1 from "@/assets/project-apartment.png";
import slide2 from "@/assets/project-villa.png";
import slide3 from "@/assets/project-penthouse.png";
import slide4 from "@/assets/project-office.png";
import slide5 from "@/assets/project-kitchen.png";

export const HeroSection = () => {

  const slides = [
    { src: slide1, alt: "Thiết kế nội thất cao cấp" },
    { src: slide2, alt: "Biệt thự sang trọng" },
    { src: slide3, alt: "Căn hộ hiện đại" },
    { src: slide4, alt: "Văn phòng sáng tạo" },
    { src: slide5, alt: "Kiến trúc độc bản" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Background Image with Parallax-like Zoom */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={heroImage}
          alt="Luxury interior design"
          className="w-full h-full object-cover"
        />
        {/* Dynamic Multi-layered Gradients */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" /> */}
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
              <a href="#du-an">
                <Button variant="heroPrimary" size="xl">
                  Xem Dự Án
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="#bao-gia">
                <Button variant="heroSecondary" size="xl">
                  Nhận Báo Giá
                </Button>
              </a>
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

          {/* Right Video/Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Carousel Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video group">
                <Carousel
                  className="w-full h-full"
                  plugins={[
                    Autoplay({
                      delay: 3000,
                      stopOnInteraction: false,
                    })
                  ]}
                  opts={{
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {slides.map((slide, index) => (
                      <CarouselItem key={index} className="relative aspect-video">
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className="w-full h-full object-cover"
                        />


                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute right-12 bottom-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CarouselPrevious className="static translate-y-0 h-10 w-10 bg-white/10 backdrop-blur-md border-white/20 hover:bg-accent hover:text-primary transition-all" />
                    <CarouselNext className="static translate-y-0 h-10 w-10 bg-white/10 backdrop-blur-md border-white/20 hover:bg-accent hover:text-primary transition-all" />
                  </div>
                </Carousel>
              </div>

              {/* Floating Card - Optional, maybe remove or keep as a badge if needed, removing for now as video is explicit */}

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
