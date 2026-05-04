import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import jwt from "jsonwebtoken";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { Category } from "../models/Category";
import { MenuItem } from "../models/MenuItem";
import { Post } from "../models/Post";
import { Media } from "../models/Media";
import { Setting } from "../models/Setting";
import { User } from "../models/User";
import { Contact } from "../models/Contact";
import { createSlug } from "../utils/slugify";

export const adminRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || "food-website-secret-2024";

// ─── Multer Upload Setup ──────────────────────────────────────────────────────
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const ok = allowed.test(file.mimetype) && allowed.test(path.extname(file.originalname).toLowerCase());
    ok ? cb(null, true) : cb(new Error("Chỉ chấp nhận file ảnh"));
  },
});

// ─── Auth ─────────────────────────────────────────────────────────────────────
adminRouter.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Vui lòng nhập tên đăng nhập và mật khẩu" });
      return;
    }
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
      isActive: true,
    });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng" });
      return;
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

adminRouter.get("/auth/me", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    if (!user) { res.status(404).json({ message: "Không tìm thấy người dùng" }); return; }
    res.json(user);
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// ─── Helper: build unique slug ────────────────────────────────────────────────
async function buildUniqueSlug(
  text: string,
  Model: { findOne: (q: object) => Promise<unknown> },
  excludeId?: string
): Promise<string> {
  let slug = createSlug(text);
  let exists = await Model.findOne({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) });
  let counter = 1;
  while (exists) {
    slug = `${createSlug(text)}-${counter++}`;
    exists = await Model.findOne({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) });
  }
  return slug;
}

