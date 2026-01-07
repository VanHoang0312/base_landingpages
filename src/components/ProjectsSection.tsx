import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import projectDuplex from "@/assets/project-duplex.jpg";
import projectVilla from "@/assets/project-villa.jpg";
import projectApartment from "@/assets/project-apartment.jpg";
import projectOffice from "@/assets/project-office.jpg";
import projectPenthouse from "@/assets/project-penthouse.jpg";
import projectResort from "@/assets/project-resort.jpg";
import projectBungalow from "@/assets/project-bungalow.jpg";
const projects = [
  {
    slug: "duplex-san-vuon-sang-trong",
    title: "Duplex Sân Vườn",
    category: "Thiết kế & Xây dựng",
    location: "Thanh Hóa",
    image: projectDuplex,
    size: "large",
  },
  {
    slug: "villa-sang-trong",
    title: "Villa Sang Trọng",
    category: "Biệt thự",
    location: "Sầm Sơn",
    image: projectVilla,
    size: "large",
  },
  {
    slug: "nha-pho-3-the-he",
    title: "Căn Hộ Hiện Đại",
    category: "Nội thất",
    location: "Thanh Hóa",
    image: projectApartment,
    size: "small",
  },
  {
    slug: "van-phong-hien-dai",
    title: "Văn Phòng Cao Cấp",
    category: "Thương mại",
    location: "Thanh Hóa",
    image: projectOffice,
    size: "small",
  },
  {
    slug: "bungalow-nghi-duong",
    title: "Bungalow",
    category: "Biệt thự",
    location: "Thanh Hóa",
    image: projectBungalow,
    size: "medium",
  },
  {
    slug: "penthouse-view-song",
    title: "Penthouse View City",
    category: "Nội thất cao cấp",
    location: "TP. Thanh Hóa",
    image: projectPenthouse,
    size: "medium",
  },
  {
    slug: "resort-sang-trong",
    title: "Resort Sang Trọng",
    category: "Biệt thự",
    location: "Sầm Sơn",
    image: projectResort,
    size: "medium",
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="du-an" className="section-padding bg-secondary">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              Dự Án Nổi Bật
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Những Công Trình
              <span className="block text-accent">Đã Hoàn Thành</span>
            </h2>
          </div>
          <Link to="/mau-nha-dep/da-thi-cong">
            <Button variant="gold" size="lg">
              Xem Tất Cả
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <Link
              key={project.title + index}
              to={`/du-an/${project.slug}`}
              className={cn(
                "group relative block overflow-hidden rounded-2xl bg-charcoal transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)]",
                project.size === "large" ? "md:row-span-2" : ""
              )}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "h-full w-full",
                  project.size === "large"
                    ? "aspect-[3/4]"
                    : project.size === "medium"
                      ? "aspect-square"
                      : "aspect-[4/3]"
                )}
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Advanced Multi-layer Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-10">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                    <span className="inline-flex items-center px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase bg-accent text-charcoal rounded-full mb-5 shadow-gold/20 shadow-lg">
                      {project.category}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight leading-none group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2.5 text-white/50 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 transform translate-y-2 group-hover:translate-y-0">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="font-medium tracking-wide">{project.location}</span>
                    </div>
                  </div>

                  {/* Floating CTA */}
                  <div className="absolute top-10 right-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 hover:bg-accent hover:text-charcoal hover:border-transparent z-20">
                    <ArrowUpRight className="w-7 h-7 transition-transform group-hover:rotate-12" />
                  </div>
                </div>

                {/* Glossy Border */}
                <div className="absolute inset-0 rounded-2xl border border-white/5 transition-colors duration-500 group-hover:border-white/20" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
