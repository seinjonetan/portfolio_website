import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { useTheme } from "@/ThemeProvider";

interface FileInputProps {
  onChange: (file: File | null) => void;
  accept?: string;
  id: string;
}

const FileInput = ({ onChange, accept, id }: FileInputProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const { theme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file?.name || null);
    onChange(file);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        className={`flex-grow ${
          theme === "dark" ? "hover:bg-slate-800" : "hover:bg-gray-200"
        }`}
      >
        <File className="mr-2 h-4 w-4" />
        {fileName || "Choose file"}
      </Button>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept={accept}
        id={id}
        className="hidden"
      />
      {fileName && (
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setFileName(null);
            onChange(null);
            if (inputRef.current) inputRef.current.value = "";
          }}
          className="text-destructive"
        >
          Remove
        </Button>
      )}
    </div>
  );
};

export default FileInput;
