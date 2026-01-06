import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-interior.jpg";

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Đã gửi thành công!",
      description:
        "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
    });
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      {/* Decorative */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent" />

      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary-foreground"
          >
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              Liên Hệ Tư Vấn
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Bắt Đầu Dự Án
              <span className="block text-accent">Của Bạn Hôm Nay</span>
            </h2>
            <p className="text-lg text-primary-foreground/70 mb-10">
              Để lại thông tin, chúng tôi sẽ tư vấn miễn phí và báo giá chi tiết
              cho dự án của bạn trong 24 giờ.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">Hotline</p>
                  <p className="font-semibold">0237 123 4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">Email</p>
                  <p className="font-semibold">contact@daihathanh.vn</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">Địa chỉ</p>
                  <p className="font-semibold">
                    Lô 13 - LK3 - KĐT An Phú Hưng, Thanh Hóa
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-background rounded-3xl p-8 md:p-10 shadow-2xl"
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Nhận Báo Giá Miễn Phí
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Họ và tên *
                  </label>
                  <Input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="h-12 bg-secondary border-border focus:border-accent"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Số điện thoại *
                    </label>
                    <Input
                      type="tel"
                      placeholder="0912 345 678"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                      className="h-12 bg-secondary border-border focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-12 bg-secondary border-border focus:border-accent"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nội dung yêu cầu
                  </label>
                  <textarea
                    placeholder="Mô tả ngắn về dự án của bạn..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full"
                >
                  <Send className="w-4 h-4" />
                  Gửi Yêu Cầu Báo Giá
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Cam kết bảo mật thông tin. Phản hồi trong 24 giờ.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
