import { useState, useEffect } from "react";
import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/ThemeProvider";
import ScrapedDataPreview from "./ScrapedDataPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import io from "socket.io-client";

const socket = io("http://127.0.0.1:5001"); // Adjust the URL to match your server

// Define the type for scrapedData
type ScrapedDataType = {
  date: { [key: string]: number };
  content: { [key: string]: string };
};

export default function WebScraper() {
  const [url, setUrl] = useState("");
  const [proxy, setProxy] = useState("");
  const { theme } = useTheme(); // Use the useTheme hook
  const [scrapedData, setScrapedData] = useState<ScrapedDataType>({
    date: {},
    content: {},
  });
  const [progressMessage, setProgressMessage] = useState("");
  const [preview, setPreview] = useState("");
  const [csvLink, setCsvLink] = useState("");

  useEffect(() => {
    // Listen for progress updates
    socket.on("progress", (message) => {
      setProgressMessage(message);
    });

    // Listen for preview data
    socket.on("preview", (data) => {
      console.log("Preview Data:", data); // Log the JSON response
      setPreview(data);
      setScrapedData(JSON.parse(data));
      setProgressMessage(""); // Clear progress message when preview data is received
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off("progress");
      socket.off("preview");
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProgressMessage(""); // Clear previous progress message
    setPreview(""); // Clear previous preview data

    try {
      const response = await fetch("http://127.0.0.1:5001/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, proxy }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        setCsvLink(downloadUrl);
      } else {
        console.error("Failed to scrape the website");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
      <header className="text-center py-4">
        <h1 className="text-3xl font-bold">Web Scraper Tool</h1>
        <p className="text-muted-foreground">
          Scrape data from websites easily
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            type="url"
            placeholder="Enter URL to scrape"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`w-full md:flex-grow ${
              theme === "dark" ? "hover:bg-slate-800" : "hover:bg-gray-200"
            }`}
            required
          />
          <Input
            type="text"
            placeholder="Proxy (optional)"
            value={proxy}
            onChange={(e) => setProxy(e.target.value)}
            className={`w-full md:flex-grow ${
              theme === "dark" ? "hover:bg-slate-800" : "hover:bg-gray-200"
            }`}
          />
          <Button
            type="submit"
            className={`w-full md:w-auto h-full ${
              theme === "dark"
                ? "dark:bg-primary dark:text-primary-foreground"
                : "bg-black text-white"
            }`}
          >
            <Search className="w-4 h-4 mr-2" />
            Scrape Website
          </Button>
        </div>
      </form>

      <div className="hidden md:block">
        <Card className="w-full bg-card text-card-foreground" disableHover>
          <CardHeader>
            <CardTitle>Scraped Data Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {preview ? (
              <ScrapedDataPreview scrapedData={scrapedData} />
            ) : (
              <div className="text-center">
                {progressMessage ? (
                  <p>{progressMessage}</p>
                ) : (
                  <p>No data has been scraped yet.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="md:hidden">
        {preview ? (
          <ScrapedDataPreview scrapedData={scrapedData} />
        ) : (
          <Card className="w-full bg-card text-card-foreground" disableHover>
            <CardHeader>
              <CardTitle>No Data Preview Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                {progressMessage ? (
                  <p>{progressMessage}</p>
                ) : (
                  <p>No data has been scraped yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-center">
        {csvLink && (
          <a
            href={csvLink}
            download="data.csv"
            className={`${
              theme === "dark"
                ? "bg-blue-500 text-white hover:bg-blue-600 border-black"
                : "bg-black text-white hover:bg-blue-600"
            } p-2 rounded flex items-center`}
          >
            <Download className="w-4 h-4 mr-2" />
            Download CSV
          </a>
        )}
      </div>
    </div>
  );
}
