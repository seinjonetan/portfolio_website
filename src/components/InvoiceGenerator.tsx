"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useTheme } from "@/ThemeProvider";
import FileInput from "@/components/FileInput";
import { io } from "socket.io-client";

export default function InvoiceGenerator() {
  const socket = io("http://127.0.0.1:5001");
  const [formData, setFormData] = useState({
    addr1: "",
    addr2: "",
    company_name: "",
  });
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [invoice, setInvoice] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Listen for progress updates
    socket.on("invoice", (message) => {
      setProgressMessage(message);
    });
    // Clean up the socket connection on component unmount
    return () => {
      socket.off("invoice");
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCsvFile = (file: File | null) => {
    setCsvFile(file);
  };

  const handleGenerateInvoice = () => {
    const data = new FormData();
    data.append("json", JSON.stringify(formData));
    if (csvFile) {
      data.append("file", csvFile);
    }

    fetch("http://127.0.0.1:5001/csv", {
      method: "POST",
      body: data,
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(
          new Blob([blob], { type: "application/zip" })
        );
        setInvoice(url);
        setProgressMessage(null); // Clear progress message when download link is available
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Invoice Generation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="addr1">Address Line 1</Label>
          <Input
            id="addr1"
            name="addr1"
            placeholder="Enter address line 1"
            value={formData.addr1}
            onChange={handleChange}
            className={`${
              theme === "dark" ? "hover:bg-slate-800" : "hover:bg-gray-200"
            }`}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="addr2">Address Line 2</Label>
          <Input
            id="addr2"
            name="addr2"
            placeholder="Enter address line 2"
            value={formData.addr2}
            onChange={handleChange}
            className={`${
              theme === "dark" ? "hover:bg-slate-800" : "hover:bg-gray-200"
            }`}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="company_name">Company Name</Label>
        <Input
          id="company_name"
          name="company_name"
          placeholder="Enter company name"
          value={formData.company_name}
          onChange={handleChange}
          className={`${
            theme === "dark" ? "hover:bg-slate-800" : "hover:bg-gray-200"
          }`}
        />
      </div>
      <div className="space-y-4">
        <FileInput onChange={handleCsvFile} accept=".csv" id="invoice-file" />
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleGenerateInvoice}
            className={`w-full sm:w-auto ${
              theme === "dark"
                ? "dark:bg-primary dark:text-primary-foreground"
                : "bg-black text-white"
            }`}
          >
            <Upload className="mr-2 h-4 w-4" />
            Generate Invoice
          </Button>
          {invoice ? (
            <a href={invoice} download>
              <Button color="blue">Download Invoices</Button>
            </a>
          ) : (
            progressMessage && <span>{progressMessage}</span>
          )}
        </div>
      </div>
    </div>
  );
}
