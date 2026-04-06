import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, CalendarDays, ArrowRight, Briefcase } from "lucide-react";
import { recruitmentData } from "@/data/recruitment";
import heroImage from "@/assets/project-apartment.png"; // Using existing asset for hero

const Recruitment = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-background" ref={containerRef}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <img
            src={heroImage}
            alt="Tuyển dụng Hero"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-charcoal/60" />
        </motion.div>

        <div className="container-custom relative z-10 text-center pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
          >
            Cơ Hội <span className="text-accent">Tuyển Dụng</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            Gia nhập Đại Hà Thanh để cùng chúng tôi kiến tạo những không gian sống đẳng cấp và phát triển sự nghiệp của bạn.
          </motion.p>
        </div>
      </section>

      {/* Recruitment List */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">VỊ TRÍ ĐANG MỞ</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Tham Gia Cùng Chúng Tôi
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recruitmentData.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={job.image}
                    alt={job.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur text-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {job.type}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 line-clamp-2">
                    {job.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1">
                    {job.summary}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-foreground/80">
                      <MapPin className="w-4 h-4 mr-2 text-accent" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-foreground/80">
                      <CalendarDays className="w-4 h-4 mr-2 text-accent" />
                      Hạn nộp: {job.deadline}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto gap-4">
                    <Link to={`/tuyen-dung/${job.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        Chi Tiết
                      </Button>
                    </Link>
                    <Link to={`/tuyen-dung/${job.slug}/ung-tuyen`} className="flex-1">
                      <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                        Ứng Tuyển
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Recruitment;
