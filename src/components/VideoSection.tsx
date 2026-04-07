import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
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

const VideoCard = ({ video }: { video: WebsiteVideo }) => {
  const thumb = getThumbnail(video);
  return (
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
  );
};

export const VideoSection = () => {
  const ref = useRef(null);
  const [videos, setVideos] = useState<WebsiteVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    let isMounted = true;
    websiteVideoService
      .getAllPublic({ page: 1, pageSize: 6, sort: "-publishedAt" })
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
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    update();
    carouselApi.on("select", update);
    carouselApi.on("reInit", update);
  }, [carouselApi]);

  if (loading || videos.length === 0) return null;

  const useCarousel = !loading && videos.length > 3;

  return (
    <section id="video" className="pt-12 pb-8 md:pt-16 md:pb-10 bg-background">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
        >
          <div>
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              Video
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Khám Phá
              <span className="block text-accent">Công Trình Qua Video</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {useCarousel && (
              <div className="flex gap-2">
                <button
                  onClick={() => carouselApi?.scrollPrev()}
                  disabled={!canScrollPrev}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => carouselApi?.scrollNext()}
                  disabled={!canScrollNext}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
            <Link to="/video">
              <Button variant="gold" size="lg">
                Xem Tất Cả
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-border bg-card animate-pulse">
                <div className="aspect-[4/3] bg-muted" />
                <div className="p-5 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid: ≤ 3 videos */}
        {!loading && !useCarousel && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {videos.map((video, index) => (
              <motion.div
                key={video._id}
                className="flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <VideoCard video={video} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Carousel: > 3 videos */}
        {!loading && useCarousel && (
          <Carousel
            setApi={setCarouselApi}
            opts={{ align: "start", loop: false }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 items-stretch">
              {videos.map((video, index) => (
                <CarouselItem key={video._id} className="pl-4 sm:basis-1/2 lg:basis-1/3 flex">
                  <motion.div
                    className="flex w-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <VideoCard video={video} />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </section>
  );
};
