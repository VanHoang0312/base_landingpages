import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, Building2, ThumbsUp } from "lucide-react";

const stats = [
  {
    icon: Award,
    value: 10,
    suffix: "+",
    label: "Năm Kinh Nghiệm",
    description: "Tích lũy chuyên môn",
  },
  {
    icon: Building2,
    value: 500,
    suffix: "+",
    label: "Dự Án Hoàn Thành",
    description: "Trên toàn quốc",
  },
  {
    icon: Users,
    value: 50,
    suffix: "+",
    label: "Đội Ngũ Chuyên Gia",
    description: "Tận tâm & sáng tạo",
  },
  {
    icon: ThumbsUp,
    value: 100,
    suffix: "%",
    label: "Khách Hàng Hài Lòng",
    description: "Cam kết chất lượng",
  },
];

const Counter = ({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 bg-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,hsl(var(--accent)/0.1)_0%,transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_60%,hsl(var(--accent)/0.05)_0%,transparent_50%)]" />
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-charcoal transition-all duration-300">
                <stat.icon className="w-7 h-7" />
              </div>

              <div className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                <Counter value={stat.value} suffix={stat.suffix} inView={isInView} />
              </div>

              <p className="text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
