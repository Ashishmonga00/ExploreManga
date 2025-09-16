import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <SEO 
        title="404 - Page Not Found | MangaLibrary"
        description="The page you're looking for could not be found. Return to MangaLibrary to continue browsing manga."
        robots="noindex, nofollow"
        type="website"
      />
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
