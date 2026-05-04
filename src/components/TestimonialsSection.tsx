import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Nguyễn Thị Lan",
    role: "Khách hàng thân thiết",
    avatar: "👩",
    rating: 5,
    content: "Món phở bò ở đây thực sự tuyệt vời! Nước dùng đậm đà, thịt bò mềm, nguyên liệu tươi. Đã ghé rất nhiều lần và lần nào cũng hài lòng.",
  },
  {
    name: "Trần Văn Minh",
    role: "Blogger ẩm thực",
    avatar: "👨",
    rating: 5,
    content: "Hoàng Ẩm Thực xứng đáng là một trong những nhà hàng ngon nhất mình từng thử. Không gian ấm cúng, phục vụ chu đáo, giá cả hợp lý.",
  },
  {
    name: "Lê Thị Hương",
    role: "Khách hàng mới",
    avatar: "👱‍♀️",
    rating: 5,
    content: "Lần đầu đến nhưng chắc chắn sẽ quay lại! Món bún bò Huế cay vừa phải, thơm ngon. Nhân viên nhiệt tình và thân thiện.",
  },
  {
    name: "Phạm Đức Hùng",
    role: "Thực khách",
    avatar: "🧔",
    rating: 5,
    content: "Gia đình mình thường xuyên đặt tiệc ở đây cho các dịp đặc biệt. Nhà hàng phục vụ chuyên nghiệp, thực đơn phong phú, rất phù hợp cho tiệc đông người.",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
            💬 Đánh giá khách hàng
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Khách Hàng Nói Gì?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hàng nghìn khách hàng tin tưởng và yêu mến ẩm thực Hoàng Ẩm Thực
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-5 italic">"{item.content}"</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{item.avatar}</span>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall rating */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-full px-6 py-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-amber-800">4.9/5</span>
            <span className="text-amber-600 text-sm">từ 5,000+ đánh giá</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
