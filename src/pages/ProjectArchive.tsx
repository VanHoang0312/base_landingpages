import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProjectCard } from "@/components/ProjectCard";
import {
  getProjectsByCategory,
  getAllProjects,
  categoryLabels,
  type ProjectCategory,
} from "@/data/projects";

const ProjectArchive = () => {
  const { category } = useParams<{ category: string }>();
  
  const categoryKey = category as ProjectCategory;
  const isValidCategory = categoryKey && categoryKey in categoryLabels;
  
  const projects = isValidCategory
    ? getProjectsByCategory(categoryKey)
    : getAllProjects();
  
  const pageTitle = isValidCategory
    ? categoryLabels[categoryKey]
    : "Tất cả dự án";

  const breadcrumbItems = isValidCategory
    ? [
        { label: "Mẫu nhà đẹp", href: "/mau-nha-dep" },
        { label: pageTitle },
      ]
    : [{ label: "Mẫu nhà đẹp" }];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-charcoal text-white py-16 md:py-24">
          <div className="container-custom">
            <Breadcrumbs items={breadcrumbItems} />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {pageTitle}
              </h1>
              <p className="text-lg text-white/70 max-w-2xl">
                Khám phá bộ sưu tập các công trình kiến trúc và nội thất đẳng cấp của Đại Hà Thanh
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Chưa có dự án nào trong danh mục này.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectArchive;
