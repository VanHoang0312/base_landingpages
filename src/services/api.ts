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

export interface WebsitePost {
    _id: string;
    title: string;
    slug: string;
    content?: string;
    categoryId?: WebsiteCategory | string;
    categoryName?: string;
    thumbnail?: string;
    images?: string[];
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
