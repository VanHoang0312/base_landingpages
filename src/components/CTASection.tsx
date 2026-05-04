import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { settingService } from "@/services/api";

export const CTASection = () => {
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: settingService.getAll,
    staleTime: 10 * 60 * 1000,
  });

  return (
    <section className="section-padding relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 brand-gradient opacity-95" />
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=60')] bg-cover bg-center" />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-white/80 font-medium mb-3 text-lg">Bạn đã sẵn sàng?</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            Đặt Bàn Ngay Hôm Nay
          </h2>
          <p className="text-white/75 text-lg max-w-xl mx-auto mb-10">
            Liên hệ với chúng tôi để đặt bàn hoặc đặt món đặc biệt cho sự kiện của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${settings?.phone || "0909123456"}`}>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 shadow-lg">
                <Phone className="w-5 h-5 mr-2" />
                {settings?.phone || "0909 123 456"}
              </Button>
            </a>
            <Link to="/lien-he">
              <Button size="lg" variant="outline" className="bg-transparent border-white/60 text-white hover:bg-white/10 px-8">
                Gửi tin nhắn
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-white/60 text-sm">
            <span>✅ Phục vụ tận nơi</span>
            <span>✅ Đặt bàn dễ dàng</span>
            <span>✅ Thực đơn đa dạng</span>
            <span>✅ Giá cả hợp lý</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
