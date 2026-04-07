import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { websiteVideoService, type WebsiteVideo } from "@/services/api";

const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match?.[1] || null;
};

const getThumbnail = (video: WebsiteVideo) => {
  if (video.thumbnail) return video.thumbnail;
  const id = getYoutubeId(video.youtubeUrl);
  if (id) return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  return "";
};

const breadcrumbItems = [{ label: "Video" }];

const VideoArchive = () => {
  const [videos, setVideos] = useState<WebsiteVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    websiteVideoService
      .getAllPublic({ pageSize: 0, sort: "-publishedAt" })
      .then((res) => {
        if (!isMounted) return;
        setVideos(res?.rows || []);
      })
      .catch(() => {
        if (isMounted) setVideos([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 bg-charcoal text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/90 to-black" />
          <div className="container-custom relative z-10">
            <Breadcrumbs items={breadcrumbItems} />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
                Video
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Thư Viện Video
              </h1>
              <p className="text-white/70 text-lg max-w-2xl">
                Khám phá các công trình kiến trúc và nội thất qua góc nhìn chân thực nhất
              </p>
            </motion.div>
          </div>
        </section>

        {/* Video Grid */}
        <section className="py-16">
          <div className="container-custom">
            {loading ? (
              <div className="text-center py-16 text-muted-foreground">Đang tải...</div>
            ) : videos.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">Chưa có video nào.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {videos.map((video, index) => {
                  const thumb = getThumbnail(video);
                  return (
                    <motion.div
                      key={video._id}
                      className="flex"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                    >
                      <Link
                        to={`/video/${video.slug}`}
                        className="group flex flex-col w-full rounded-xl overflow-hidden border border-border hover:border-accent/60 transition-colors bg-card"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                          {thumb ? (
                            <img
                              src={thumb}
                              alt={video.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted">
                              <PlayCircle className="w-12 h-12 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg">
                              <PlayCircle className="w-8 h-8 text-charcoal" />
                            </div>
                          </div>
                        </div>
                        <div className="p-5 flex-1">
                          <h3 className="font-display font-semibold text-base leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                            {video.title}
                          </h3>
                          {video.content && (
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {video.content.replace(/<[^>]+>/g, "")}
                            </p>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VideoArchive;
