import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/useTheme";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import CollegeDetail from "./pages/CollegeDetail";
import Compare from "./pages/Compare";
import RankPredictor from "./pages/RankPredictor";
import Bookmarks from "./pages/Bookmarks";
import Deadlines from "./pages/Deadlines";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/college/:id" element={<CollegeDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/predictor" element={<RankPredictor />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/deadlines/:type" element={<Deadlines />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
