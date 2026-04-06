import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, UploadCloud, CheckCircle2 } from "lucide-react";
import { getRecruitmentBySlug } from "@/data/recruitment";

const RecruitmentApply = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const job = slug ? getRecruitmentBySlug(slug) : undefined;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 mt-20">
          <h1 className="text-4xl font-bold mb-4">Không tìm thấy bài tuyển dụng</h1>
          <p className="text-muted-foreground mb-8">Bài viết bạn đang ứng tuyển không tồn tại hoặc đã bị xóa.</p>
          <Button onClick={() => navigate("/tuyen-dung")}>Quay lại danh sách</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Ứng tuyển thành công!",
        description: "Hồ sơ của bạn đã được gửi. Chúng tôi sẽ liên hệ trong thời gian sớm nhất.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 pt-32 pb-20">
        <div className="container-custom max-w-3xl">
          <Link to={`/tuyen-dung/${job.slug}`} className="inline-flex items-center text-muted-foreground hover:text-accent mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại chi tiết công việc
          </Link>

          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Nộp Hồ Sơ Thành Công!
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Cảm ơn bạn đã quan tâm và ứng tuyển vào vị trí <strong className="text-foreground">{job.title}</strong>. Bộ phận Nhân sự sẽ xem xét hồ sơ và liên hệ với bạn trong thời gian sớm nhất.
                </p>
                <Button onClick={() => navigate("/tuyen-dung")} variant="outline" size="lg">
                  Xem các vị trí khác
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="mb-8 text-center pb-8 border-b border-border">
                  <h1 className="font-display text-3xl font-bold text-foreground mb-3">Ứng tuyển vị trí</h1>
                  <h2 className="text-xl text-accent font-semibold">{job.title}</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Họ và tên <span className="text-red-500">*</span></Label>
                      <Input id="fullName" required placeholder="Nguyễn Văn A" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại <span className="text-red-500">*</span></Label>
                      <Input id="phone" type="tel" required placeholder="09xx xxx xxx" className="h-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                    <Input id="email" type="email" required placeholder="email@example.com" className="h-12" />
                  </div>

                  <div className="space-y-2">
                    <Label>Hồ sơ đính kèm (CV) <span className="text-red-500">*</span></Label>
                    <div className="mt-2 flex justify-center rounded-xl border border-dashed border-border px-6 py-10 hover:bg-muted/50 transition-colors relative">
                      <div className="text-center">
                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <div className="mt-4 flex text-sm leading-6 text-muted-foreground justify-center">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-semibold text-accent focus-within:outline-none focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 hover:text-accent/80"
                          >
                            <span>Cập nhật file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" required onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                          </label>
                          <p className="pl-1">hoặc kéo thả vào đây</p>
                        </div>
                        <p className="text-xs leading-5 text-muted-foreground mt-2">
                          {fileName ? (
                            <span className="font-medium text-foreground">File đã chọn: {fileName}</span>
                          ) : "Hỗ trợ định dạng PDF, DOC, DOCX lên đến 10MB"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Thư xin việc / Giới thiệu bản thân (Tùy chọn)</Label>
                    <Textarea
                      id="message"
                      placeholder="Hãy cho chúng tôi biết lý do vì sao bạn là ứng cử viên phù hợp..."
                      className="min-h-[120px] resize-y"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full h-14 text-lg bg-accent hover:bg-accent/90 text-white shadow-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Đang gửi hồ sơ..." : "Gửi Hồ Sơ Ứng Tuyển"}
                  </Button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RecruitmentApply;
