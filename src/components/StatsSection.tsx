import { motion } from "framer-motion";

const stats = [
  { value: "15+", label: "Năm kinh nghiệm", icon: "🏆" },
  { value: "200+", label: "Món đặc sắc", icon: "🍜" },
  { value: "5,000+", label: "Khách hài lòng", icon: "😊" },
  { value: "4.9★", label: "Đánh giá trung bình", icon: "⭐" },
];

export const StatsSection = () => {
  return (
    <section className="py-14 bg-foreground">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <p className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
