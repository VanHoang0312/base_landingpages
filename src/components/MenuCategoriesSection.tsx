import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/api";

export const MenuCategoriesSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAll,
    staleTime: 10 * 60 * 1000,
  });

  if (!isLoading && !data?.rows.length) return null;

  const colors = [
    "from-red-50 to-red-100 border-red-100 hover:border-primary",
    "from-orange-50 to-orange-100 border-orange-100 hover:border-accent",
    "from-amber-50 to-amber-100 border-amber-100 hover:border-yellow-400",
    "from-emerald-50 to-emerald-100 border-emerald-100 hover:border-emerald-400",
    "from-sky-50 to-sky-100 border-sky-100 hover:border-sky-400",
    "from-purple-50 to-purple-100 border-purple-100 hover:border-purple-400",
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
            📋 Danh mục thực đơn
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Khám Phá Thực Đơn
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Đa dạng món ăn từ khai vị đến tráng miệng, phù hợp mọi khẩu vị và dịp đặc biệt
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl h-36 bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {data?.rows.map((cat, i) => (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={`/thuc-don?cat=${cat.slug}`}
                  className={`group flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br border text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${colors[i % colors.length]}`}
                >
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                    {cat.icon || "🍽️"}
                  </span>
                  <span className="font-display font-semibold text-sm text-gray-800 leading-tight">
                    {cat.name}
                  </span>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Xem thêm <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
