import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Calendar } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { websiteVideoService, type WebsiteVideo } from "@/services/api";

const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match?.[1] || null;
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const VideoDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [video, setVideo] = useState<WebsiteVideo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (!slug) { setLoading(false); return; }
    websiteVideoService
      .getBySlug(slug)
      .then((res) => {
        if (!isMounted) return;
        setVideo(res);
      })
      .catch(() => {
        if (isMounted) setVideo(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-16">
          <div className="container-custom text-center">
            <h1 className="font-display text-3xl font-bold mb-4">Đang tải...</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-16">
          <div className="container-custom text-center">
            <h1 className="font-display text-3xl font-bold mb-4">Không tìm thấy video</h1>
            <Link to="/video">
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

  const youtubeId = getYoutubeId(video.youtubeUrl);

  const breadcrumbItems = [
    { label: "Video", href: "/video" },
    { label: video.title },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 bg-charcoal text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/90 to-black" />
          <div className="container-custom relative z-10">
            <Breadcrumbs items={breadcrumbItems} />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {video.title}
              </h1>
              {video.publishedAt && (
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(video.publishedAt)}</span>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Video Player */}
        {youtubeId && (
          <section className="py-12 bg-charcoal/5">
            <div className="container-custom max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl overflow-hidden shadow-2xl border border-border"
              >
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Description */}
        {(video.description || video.content) && (
          <section className="py-10">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-2xl font-bold mb-4">Mô tả</h2>
                {video.content ? (
                  <div
                    className="prose prose-lg max-w-none text-muted-foreground leading-relaxed [&_p]:mb-3 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-accent/80"
                    dangerouslySetInnerHTML={{ __html: video.content }}
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">{video.description}</p>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-12 border-t border-border">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-xl font-bold mb-2">Bạn muốn thi công công trình tương tự?</h3>
                <p className="text-muted-foreground">Liên hệ ngay để được tư vấn miễn phí</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:0927366678">
                  <Button variant="gold" size="lg">Hotline: 0927.366.678</Button>
                </a>
                <a href="https://zalo.me/0927366678" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat Zalo
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VideoDetail;
