import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Play, BookOpen } from "lucide-react";
import { Link } from "wouter";
import type { Manga } from "@shared/schema";

interface HeroSectionProps {
  featuredManga: Manga[];
}

export function HeroSection({ featuredManga }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredManga.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredManga.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredManga.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? featuredManga.length - 1 : prev - 1
    );
  };

  if (featuredManga.length === 0) {
    return null;
  }

  const currentManga = featuredManga[currentIndex];

  return (
    <div className="relative h-[25vh] min-h-[200px] md:h-[30vh] md:min-h-[250px] overflow-hidden rounded-lg mb-6">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentManga.coverImage || (currentManga as any).cover_image}
          alt={currentManga.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation Arrows Only */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/30 backdrop-blur text-white hover:bg-background/50"
        onClick={prevSlide}
        data-testid="button-hero-prev"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/30 backdrop-blur text-white hover:bg-background/50"
        onClick={nextSlide}
        data-testid="button-hero-next"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}