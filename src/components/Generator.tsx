import TemplateGenerator from "@/components/TemplateGenerator";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import { useTheme } from "@/ThemeProvider";

export default function Generator() {
  const { theme } = useTheme();

  return (
    <div
      className={`container mx-auto p-4 space-y-8 pb-10 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold">Generator</h1>
        <p className="text-lg text-muted-foreground">
          Create and manage your templates and invoices easily
        </p>
      </div>

      <TemplateGenerator />
      <InvoiceGenerator />
    </div>
  );
}
