import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [day, month] = (project.dateDisplay || "-- --").split(" ");
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/du-an/${project.slug}`}
        className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-xl"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-accent text-charcoal px-3 py-2 rounded-lg text-center">
            <span className="block text-lg font-bold leading-none">
              {day}
            </span>
            <span className="block text-xs uppercase mt-0.5">
              {month}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4 bg-charcoal/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
            {project.categoryLabel}
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 mb-2">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {project.excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};
