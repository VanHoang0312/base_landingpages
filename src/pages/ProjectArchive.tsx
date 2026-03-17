import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProjectCard } from "@/components/ProjectCard";
import { websiteCategoryService, websitePostService, type WebsiteCategory, type WebsitePost } from "@/services/api";
import { mapPostToProject } from "@/utils/projectMapper";
import type { Project } from "@/data/projects";

const ProjectArchive = () => {
  const { category } = useParams<{ category: string }>();
  const DEFAULT_SUBTITLE = "Khám phá bộ sưu tập các công trình kiến trúc và nội thất đẳng cấp của Đại Hà Thanh";
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("Tất cả dự án");
  const [pageSubtitle, setPageSubtitle] = useState(DEFAULT_SUBTITLE);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const categoryRes = await websiteCategoryService.getAllPublic({ pageSize: 0, sort: "sortOrder" });
        const categoryRows = (categoryRes?.rows || []) as WebsiteCategory[];
        const selectedCategory = category ? categoryRows.find(item => item.slug === category || item.code === category) : null;

        const postParams: Record<string, unknown> = { pageSize: 0, sort: "-publishedAt" };
        if (selectedCategory?._id) {
          postParams.categoryId = selectedCategory._id;
        }

        const postRes = await websitePostService.getAllPublic(postParams);
        const postRows = (postRes?.rows || []) as WebsitePost[];
        if (!isMounted) return;

        setProjects(postRows.map(item => mapPostToProject(item, selectedCategory?.slug || category || "tat-ca")));
        setPageTitle(selectedCategory?.name || "Tất cả dự án");
        setPageSubtitle(selectedCategory?.description?.trim() || DEFAULT_SUBTITLE);
      } catch (_err) {
        if (!isMounted) return;
        setProjects([]);
        setPageTitle("Tất cả dự án");
        setPageSubtitle(DEFAULT_SUBTITLE);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [category]);

  const breadcrumbItems = category
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
                {pageSubtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            {loading ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Đang tải dữ liệu...</p>
              </div>
            ) : projects.length > 0 ? (
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
