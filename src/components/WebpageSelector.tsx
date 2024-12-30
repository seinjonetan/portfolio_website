import { useState, useEffect } from "react";
import TopMenu from "./ui/TopMenu";
import BottomMenu from "./ui/BottomMenu";

interface Preset {
  width: number;
  height: number | null;
  useCustomHeight: boolean;
  xpaths: string[];
}

interface DomainPresets {
  [domain: string]: Preset;
}

const getDomainFromUrl = (url: string): string => {
  try {
    const urlObject = new URL(url);
    return urlObject.hostname;
  } catch {
    return "";
  }
};

const loadPresets = (): DomainPresets => {
  const savedPresets = localStorage.getItem("domainPresets");
  return savedPresets ? JSON.parse(savedPresets) : {};
};

const savePreset = (domain: string, preset: Preset) => {
  const presets = loadPresets();
  presets[domain] = preset;
  localStorage.setItem("domainPresets", JSON.stringify(presets));
};

const WebpageSelector = () => {
  const [xpaths, setXpaths] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [proxyUrl, setProxyUrl] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("https://www.example.com");

  const [pendingSelections, setPendingSelections] = useState<string[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

  const [width, setWidth] = useState<number>(1200);
  const [widthInput, setWidthInput] = useState<string>("1200");
  const [height, setHeight] = useState<number | null>(null);
  const [heightInput, setHeightInput] = useState<string>("800");
  const [useCustomHeight, setUseCustomHeight] = useState<boolean>(false);

  const [presets, setPresets] = useState<DomainPresets>(loadPresets());

  useEffect(() => {
    const domain = getDomainFromUrl(urlInput);
    const preset = presets[domain];

    if (preset) {
      setWidth(preset.width);
      setWidthInput(preset.width.toString());
      setHeight(preset.height);
      setHeightInput(preset.height?.toString() || "800");
      setUseCustomHeight(preset.useCustomHeight);
      setXpaths(preset.xpaths);
    } else {
      setWidth(1200);
      setWidthInput("1200");
      setHeight(null);
      setHeightInput("800");
      setUseCustomHeight(false);
      setXpaths([]);
    }
  }, [urlInput]);

  useEffect(() => {
    const domain = getDomainFromUrl(urlInput);
    if (domain && xpaths.length > 0) {
      const preset: Preset = {
        width,
        height: useCustomHeight ? height : null,
        useCustomHeight,
        xpaths: xpaths,
      };
      savePreset(domain, preset);
      setPresets(loadPresets());
    }
  }, [width, height, useCustomHeight, xpaths]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.xpath) {
        setPendingSelections((prev) => [...prev, event.data.xpath]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleUrlSubmit = () => {
    setProxyUrl(
      `https://node-screenshot-8dli.onrender.com/proxy?url=${encodeURIComponent(
        urlInput
      )}&inject=true`
    );

    setTimeout(() => {
      const iframe = document.getElementById(
        "webpage-iframe"
      ) as HTMLIFrameElement;
      iframe?.contentWindow?.postMessage(
        {
          type: "hideElements",
          xpaths: xpaths,
        },
        "*"
      );
    }, 500);

    if (presets) {
      setIsPreview(true);
    }
  };

  const handleConfirm = () => {
    if (pendingSelections.length > 0) {
      const newXpaths = [...xpaths, ...pendingSelections];
      setXpaths(newXpaths);

      const iframe = document.getElementById(
        "webpage-iframe"
      ) as HTMLIFrameElement;
      iframe?.contentWindow?.postMessage(
        { type: "hideElements", xpaths: pendingSelections },
        "*"
      );
      setPendingSelections([]);
      setIsPreview(true);
    }
  };

  const handleCancel = () => {
    setPendingSelections([]);
    const iframe = document.getElementById(
      "webpage-iframe"
    ) as HTMLIFrameElement;
    iframe?.contentWindow?.postMessage("clearSelections", "*");
  };

  const handleReset = () => {
    handleCancel();

    setIsPreview(false);
    setXpaths([]);

    const iframe = document.getElementById(
      "webpage-iframe"
    ) as HTMLIFrameElement;
    iframe?.contentWindow?.postMessage("resetView", "*");

    // Clear preset for current domain
    const domain = getDomainFromUrl(urlInput);
    if (domain) {
      const updatedPresets = { ...presets };
      delete updatedPresets[domain];
      localStorage.setItem("domainPresets", JSON.stringify(updatedPresets));
      setPresets(updatedPresets);
    }
  };

  const handleScreenshotRequest = async () => {
    setIsLoading(true);
    setError(null);
    setScreenshotUrl(null);
    try {
      const response = await fetch(
        `https://python-endpoint-80e83f10e840.herokuapp.com/screenshot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: urlInput,
            height: useCustomHeight ? height : null,
            width: width,
            xpaths: xpaths,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate screenshot");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setScreenshotUrl(objectUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate screenshot"
      );
    } finally {
      setIsLoading(false);
    }

    const domain = getDomainFromUrl(urlInput);
    if (domain) {
      const preset: Preset = {
        width,
        height: useCustomHeight ? height : null,
        useCustomHeight,
        xpaths: xpaths,
      };
      savePreset(domain, preset);
      setPresets(loadPresets());
    }
  };

  const handleDownload = () => {
    if (screenshotUrl) {
      const link = document.createElement("a");
      link.href = screenshotUrl;
      link.download = "screenshot.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    return () => {
      if (screenshotUrl) {
        URL.revokeObjectURL(screenshotUrl);
      }
    };
  }, [screenshotUrl]);

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "80vh",
          margin: "20px 0",
          padding: 0,
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          borderRadius: "8px",
        }}
      >
        <TopMenu
          urlInput={urlInput}
          onUrlChange={setUrlInput}
          onUrlSubmit={handleUrlSubmit}
          handleReset={handleReset}
          isPreview={isPreview}
          isPresets={Object.keys(presets).length > 0}
        />

        <iframe
          id="webpage-iframe"
          src={proxyUrl}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />

        {pendingSelections.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0,0,0,0.8)",
              color: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p>Pending Selections:</p>
            <ul style={{ textAlign: "left", marginBottom: "15px" }}>
              {pendingSelections.map((xpath, index) => (
                <li key={index}>{xpath}</li>
              ))}
            </ul>
            <button
              onClick={handleConfirm}
              style={{
                marginRight: "10px",
                padding: "5px 15px",
                backgroundColor: "#4CAF50",
                border: "none",
                borderRadius: "4px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Confirm All
            </button>
            <button
              onClick={handleCancel}
              style={{
                padding: "5px 15px",
                backgroundColor: "#f44336",
                border: "none",
                borderRadius: "4px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Cancel All
            </button>
          </div>
        )}

        <BottomMenu
          xpaths={xpaths}
          error={error}
          isLoading={isLoading}
          screenshotUrl={screenshotUrl}
          width={width}
          widthInput={widthInput}
          height={height}
          heightInput={heightInput}
          useCustomHeight={useCustomHeight}
          onWidthInputChange={(val) => {
            setWidthInput(val);
            const num = Number(val);
            if (!isNaN(num)) {
              const clamped = Math.max(100, Math.min(4000, num));
              setWidth(clamped);
            }
          }}
          onHeightInputChange={(val) => {
            setHeightInput(val);
            const num = Number(val);
            if (!isNaN(num)) {
              const clamped = Math.max(100, Math.min(4000, num));
              setHeight(clamped);
            }
          }}
          onUseCustomHeightChange={setUseCustomHeight}
          onScreenshotRequest={handleScreenshotRequest}
          onDownload={handleDownload}
          onWidthBlur={() => {
            const num = Number(widthInput);
            if (isNaN(num) || num < 100) {
              setWidthInput("100");
              setWidth(100);
            } else if (num > 4000) {
              setWidthInput("4000");
              setWidth(4000);
            }
          }}
          onHeightBlur={() => {
            const num = Number(heightInput);
            if (isNaN(num)) {
              setHeightInput("100");
              setHeight(100);
            }
          }}
        />
      </div>
    </div>
  );
};

export default WebpageSelector;
