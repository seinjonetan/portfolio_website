import React from "react";

interface BottomMenuProps {
  xpaths: string[];
  error: string | null;
  isLoading: boolean;
  screenshotUrl: string | null;
  width: number;
  widthInput: string;
  height: number | null;
  heightInput: string;
  useCustomHeight: boolean;
  onWidthInputChange: (value: string) => void;
  onHeightInputChange: (value: string) => void;
  onUseCustomHeightChange: (checked: boolean) => void;
  onScreenshotRequest: () => void;
  onDownload: () => void;
  onWidthBlur: () => void;
  onHeightBlur: () => void;
}

const BottomMenu: React.FC<BottomMenuProps> = ({
  xpaths,
  error,
  isLoading,
  screenshotUrl,
  width,
  widthInput,
  height,
  heightInput,
  useCustomHeight,
  onWidthInputChange,
  onHeightInputChange,
  onUseCustomHeightChange,
  onScreenshotRequest,
  onDownload,
  onWidthBlur,
  onHeightBlur,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "white",
        padding: "20px",
        maxHeight: "30%",
        overflowY: "auto",
      }}
    >
      {/* XPaths Section */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Selected Elements XPaths:</h3>
        <ul style={{ margin: "10px 0" }}>
          {xpaths.map((xpath, index) => (
            <li key={index}>{xpath}</li>
          ))}
        </ul>
      </div>

      {/* Screenshot Settings Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          padding: "15px",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "8px",
          marginBottom: "15px",
        }}
      >
        <h4 style={{ margin: 0 }}>Screenshot Settings</h4>

        {/* Width Control */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ width: "150px", color: "white" }}>
            Screenshot Width:
          </label>
          <input
            type="number"
            value={widthInput}
            onChange={(e) => onWidthInputChange(e.target.value)}
            onBlur={onWidthBlur}
            style={{
              width: "100px",
              padding: "5px",
              borderRadius: "4px",
              border: "none",
              color: "black",
            }}
            min="100"
            max="4000"
          />
        </div>

        {/* Height Control */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ width: "150px" }}>
            <input
              type="checkbox"
              checked={useCustomHeight}
              onChange={(e) => onUseCustomHeightChange(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            Cropped Height
          </label>
          {useCustomHeight && (
            <input
              type="number"
              value={heightInput}
              onChange={(e) => onHeightInputChange(e.target.value)}
              onBlur={onHeightBlur}
              style={{
                width: "100px",
                padding: "5px",
                borderRadius: "4px",
                border: "none",
                color: "black",
              }}
              min="100"
              max="4000"
            />
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={onScreenshotRequest}
          disabled={isLoading}
          style={{
            padding: "8px 20px",
            backgroundColor: "#4CAF50",
            border: "none",
            borderRadius: "4px",
            color: "white",
            cursor: isLoading ? "default" : "pointer",
          }}
        >
          {isLoading ? "Generating..." : "Generate Screenshot"}
        </button>
        {screenshotUrl && (
          <button
            onClick={onDownload}
            style={{
              padding: "8px 20px",
              backgroundColor: "#2196F3",
              border: "none",
              borderRadius: "4px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Download Screenshot
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            color: "#f44336",
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "rgba(244,67,54,0.1)",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default BottomMenu;
