import { motion } from "framer-motion";
import { FileText, MessageCircle, Phone } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const pricingArticles = [
  {
    id: 1,
    title: "Báo giá thiết kế & thi công trọn gói",
    description: "Gói dịch vụ toàn diện từ thiết kế đến hoàn thiện công trình",
    date: "Cập nhật 01/2025",
  },
  {
    id: 2,
    title: "Báo giá xây thô",
    description: "Chi phí xây dựng phần thô cho các loại công trình",
    date: "Cập nhật 01/2025",
  },
  {
    id: 3,
    title: "Báo giá hoàn thiện nội thất",
    description: "Bảng giá hoàn thiện nội thất theo từng phong cách",
    date: "Cập nhật 01/2025",
  },
  {
    id: 4,
    title: "Báo giá cải tạo sửa chữa",
    description: "Chi phí cải tạo, sửa chữa nhà ở",
    date: "Cập nhật 12/2024",
  },
];

const constructionPricing = [
  { type: "Nhà cấp 4 mái bằng", price: "4.500.000 - 5.500.000", unit: "đ/m²" },
  { type: "Nhà cấp 4 mái thái", price: "5.000.000 - 6.500.000", unit: "đ/m²" },
  { type: "Nhà 2 tầng", price: "4.800.000 - 6.000.000", unit: "đ/m²" },
  { type: "Nhà 3 tầng", price: "4.500.000 - 5.800.000", unit: "đ/m²" },
  { type: "Biệt thự", price: "6.500.000 - 12.000.000", unit: "đ/m²" },
  { type: "Nhà phố liền kề", price: "5.000.000 - 7.000.000", unit: "đ/m²" },
];

const designPricing = [
  { type: "Thiết kế kiến trúc", price: "100.000 - 200.000", unit: "đ/m²" },
  { type: "Thiết kế nội thất", price: "150.000 - 350.000", unit: "đ/m²" },
  { type: "Thiết kế trọn gói", price: "200.000 - 450.000", unit: "đ/m²" },
  { type: "Thiết kế 3D Render", price: "500.000 - 1.500.000", unit: "đ/góc" },
];

const Quotation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-charcoal text-white py-16 md:py-24">
          <div className="container-custom">
            <Breadcrumbs items={[{ label: "Báo giá" }]} />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Bảng báo giá
              </h1>
              <p className="text-lg text-white/70 max-w-2xl">
                Tham khảo bảng giá dịch vụ thiết kế và thi công xây dựng của Đại Hà Thanh
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Articles */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
                Danh mục báo giá
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pricingArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group p-6 bg-card rounded-xl border border-border hover:border-accent/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-semibold group-hover:text-accent transition-colors mb-1">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          {article.description}
                        </p>
                        <span className="text-xs text-accent">{article.date}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Construction Pricing Table */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                Báo giá xây dựng
              </h2>
              <p className="text-muted-foreground mb-8">
                Đơn giá thi công xây dựng trọn gói (bao gồm nhân công và vật liệu)
              </p>
              
              <div className="bg-background rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-charcoal hover:bg-charcoal">
                      <TableHead className="text-white font-semibold">Loại công trình</TableHead>
                      <TableHead className="text-white font-semibold text-right">Đơn giá</TableHead>
                      <TableHead className="text-white font-semibold text-center w-24">Đơn vị</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {constructionPricing.map((item, index) => (
                      <TableRow key={index} className="hover:bg-accent/5">
                        <TableCell className="font-medium">{item.type}</TableCell>
                        <TableCell className="text-right text-accent font-semibold">
                          {item.price}
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          {item.unit}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Design Pricing Table */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                Báo giá thiết kế
              </h2>
              <p className="text-muted-foreground mb-8">
                Đơn giá dịch vụ thiết kế kiến trúc và nội thất
              </p>
              
              <div className="bg-background rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-charcoal hover:bg-charcoal">
                      <TableHead className="text-white font-semibold">Dịch vụ</TableHead>
                      <TableHead className="text-white font-semibold text-right">Đơn giá</TableHead>
                      <TableHead className="text-white font-semibold text-center w-24">Đơn vị</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {designPricing.map((item, index) => (
                      <TableRow key={index} className="hover:bg-accent/5">
                        <TableCell className="font-medium">{item.type}</TableCell>
                        <TableCell className="text-right text-accent font-semibold">
                          {item.price}
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          {item.unit}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Note */}
        <section className="py-8 bg-accent/10">
          <div className="container-custom">
            <p className="text-sm text-muted-foreground text-center">
              * Giá trên chỉ mang tính chất tham khảo. Để được báo giá chính xác, vui lòng liên hệ trực tiếp với chúng tôi.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="bg-charcoal rounded-2xl p-8 md:p-12 text-center">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Nhận báo giá chi tiết
              </h3>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">
                Liên hệ ngay để được tư vấn và nhận báo giá chi tiết theo nhu cầu của bạn
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:0927366678">
                  <Button variant="gold" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    Gọi ngay: 0927.366.678
                  </Button>
                </a>
                <a
                  href="https://zalo.me/0927366678"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat Zalo
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Zalo Button */}
      <a
        href="https://zalo.me/0927366678"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#0068FF] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      <Footer />
    </div>
  );
};

export default Quotation;
