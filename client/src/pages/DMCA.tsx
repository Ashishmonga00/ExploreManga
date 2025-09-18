import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, AlertTriangle } from "lucide-react";

export default function DMCA() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="DMCA Notice - Explore Manga"
        description="Learn about Explore Manga's DMCA policy and how to report copyright infringement. Submit takedown notices and understand our copyright protection process."
        type="website"
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-display font-bold text-center">
              DMCA Notice & Takedown Policy
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="space-y-6 text-sm leading-relaxed">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Explore Manga respects the intellectual property rights of others and expects our users to do the same.
              </AlertDescription>
            </Alert>

            <section>
              <h2 className="text-xl font-semibold mb-3">Our Policy</h2>
              <p className="text-muted-foreground">
                It is our policy to respond to clear notices of alleged copyright infringement that 
                comply with the Digital Millennium Copyright Act (DMCA). If you believe that your 
                copyrighted work has been copied and is accessible on this site in a way that 
                constitutes copyright infringement, please notify us.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">Filing a DMCA Notice</h2>
              <p className="text-muted-foreground mb-3">
                To file a DMCA notice, you must provide a written communication that includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>A physical or electronic signature of the copyright owner or authorized agent</li>
                <li>Identification of the copyrighted work claimed to have been infringed</li>
                <li>Identification of the material that is claimed to be infringing, including location information</li>
                <li>Your contact information (address, telephone number, email address)</li>
                <li>A statement that you have a good faith belief that the use is not authorized</li>
                <li>A statement that the information is accurate and you are authorized to act on behalf of the owner</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">How to Submit</h2>
              <p className="text-muted-foreground mb-4">
                Send your DMCA notice to our designated agent:
              </p>
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription className="space-y-2">
                  <div><strong>Email:</strong> dmca@exploremanga.com</div>
                  <div><strong>Subject Line:</strong> DMCA Takedown Request</div>
                  <div><strong>Response Time:</strong> We will respond within 2-3 business days</div>
                </AlertDescription>
              </Alert>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">Counter-Notification</h2>
              <p className="text-muted-foreground mb-3">
                If you believe that your content was removed by mistake or misidentification, 
                you may file a counter-notification. Your counter-notification must include:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Your physical or electronic signature</li>
                <li>Identification of the material and its location before removal</li>
                <li>A statement under penalty of perjury that the material was removed by mistake</li>
                <li>Your name, address, and telephone number</li>
                <li>Consent to jurisdiction of federal court in your district</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">Repeat Infringer Policy</h2>
              <p className="text-muted-foreground">
                We will terminate the accounts of users who are repeat infringers. A repeat 
                infringer is a user who has been notified of infringing activity more than twice 
                and/or has had content removed from the service more than twice.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">False Claims</h2>
              <p className="text-muted-foreground">
                Please note that under Section 512(f) of the DMCA, any person who knowingly 
                materially misrepresents that material is infringing may be liable for damages, 
                including costs and attorneys' fees.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">Processing Time</h2>
              <p className="text-muted-foreground">
                Upon receipt of a valid DMCA notice, we will remove or disable access to the 
                allegedly infringing material promptly. We will also forward the notice to the 
                alleged infringer and inform them of the removal.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
              <p className="text-muted-foreground">
                For all DMCA-related inquiries, please contact our designated agent at dmca@exploremanga.com
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}