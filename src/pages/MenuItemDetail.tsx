import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { menuItemService, menuItemService as mis, type Category } from "@/services/api";
import { ArrowLeft, Star, Tag, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MenuItemDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: item, isLoading, isError } = useQuery({
    queryKey: ["menu-item", slug],
    queryFn: () => menuItemService.getBySlug(slug!),
    enabled: !!slug,
  });

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
          {/* Back */}
          <Link to="/thuc-don" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Quay lại thực đơn
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="rounded-3xl overflow-hidden aspect-square bg-gray-100 shadow-xl">
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl">🍽️</div>
                )}
              </div>
              {item.images && item.images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {item.images.slice(0, 4).map((img, i) => (
                    <div key={i} className="w-16 h-16 rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-colors cursor-pointer">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info */}
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

              {item.description && <p className="text-gray-500 text-lg leading-relaxed mb-6">{item.description}</p>}

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-display text-4xl font-bold text-primary">{formatPrice(item.price)}</span>
                {item.salePrice && <span className="text-lg text-gray-400 line-through">{formatPrice(item.salePrice)}</span>}
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {item.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
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

              {/* Long description */}
              {item.longDescription && (
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="font-display font-semibold text-gray-900 mb-3">Mô tả chi tiết</h3>
                  <p className="text-gray-500 leading-relaxed whitespace-pre-wrap">{item.longDescription}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
