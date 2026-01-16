import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Phone, Mail, MapPin, Loader2, ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/project-apartment.png";
import { consultationService } from "@/services/api";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Thiết kế",
    contactPreference: "anytime",
    contactTime: "",
    message: "",
  });

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("09:00");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Synchronize contactTime string whenever date or time changes
  React.useEffect(() => {
    if (date) {
      const combined = new Date(date);
      const [hours, minutes] = time.split(":").map(Number);
      combined.setHours(hours, minutes);
      setFormData(prev => ({ ...prev, contactTime: combined.toISOString() }));
    }
  }, [date, time]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await consultationService.create(formData);
      toast({
        title: "Đã gửi thành công!",
        description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "Thiết kế",
        contactPreference: "anytime",
        contactTime: "",
        message: "",
      });
      setDate(undefined);
      setTime("09:00");
    } catch (error) {
      toast({
        title: "Gửi thất bại!",
        description: "Có lỗi xảy ra, vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="bao-gia" className="relative py-24 overflow-hidden">
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
                  <p className="font-semibold">0927.366.678</p>
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
              className="bg-background rounded-2xl p-8 md:p-10 shadow-2xl"
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
                    disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                      className="h-12 bg-secondary border-border focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Lĩnh vực tư vấn
                    </label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) =>
                        setFormData({ ...formData, service: value })
                      }
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="h-12 bg-secondary border-border focus:border-accent">
                        <SelectValue placeholder="Chọn lĩnh vực" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Thiết kế">Thiết kế</SelectItem>
                        <SelectItem value="Thi công">Thi công</SelectItem>
                        <SelectItem value="Tư vấn giám sát">
                          Tư vấn giám sát
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Thời gian liên hệ
                    </label>
                    <Select
                      value={formData.contactPreference}
                      onValueChange={(value) =>
                        setFormData({ ...formData, contactPreference: value })
                      }
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="h-12 bg-secondary border-border focus:border-accent">
                        <SelectValue placeholder="Chọn thời gian" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anytime">Bất cứ lúc nào</SelectItem>
                        <SelectItem value="specific">
                          Chọn thời gian cụ thể
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.contactPreference === "specific" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 space-y-2">
                        <Label className="text-sm font-medium text-foreground">Ngày liên hệ</Label>
                        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-between font-normal h-12 bg-secondary border-border focus:border-accent hover:bg-secondary/80",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <div className="flex items-center">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                              </div>
                              <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(newDate) => {
                                setDate(newDate);
                                setIsCalendarOpen(false);
                              }}
                              initialFocus
                              locale={vi}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="w-full sm:w-32 space-y-2">
                        <Label className="text-sm font-medium text-foreground">Giờ</Label>
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          disabled={isSubmitting}
                          className="h-12 bg-secondary border-border focus:border-accent appearance-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Gửi Yêu Cầu Báo Giá
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
