import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, CalendarDays, ArrowLeft, ArrowRight, DollarSign } from "lucide-react";
import { websiteRecruitmentService, type WebsiteRecruitment } from "@/services/api";

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

const RecruitmentDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<WebsiteRecruitment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) { setLoading(false); return; }
    let isMounted = true;
    websiteRecruitmentService
      .getBySlug(slug)
      .then((res) => { if (isMounted) setJob(res); })
      .catch(() => { if (isMounted) setJob(null); })
      .finally(() => { if (isMounted) setLoading(false); });
    return () => { isMounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center mt-20">
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 mt-20">
          <h1 className="text-4xl font-bold mb-4">Không tìm thấy bài tuyển dụng</h1>
          <p className="text-muted-foreground mb-8">Tin tuyển dụng không tồn tại hoặc đã hết hạn.</p>
          <Button onClick={() => navigate("/tuyen-dung")}>Quay lại danh sách</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const imageUrl = normalizeImageUrl(job.image);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <Link to="/tuyen-dung" className="inline-flex items-center text-muted-foreground hover:text-accent mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Trở về danh sách tuyển dụng
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-3 text-sm">
                {typeof job.officeId === "object" && job.officeId?.officeName && (
                  <span className="flex items-center bg-accent/10 text-accent px-3 py-1 rounded-full">
                    <MapPin className="w-4 h-4 mr-2" />{job.officeId.officeName}
                  </span>
                )}
                {typeof job.officeId === "object" && job.officeId?.officeAddress && (
                  <span className="flex items-center bg-accent/10 text-accent px-3 py-1 rounded-full text-xs">
                    <MapPin className="w-3 h-3 mr-1" />{job.officeId.officeAddress}
                  </span>
                )}
                {job.type && (
                  <span className="flex items-center bg-accent/10 text-accent px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 mr-2" />{job.type}
                  </span>
                )}
                {job.salary && (
                  <span className="flex items-center bg-accent/10 text-accent px-3 py-1 rounded-full">
                    <DollarSign className="w-4 h-4 mr-2" />{job.salary}
                  </span>
                )}
                {job.deadline && (
                  <span className="flex items-center bg-accent/10 text-accent px-3 py-1 rounded-full">
                    <CalendarDays className="w-4 h-4 mr-2" />Hạn nộp: {formatDeadline(job.deadline)}
                  </span>
                )}
              </div>
            </div>

            {imageUrl && (
              <div className="rounded-2xl overflow-hidden mb-10 shadow-lg max-h-[400px]">
                <img src={imageUrl} alt={job.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="space-y-8">
              {job.description && (
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">Mô tả công việc</h3>
                  <div
                    className="prose prose-lg max-w-none text-muted-foreground leading-relaxed [&_p]:mb-3 [&_a]:text-accent [&_a]:underline"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                </div>
              )}

              {Array.isArray(job.requirements) && job.requirements.length > 0 && (
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">Yêu cầu ứng viên</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                  </ul>
                </div>
              )}

              {Array.isArray(job.benefits) && job.benefits.length > 0 && (
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">Quyền lợi</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    {job.benefits.map((ben, i) => <li key={i}>{ben}</li>)}
                  </ul>
                </div>
              )}

              <div className="bg-muted/50 p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-border">
                <div>
                  <h4 className="font-display font-bold text-xl mb-2">Bạn đã sẵn sàng ứng tuyển?</h4>
                  <p className="text-muted-foreground">Hãy gửi CV để trở thành một phần của Đại Hà Thanh.</p>
                </div>
                <Link to={`/tuyen-dung/${job.slug}/ung-tuyen`} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-white text-lg px-8">
                    Nộp Hồ Sơ Ngay
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RecruitmentDetail;
