import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { postService, type Post } from "@/services/api";
import { ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}>
      <Link to={`/tin-tuc/${post.slug}`} className="food-card block group h-full">
        <div className="aspect-video overflow-hidden">
          {post.thumbnail ? (
            <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-5xl">📰</div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <Calendar className="w-3.5 h-3.5" />
            {format(new Date(post.publishedAt || post.createdAt), "dd/MM/yyyy", { locale: vi })}
          </div>
          <h3 className="font-display font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
          {post.excerpt && <p className="text-sm text-gray-400 line-clamp-3">{post.excerpt}</p>}
          <div className="flex items-center gap-1 text-primary text-sm font-medium mt-4">
            Đọc tiếp <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  const { data, isLoading } = useQuery({ queryKey: ["posts"], queryFn: () => postService.getAll({ pageSize: 0 }) });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 via-red-950/60 to-gray-900 overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Tin Tức & Ẩm Thực
          </motion.h1>
          <p className="text-white/60 max-w-lg mx-auto">Khám phá các bài viết về văn hóa ẩm thực, công thức nấu ăn và tin tức từ nhà hàng</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse">
                  <div className="aspect-video bg-gray-100" />
                  <div className="p-5 space-y-2"><div className="h-5 bg-gray-100 rounded w-3/4" /><div className="h-4 bg-gray-100 rounded w-full" /></div>
                </div>
              ))}
            </div>
          ) : data?.rows.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.rows.map((post, i) => <PostCard key={post._id} post={post} index={i} />)}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-5xl mb-4">📰</p>
              <p className="text-gray-400 text-lg">Chưa có bài viết nào</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
