import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  robots?: string;
}

export function SEO({ 
  title, 
  description, 
  keywords = "", 
  image = "",
  url = "",
  type = "website",
  robots = "index, follow"
}: SEOProps) {
  useEffect(() => {
    // Set page title
    document.title = title;
    
    // Set or update meta tags
    const setMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    setMetaTag("description", description);
    if (keywords) setMetaTag("keywords", keywords);
    setMetaTag("viewport", "width=device-width, initial-scale=1");
    setMetaTag("robots", robots);

    // Open Graph meta tags
    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:type", type, true);
    setMetaTag("og:site_name", "Explore Manga", true);
    
    if (url) setMetaTag("og:url", url, true);
    if (image) setMetaTag("og:image", image, true);

    // Twitter meta tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    if (image) setMetaTag("twitter:image", image);

    // Additional meta tags for better SEO
    setMetaTag("theme-color", "#a855f7"); // Purple theme color
    setMetaTag("apple-mobile-web-app-capable", "yes");
    setMetaTag("apple-mobile-web-app-status-bar-style", "default");
  }, [title, description, keywords, image, url, type, robots]);

  return null; // This component doesn't render anything
}