export interface RecruitmentPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  location: string;
  image: string;
  createdAt: string;
  deadline: string;
  salary: string;
  type: string; // Full-time, Part-time, etc.
}

export const recruitmentData: RecruitmentPost[] = [
  {
    id: "1",
    slug: "kien-truc-su-trien-khai",
    title: "Kiến trúc sư triển khai bản vẽ kỹ thuật",
    summary: "Tìm kiếm Kiến trúc sư có kinh nghiệm triển khai bản vẽ kỹ thuật thi công, thành thạo AutoCAD, Revit.",
    description: "Chúng tôi đang tìm kiếm một Kiến trúc sư triển khai bản vẽ kỹ thuật nhiệt huyết tham gia vào đội ngũ của Đại Hà Thanh. Bạn sẽ chịu trách nhiệm chính trong việc hiện thực hóa các ý tưởng thiết kế thành bản vẽ kỹ thuật thi công chi tiết, đảm bảo tính chính xác và khả thi của công trình.",
    requirements: [
      "Tốt nghiệp Đại học chuyên ngành Kiến trúc.",
      "Có ít nhất 2 năm kinh nghiệm ở vị trí tương đương.",
      "Thành thạo phần mềm chuyên ngành: AutoCAD, SketchUp, Revit (là một lợi thế).",
      "Am hiểu về vật liệu xây dựng, cấu tạo kiến trúc và quy chuẩn xây dựng hiện hành.",
      "Kỹ năng làm việc nhóm tốt, chịu được áp lực tiến độ."
    ],
    benefits: [
      "Mức lương cạnh tranh: 15 - 25 triệu/tháng (thỏa thuận theo năng lực).",
      "Thưởng dự án, thưởng năng suất, lương tháng 13.",
      "Đóng BHXH, BHYT đầy đủ theo quy định của pháp luật.",
      "Môi trường làm việc chuyên nghiệp, sáng tạo, trẻ trung.",
      "Có cơ hội đào tạo và phát triển nghề nghiệp lâu dài."
    ],
    location: "Hà Nội",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    createdAt: "2024-03-20",
    deadline: "2024-05-30",
    salary: "15 - 25 Triệu",
    type: "Full-time"
  },
  {
    id: "2",
    slug: "chuyen-vien-thiet-ke-noi-that",
    title: "Chuyên viên Thiết kế Nội thất (3D)",
    summary: "Tuyển dụng nhân viên thiết kế nội thất 3D có gu thẩm mỹ tốt, sáng tạo, thực hiện các dự án nhà phố, biệt thự.",
    description: "Đại Hà Thanh cần tuyển Chuyên viên Thiết kế Nội thất tham gia thiết kế các không gian sống sang trọng, hiện đại. Công việc chủ yếu là lên ý tưởng, dựng 3D và phối cảnh cho các công trình nhà ở, biệt thự cao cấp.",
    requirements: [
      "Tốt nghiệp Cao đẳng/Đại học chuyên ngành Thiết kế Nội thất, Kiến trúc.",
      "Sử dụng thành thạo 3Ds Max, Corona/Vray, SketchUp, Photoshop.",
      "Có tư duy thẩm mỹ không gian tốt, nắm bắt nhanh các xu hướng thiết kế mới.",
      "Có tinh thần trách nhiệm cao, đảm bảo chất lượng và tiến độ công việc."
    ],
    benefits: [
      "Thu nhập hấp dẫn (Lương cứng + Thưởng % dự án).",
      "Du lịch nghỉ mát hàng năm cùng công ty.",
      "Các chế độ BHXH, BHYT đầy đủ.",
      "Được làm việc trực tiếp với các dự án thực tế quy mô lớn."
    ],
    location: "Hà Nội",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80",
    createdAt: "2024-03-22",
    deadline: "2024-05-15",
    salary: "Thỏa thuận",
    type: "Full-time"
  },
  {
    id: "3",
    slug: "thuc-tap-sinh-kien-truc",
    title: "Thực tập sinh Kiến trúc",
    summary: "Cơ hội rèn luyện và phát triển cho các bạn sinh viên năm cuối hoặc mới ra trường chuyên ngành Kiến trúc.",
    description: "Tạo điều kiện cho các bạn sinh viên tiếp xúc với môi trường làm việc thực tế, tham gia hỗ trợ các Kiến trúc sư trong quá trình lên thiết kế cơ sở và triển khai ý tưởng.",
    requirements: [
      "Sinh viên năm cuối hoặc mới tốt nghiệp chuyên ngành Kiến trúc.",
      "Biết sử dụng cơ bản phần mềm AutoCAD, SketchUp.",
      "Đam mê, ham học hỏi, siêng năng năng động."
    ],
    benefits: [
      "Phụ cấp thực tập hàng tháng.",
      "Được hướng dẫn tận tình bởi các Kiến trúc sư giàu kinh nghiệm.",
      "Cơ hội trở thành nhân viên chính thức sau kỳ thực tập."
    ],
    location: "Hà Nội",
    image: "https://images.unsplash.com/photo-1541888052119-e9389569ea23?auto=format&fit=crop&q=80",
    createdAt: "2024-04-01",
    deadline: "2024-06-30",
    salary: "Hỗ trợ phụ cấp",
    type: "Thực tập"
  }
];

export const getRecruitmentBySlug = (slug: string): RecruitmentPost | undefined => {
  return recruitmentData.find((post) => post.slug === slug);
};
