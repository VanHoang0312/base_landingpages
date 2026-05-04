import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { categoryService, menuItemService, type MenuItem, type Category } from "@/services/api";
import { Link } from "react-router-dom";
import { Search, Star, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

function DishCard({ item }: { item: MenuItem }) {
  const cat = typeof item.categoryId === "object" ? (item.categoryId as Category) : null;
  const formatPrice = (n: number) => n.toLocaleString("vi-VN") + "đ";

  return (
    <Link to={`/thuc-don/${item.slug}`} className="food-card group block">
      <div className="relative aspect-[4/3] overflow-hidden">
        {item.thumbnail ? (
          <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-50 flex items-center justify-center text-5xl">🍽️</div>
        )}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {item.newArrival && <span className="badge-new">MỚI</span>}
          {item.isFeatured && <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Star className="w-3 h-3 fill-white" />Hot</span>}
        </div>
        {cat && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 px-2 py-0.5 rounded-full">{cat.icon} {cat.name}</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
        {item.description && <p className="text-sm text-gray-400 line-clamp-2 mb-3">{item.description}</p>}
        <div className="flex items-center justify-between">
          <div>
            <span className="price-tag text-lg">{formatPrice(item.price)}</span>
            {item.salePrice && <span className="text-xs text-gray-400 line-through ml-2">{formatPrice(item.salePrice)}</span>}
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
}

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const activeCat = searchParams.get("cat") || "";

  const { data: categoriesData } = useQuery({ queryKey: ["categories"], queryFn: categoryService.getAll, staleTime: 10 * 60 * 1000 });

  const activeCatObj = categoriesData?.rows.find((c) => c.slug === activeCat);

  const { data, isLoading } = useQuery({
    queryKey: ["menu-items", activeCat, search],
    queryFn: () => menuItemService.getAll({
      categoryId: activeCatObj?._id,
      search: search || undefined,
      pageSize: 0,
    }),
    enabled: !activeCat || !!activeCatObj,
  });

  useEffect(() => { window.scrollTo(0, 0); }, [activeCat]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 via-red-950/60 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1400&q=60')] bg-cover bg-center" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Thực Đơn
          </motion.h1>
          <p className="text-white/60 max-w-lg mx-auto mb-8">Khám phá hơn 200 món ăn đặc sắc được chế biến từ nguyên liệu tươi ngon nhất</p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm món ăn..."
              className="pl-11 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-2xl focus:bg-white/20"
            />
          </div>
        </div>
      </section>

      {/* Categories filter */}
      <div className="sticky top-[72px] z-30 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container-custom overflow-x-auto">
          <div className="flex items-center gap-2 py-3 min-w-max">
            <button
              onClick={() => setSearchParams({})}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${!activeCat ? "brand-gradient text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              🍽️ Tất cả
            </button>
            {categoriesData?.rows.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSearchParams({ cat: cat.slug })}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCat === cat.slug ? "brand-gradient text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dishes grid */}
      <section className="section-padding">
        <div className="container-custom">
          {activeCatObj && (
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-gray-900">
                {activeCatObj.icon} {activeCatObj.name}
              </h2>
              {activeCatObj.description && <p className="text-gray-500 mt-1">{activeCatObj.description}</p>}
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse">
                  <div className="aspect-[4/3] bg-gray-100" />
                  <div className="p-4 space-y-2"><div className="h-5 bg-gray-100 rounded w-3/4" /><div className="h-4 bg-gray-100 rounded w-1/2" /></div>
                </div>
              ))}
            </div>
          ) : data?.rows.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.rows.map((item, i) => (
                <motion.div key={item._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <DishCard item={item} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-gray-400 text-lg">Không tìm thấy món ăn nào</p>
              <button onClick={() => { setSearch(""); setSearchParams({}); }} className="mt-4 text-primary hover:underline text-sm">
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
