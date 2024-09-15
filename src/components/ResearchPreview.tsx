"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useTheme } from "@/ThemeProvider";
import Scatterplot from "./Scatterplot";

type DataPoint = {
  x: number;
  y1: number; // Actual y value
  y2: number; // Category y value
  name: string;
  size: number;
};

export default function ResearchPreview() {
  const { theme } = useTheme();
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
  };

  const sampleData: DataPoint[] = [
    { x: 10, y1: 20, y2: 1, name: "New York", size: 10 },
  ];

  const [data, setData] = useState<DataPoint[]>(sampleData);

  useEffect(() => {
    // Fetch the JSON data from the file
    fetch("/static/city_shock.json")
      .then((response) => response.json())
      .then((jsonData) => {
        console.log("Fetched JSON data:", jsonData); // Log the fetched JSON data

        // Map the JSON data to the desired structure
        const mappedData = jsonData.map((item: any) => ({
          x: item.correlation,
          y1: item["ratio"],
          name: item.city,
          size: item.pi_c,
        }));

        console.log("Mapped data:", mappedData); // Log the transformed data

        // Set the transformed data
        setData(mappedData);
      })
      .catch((error) => {
        console.error("Error fetching the JSON data:", error);
      });
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Research Paper Title</h1>
        </div>
        <p className="text-xl mb-4">
          Correlated Migration: The Hidden Patterns of City Location Choices
        </p>

        <Card className="mb-8" disableHover>
          <CardHeader>
            <CardTitle>Abstract</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The extent to which households migrate across cities in response
              to negative economic shocks is a crucial channel through which
              such shocks are mitigated. And yet, almost all existing models
              assume that all cities are equally substitutable for all
              households. In contrast, this paper introduces a model with
              correlated location choices, where household heterogeneity in
              occupation-specific skills interacts with the productivity of
              cities in those occupations, leading to endogenous city
              substitutability as a function of similarity in city specific
              economic structures. Using publicly available data, I estimate
              this model and demonstrate that migration decisions are
              significantly correlated. These findings have important
              implications for the design and effectiveness of place-based
              policies and deepen our understanding of household migration
              responses to local economic shocks.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8" disableHover>
          <CardHeader>
            <CardTitle>Paper Preview</CardTitle>
          </CardHeader>
          <CardContent className="h-screen max-h-screen overflow-y-auto">
            {" "}
            {/* Set height to fit screen */}
            <div className="flex flex-col items-center">
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}
              >
                <div className="w-3/4">
                  {" "}
                  {/* Set width to 70% of the card content */}
                  <Viewer
                    fileUrl="/static/latest.pdf" // Updated PDF file path
                    onDocumentLoad={onDocumentLoadSuccess}
                    defaultScale={SpecialZoomLevel.PageWidth}
                  />
                </div>
              </Worker>
              {numPages > 0 && (
                <div className="flex items-center mt-4">
                  <Button
                    onClick={() =>
                      setPageNumber((page) => Math.max(page - 1, 1))
                    }
                    disabled={pageNumber <= 1}
                    variant="outline"
                    size="icon"
                    className="mr-2"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  <span>
                    Page {pageNumber} of {numPages}
                  </span>
                  <Button
                    onClick={() =>
                      setPageNumber((page) => Math.min(page + 1, numPages))
                    }
                    disabled={pageNumber >= numPages}
                    variant="outline"
                    size="icon"
                    className="ml-2"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <a
          href="/static/latest.pdf" // Path to the PDF file
          download="latest.pdf" // Suggested file name for download
          className="w-full sm:w-auto"
        >
          <Button
            className={`w-full sm:w-auto ${
              theme === "dark"
                ? "bg-blue-500 text-white hover:bg-blue-600 border-black"
                : "bg-black text-white hover:bg-blue-600"
            }`}
          >
            <DownloadIcon className="mr-2 h-4 w-4" /> Download Full Paper
          </Button>
        </a>
      </div>
      <Scatterplot
        data={data}
        xAxisName="City Correlation"
        yAxisName="Relative Shares"
      />
    </div>
  );
}
