import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// ─── Axios Instances ───────────────────────────────────────────────────────────
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const adminClient = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to admin requests automatically
adminClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Redirect to login on 401
adminClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      window.location.href = "/admin/login";
    }
    return Promise.reject(err);
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  longDescription?: string;
  price: number;
  salePrice?: number;
  categoryId: Category | string;
  thumbnail?: string;
  images?: string[];
  tags?: string[];
  isFeatured: boolean;
  isAvailable: boolean;
  newArrival: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  thumbnail?: string;
  images?: string[];
  status: "DRAFT" | "PUBLISHED";
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  _id: string;
  filename: string;
  originalName: string;
  url: string;
  mimetype: string;
  size: number;
  createdAt: string;
}

export interface Contact {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  status: "NEW" | "READ" | "REPLIED";
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  siteName?: string;
  siteTagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  openHours?: string;
  facebook?: string;
  instagram?: string;
  zalo?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  aboutText?: string;
  [key: string]: string | undefined;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface PaginatedResponse<T> {
  rows: T[];
  total: number;
  page?: number;
  pageSize?: number;
}

// ─── Public API Services ──────────────────────────────────────────────────────
export const categoryService = {
  getAll: async (): Promise<PaginatedResponse<Category>> => {
    const res = await apiClient.get("/categories");
    return res.data;
  },
};

export const menuItemService = {
  getAll: async (params?: {
    categoryId?: string;
    featured?: boolean;
    page?: number;
    pageSize?: number;
    search?: string;
  }): Promise<PaginatedResponse<MenuItem>> => {
    const res = await apiClient.get("/menu-items", { params });
    return res.data;
  },
  getBySlug: async (slug: string): Promise<MenuItem> => {
    const res = await apiClient.get(`/menu-items/${slug}`);
    return res.data;
  },
};

export const postService = {
  getAll: async (params?: {
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<Post>> => {
    const res = await apiClient.get("/posts", { params });
    return res.data;
  },
  getBySlug: async (slug: string): Promise<Post> => {
    const res = await apiClient.get(`/posts/${slug}`);
    return res.data;
  },
};

export const settingService = {
  getAll: async (): Promise<SiteSettings> => {
    const res = await apiClient.get("/settings");
    return res.data;
  },
};

export const contactService = {
  submit: async (data: {
    name: string;
    phone: string;
    email?: string;
    message?: string;
  }): Promise<{ message: string }> => {
    const res = await apiClient.post("/contacts", data);
    return res.data;
  },
};

// ─── Admin API Services ───────────────────────────────────────────────────────
export const adminAuthService = {
  login: async (username: string, password: string): Promise<{ token: string; user: AdminUser }> => {
    const res = await adminClient.post("/auth/login", { username, password });
    return res.data;
  },
  me: async (): Promise<AdminUser> => {
    const res = await adminClient.get("/auth/me");
    return res.data;
  },
};

export const adminCategoryService = {
  getAll: async (): Promise<PaginatedResponse<Category>> => {
    const res = await adminClient.get("/categories");
    return res.data;
  },
  create: async (data: Partial<Category>): Promise<Category> => {
    const res = await adminClient.post("/categories", data);
    return res.data;
  },
  update: async (id: string, data: Partial<Category>): Promise<Category> => {
    const res = await adminClient.put(`/categories/${id}`, data);
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await adminClient.delete(`/categories/${id}`);
  },
};

export const adminMenuItemService = {
  getAll: async (params?: {
    page?: number;
    pageSize?: number;
    categoryId?: string;
    search?: string;
  }): Promise<PaginatedResponse<MenuItem>> => {
    const res = await adminClient.get("/menu-items", { params });
    return res.data;
  },
  create: async (data: Partial<MenuItem>): Promise<MenuItem> => {
    const res = await adminClient.post("/menu-items", data);
    return res.data;
  },
  update: async (id: string, data: Partial<MenuItem>): Promise<MenuItem> => {
    const res = await adminClient.put(`/menu-items/${id}`, data);
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await adminClient.delete(`/menu-items/${id}`);
  },
};

export const adminPostService = {
  getAll: async (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    search?: string;
  }): Promise<PaginatedResponse<Post>> => {
    const res = await adminClient.get("/posts", { params });
    return res.data;
  },
  getById: async (id: string): Promise<Post> => {
    const res = await adminClient.get(`/posts/${id}`);
    return res.data;
  },
  create: async (data: Partial<Post>): Promise<Post> => {
    const res = await adminClient.post("/posts", data);
    return res.data;
  },
  update: async (id: string, data: Partial<Post>): Promise<Post> => {
    const res = await adminClient.put(`/posts/${id}`, data);
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await adminClient.delete(`/posts/${id}`);
  },
};

export const adminMediaService = {
  getAll: async (params?: { page?: number; pageSize?: number }): Promise<PaginatedResponse<Media>> => {
    const res = await adminClient.get("/media", { params });
    return res.data;
  },
  upload: async (file: File): Promise<{ url: string; media: Media }> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await adminClient.post("/media/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await adminClient.delete(`/media/${id}`);
  },
};

export const adminSettingService = {
  getAll: async (): Promise<SiteSettings> => {
    const res = await adminClient.get("/settings");
    return res.data;
  },
  update: async (data: SiteSettings): Promise<{ message: string }> => {
    const res = await adminClient.put("/settings", data);
    return res.data;
  },
};

export const adminContactService = {
  getAll: async (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
  }): Promise<PaginatedResponse<Contact>> => {
    const res = await adminClient.get("/contacts", { params });
    return res.data;
  },
  updateStatus: async (id: string, status: Contact["status"]): Promise<Contact> => {
    const res = await adminClient.put(`/contacts/${id}`, { status });
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await adminClient.delete(`/contacts/${id}`);
  },
};
