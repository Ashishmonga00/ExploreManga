import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BookOpen, Github, Twitter, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-bold">MangaLibrary</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for reading manga online. Discover thousands of manga titles, 
              from popular series to hidden gems, all in one place.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for manga lovers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground justify-start" data-testid="link-footer-home">
                    Home
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/categories">
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground justify-start" data-testid="link-footer-categories">
                    Browse Categories
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground justify-start" data-testid="link-footer-contact">
                    Contact Us
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Genres */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide">Popular Genres</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/action">
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground justify-start" data-testid="link-footer-action">
                    Action
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/categories/romance">
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground justify-start" data-testid="link-footer-romance">
                    Romance
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/categories/fantasy">
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground justify-start" data-testid="link-footer-fantasy">
                    Fantasy
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/categories/comedy">
                  <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground justify-start" data-testid="link-footer-comedy">
                    Comedy
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide">Connect</h4>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="sm" className="justify-start" data-testid="button-footer-github">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" size="sm" className="justify-start" data-testid="button-footer-twitter">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button variant="outline" size="sm" className="justify-start" data-testid="button-footer-email">
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>Read manga responsibly</p>
              <p>Support official releases</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} MangaLibrary. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground" data-testid="link-footer-privacy">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground" data-testid="link-footer-terms">
              Terms of Service
            </Button>
            <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground" data-testid="link-footer-dmca">
              DMCA
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}