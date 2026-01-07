import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Building,
  Palette,
  Home,
  Hammer,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Building,
    title: "Thiết Kế Kiến Trúc",
    description:
      "Kiến tạo những công trình mang dấu ấn riêng, hài hòa với môi trường và tối ưu công năng sử dụng.",
    features: ["Nhà phố", "Biệt thự", "Công trình thương mại"],
    color: "from-accent/20 to-accent/5",
    delay: 0,
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    icon: Palette,
    title: "Thiết Kế Nội Thất",
    description:
      "Tạo nên không gian sống tinh tế, phản ánh cá tính và phong cách riêng của chủ nhân.",
    features: ["Phong cách hiện đại", "Tân cổ điển", "Tối giản"],
    color: "from-charcoal/10 to-transparent",
    delay: 0.1,
    className: "lg:col-span-1",
  },
  {
    icon: Home,
    title: "Xây Dựng Nhà Mới",
    description:
      "Thi công trọn gói với đội ngũ chuyên nghiệp, đảm bảo tiến độ và chất lượng.",
    features: ["Báo giá minh bạch", "Bảo hành dài hạn"],
    color: "from-gold-light/20 to-transparent",
    delay: 0.2,
    className: "lg:col-span-1",
  },
  {
    icon: Hammer,
    title: "Cải Tạo & Sửa Chữa",
    description:
      "Làm mới không gian sống với chi phí hợp lý, tối ưu công năng sử dụng.",
    features: ["Cải tạo toàn diện", "Nâng cấp từng phần"],
    color: "from-accent/10 to-transparent",
    delay: 0.3,
    className: "lg:col-span-2",
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dich-vu" className="section-padding bg-background">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Dịch Vụ Của Chúng Tôi
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Giải Pháp Toàn Diện
            <span className="block text-accent">Cho Ngôi Nhà Mơ Ước</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Từ ý tưởng đến hiện thực, chúng tôi đồng hành cùng bạn trong mọi
            giai đoạn để kiến tạo không gian sống hoàn hảo.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              to="/dich-vu"
              key={service.title}
              className={`group relative rounded-2xl p-8 bg-gradient-to-br ${service.color} border border-border hover:border-accent/50 transition-all duration-500 hover:shadow-lg overflow-hidden ${service.className}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: service.delay }}
                className="h-full"
              >
                {/* Background Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="relative z-10 w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-charcoal transition-all duration-300">
                  <service.icon className="w-7 h-7 text-accent group-hover:text-charcoal" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                    {service.title}
                    <ArrowUpRight className="w-5 h-5 text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-block px-3 py-1 text-xs font-medium bg-background/80 text-foreground rounded-full border border-border"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
