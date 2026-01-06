import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import projectDuplex from "@/assets/project-duplex.jpg";
import projectVilla from "@/assets/project-villa.jpg";
import projectApartment from "@/assets/project-apartment.jpg";
import projectOffice from "@/assets/project-office.jpg";
import projectPenthouse from "@/assets/project-penthouse.jpg";

const projects = [
  {
    title: "Duplex Sân Vườn",
    category: "Thiết kế & Xây dựng",
    location: "Thanh Hóa",
    image: projectDuplex,
    size: "large",
  },
  {
    title: "Villa Sang Trọng",
    category: "Biệt thự",
    location: "Sầm Sơn",
    image: projectVilla,
    size: "large",
  },
  {
    title: "Căn Hộ Hiện Đại",
    category: "Nội thất",
    location: "Thanh Hóa",
    image: projectApartment,
    size: "small",
  },
  {
    title: "Văn Phòng Cao Cấp",
    category: "Thương mại",
    location: "Thanh Hóa",
    image: projectOffice,
    size: "small",
  },
  {
    title: "Penthouse View City",
    category: "Nội thất cao cấp",
    location: "TP. Thanh Hóa",
    image: projectPenthouse,
    size: "medium",
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding bg-secondary">
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
          <Button variant="gold" size="lg">
            Xem Tất Cả
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                project.size === "large"
                  ? "md:row-span-2 aspect-[3/4]"
                  : project.size === "medium"
                  ? "lg:col-span-1 aspect-square"
                  : "aspect-[4/3]"
              }`}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-accent text-charcoal rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/70">
                    {project.location}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
