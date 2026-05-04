import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { MapPin, CalendarDays, ArrowRight, Briefcase, DollarSign } from "lucide-react";
import { websiteRecruitmentService, type WebsiteRecruitment } from "@/services/api";
import heroImage from "@/assets/project-apartment.png";

const normalizeImageUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return url;
  return `/api/file/image/${url}`;
};

const formatDeadline = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const Recruitment = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [jobs, setJobs] = useState<WebsiteRecruitment[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    let isMounted = true;
    websiteRecruitmentService
      .getAllPublic({ pageSize: 0, sort: "sortOrder" })
      .then((res) => { if (isMounted) setJobs(res?.rows || []); })
      .catch(() => { if (isMounted) setJobs([]); })
      .finally(() => { if (isMounted) setLoading(false); });
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

  return (
    <div className="min-h-screen bg-background" ref={containerRef}>
      <Navigation />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img src={heroImage} alt="Tuyển dụng" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-charcoal/60" />
        </motion.div>
        <div className="container-custom relative z-10 text-center pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
          >
            Cơ Hội <span className="text-accent">Tuyển Dụng</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            Gia nhập Hoàng Ẩm Thực để cùng chúng tôi kiến tạo những không gian sống đẳng cấp và phát triển sự nghiệp của bạn.
          </motion.p>
        </div>
      </section>

      {/* Job List */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">VỊ TRÍ ĐANG MỞ</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Tham Gia Cùng Chúng Tôi
            </h2>
          </div>

          {/* Prev/Next buttons */}
          {!loading && jobs.length > 1 && (
            <div className="flex justify-end gap-2 mb-6">
              <button
                onClick={() => carouselApi?.scrollPrev()}
                disabled={!canScrollPrev}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={() => carouselApi?.scrollNext()}
                disabled={!canScrollNext}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card animate-pulse">
                  <div className="aspect-[16/9] bg-muted rounded-t-2xl" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              Hiện chưa có vị trí tuyển dụng nào.
            </div>
          ) : (
            <Carousel
              setApi={setCarouselApi}
              opts={{ align: "start", loop: false }}
              className="w-full"
            >
              <CarouselContent className="-ml-6">
                {jobs.map((job, index) => (
                  <CarouselItem key={job._id} className="pl-6 md:basis-1/2 lg:basis-1/3 flex">
                    <motion.div
                      className="flex w-full"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                    >
                      <div className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col w-full">
                        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                          {normalizeImageUrl(job.image) ? (
                            <img
                              src={normalizeImageUrl(job.image)}
                              alt={job.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted">
                              <Briefcase className="w-16 h-16 text-muted-foreground/30" />
                            </div>
                          )}
                          {job.type && (
                            <div className="absolute top-4 right-4 bg-background/90 backdrop-blur text-foreground px-3 py-1 rounded-full text-xs font-semibold">
                              {job.type}
                            </div>
                          )}
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-display text-xl font-bold text-foreground mb-3 line-clamp-2">
                            {job.title}
                          </h3>
                          {job.summary && (
                            <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1">
                              {job.summary}
                            </p>
                          )}
                          <div className="space-y-2 mb-6">
                            {typeof job.officeId === "object" && job.officeId?.officeName && (
                              <div className="flex items-center text-sm text-foreground/80">
                                <MapPin className="w-4 h-4 mr-2 text-accent flex-shrink-0" />{job.officeId.officeName}
                              </div>
                            )}
                            {job.salary && (
                              <div className="flex items-center text-sm text-foreground/80">
                                <DollarSign className="w-4 h-4 mr-2 text-accent flex-shrink-0" />{job.salary}
                              </div>
                            )}
                            {job.deadline && (
                              <div className="flex items-center text-sm text-foreground/80">
                                <CalendarDays className="w-4 h-4 mr-2 text-accent flex-shrink-0" />
                                Hạn nộp: {formatDeadline(job.deadline)}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-auto gap-4">
                            <Link to={`/tuyen-dung/${job.slug}`} className="flex-1">
                              <Button variant="outline" className="w-full">Chi Tiết</Button>
                            </Link>
                            <Link to={`/tuyen-dung/${job.slug}/ung-tuyen`} className="flex-1">
                              <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                                Ứng Tuyển <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Recruitment;
