import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BookOpen, Github, Twitter, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* About Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="text-base font-bold text-foreground">Explore Manga</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your ultimate destination for reading manga online. Discover thousands of titles, 
              from popular series to hidden gems.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 fill-current" />
              <span>for manga lovers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/">
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start text-sm" data-testid="link-footer-home">
                    Home
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/categories">
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start text-sm" data-testid="link-footer-categories">
                    Browse Categories
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/authors">
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start text-sm" data-testid="link-footer-authors">
                    Authors
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Genres */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Popular Genres</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/categories/action">
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start text-sm" data-testid="link-footer-action">
                    Action
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/categories/romance">
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start text-sm" data-testid="link-footer-romance">
                    Romance
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/categories/fantasy">
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start text-sm" data-testid="link-footer-fantasy">
                    Fantasy
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/categories/comedy">
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start text-sm" data-testid="link-footer-comedy">
                    Comedy
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Resources</h4>
            <div className="flex flex-col space-y-1">
              <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start text-sm" data-testid="button-footer-help">
                Help & Support
              </Button>
              <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start text-sm" data-testid="button-footer-community">
                Community
              </Button>
              <Link href="/contact">
                <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start text-sm" data-testid="link-footer-contact">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Explore Manga. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy">
              <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary text-xs" data-testid="link-footer-privacy">
                Privacy
              </Button>
            </Link>
            <Link href="/terms">
              <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary text-xs" data-testid="link-footer-terms">
                Terms
              </Button>
            </Link>
            <Link href="/dmca">
              <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary text-xs" data-testid="link-footer-dmca">
                DMCA
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}