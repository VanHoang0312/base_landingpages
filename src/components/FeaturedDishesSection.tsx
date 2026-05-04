import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { menuItemService, type MenuItem, type Category } from "@/services/api";

function DishCard({ item, index }: { item: MenuItem; index: number }) {
  const cat = typeof item.categoryId === "object" ? (item.categoryId as Category) : null;
  const formatPrice = (n: number) => n.toLocaleString("vi-VN") + "đ";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/thuc-don/${item.slug}`} className="food-card block group">
        <div className="relative aspect-[4/3] overflow-hidden">
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-50 flex items-center justify-center text-5xl">
              🍽️
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            {item.newArrival && <span className="badge-new">MỚI</span>}
            {item.isFeatured && (
              <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" /> Nổi bật
              </span>
            )}
            {item.salePrice && (
              <span className="badge-sale">SALE</span>
            )}
          </div>

          {/* Category pill */}
          {cat && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 px-2.5 py-1 rounded-full">
              {cat.icon} {cat.name}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-display font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {item.name}
          </h3>
          {item.description && (
            <p className="text-sm text-gray-400 line-clamp-2 mb-3">{item.description}</p>
          )}
          <div className="flex items-center justify-between">
            <div>
              <span className="price-tag text-lg">{formatPrice(item.price)}</span>
              {item.salePrice && (
                <span className="text-xs text-gray-400 line-through ml-2">{formatPrice(item.salePrice)}</span>
              )}
            </div>
            <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export const FeaturedDishesSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-dishes"],
    queryFn: () => menuItemService.getAll({ featured: true, pageSize: 6 }),
    staleTime: 5 * 60 * 1000,
  });

  if (!isLoading && !data?.rows.length) return null;

  return (
    <section className="section-padding bg-warm-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
            🔥 Được yêu thích nhất
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Món Ăn Đặc Sắc
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Những món ăn được khách hàng yêu thích nhất, chế biến từ nguyên liệu tươi ngon mỗi ngày
          </p>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse">
                <div className="aspect-[4/3] bg-gray-100" />
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-gray-100 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.rows.map((item, i) => (
              <DishCard key={item._id} item={item} index={i} />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/thuc-don">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8">
              Xem toàn bộ thực đơn
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
