import React from "react";

interface TopMenuProps {
  urlInput: string;
  onUrlChange: (url: string) => void;
  onUrlSubmit: () => void;
  handleReset: () => void;
  isPreview: boolean;
  isPresets: boolean;
}

const TopMenu: React.FC<TopMenuProps> = ({
  urlInput,
  onUrlChange,
  onUrlSubmit,
  handleReset,
  isPreview,
  isPresets,
}) => {
  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        value={urlInput}
        onChange={(e) => onUrlChange(e.target.value)}
        style={{
          flex: 1,
          padding: "5px",
          borderRadius: "4px",
          border: "none",
          color: "black",
        }}
        placeholder="Enter URL"
      />
      <button
        onClick={onUrlSubmit}
        style={{
          padding: "5px 15px",
          backgroundColor: "#4CAF50",
          border: "none",
          borderRadius: "4px",
          color: "white",
          cursor: "pointer",
        }}
      >
        Load URL
      </button>
      {isPreview && isPresets && (
        <button
          onClick={handleReset}
          style={{
            padding: "5px 15px",
            backgroundColor: "#2196F3",
            border: "none",
            borderRadius: "4px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Reset Settings
        </button>
      )}
    </div>
  );
};

export default TopMenu;
