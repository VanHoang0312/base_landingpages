import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/User";
import { Category } from "../models/Category";
import { Setting } from "../models/Setting";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/food-website";

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  // Create admin user
  const existingUser = await User.findOne({ username: "admin" });
  if (!existingUser) {
    await User.create({ username: "admin", email: "admin@daihathanh.vn", password: "admin123", role: "admin" });
    console.log("✅ Admin user created: admin / admin123");
  } else {
    console.log("ℹ️  Admin user already exists");
  }

  // Create menu categories
  const categories = [
    { name: "Món Khai Vị", slug: "khai-vi", icon: "🥗", sortOrder: 1 },
    { name: "Món Chính", slug: "mon-chinh", icon: "🍜", sortOrder: 2 },
    { name: "Món Phụ", slug: "mon-phu", icon: "🥘", sortOrder: 3 },
    { name: "Tráng Miệng", slug: "trang-mieng", icon: "🍮", sortOrder: 4 },
    { name: "Đồ Uống", slug: "do-uong", icon: "🧃", sortOrder: 5 },
    { name: "Combo", slug: "combo", icon: "🎁", sortOrder: 6 },
  ];

  for (const cat of categories) {
    await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true });
  }
  console.log("✅ Menu categories created");

  // Create default settings
  const settings = [
    { key: "siteName", value: "Đại Hà Thanh", label: "Tên website", group: "general" },
    { key: "siteTagline", value: "Hương Vị Truyền Thống - Đẳng Cấp Hiện Đại", label: "Slogan", group: "general" },
    { key: "phone", value: "0909 123 456", label: "Số điện thoại", group: "contact" },
    { key: "email", value: "info@daihathanh.vn", label: "Email", group: "contact" },
    { key: "address", value: "123 Nguyễn Huệ, Quận 1, TP.HCM", label: "Địa chỉ", group: "contact" },
    { key: "openHours", value: "07:00 - 22:00 hàng ngày", label: "Giờ mở cửa", group: "contact" },
    { key: "facebook", value: "", label: "Facebook URL", group: "social" },
    { key: "instagram", value: "", label: "Instagram URL", group: "social" },
    { key: "zalo", value: "", label: "Zalo", group: "social" },
    { key: "heroTitle", value: "Ẩm Thực Đại Hà Thanh", label: "Tiêu đề Hero", group: "homepage" },
    { key: "heroSubtitle", value: "Trải nghiệm hương vị ẩm thực đích thực với những nguyên liệu tươi ngon nhất", label: "Mô tả Hero", group: "homepage" },
    { key: "aboutText", value: "Với hơn 15 năm kinh nghiệm, chúng tôi tự hào mang đến những món ăn truyền thống Việt Nam được nấu từ nguyên liệu tươi ngon nhất.", label: "Giới thiệu về chúng tôi", group: "homepage" },
  ];

  for (const s of settings) {
    await Setting.findOneAndUpdate({ key: s.key }, s, { upsert: true });
  }
  console.log("✅ Default settings created");

  await mongoose.disconnect();
  console.log("✅ Seeding completed!");
}

seed().catch(console.error);
