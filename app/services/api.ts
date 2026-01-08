import axios from "axios";

// Environment-aware API base URL
// In development, we use the specific port. In production, it might be different.
// For now, we hardcode the provided dev URL but structure it for easy change.
const API_BASE_URL = "https://terp-dev.thinklabs.com.vn/api";

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
    message?: string;
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
