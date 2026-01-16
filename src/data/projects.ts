import projectDuplex from "@/assets/project-kitchen.png";
import projectVilla from "@/assets/project-villa.png";
import projectApartment from "@/assets/project-apartment.png";
import projectOffice from "@/assets/project-office.png";
import projectPenthouse from "@/assets/project-penthouse.png";
import projectResort from "@/assets/project-resort.png";
import projectBungalow from "@/assets/project-resort.png"; // Reusing resort for bungalow since quota met
import heroInterior from "@/assets/project-apartment.png";

export type ProjectCategory =
  | "da-thi-cong"
  | "thiet-ke"
  | "noi-that"
  | "xay-moi"
  | "sua-nha";

export interface Project {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ProjectCategory;
  categoryLabel: string;
  image: string;
  date: string;
  dateDisplay: string;
  specs: {
    area: string;
    cost: string;
    rooms: string;
    location: string;
  };
  features: string[];
  description: string;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  "da-thi-cong": "Đã thi công",
  "thiet-ke": "Thiết kế",
  "noi-that": "Nội thất",
  "xay-moi": "Xây mới",
  "sua-nha": "Sửa nhà",
};

export const projects: Project[] = [
  {
    id: "1",
    slug: "duplex-san-vuon-sang-trong",
    title: "Kiến tạo Duplex sân vườn sang trọng",
    excerpt: "Không gian sống hoàn hảo với thiết kế mái lệch độc bản, tối ưu ánh sáng tự nhiên và hòa quyện với sân vườn xanh mát.",
    category: "da-thi-cong",
    categoryLabel: "Đã thi công",
    image: projectDuplex,
    date: "2024-10-15",
    dateDisplay: "15 Th10",
    specs: {
      area: "750m²",
      cost: "13.5 Tỷ",
      rooms: "1 Phòng khách, 1 Bếp, 4 Phòng ngủ",
      location: "TP. Thanh Hóa",
    },
    features: ["Mái lệch độc bản", "Tối ưu ánh sáng", "Hòa quyện sân vườn", "Smart home"],
    description: "Công trình Duplex sân vườn sang trọng được thiết kế với phong cách kiến trúc hiện đại, kết hợp hài hòa giữa không gian sống và thiên nhiên. Mái lệch độc bản tạo nên điểm nhấn đặc biệt, đồng thời tối ưu hóa ánh sáng tự nhiên cho toàn bộ không gian. Sân vườn được bố trí khéo léo, tạo nên một ốc đảo xanh giữa lòng thành phố.",
  },
  {
    id: "2",
    slug: "nha-pho-3-the-he",
    title: "Nhà phố 3 thế hệ",
    excerpt: "Thiết kế tối ưu cho gia đình đa thế hệ với không gian riêng tư và khu vực sinh hoạt chung hài hòa.",
    category: "da-thi-cong",
    categoryLabel: "Đã thi công",
    image: projectApartment,
    date: "2024-09-20",
    dateDisplay: "20 Th09",
    specs: {
      area: "320m²",
      cost: "4.8 Tỷ",
      rooms: "2 Phòng khách, 2 Bếp, 6 Phòng ngủ",
      location: "TP. Thanh Hóa",
    },
    features: ["Thiết kế đa thế hệ", "Không gian riêng tư", "Tiết kiệm năng lượng", "Thông thoáng"],
    description: "Ngôi nhà được thiết kế đặc biệt cho gia đình 3 thế hệ, với sự phân chia không gian hợp lý giữa các thế hệ. Mỗi tầng đều có khu vực sinh hoạt riêng nhưng vẫn kết nối với nhau qua các không gian chung như phòng khách lớn và sân thượng.",
  },
  {
    id: "3",
    slug: "villa-sang-trong",
    title: "Villa sang trọng",
    excerpt: "Biệt thự cao cấp với thiết kế tân cổ điển, hồ bơi riêng và khu vườn cảnh quan.",
    category: "thiet-ke",
    categoryLabel: "Thiết kế",
    image: projectVilla,
    date: "2024-08-10",
    dateDisplay: "10 Th08",
    specs: {
      area: "1200m²",
      cost: "25 Tỷ",
      rooms: "2 Phòng khách, 2 Bếp, 5 Phòng ngủ, Hồ bơi",
      location: "Sầm Sơn",
    },
    features: ["Tân cổ điển", "Hồ bơi riêng", "Khu vườn cảnh quan", "Garage 3 xe"],
    description: "Villa được thiết kế theo phong cách tân cổ điển sang trọng, với hồ bơi riêng và khu vườn cảnh quan rộng rãi. Nội thất được lựa chọn kỹ lưỡng với các vật liệu cao cấp nhập khẩu.",
  },
  {
    id: "4",
    slug: "van-phong-hien-dai",
    title: "Văn phòng hiện đại",
    excerpt: "Không gian làm việc sáng tạo với thiết kế mở, tối ưu hóa hiệu suất làm việc.",
    category: "noi-that",
    categoryLabel: "Nội thất",
    image: projectOffice,
    date: "2024-07-25",
    dateDisplay: "25 Th07",
    specs: {
      area: "500m²",
      cost: "3.2 Tỷ",
      rooms: "Open space, 5 Phòng họp, Pantry",
      location: "TP. Thanh Hóa",
    },
    features: ["Thiết kế mở", "Ergonomic", "Green office", "Smart lighting"],
    description: "Văn phòng được thiết kế theo xu hướng hiện đại với không gian mở, tạo điều kiện cho sự sáng tạo và giao tiếp giữa các thành viên. Hệ thống chiếu sáng thông minh và cây xanh được tích hợp khắp không gian.",
  },
  {
    id: "5",
    slug: "penthouse-view-song",
    title: "Penthouse view sông",
    excerpt: "Căn hộ áp mái với tầm nhìn panorama ra dòng sông Mã thơ mộng.",
    category: "noi-that",
    categoryLabel: "Nội thất",
    image: projectPenthouse,
    date: "2024-06-15",
    dateDisplay: "15 Th06",
    specs: {
      area: "280m²",
      cost: "8.5 Tỷ",
      rooms: "1 Phòng khách, 1 Bếp, 3 Phòng ngủ, Sky bar",
      location: "TP. Thanh Hóa",
    },
    features: ["View sông", "Sky bar", "Minimalist", "Premium materials"],
    description: "Penthouse tọa lạc tại vị trí đắc địa với tầm nhìn panorama ra sông Mã. Thiết kế theo phong cách minimalist với các vật liệu cao cấp, tạo nên không gian sống đẳng cấp.",
  },
  {
    id: "6",
    slug: "nha-cap-4-hien-dai",
    title: "Nhà cấp 4 hiện đại",
    excerpt: "Nhà cấp 4 được nâng cấp với thiết kế hiện đại, tiết kiệm chi phí nhưng vẫn đảm bảo thẩm mỹ.",
    category: "xay-moi",
    categoryLabel: "Xây mới",
    image: heroInterior,
    date: "2024-05-20",
    dateDisplay: "20 Th05",
    specs: {
      area: "150m²",
      cost: "1.8 Tỷ",
      rooms: "1 Phòng khách, 1 Bếp, 3 Phòng ngủ",
      location: "Hoằng Hóa",
    },
    features: ["Chi phí tối ưu", "Hiện đại", "Thông thoáng", "Sân vườn nhỏ"],
    description: "Mẫu nhà cấp 4 hiện đại với thiết kế tối ưu chi phí xây dựng nhưng vẫn đảm bảo tính thẩm mỹ và công năng sử dụng. Phù hợp với các gia đình trẻ hoặc người cao tuổi.",
  },
  {
    id: "7",
    slug: "cai-tao-nha-pho-cu",
    title: "Cải tạo nhà phố cũ",
    excerpt: "Biến ngôi nhà phố cũ kỹ thành không gian sống hiện đại, thoáng đãng.",
    category: "sua-nha",
    categoryLabel: "Sửa nhà",
    image: projectApartment,
    date: "2024-04-10",
    dateDisplay: "10 Th04",
    specs: {
      area: "120m²",
      cost: "950 Triệu",
      rooms: "1 Phòng khách, 1 Bếp, 2 Phòng ngủ",
      location: "TP. Thanh Hóa",
    },
    features: ["Cải tạo toàn diện", "Mở rộng không gian", "Ánh sáng tự nhiên", "Tiết kiệm"],
    description: "Dự án cải tạo nhà phố cũ với diện tích hạn chế thành không gian sống hiện đại, thoáng đãng. Các giải pháp thông minh được áp dụng để tối ưu hóa diện tích sử dụng.",
  },
  {
    id: "8",
    slug: "bungalow-nghi-duong",
    title: "Bungalow",
    excerpt: "Thiết kế Bungalow nghỉ dưỡng hài hòa với thiên nhiên.",
    category: "da-thi-cong",
    categoryLabel: "Đã thi công",
    image: projectBungalow,
    date: "2024-03-05",
    dateDisplay: "05 Th03",
    specs: {
      area: "85m²",
      cost: "1.2 Tỷ",
      rooms: "1 Phòng khách, 1 Phòng ngủ",
      location: "Thanh Hóa",
    },
    features: ["Hòa quyện thiên nhiên", "Vật liệu tự nhiên", "Không gian mở"],
    description: "Mẫu Bungalow được thiết kế tối giản, sử dụng các vật liệu tự nhiên như gỗ, đá, tạo cảm giác gần gũi và thư giãn tuyệt đối cho người ở.",
  },
  {
    id: "9",
    slug: "resort-sang-trong",
    title: "Resort Sang Trọng",
    excerpt: "Khu nghỉ dưỡng cao cấp với tiêu chuẩn 5 sao.",
    category: "da-thi-cong",
    categoryLabel: "Đã thi công",
    image: projectResort,
    date: "2024-02-15",
    dateDisplay: "15 Th02",
    specs: {
      area: "5000m²",
      cost: "120 Tỷ",
      rooms: "50 Villa, 2 Nhà hàng, Spa",
      location: "Sầm Sơn",
    },
    features: ["Tiêu chuẩn 5 sao", "Hệ sinh thái xanh", "Giải trí cao cấp"],
    description: "Dự án Resort nghỉ dưỡng cao cấp tại Sầm Sơn, mang đến trải nghiệm nghỉ dưỡng đẳng cấp với đầy đủ tiện ích hiện đại và không gian xanh mát.",
  },
];

export const getProjectsByCategory = (category: ProjectCategory): Project[] => {
  return projects.filter((project) => project.category === category);
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};

export const getAllProjects = (): Project[] => {
  return projects;
};
