import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Public pages
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import MenuItemDetail from "./pages/MenuItemDetail";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminMenuItems from "./pages/admin/AdminMenuItems";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminContacts from "./pages/admin/AdminContacts";

// Auth
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* ─── Public Routes ─────────────────────────────── */}
            <Route path="/" element={<Index />} />
            <Route path="/thuc-don" element={<MenuPage />} />
            <Route path="/thuc-don/:slug" element={<MenuItemDetail />} />
            <Route path="/gioi-thieu" element={<AboutPage />} />
            <Route path="/tin-tuc" element={<BlogPage />} />
            <Route path="/tin-tuc/:slug" element={<BlogDetail />} />
            <Route path="/lien-he" element={<Contact />} />

            {/* ─── Admin Routes ──────────────────────────────── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute><AdminCategories /></ProtectedRoute>} />
            <Route path="/admin/menu-items" element={<ProtectedRoute><AdminMenuItems /></ProtectedRoute>} />
            <Route path="/admin/posts" element={<ProtectedRoute><AdminPosts /></ProtectedRoute>} />
            <Route path="/admin/media" element={<ProtectedRoute><AdminMedia /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
            <Route path="/admin/contacts" element={<ProtectedRoute><AdminContacts /></ProtectedRoute>} />

            {/* ─── 404 ───────────────────────────────────────── */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
