"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useTheme } from "@/ThemeProvider";
import FileInput from "@/components/FileInput";
import { io } from "socket.io-client";

export default function TemplateGenerator() {
  const socket = io(PYTHON_API);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [template, setTemplate] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Listen for progress updates
    socket.on("template", (message) => {
      setProgressMessage(message);
    });
    // Clean up the socket connection on component unmount
    return () => {
      socket.off("template");
    };
  }, []);

  const handleCsvFile = (file: File | null) => {
    setCsvFile(file);
  };

  const handleGenerateTemplate = () => {
    const data = new FormData();
    if (csvFile) {
      data.append("file", csvFile);
    }

    fetch(`${PYTHON_API}/generate-csv`, {
      method: "POST",
      body: data,
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(
          new Blob([blob], { type: "text/csv" })
        );
        setTemplate(url);
        setProgressMessage(null); // Clear progress message when download link is available
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Template Generation</h2>
      <div className="space-y-4">
        <FileInput
          onChange={handleCsvFile}
          accept=".xlsx,.xls,.csv"
          id="template-file"
        />
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleGenerateTemplate}
            className={`w-full sm:w-auto ${
              theme === "dark"
                ? "dark:bg-primary dark:text-primary-foreground"
                : "bg-black text-white"
            }`}
          >
            <FileText className="mr-2 h-4 w-4" />
            Generate Template
          </Button>
          {template ? (
            <a href={template} download>
              <Button color="blue">Download Template</Button>
            </a>
          ) : (
            progressMessage && <span>{progressMessage}</span>
          )}
        </div>
      </div>
    </div>
  );
}
