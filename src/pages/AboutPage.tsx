import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { useQuery } from "@tanstack/react-query";
import { settingService } from "@/services/api";
import { Award, Users, Clock, Heart } from "lucide-react";

const values = [
  { icon: Award, title: "Chất lượng hàng đầu", desc: "Cam kết sử dụng nguyên liệu tươi ngon nhất, được kiểm soát chất lượng nghiêm ngặt mỗi ngày" },
  { icon: Users, title: "Đội ngũ chuyên nghiệp", desc: "Đầu bếp có nhiều năm kinh nghiệm, luôn tận tâm với từng món ăn phục vụ thực khách" },
  { icon: Clock, title: "Phục vụ tận tâm", desc: "Mở cửa 7 ngày trong tuần, sẵn sàng phục vụ bạn trong mọi dịp từ bữa ăn thường ngày đến tiệc lớn" },
  { icon: Heart, title: "Hương vị truyền thống", desc: "Công thức gia truyền được gìn giữ qua nhiều thế hệ, mang đến hương vị đích thực của ẩm thực Việt" },
];

export default function AboutPage() {
  const { data: settings } = useQuery({ queryKey: ["settings"], queryFn: settingService.getAll, staleTime: 10 * 60 * 1000 });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-red-950/60 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=60')] bg-cover bg-center" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block text-sm font-semibold text-primary bg-primary/20 px-4 py-1.5 rounded-full mb-5">
            🏠 Về chúng tôi
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Câu Chuyện Của Chúng Tôi
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/60 max-w-xl mx-auto text-lg">
            Hành trình hơn 15 năm gìn giữ và phát huy hương vị ẩm thực truyền thống Việt Nam
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                <img src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80" alt="Nhà hàng" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-5">
                📖 Câu chuyện
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {settings?.siteName || "Hoàng Ẩm Thực"}
              </h2>
              <p className="text-gray-500 leading-relaxed text-lg mb-6">
                {settings?.aboutText || "Với hơn 15 năm kinh nghiệm, chúng tôi tự hào mang đến những món ăn truyền thống Việt Nam được nấu từ nguyên liệu tươi ngon nhất."}
              </p>
              <p className="text-gray-500 leading-relaxed">
                Từ những ngày đầu khởi nghiệp với một gian bếp nhỏ, đến nay <strong className="text-gray-800">{settings?.siteName || "Hoàng Ẩm Thực"}</strong> đã trở thành địa chỉ ẩm thực được tin yêu của hàng nghìn thực khách. Chúng tôi không chỉ bán món ăn, mà còn chia sẻ những giá trị văn hóa ẩm thực phong phú của dân tộc.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {[["15+", "Năm kinh nghiệm"], ["200+", "Món đặc sắc"], ["5000+", "Thực khách"]].map(([val, label]) => (
                  <div key={label} className="text-center p-4 bg-primary/5 rounded-2xl">
                    <p className="font-display text-2xl font-bold text-primary">{val}</p>
                    <p className="text-xs text-gray-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-warm-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">💎 Giá trị cốt lõi</span>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Tại Sao Chọn Chúng Tôi?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Cam kết mang đến trải nghiệm ẩm thực tốt nhất cho mỗi thực khách</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 brand-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
