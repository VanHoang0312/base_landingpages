import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Anh Nguyễn Văn Minh",
    role: "Chủ nhà tại TP. Thanh Hóa",
    content:
      "Đại Hà Thanh đã giúp chúng tôi biến ước mơ về ngôi nhà lý tưởng thành hiện thực. Từ khâu tư vấn, thiết kế đến thi công đều rất chuyên nghiệp. Đặc biệt ấn tượng với sự tận tâm của đội ngũ.",
    rating: 5,
    project: "Villa 3 tầng",
  },
  {
    name: "Chị Trần Thị Hương",
    role: "Giám đốc doanh nghiệp",
    content:
      "Thiết kế nội thất văn phòng của chúng tôi vượt xa mong đợi. Không gian làm việc hiện đại, tối ưu công năng nhưng vẫn đảm bảo thẩm mỹ. Rất hài lòng với sự hợp tác này.",
    rating: 5,
    project: "Văn phòng 200m²",
  },
  {
    name: "Anh Lê Đức Thắng",
    role: "Doanh nhân",
    content:
      "Đã hợp tác với Đại Hà Thanh cho 2 dự án và đều rất hài lòng. Đội ngũ làm việc chuyên nghiệp, đúng tiến độ và đặc biệt là giá cả rất cạnh tranh so với chất lượng nhận được.",
    rating: 5,
    project: "Duplex sân vườn",
  },
  {
    name: "Chị Phạm Thanh Hà",
    role: "Chủ homestay",
    content:
      "Nhờ Đại Hà Thanh thiết kế và thi công, homestay của tôi luôn được khách hàng đánh giá cao về không gian và thẩm mỹ. Một khoản đầu tư xứng đáng!",
    rating: 5,
    project: "Homestay 5 phòng",
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="section-padding bg-background overflow-hidden">
      <div className="container-custom" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              Đánh Giá Từ Khách Hàng
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Khách Hàng Nói Gì
              <span className="block text-accent">Về Chúng Tôi?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sự hài lòng của khách hàng là thước đo thành công của chúng tôi.
              Mỗi dự án hoàn thành là một niềm tự hào và động lực để tiếp tục
              phát triển.
            </p>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border-2 border-border hover:border-accent hover:bg-accent hover:text-charcoal"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border-2 border-border hover:border-accent hover:bg-accent hover:text-charcoal"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
              <span className="text-sm text-muted-foreground ml-4">
                {currentIndex + 1} / {testimonials.length}
              </span>
            </div>
          </motion.div>

          {/* Right - Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />

            {/* Card */}
            <div className="relative bg-secondary rounded-3xl p-8 md:p-10 border border-border">
              {/* Quote Icon */}
              <div className="absolute -top-6 left-8 w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-charcoal" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 mt-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-accent fill-accent"
                  />
                ))}
              </div>

              {/* Content */}
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
                  "{testimonials[currentIndex].content}"
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Dự án</p>
                    <p className="text-sm font-medium text-accent">
                      {testimonials[currentIndex].project}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-accent"
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
