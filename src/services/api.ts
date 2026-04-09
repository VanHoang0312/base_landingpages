import axios from "axios";

// Environment-aware API base URL
// In development, we use the specific port. In production, it might be different.
// For now, we hardcode the provided dev URL but structure it for easy change.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export interface ConsultationData {
    name: string;
    phone: string;
    email?: string;
    service?: string;
    contactPreference?: string;
    contactTime?: string;
    message?: string;
}

export interface WebsiteCategory {
    _id: string;
    name: string;
    code: string;
    slug: string;
    description?: string;
    sortOrder?: number;
}

export interface ImageGalleryRoom {
    _id: string;
    categoryId: string;
    categoryName: string;
    imageUrls: string[];
}

export interface ImageGalleryFloor {
    _id: string;
    floorIndex: number;
    rooms: ImageGalleryRoom[];
}

export interface WebsitePost {
    _id: string;
    title: string;
    slug: string;
    content?: string;
    categoryId?: WebsiteCategory | string;
    categoryName?: string;
    thumbnail?: string;
    images?: string[];
    imageGallery?: ImageGalleryFloor[];
    location?: string;
    area?: string;
    budget?: string;
    roomInfo?: string;
    features?: string[];
    status?: "DRAFT" | "PUBLISHED";
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const consultationService = {
    /**
     * Submit a consultation request
     */
    create: async (data: ConsultationData) => {
        try {
            const response = await apiClient.post("/consultation", data);
            return response.data;
        } catch (error) {
            console.error("Error submitting consultation:", error);
            throw error;
        }
    },
};

export const websiteCategoryService = {
    getAllPublic: async (params?: Record<string, unknown>) => {
        const response = await apiClient.get("/websiteCategory/get-all-public", { params });
        return response.data;
    },
};

export const websitePostService = {
    getAllPublic: async (params?: Record<string, unknown>) => {
        const response = await apiClient.get("/websitePost/get-all-public", { params });
        return response.data;
    },
    getPublicBySlug: async (slug: string) => {
        const response = await apiClient.get(`/websitePost/public/${slug}`);
        return response.data as WebsitePost;
    },
};

export interface WebsiteVideo {
    _id: string;
    title: string;
    slug: string;
    youtubeUrl?: string;
    thumbnail?: string;
    description?: string;
    content?: string;
    status?: "DRAFT" | "PUBLISHED";
    publishedAt?: string;
    sortOrder?: number;
    createdAt?: string;
    updatedAt?: string;
}

export const websiteVideoService = {
    getAllPublic: async (params?: Record<string, unknown>) => {
        const response = await apiClient.get("/websiteVideo/get-all-public", { params });
        return response.data;
    },
    getBySlug: async (slug: string) => {
        const response = await apiClient.get(`/websiteVideo/get-all-public`, { params: { slug } });
        const data = response.data;
        const rows = data?.rows || [];
        return (rows[0] as WebsiteVideo) || null;
    },
};

export interface WebsiteRecruitment {
    _id: string;
    title: string;
    slug: string;
    type?: string;
    officeId?: {
        _id: string;
        officeName: string;
        officeAddress?: string;
        officePhone?: string;
        officeEmail?: string;
    } | string;
    salary?: string;
    deadline?: string;
    image?: string;
    summary?: string;
    description?: string;
    requirements?: string[];
    benefits?: string[];
    status?: "OPEN" | "CLOSED" | "DRAFT" | "EXPIRED";
    sortOrder?: number;
    createdAt?: string;
    updatedAt?: string;
}

export const websiteRecruitmentService = {
    getAllPublic: async (params?: Record<string, unknown>) => {
        const response = await apiClient.get("/websiteRecruitment/get-all-public", { params });
        return response.data;
    },
    getBySlug: async (slug: string) => {
        const response = await apiClient.get(`/websiteRecruitment/slug/${slug}`);
        return response.data as WebsiteRecruitment;
    },
    apply: async (data: {
        recruitmentId?: string;
        candidateName: string;
        email: string;
        phoneNumber: string;
        cv?: string;
        coverLetter?: string;
    }) => {
        const response = await apiClient.post("/websiteRecruitment/apply", data);
        return response.data;
    },
    uploadCv: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post("/upload/upload-cv-public", formData);
        return response.data as { success: boolean; fileName: string; url: string };
    },

};
