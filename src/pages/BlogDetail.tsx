import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { postService } from "@/services/api";
import { ArrowLeft, Calendar } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => postService.getBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) return (
    <div className="min-h-screen"><Navigation />
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    </div>
  );

  if (isError || !post) return (
    <div className="min-h-screen"><Navigation />
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-5xl">📰</p>
        <p className="text-gray-400 text-lg">Không tìm thấy bài viết</p>
        <Link to="/tin-tuc" className="text-primary hover:underline">Về trang tin tức</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-28 pb-20">
        <div className="container-custom max-w-3xl">
          <Link to="/tin-tuc" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Về trang tin tức
          </Link>

          {post.thumbnail && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 rounded-3xl overflow-hidden shadow-xl aspect-video">
              <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Calendar className="w-4 h-4" />
              {format(new Date(post.publishedAt || post.createdAt), "dd/MM/yyyy", { locale: vi })}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>
            {post.excerpt && <p className="text-xl text-gray-500 mb-8 leading-relaxed border-l-4 border-primary pl-5 italic">{post.excerpt}</p>}
            {post.content && (
              <div
                className="prose prose-gray max-w-none text-gray-600 leading-relaxed ql-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
