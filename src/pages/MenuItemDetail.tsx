import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { menuItemService, type Category } from "@/services/api";
import { ArrowLeft, Star, Tag, Phone, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MenuItemDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: item, isLoading, isError } = useQuery({
    queryKey: ["menu-item", slug],
    queryFn: () => menuItemService.getBySlug(slug!),
    enabled: !!slug,
  });

  const allImages = item
    ? [item.thumbnail, ...(item.images ?? [])].filter((u): u is string => !!u)
    : [];

  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => { setActiveIdx(0); }, [item?._id]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIdx((i) => (i - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIdx((i) => (i + 1) % allImages.length);
  }, [allImages.length]);

  const goTo = (idx: number) => {
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  };

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next]);

  const cat = item ? (typeof item.categoryId === "object" ? (item.categoryId as Category) : null) : null;
  const formatPrice = (n: number) => n.toLocaleString("vi-VN") + "đ";

  if (isLoading) return (
    <div className="min-h-screen">
      <Navigation />
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    </div>
  );

  if (isError || !item) return (
    <div className="min-h-screen">
      <Navigation />
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-5xl">🍽️</p>
        <p className="text-gray-400 text-lg">Không tìm thấy món ăn</p>
        <Link to="/thuc-don"><Button variant="outline">Xem thực đơn</Button></Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-28 pb-20">
        <div className="container-custom max-w-5xl">
          <Link to="/thuc-don" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Quay lại thực đơn
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* ── Gallery column ── */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>

              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-gray-100 shadow-xl group">
                {allImages.length > 0 ? (
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.img
                      key={activeIdx}
                      src={allImages[activeIdx]}
                      alt={item.name}
                      custom={direction}
                      variants={{
                        enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
                        center: { x: 0, opacity: 1 },
                        exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="w-full h-full object-cover cursor-zoom-in absolute inset-0"
                      onClick={() => setLightbox(true)}
                    />
                  </AnimatePresence>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl">🍽️</div>
                )}

                {/* Zoom hint */}
                {allImages.length > 0 && (
                  <button
                    onClick={() => setLightbox(true)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                )}

                {/* Prev / Next arrows — only when multiple images */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    {/* Dot indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {allImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goTo(i)}
                          className={`rounded-full transition-all ${i === activeIdx ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {allImages.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto py-2 px-1 scrollbar-hide">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        i === activeIdx
                          ? "border-primary shadow-md scale-105"
                          : "border-transparent opacity-60 hover:opacity-90 hover:border-gray-300"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Image count label */}
              {allImages.length > 1 && (
                <p className="text-xs text-gray-400 text-center mt-2">
                  {activeIdx + 1} / {allImages.length} ảnh
                </p>
              )}
            </motion.div>

            {/* ── Info column ── */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="flex flex-wrap gap-2 mb-4">
                {cat && (
                  <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                    {cat.icon} {cat.name}
                  </span>
                )}
                {item.newArrival && <span className="badge-new">MỚI</span>}
                {item.isFeatured && (
                  <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Nổi bật
                  </span>
                )}
                {!item.isAvailable && (
                  <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full">Tạm hết</span>
                )}
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">{item.name}</h1>

              {item.description && (
                <div className="text-gray-500 text-lg leading-relaxed mb-6 ql-content" dangerouslySetInnerHTML={{ __html: item.description }} />
              )}

              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-display text-4xl font-bold text-primary">{formatPrice(item.price)}</span>
                {item.salePrice && (
                  <span className="text-lg text-gray-400 line-through">{formatPrice(item.salePrice)}</span>
                )}
              </div>

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {item.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:0909123456" className="flex-1">
                  <Button className="w-full brand-gradient text-white py-6 text-base">
                    <Phone className="w-5 h-5 mr-2" />
                    Đặt ngay
                  </Button>
                </a>
                <Link to="/lien-he" className="flex-1">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white py-6 text-base">
                    Đặt bàn
                  </Button>
                </Link>
              </div>

              {item.longDescription && (
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="font-display font-semibold text-gray-900 mb-3">Mô tả chi tiết</h3>
                  <div className="text-gray-500 leading-relaxed ql-content break-words" dangerouslySetInnerHTML={{ __html: item.longDescription }} />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(false)}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={() => setLightbox(false)}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            {allImages.length > 1 && (
              <span className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm z-10">
                {activeIdx + 1} / {allImages.length}
              </span>
            )}

            {/* Prev */}
            {allImages.length > 1 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Main image */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={activeIdx}
                src={allImages[activeIdx]}
                alt=""
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="max-h-[80vh] max-w-[80vw] object-contain rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Next */}
            {allImages.length > 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                {allImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    onClick={() => goTo(i)}
                    className={`w-14 h-14 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                      i === activeIdx ? "border-white scale-110" : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
