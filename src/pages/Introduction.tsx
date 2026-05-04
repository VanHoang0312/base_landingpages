import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import heroInterior from "@/assets/project-penthouse.jpg";
import thuNgoImg from "@/assets/gioithieu/gen-n-thu-ngo-1.jpg";
import congTyImg from "@/assets/gioithieu/gen-n-cong-ty-3.jpg";
import hoatDongImg from "@/assets/gioithieu/gen-n-hoat-dong-2.jpg";
import taiSaoImg from "@/assets/gioithieu/gen-n-tai-sao-4-1024x724.jpg";

const Introduction = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={heroInterior}
            alt="Hoàng Ẩm Thực"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 pb-8">
            <div className="container-custom">
              <Breadcrumbs items={[{ label: "Giới thiệu" }]} />
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-4xl md:text-5xl font-bold text-white mt-4"
              >
                Giới thiệu
              </motion.h1>
            </div>
          </div>
        </section>

        {/* Gallery Mode - Image Only Sections */}
        <div className="space-y-4 md:space-y-8 py-8 md:py-16">
          {/* Thư ngỏ */}
          <section className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              <img src={thuNgoImg} alt="Thư ngỏ" className="w-full h-auto rounded-2xl shadow-xl" />
            </motion.div>
          </section>

          {/* Công ty */}
          <section className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              <img src={congTyImg} alt="Thông tin công ty" className="w-full h-auto rounded-2xl shadow-xl" />
            </motion.div>
          </section>

          {/* Tại sao chọn chúng tôi */}
          <section className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              <img src={taiSaoImg} alt="Tại sao chọn Hoàng Ẩm Thực" className="w-full h-auto rounded-2xl shadow-xl" />
            </motion.div>
          </section>

          {/* Hoạt động */}
          <section className="container-custom pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <img src={hoatDongImg} alt="Hoạt động công ty" className="w-full h-auto rounded-2xl shadow-xl" />
            </motion.div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Introduction;
