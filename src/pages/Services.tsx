import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
    Building,
    Palette,
    Home,
    Hammer,
    ArrowRight,
    CheckCircle2,
    Brush,
    DraftingCompass
} from "lucide-react";
import heroImage from "@/assets/project-apartment.png";

const servicesDetails = [
    {
        id: "thiet-ke-kien-truc",
        title: "Thiết Kế Kiến Trúc",
        icon: Building,
        shortDesc: "Kiến tạo không gian sống đẳng cấp, mang đậm dấu ấn cá nhân.",
        fullDesc: [
            "Chúng tôi tin rằng kiến trúc không chỉ là việc tạo ra những ngôi nhà, mà là nghệ thuật kiến tạo không gian sống. Mỗi bản vẽ thiết kế đều là kết quả của quá trình nghiên cứu kỹ lưỡng về thói quen, sở thích và phong cách sống của gia chủ.",
            "Với đội ngũ kiến trúc sư giàu kinh nghiệm, chúng tôi mang đến những giải pháp thiết kế tối ưu, kết hợp hài hòa giữa công năng sử dụng và giá trị thẩm mỹ, đảm bảo sự bền vững với thời gian."
        ],
        features: [
            "Thiết kế Biệt thự, Dinh thự cao cấp",
            "Thiết kế Nhà phố, Shophouse",
            "Thiết kế Khách sạn, Resort nghỉ dưỡng",
            "Quy hoạch cảnh quan sân vườn"
        ],
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80"
    },
    {
        id: "thiet-ke-noi-that",
        title: "Thiết Kế Nội Thất",
        icon: Palette,
        shortDesc: "Thổi hồn vào không gian sống với phong cách nội thất tinh tế.",
        fullDesc: [
            "Nội thất là linh hồn của ngôi nhà. Chúng tôi chú trọng đến việc lựa chọn vật liệu, màu sắc và ánh sáng để tạo nên những không gian sống đầy cảm xúc.",
            "Từ phong cách hiện đại, tối giản đến tân cổ điển sang trọng, mỗi dự án đều được chúng tôi chăm chút tỉ mỉ từng chi tiết, mang đến sự tiện nghi và thoải mái nhất cho người sử dụng."
        ],
        features: [
            "Thiết kế nội thất trọn gói",
            "Sản xuất & thi công đồ gỗ",
            "Tư vấn decor trang trí",
            "Giải pháp Chiếu sáng & Smarthome"
        ],
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=2032&q=80"
    },
    {
        id: "xay-dung-tron-goi",
        title: "Xây Dựng Trọn Gói",
        icon: Home,
        shortDesc: "Giải pháp chìa khóa trao tay, an tâm về chất lượng và tiến độ.",
        fullDesc: [
            "Dịch vụ xây nhà trọn gói của Hoàng Ẩm Thực giúp gia chủ tiết kiệm thời gian, công sức và chi phí. Chúng tôi cam kết sử dụng vật liệu chính hãng, thi công đúng kỹ thuật và đảm bảo an toàn lao động.",
            "Quy trình làm việc minh bạch, báo cáo tiến độ định kỳ giúp khách hàng dễ dàng giám sát mà không cần có mặt thường xuyên tại công trình."
        ],
        features: [
            "Thi công phần thô",
            "Thi công hoàn thiện",
            "Lắp đặt điện nước (M&E)",
            "Bảo hành kết cấu dài hạn"
        ],
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
        id: "cai-tao-sua-chua",
        title: "Cải Tạo & Sửa Chữa",
        icon: Hammer,
        shortDesc: "Lột xác không gian cũ kỹ trở nên hiện đại và tiện nghi hơn.",
        fullDesc: [
            "Cải tạo nhà cũ là giải pháp kinh tế để nâng cấp chất lượng sống mà không cần xây mới hoàn toàn. Chúng tôi khảo sát kỹ lưỡng hiện trạng để đưa ra phương án cải tạo tối ưu nhất.",
            "Dù là sửa chữa nhỏ hay cải tạo toàn bộ kết cấu, chúng tôi luôn đặt tiêu chí an toàn và thẩm mỹ lên hàng đầu, giúp ngôi nhà của bạn khoác lên mình diện mạo mới mẻ, ấn tượng."
        ],
        features: [
            "Cải tạo mặt tiền, cơi nới diện tích",
            "Sửa chữa chống thấm, sơn nước",
            "Nâng cấp nội thất cũ",
            "Phá dỡ & hoàn trả mặt bằng"
        ],
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2031&q=80"
    }
];

const Services = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div className="min-h-screen bg-background" ref={containerRef}>
            <Navigation />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={heroImage}
                        alt="Services Hero"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute  " />
                </motion.div>

                <div className="container-custom relative z-10 text-center pt-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
                    >
                        Dịch Vụ <span className="text-accent">Chuyên Nghiệp</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
                    >
                        Giải pháp toàn diện từ thiết kế đến thi công,
                        kiến tạo không gian sống hoàn hảo cho gia đình bạn.
                    </motion.p>
                </div>
            </section>

            {/* Services List */}
            <section className="py-20 md:py-32 space-y-20 md:space-y-32">
                {servicesDetails.map((service, index) => (
                    <div key={service.id} id={service.id} className="container-custom group">
                        <div className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${index % 2 !== 0 ? 'md:grid-flow-dense' : ''}`}>

                            {/* Image */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className={`relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}
                            >
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
                                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-background/90 backdrop-blur text-foreground px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3">
                                    <service.icon className="w-6 h-6 text-accent" />
                                    <span className="font-display font-bold text-lg">{service.title}</span>
                                </div>
                            </motion.div>

                            {/* Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className={index % 2 !== 0 ? 'md:col-start-1' : ''}
                            >
                                <span className="inline-block text-accent font-bold text-sm uppercase tracking-widest mb-4">
                                    0{index + 1} / Dịch Vụ
                                </span>
                                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                                    {service.title}
                                </h2>
                                <div className="space-y-4 mb-8">
                                    {service.fullDesc.map((desc, i) => (
                                        <p key={i} className="text-muted-foreground text-lg leading-relaxed">
                                            {desc}
                                        </p>
                                    ))}
                                </div>

                                <div className="border-t border-border pt-8 mb-8">
                                    <h4 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                                        <DraftingCompass className="w-5 h-5 text-accent" />
                                        Hạng mục thực hiện:
                                    </h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-foreground/80">
                                                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <a href="/#bao-gia">
                                    <Button variant="outline" size="lg" className="rounded-xl hover:bg-accent hover:text-white border-accent text-accent">
                                        Đăng Ký Tư Vấn
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </a>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </section>

            {/* CTA Bottom */}
            <section className="py-24 bg-accent text-charcoal relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

                <div className="container-custom relative z-10 text-center">
                    <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                        Bạn Đã Sẵn Sàng Kiến Tạo<br />Không Gian Sống Mới?
                    </h2>
                    <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
                        Hãy để Hoàng Ẩm Thực đồng hành cùng bạn hiện thực hóa ngôi nhà mơ ước.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="/#bao-gia">
                            <Button size="xl" className="bg-charcoal text-white hover:bg-charcoal/80 rounded-2xl w-full sm:w-auto">
                                Nhận Báo Giá Ngay
                            </Button>
                        </a>
                        <a href="tel:0927366678">
                            <Button size="xl" variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal/10 rounded-2xl w-full sm:w-auto">
                                Gọi Hotline: 0927.366.678
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Services;
