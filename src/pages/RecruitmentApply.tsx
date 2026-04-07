import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, UploadCloud, CheckCircle2, X, FileText } from "lucide-react";
import { websiteRecruitmentService, type WebsiteRecruitment } from "@/services/api";

const RecruitmentApply = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [job, setJob] = useState<WebsiteRecruitment | null>(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [cvUrl, setCvUrl] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) { setLoadingJob(false); return; }
    let isMounted = true;
    websiteRecruitmentService
      .getBySlug(slug)
      .then((res) => { if (isMounted) setJob(res); })
      .catch(() => { if (isMounted) setJob(null); })
      .finally(() => { if (isMounted) setLoadingJob(false); });
    return () => { isMounted = false; };
  }, [slug]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      toast({ title: "Định dạng không hỗ trợ", description: "Chỉ chấp nhận PDF, DOC, DOCX.", variant: "destructive" });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File quá lớn", description: "Kích thước tối đa là 10MB.", variant: "destructive" });
      return;
    }

    setCvFile(file);
    setUploadingCv(true);
    try {
      const result = await websiteRecruitmentService.uploadCv(file);
      setCvUrl(result.fileName);
      toast({ title: "Upload thành công", description: `File "${file.name}" đã được tải lên.` });
    } catch {
      setCvFile(null);
      setCvUrl("");
      toast({ title: "Upload thất bại", description: "Không thể tải file lên. Vui lòng thử lại.", variant: "destructive" });
    } finally {
      setUploadingCv(false);
    }
  };

  const handleRemoveFile = () => {
    setCvFile(null);
    setCvUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cvUrl) {
      toast({ title: "Thiếu CV", description: "Vui lòng đính kèm file CV trước khi gửi.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      await websiteRecruitmentService.apply({
        recruitmentId: job?._id,
        candidateName: fullName,
        email,
        phoneNumber: phone,
        cv: cvUrl,
        coverLetter,
      });
      setIsSuccess(true);
      toast({ title: "Ứng tuyển thành công!", description: "Bộ phận Nhân sự sẽ liên hệ với bạn sớm nhất." });
    } catch {
      toast({ title: "Gửi thất bại", description: "Có lỗi xảy ra. Vui lòng thử lại.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingJob) {
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
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">Nộp Hồ Sơ Thành Công!</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Cảm ơn bạn đã ứng tuyển vào vị trí <strong className="text-foreground">{job.title}</strong>. Bộ phận Nhân sự sẽ xem xét hồ sơ và liên hệ sớm nhất.
                </p>
                <Button onClick={() => navigate("/tuyen-dung")} variant="outline" size="lg">
                  Xem các vị trí khác
                </Button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mb-8 text-center pb-8 border-b border-border">
                  <h1 className="font-display text-3xl font-bold text-foreground mb-3">Ứng tuyển vị trí</h1>
                  <h2 className="text-xl text-accent font-semibold">{job.title}</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Họ và tên <span className="text-red-500">*</span></Label>
                      <Input
                        id="fullName" required placeholder="Nguyễn Văn A"
                        className="h-12" value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại <span className="text-red-500">*</span></Label>
                      <Input
                        id="phone" type="tel" required placeholder="09xx xxx xxx"
                        className="h-12" value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                    <Input
                      id="email" type="email" required placeholder="email@example.com"
                      className="h-12" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* CV Upload */}
                  <div className="space-y-2">
                    <Label>Hồ sơ đính kèm (CV) <span className="text-red-500">*</span></Label>
                    {cvFile ? (
                      <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-muted/40">
                        <FileText className="w-8 h-8 text-accent flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{cvFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {uploadingCv ? "Đang tải lên..." : cvUrl ? "Đã tải lên thành công ✓" : ""}
                          </p>
                        </div>
                        {!uploadingCv && (
                          <button type="button" onClick={handleRemoveFile} className="p-1 hover:text-destructive transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <div
                        className="flex justify-center rounded-xl border border-dashed border-border px-6 py-10 hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="text-center">
                          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-accent hover:text-accent/80">Chọn file</span>
                            {" "}hoặc kéo thả vào đây
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">PDF, DOC, DOCX — tối đa 10MB</p>
                        </div>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Thư xin việc / Giới thiệu bản thân (Tùy chọn)</Label>
                    <Textarea
                      id="coverLetter"
                      placeholder="Hãy cho chúng tôi biết lý do bạn là ứng cử viên phù hợp..."
                      className="min-h-[120px] resize-y"
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit" size="lg"
                    className="w-full h-14 text-lg bg-accent hover:bg-accent/90 text-white shadow-lg"
                    disabled={isSubmitting || uploadingCv}
                  >
                    {isSubmitting ? "Đang gửi hồ sơ..." : uploadingCv ? "Đang tải file..." : "Gửi Hồ Sơ Ứng Tuyển"}
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
