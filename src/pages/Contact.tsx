import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactInfo = [
  {
    icon: MapPin,
    title: "Địa chỉ",
    content: "Lô 13 - LK3 - KĐT An Phú Hưng, TP. Thanh Hóa",
  },
  {
    icon: Phone,
    title: "Hotline",
    content: "0927.366.678",
    href: "tel:0927366678",
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@daihathanh.vn",
    href: "mailto:contact@daihathanh.vn",
  },
  {
    icon: Clock,
    title: "Giờ làm việc",
    content: "Thứ 2 - Thứ 7: 8:00 - 17:30",
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Header */}
        <section className="bg-charcoal text-white py-16 md:py-24">
          <div className="container-custom">
            <Breadcrumbs items={[{ label: "Liên hệ" }]} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Liên hệ với chúng tôi
              </h1>
              <p className="text-lg text-white/70 max-w-2xl">
                Hãy để lại thông tin, chúng tôi sẽ liên hệ tư vấn miễn phí cho bạn
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
                  Gửi yêu cầu tư vấn
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên *</Label>
                      <Input
                        id="name"
                        placeholder="Nhập họ và tên"
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        className="bg-background"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Nhập email (không bắt buộc)"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Dịch vụ quan tâm</Label>
                    <select
                      id="service"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Chọn dịch vụ</option>
                      <option value="thiet-ke">Thiết kế kiến trúc</option>
                      <option value="noi-that">Thiết kế nội thất</option>
                      <option value="xay-moi">Xây nhà mới</option>
                      <option value="sua-nha">Sửa chữa, cải tạo</option>
                      <option value="tron-goi">Trọn gói thiết kế & thi công</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Nội dung yêu cầu</Label>
                    <Textarea
                      id="message"
                      placeholder="Mô tả chi tiết nhu cầu của bạn..."
                      rows={5}
                      className="bg-background resize-none"
                    />
                  </div>
                  <Button type="submit" variant="gold" size="lg" className="w-full sm:w-auto">
                    <Send className="w-4 h-4 mr-2" />
                    Gửi yêu cầu
                  </Button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
                  Thông tin liên hệ
                </h2>
                <div className="space-y-4 mb-8">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-0.5">
                          {info.title}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="font-medium text-foreground hover:text-accent transition-colors"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="font-medium text-foreground">{info.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Contact */}
                <div className="bg-charcoal rounded-xl p-6 text-white">
                  <h3 className="font-display text-xl font-bold mb-4">
                    Liên hệ nhanh
                  </h3>
                  <p className="text-white/70 text-sm mb-6">
                    Nhấn vào các nút bên dưới để liên hệ trực tiếp với chúng tôi
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="tel:0927366678" className="flex-1">
                      <Button variant="gold" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Gọi ngay
                      </Button>
                    </a>
                    <a
                      href="https://zalo.me/0927366678"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat Zalo
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 aspect-video bg-muted rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3756.0673927682257!2d105.76691807546776!3d19.807389030191077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3136f77a0d3c5c1f%3A0x7c6a3f6b7b4f8e0a!2sKhu%20%C4%91%C3%B4%20th%E1%BB%8B%20An%20Ph%C3%BA%20H%C6%B0ng!5e0!3m2!1svi!2s!4v1699999999999!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Địa chỉ Đại Hà Thanh"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
