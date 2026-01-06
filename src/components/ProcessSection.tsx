import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquare,
  Pencil,
  Hammer,
  KeyRound,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Tư Vấn",
    description:
      "Lắng nghe nhu cầu, tìm hiểu mong muốn và tư vấn giải pháp phù hợp với ngân sách của bạn.",
  },
  {
    icon: Pencil,
    step: "02",
    title: "Thiết Kế",
    description:
      "Xây dựng ý tưởng, phát triển bản vẽ chi tiết và hoàn thiện hồ sơ thiết kế hoàn chỉnh.",
  },
  {
    icon: Hammer,
    step: "03",
    title: "Thi Công",
    description:
      "Triển khai xây dựng với đội ngũ thợ lành nghề, giám sát chặt chẽ đảm bảo tiến độ và chất lượng.",
  },
  {
    icon: KeyRound,
    step: "04",
    title: "Bàn Giao",
    description:
      "Nghiệm thu công trình, bàn giao chìa khóa và hướng dẫn sử dụng, bảo hành dài hạn.",
  },
];

export const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="section-padding bg-primary text-primary-foreground overflow-hidden">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Quy Trình Làm Việc
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Hành Trình Kiến Tạo
            <span className="block text-accent">Ngôi Nhà Mơ Ước</span>
          </h2>
          <p className="text-lg text-primary-foreground/70">
            Quy trình chuyên nghiệp, minh bạch giúp bạn an tâm trong suốt quá
            trình hợp tác.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-accent/20 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative bg-charcoal-light/50 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10 hover:border-accent/50 transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8 px-4 py-1 bg-accent text-charcoal text-sm font-bold rounded-full">
                    Bước {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mt-4 mb-6 group-hover:bg-accent transition-colors duration-300">
                    <step.icon className="w-8 h-8 text-accent group-hover:text-charcoal transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-2xl font-bold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-primary-foreground/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-accent items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-charcoal" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
