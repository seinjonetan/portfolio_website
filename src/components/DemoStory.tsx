import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter, Github } from "lucide-react";

export default function DemoStory({
  title,
  description,
  videoUrl,
  paperTitle,
  paperUrl,
  socialLinks,
}: {
  title: string;
  description: string;
  videoUrl: string;
  paperTitle?: string;
  paperUrl?: string;
  socialLinks?: { type: "linkedin" | "twitter" | "github"; url: string }[];
}) {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>

        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-6">
            <Card disableHover>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">About this Demo</h2>
                <p className="text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="w-full">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Tutorial Video</h2>
                <iframe
                  src={videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-96 rounded-lg"
                ></iframe>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {paperTitle && paperUrl && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Related Paper</h2>
                  <a
                    href={paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {paperTitle}
                  </a>
                </CardContent>
              </Card>
            )}

            {socialLinks && socialLinks.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Connect with Us
                  </h2>
                  <div className="flex space-x-4">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        {link.type === "linkedin" && <Linkedin size={24} />}
                        {link.type === "twitter" && <Twitter size={24} />}
                        {link.type === "github" && <Github size={24} />}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
