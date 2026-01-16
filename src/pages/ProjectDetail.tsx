import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Ruler, Banknote, Home, ArrowLeft, MessageCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, categoryLabels } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-16">
          <div className="container-custom text-center">
            <h1 className="font-display text-3xl font-bold mb-4">
              Không tìm thấy dự án
            </h1>
            <Link to="/mau-nha-dep/da-thi-cong">
              <Button variant="gold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại danh sách
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Mẫu nhà đẹp", href: `/mau-nha-dep/${project.category}` },
    { label: categoryLabels[project.category], href: `/mau-nha-dep/${project.category}` },
    { label: project.title },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Image */}
        <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 pb-8 md:pb-12">
            <div className="container-custom">
              <Breadcrumbs items={breadcrumbItems} />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block bg-accent text-charcoal px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {project.categoryLabel}
                </span>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {project.title}
                </h1>
                <div className="flex items-center gap-4 text-white/70">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.dateDisplay}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.specs.location}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Project Specs */}
        <section className="py-12 bg-muted/50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Thông số dự án
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-background p-5 rounded-xl border border-border">
                  <Ruler className="w-6 h-6 text-accent mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Diện tích</p>
                  <p className="font-display text-xl font-bold">{project.specs.area}</p>
                </div>
                <div className="bg-background p-5 rounded-xl border border-border">
                  <Banknote className="w-6 h-6 text-accent mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Chi phí</p>
                  <p className="font-display text-xl font-bold">{project.specs.cost}</p>
                </div>
                <div className="bg-background p-5 rounded-xl border border-border md:col-span-2">
                  <Home className="w-6 h-6 text-accent mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Công năng</p>
                  <p className="font-display text-lg font-bold">{project.specs.rooms}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Điểm nổi bật
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Description */}
        <section className="py-12 bg-muted/30">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Mô tả dự án
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA & Contact */}
        <section className="py-12 border-t border-border">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-xl font-bold mb-2">
                  Bạn quan tâm đến dự án này?
                </h3>
                <p className="text-muted-foreground">
                  Liên hệ ngay với chúng tôi để được tư vấn miễn phí
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:0927366678">
                  <Button variant="gold" size="lg">
                    Hotline: 0927.366.678
                  </Button>
                </a>
                <a
                  href="https://zalo.me/0927366678"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat Zalo
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Company Info Footer */}
        <section className="py-8 bg-charcoal text-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Lô 13 - LK3 - KĐT An Phú Hưng, Phường Hạc Thành, Thanh Hóa</span>
              </div>
              <div className="flex items-center gap-6">
                <span>Hotline: 0927.366.678</span>
                <span>Email: contact@daihathanh.vn</span>
              </div>
            </div>
          </div>
        </section>

        {/* Comments Section Placeholder */}
        <section className="py-12">
          <div className="container-custom">
            <h3 className="font-display text-xl font-bold mb-6">
              Bình luận
            </h3>
            <div className="bg-muted/30 rounded-xl p-8 text-center">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Hãy để lại bình luận của bạn về dự án này
              </p>
              <Button variant="outline" className="mt-4">
                Đăng nhập để bình luận
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