// ─── Media Upload ─────────────────────────────────────────────────────────────
adminRouter.post("/media/upload", authMiddleware, upload.single("file"), async (req: Request, res: Response) => {
  try {
    if (!req.file) { res.status(400).json({ message: "Không có file" }); return; }
    const url = `/uploads/${req.file.filename}`;
    const media = new Media({
      filename: req.file.filename,
      originalName: req.file.originalname,
      url,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
    await media.save();
    res.status(201).json({ url, media });
  } catch {
    res.status(500).json({ message: "Lỗi upload file" });
  }
});

adminRouter.get("/media", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { page = "1", pageSize = "30" } = req.query;
    const skip = (Number(page) - 1) * Number(pageSize);
    const [rows, total] = await Promise.all([
      Media.find().sort({ createdAt: -1 }).skip(skip).limit(Number(pageSize)),
      Media.countDocuments(),
    ]);
    res.json({ rows, total });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

adminRouter.delete("/media/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) { res.status(404).json({ message: "Không tìm thấy" }); return; }
    const filePath = path.join(uploadDir, media.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.json({ message: "Đã xóa" });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// ─── Categories ───────────────────────────────────────────────────────────────
adminRouter.get("/categories", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const rows = await Category.find().sort({ sortOrder: 1, name: 1 });
    res.json({ rows, total: rows.length });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

adminRouter.post("/categories", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, description, icon, image, sortOrder, isActive } = req.body;
    if (!name) { res.status(400).json({ message: "Tên danh mục là bắt buộc" }); return; }
    const slug = await buildUniqueSlug(name, Category as Parameters<typeof buildUniqueSlug>[1]);
    const category = new Category({ name, slug, description, icon, image, sortOrder: sortOrder ?? 0, isActive: isActive ?? true });
    await category.save();
    res.status(201).json(category);
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

adminRouter.put("/categories/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, description, icon, image, sortOrder, isActive } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) { res.status(404).json({ message: "Không tìm thấy danh mục" }); return; }
    if (name && name !== category.name) {
      category.slug = await buildUniqueSlug(name, Category as Parameters<typeof buildUniqueSlug>[1], req.params.id);
      category.name = name;
    }
    if (description !== undefined) category.description = description;
    if (icon !== undefined) category.icon = icon;
    if (image !== undefined) category.image = image;
    if (sortOrder !== undefined) category.sortOrder = sortOrder;
    if (isActive !== undefined) category.isActive = isActive;
    await category.save();
    res.json(category);
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

adminRouter.delete("/categories/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) { res.status(404).json({ message: "Không tìm thấy danh mục" }); return; }
    res.json({ message: "Đã xóa danh mục" });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// ─── Menu Items ───────────────────────────────────────────────────────────────
adminRouter.get("/menu-items", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { page = "1", pageSize = "20", categoryId, search } = req.query;
    const filter: Record<string, unknown> = {};
    if (categoryId) filter.categoryId = categoryId;
    if (search) filter.$or = [{ name: { $regex: search, $options: "i" } }];
    const skip = (Number(page) - 1) * Number(pageSize);
    const [rows, total] = await Promise.all([
      MenuItem.find(filter).populate("categoryId", "name slug").sort({ sortOrder: 1, name: 1 }).skip(skip).limit(Number(pageSize)),
      MenuItem.countDocuments(filter),
    ]);
    res.json({ rows, total, page: Number(page), pageSize: Number(pageSize) });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

adminRouter.post("/menu-items", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, description, longDescription, price, salePrice, categoryId, thumbnail, images, tags, isFeatured, isAvailable, newArrival, sortOrder } = req.body;
    if (!name || !price || !categoryId) {
      res.status(400).json({ message: "Tên, giá và danh mục là bắt buộc" }); return;
    }
    const slug = await buildUniqueSlug(name, MenuItem as Parameters<typeof buildUniqueSlug>[1]);
    const item = new MenuItem({ name, slug, description, longDescription, price, salePrice, categoryId, thumbnail, images: images ?? [], tags: tags ?? [], isFeatured: isFeatured ?? false, isAvailable: isAvailable ?? true, newArrival: newArrival ?? false, sortOrder: sortOrder ?? 0 });
    await item.save();
    res.status(201).json(item);
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

adminRouter.put("/menu-items/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) { res.status(404).json({ message: "Không tìm thấy món ăn" }); return; }
    const fields = ["description", "longDescription", "price", "salePrice", "categoryId", "thumbnail", "images", "tags", "isFeatured", "isAvailable", "newArrival", "sortOrder"] as const;
    const { name, ...rest } = req.body;
    if (name && name !== item.name) {
      item.slug = await buildUniqueSlug(name, MenuItem as Parameters<typeof buildUniqueSlug>[1], req.params.id);
      item.name = name;
    }
    for (const f of fields) { if (rest[f] !== undefined) (item as unknown as Record<string, unknown>)[f] = rest[f]; }
    await item.save();
    res.json(item);
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

adminRouter.delete("/menu-items/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) { res.status(404).json({ message: "Không tìm thấy món ăn" }); return; }
    res.json({ message: "Đã xóa món ăn" });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// ─── Posts ────────────────────────────────────────────────────────────────────
adminRouter.get("/posts", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { page = "1", pageSize = "20", status, search } = req.query;
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (search) filter.title = { $regex: search, $options: "i" };
    const skip = (Number(page) - 1) * Number(pageSize);
    const [rows, total] = await Promise.all([
      Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(pageSize)).select("-content"),
      Post.countDocuments(filter),
    ]);
    res.json({ rows, total, page: Number(page), pageSize: Number(pageSize) });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

adminRouter.get("/posts/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) { res.status(404).json({ message: "Không tìm thấy bài viết" }); return; }
    res.json(post);
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

adminRouter.post("/posts", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, excerpt, content, thumbnail, images, status } = req.body;
    if (!title) { res.status(400).json({ message: "Tiêu đề là bắt buộc" }); return; }
    const slug = await buildUniqueSlug(title, Post as Parameters<typeof buildUniqueSlug>[1]);
    const publishedAt = status === "PUBLISHED" ? new Date() : undefined;
    const post = new Post({ title, slug, excerpt, content, thumbnail, images: images ?? [], status: status ?? "DRAFT", publishedAt });
    await post.save();
    res.status(201).json(post);
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

adminRouter.put("/posts/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) { res.status(404).json({ message: "Không tìm thấy bài viết" }); return; }
    const { title, excerpt, content, thumbnail, images, status } = req.body;
    if (title && title !== post.title) {
      post.slug = await buildUniqueSlug(title, Post as Parameters<typeof buildUniqueSlug>[1], req.params.id);
      post.title = title;
    }
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (content !== undefined) post.content = content;
    if (thumbnail !== undefined) post.thumbnail = thumbnail;
    if (images !== undefined) post.images = images;
    if (status !== undefined) {
      if (status === "PUBLISHED" && post.status !== "PUBLISHED") post.publishedAt = new Date();
      post.status = status;
    }
    await post.save();
    res.json(post);
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

adminRouter.delete("/posts/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) { res.status(404).json({ message: "Không tìm thấy bài viết" }); return; }
    res.json({ message: "Đã xóa bài viết" });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// ─── Settings ─────────────────────────────────────────────────────────────────
adminRouter.get("/settings", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const settings = await Setting.find();
    const result: Record<string, string> = {};
    settings.forEach((s) => { result[s.key] = s.value; });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

adminRouter.put("/settings", authMiddleware, async (req: Request, res: Response) => {
  try {
    const updates = req.body as Record<string, string>;
    const ops = Object.entries(updates).map(([key, value]) => ({
      updateOne: { filter: { key }, update: { $set: { key, value } }, upsert: true },
    }));
    if (ops.length) await Setting.bulkWrite(ops);
    res.json({ message: "Đã lưu cài đặt" });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// ─── Contacts ─────────────────────────────────────────────────────────────────
adminRouter.get("/contacts", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { page = "1", pageSize = "20", status } = req.query;
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    const skip = (Number(page) - 1) * Number(pageSize);
    const [rows, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(pageSize)),
      Contact.countDocuments(filter),
    ]);
    res.json({ rows, total });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

adminRouter.put("/contacts/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!contact) { res.status(404).json({ message: "Không tìm thấy liên hệ" }); return; }
    res.json(contact);
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

adminRouter.delete("/contacts/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa" });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});
