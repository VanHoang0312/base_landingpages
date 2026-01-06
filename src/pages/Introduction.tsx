import { motion } from "framer-motion";
import { Award, Users, Building, Target, CheckCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import heroInterior from "@/assets/hero-interior.jpg";

const values = [
  {
    icon: Target,
    title: "Tầm nhìn",
    description: "Trở thành đơn vị hàng đầu trong lĩnh vực thiết kế và thi công xây dựng tại Thanh Hóa và khu vực Bắc Trung Bộ.",
  },
  {
    icon: Award,
    title: "Sứ mệnh",
    description: "Kiến tạo không gian sống hoàn hảo, nâng tầm chất lượng cuộc sống cho mọi gia đình Việt.",
  },
  {
    icon: Users,
    title: "Đội ngũ",
    description: "Hơn 50 kiến trúc sư, kỹ sư và thợ lành nghề với kinh nghiệm trung bình 10+ năm trong ngành.",
  },
  {
    icon: Building,
    title: "Cam kết",
    description: "Đảm bảo tiến độ, chất lượng công trình và sự hài lòng tuyệt đối của khách hàng.",
  },
];

const milestones = [
  { year: "2014", event: "Thành lập Công ty TNHH Đại Hà Thanh" },
  { year: "2016", event: "Hoàn thành 100 dự án đầu tiên" },
  { year: "2018", event: "Mở rộng quy mô, thành lập xưởng sản xuất nội thất" },
  { year: "2020", event: "Đạt chứng nhận ISO 9001:2015" },
  { year: "2022", event: "Vượt mốc 500+ dự án hoàn thành" },
  { year: "2024", event: "Ra mắt dịch vụ Smart Home tích hợp" },
];

const Introduction = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={heroInterior}
            alt="Đại Hà Thanh"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />
          
          <div className="absolute bottom-0 left-0 right-0 pb-8 md:pb-12">
            <div className="container-custom">
              <Breadcrumbs items={[{ label: "Giới thiệu" }]} />
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Về Đại Hà Thanh
                </h1>
                <p className="text-lg text-white/70 max-w-2xl">
                  Hơn 10 năm kinh nghiệm trong lĩnh vực thiết kế và thi công xây dựng
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Company Intro */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Công ty TNHH <span className="text-accent">Đại Hà Thanh</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Được thành lập từ năm 2014, Đại Hà Thanh đã không ngừng phát triển và khẳng định vị thế 
                là một trong những đơn vị hàng đầu trong lĩnh vực thiết kế kiến trúc, nội thất và thi công 
                xây dựng tại Thanh Hóa. Với đội ngũ kiến trúc sư, kỹ sư giàu kinh nghiệm và tâm huyết, 
                chúng tôi cam kết mang đến những công trình chất lượng, thẩm mỹ và bền vững theo thời gian.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-4">
                  <p className="font-display text-4xl font-bold text-accent mb-1">10+</p>
                  <p className="text-muted-foreground text-sm">Năm kinh nghiệm</p>
                </div>
                <div className="p-4">
                  <p className="font-display text-4xl font-bold text-accent mb-1">500+</p>
                  <p className="text-muted-foreground text-sm">Dự án hoàn thành</p>
                </div>
                <div className="p-4">
                  <p className="font-display text-4xl font-bold text-accent mb-1">50+</p>
                  <p className="text-muted-foreground text-sm">Nhân sự chuyên nghiệp</p>
                </div>
                <div className="p-4">
                  <p className="font-display text-4xl font-bold text-accent mb-1">100%</p>
                  <p className="text-muted-foreground text-sm">Khách hàng hài lòng</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Giá trị cốt lõi
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Những giá trị định hướng mọi hoạt động của Đại Hà Thanh
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background p-6 rounded-xl border border-border hover:border-accent/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Hành trình phát triển
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Những cột mốc quan trọng trong chặng đường 10 năm
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 mb-6"
                >
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="font-display text-xl font-bold text-accent">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-accent mt-1.5" />
                  <div className="flex-1 pb-6 border-b border-border">
                    <p className="text-foreground">{milestone.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-charcoal text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Tại sao chọn Đại Hà Thanh?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Thiết kế độc quyền theo yêu cầu khách hàng",
                "Đội ngũ kiến trúc sư giàu kinh nghiệm",
                "Cam kết đúng tiến độ, đúng ngân sách",
                "Vật liệu chất lượng cao, nguồn gốc rõ ràng",
                "Bảo hành công trình dài hạn",
                "Hỗ trợ tư vấn 24/7",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-white/5 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-white/90">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Introduction;
