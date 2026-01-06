import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Index from "./pages/Index";
import ProjectArchive from "./pages/ProjectArchive";
import ProjectDetail from "./pages/ProjectDetail";
import Quotation from "./pages/Quotation";
import Introduction from "./pages/Introduction";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Project Routes */}
          <Route path="/mau-nha-dep" element={<ProjectArchive />} />
          <Route path="/mau-nha-dep/:category" element={<ProjectArchive />} />
          <Route path="/du-an/:slug" element={<ProjectDetail />} />
          
          {/* Other Pages */}
          <Route path="/bao-gia" element={<Quotation />} />
          <Route path="/gioi-thieu" element={<Introduction />} />
          <Route path="/lien-he" element={<Contact />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
