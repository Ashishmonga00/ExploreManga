import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/ThemeProvider";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "@/pages/Home";
import Categories from "@/pages/Categories";
import CategoryPage from "@/pages/CategoryPage";
import MangaDetail from "@/pages/MangaDetail";
import ChapterReader from "@/pages/ChapterReader";
import SearchResults from "@/pages/SearchResults";
import Authors from "@/pages/Authors";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/categories" component={Categories} />
      <Route path="/categories/:category" component={CategoryPage} />
      <Route path="/manga/:id/chapter/:chapterNo" component={ChapterReader} />
      <Route path="/manga/:id" component={MangaDetail} />
      <Route path="/search" component={SearchResults} />
      <Route path="/authors" component={Authors} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1">
              <Router />
            </div>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;