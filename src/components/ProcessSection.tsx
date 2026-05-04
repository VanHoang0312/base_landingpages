import { motion } from "framer-motion";

const steps = [
  { step: "01", icon: "📋", title: "Chọn món yêu thích", description: "Xem thực đơn đa dạng và chọn những món ăn phù hợp với khẩu vị của bạn" },
  { step: "02", icon: "📞", title: "Đặt bàn hoặc gọi điện", description: "Liên hệ qua điện thoại, Zalo hoặc điền form đặt bàn trực tuyến" },
  { step: "03", icon: "👨‍🍳", title: "Chúng tôi chế biến", description: "Đầu bếp chuyên nghiệp chuẩn bị món ăn từ nguyên liệu tươi ngon nhất" },
  { step: "04", icon: "😋", title: "Thưởng thức", description: "Thưởng thức bữa ăn ngon cùng gia đình và bạn bè trong không gian ấm cúng" },
];

export const ProcessSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
            🚀 Quy trình
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Đặt Bàn Dễ Dàng
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Chỉ 4 bước đơn giản để có bữa ăn ngon cùng những người thân yêu
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20" />
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-5">
                <div className="w-16 h-16 brand-gradient rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-primary/20">
                  {step.icon}
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
