import { Router, Request, Response } from "express";
import { Category } from "../models/Category";
import { MenuItem } from "../models/MenuItem";
import { Post } from "../models/Post";
import { Setting } from "../models/Setting";
import { Contact } from "../models/Contact";

export const publicRouter = Router();

// ─── Health Check ────────────────────────────────────────────────────────────
publicRouter.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Categories ───────────────────────────────────────────────────────────────
publicRouter.get("/categories", async (_req: Request, res: Response) => {
  try {
    const rows = await Category.find({ isActive: true }).sort({
      sortOrder: 1,
      name: 1,
    });
    res.json({ rows, total: rows.length });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// ─── Menu Items ───────────────────────────────────────────────────────────────
publicRouter.get("/menu-items", async (req: Request, res: Response) => {
  try {
    const {
      categoryId,
      featured,
      page = "1",
      pageSize = "20",
      search,
    } = req.query;

    const filter: Record<string, unknown> = { isAvailable: true };
    if (categoryId) filter.categoryId = categoryId;
    if (featured === "true") filter.isFeatured = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search as string, "i")] } },
      ];
    }

    const skip = (Number(page) - 1) * Number(pageSize);
    const [rows, total] = await Promise.all([
      MenuItem.find(filter)
        .populate("categoryId", "name slug")
        .sort({ sortOrder: 1, name: 1 })
        .skip(skip)
        .limit(Number(pageSize)),
      MenuItem.countDocuments(filter),
    ]);

    res.json({ rows, total, page: Number(page), pageSize: Number(pageSize) });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

publicRouter.get("/menu-items/:slug", async (req: Request, res: Response) => {
  try {
    const item = await MenuItem.findOne({
      slug: req.params.slug,
      isAvailable: true,
    }).populate("categoryId", "name slug");
    if (!item) {
      res.status(404).json({ message: "Không tìm thấy món ăn" });
      return;
    }
    res.json(item);
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// ─── Blog Posts ───────────────────────────────────────────────────────────────
publicRouter.get("/posts", async (req: Request, res: Response) => {
  try {
    const { page = "1", pageSize = "10" } = req.query;
    const skip = (Number(page) - 1) * Number(pageSize);

    const [rows, total] = await Promise.all([
      Post.find({ status: "PUBLISHED" })
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(Number(pageSize))
        .select("-content"),
      Post.countDocuments({ status: "PUBLISHED" }),
    ]);

    res.json({ rows, total, page: Number(page), pageSize: Number(pageSize) });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

publicRouter.get("/posts/:slug", async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({
      slug: req.params.slug,
      status: "PUBLISHED",
    });
    if (!post) {
      res.status(404).json({ message: "Không tìm thấy bài viết" });
      return;
    }
    res.json(post);
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// ─── Settings ─────────────────────────────────────────────────────────────────
publicRouter.get("/settings", async (_req: Request, res: Response) => {
  try {
    const settings = await Setting.find();
    const result: Record<string, string> = {};
    settings.forEach((s) => {
      result[s.key] = s.value;
    });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// ─── Contact Form ─────────────────────────────────────────────────────────────
publicRouter.post("/contacts", async (req: Request, res: Response) => {
  try {
    const { name, phone, email, message } = req.body;
    if (!name?.trim() || !phone?.trim()) {
      res.status(400).json({ message: "Họ tên và số điện thoại là bắt buộc" });
      return;
    }
    const contact = new Contact({ name, phone, email, message });
    await contact.save();
    res.status(201).json({ message: "Gửi liên hệ thành công" });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
});
