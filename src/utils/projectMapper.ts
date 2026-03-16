import type { Project } from "@/data/projects";
import fallbackImage from "@/assets/project-apartment.png";
import type { WebsiteCategory, WebsitePost } from "@/services/api";

const monthMap = ["Th01", "Th02", "Th03", "Th04", "Th05", "Th06", "Th07", "Th08", "Th09", "Th10", "Th11", "Th12"];

const normalizeImageUrl = (url?: string) => {
    if (!url) return "";
    const value = url.toString().trim();
    if (!value) return "";
    if (value.startsWith("http://") || value.startsWith("https://")) return value;
    if (value.startsWith("/api/")) return value;
    if (value.startsWith("/upload/")) return value;
    if (value.startsWith("/")) return value;
    if (value.includes("/")) return `/${value}`;
    return `/api/file/image/${value}`;
};

export const formatDateDisplay = (dateInput?: string) => {
    if (!dateInput) return "";
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return "";
    const day = `${date.getDate()}`.padStart(2, "0");
    const month = monthMap[date.getMonth()] || "";
    return `${day} ${month}`;
};

export const buildCategoryHref = (category: WebsiteCategory) => `/mau-nha-dep/${category.slug || category.code || category._id}`;

export const mapPostToProject = (post: WebsitePost, fallbackCategorySlug = "tat-ca"): Project => {
    const categoryObj = typeof post.categoryId === "object" ? post.categoryId : null;
    const categorySlug = categoryObj?.slug || fallbackCategorySlug;
    const categoryLabel = categoryObj?.name || post.categoryName || "Danh mục";
    const createdDate = post.publishedAt || post.createdAt || post.updatedAt;

    return {
        id: post._id,
        slug: post.slug,
        title: post.title,
        excerpt: post.summary || "",
        category: categorySlug as Project["category"],
        categoryLabel,
        image: normalizeImageUrl(post.thumbnail) || normalizeImageUrl(post.images?.[0]) || fallbackImage,
        date: createdDate || "",
        dateDisplay: formatDateDisplay(createdDate) || "--",
        specs: {
            area: post.area || "--",
            cost: post.budget || "--",
            rooms: post.roomInfo || "--",
            location: post.location || "--",
        },
        features: Array.isArray(post.features) && post.features.length ? post.features : ["Thông tin đang cập nhật"],
        description: post.content || post.summary || "",
    };
};
