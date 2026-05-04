import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { contactService, settingService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { data: settings } = useQuery({ queryKey: ["settings"], queryFn: settingService.getAll, staleTime: 10 * 60 * 1000 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) { toast.error("Vui lòng điền họ tên và số điện thoại"); return; }
    setIsLoading(true);
    try {
      await contactService.submit(form);
      toast.success("Gửi thành công! Chúng tôi sẽ liên hệ lại sớm.");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      toast.error("Gửi thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: "Điện thoại", value: settings?.phone || "0909 123 456", href: `tel:${settings?.phone || "0909123456"}` },
    { icon: Mail, label: "Email", value: settings?.email || "info@daihathanh.vn", href: `mailto:${settings?.email || "info@daihathanh.vn"}` },
    { icon: MapPin, label: "Địa chỉ", value: settings?.address || "123 Nguyễn Huệ, Q1, TP.HCM", href: undefined },
    { icon: Clock, label: "Giờ mở cửa", value: settings?.openHours || "07:00 - 22:00 hàng ngày", href: undefined },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 via-red-950/60 to-gray-900">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Liên Hệ & Đặt Bàn
          </motion.h1>
          <p className="text-white/60 max-w-xl mx-auto">Hãy liên hệ với chúng tôi để đặt bàn hoặc biết thêm thông tin về thực đơn</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">Thông Tin Liên Hệ</h2>
              <div className="space-y-4 mb-8">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 transition-colors">
                      <div className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="font-medium text-gray-900 hover:text-primary transition-colors">{item.value}</a>
                        ) : (
                          <p className="font-medium text-gray-900">{item.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="rounded-2xl overflow-hidden h-52 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-300">
                  <MapPin className="w-10 h-10 mx-auto mb-2" />
                  <p className="text-sm">Bản đồ</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">Gửi Tin Nhắn</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label>Họ tên <span className="text-red-500">*</span></Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nguyễn Văn A" />
                </div>
                <div className="space-y-2">
                  <Label>Số điện thoại <span className="text-red-500">*</span></Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="0909 xxx xxx" type="tel" />
                </div>
                <div className="space-y-2">
                  <Label>Email (không bắt buộc)</Label>
                  <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label>Lời nhắn</Label>
                  <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tôi muốn đặt bàn cho ... người vào ngày ..." rows={4} />
                </div>
                <Button type="submit" className="w-full brand-gradient text-white py-6 text-base" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
                  {isLoading ? "Đang gửi..." : "Gửi tin nhắn"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
