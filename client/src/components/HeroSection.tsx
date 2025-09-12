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
    <div className="relative h-[60vh] min-h-[400px] overflow-hidden rounded-lg mb-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentManga.coverImage}
          alt={currentManga.title}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {currentManga.genre.slice(0, 3).map((genre) => (
                  <Badge key={genre} variant="secondary" className="bg-background/80 backdrop-blur">
                    {genre}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                {currentManga.title}
              </h1>

              <p className="text-lg text-white/90 font-medium">
                by {currentManga.author}
              </p>

              <p className="text-white/80 max-w-lg line-clamp-3">
                {currentManga.description}
              </p>

              <div className="flex gap-4 pt-4">
                <Link href={`/manga/${currentManga.id}`}>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read Now
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-background/20 backdrop-blur border-white/20 text-white hover:bg-background/30"
                  onClick={() => console.log("Preview clicked")}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur hover:bg-background/30 text-white"
          onClick={prevSlide}
          data-testid="button-hero-prev"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur hover:bg-background/30 text-white"
          onClick={nextSlide}
          data-testid="button-hero-next"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {featuredManga.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              onClick={() => setCurrentIndex(index)}
              data-testid={`button-hero-dot-${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}