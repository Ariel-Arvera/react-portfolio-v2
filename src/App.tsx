import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NeonCursor from "@/components/NeonCursor";
import GlobalReveal from "@/components/GlobalReveal";
import IntroTypingScreen from "@/components/IntroTypingScreen";
import SecurityAlertGuard from "@/components/SecurityAlertGuard";
import { LanguageProvider } from "@/context/language";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setShowIntro(false), 2000);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (showIntro) {
    return <IntroTypingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageProvider>
          <NeonCursor />
          <GlobalReveal />
          <SecurityAlertGuard />
          <HashRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
