import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { RefreshCcw } from "lucide-react";
import zoomPlugin from "chartjs-plugin-zoom";
import { useTheme } from "@/ThemeProvider";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  zoomPlugin
);

type DataPoint = {
  x: number;
  y1: number; // Actual y value
  y2?: number; // Category y value (optional)
  name: string;
  size: number;
};

type ScatterplotProps = {
  data: DataPoint[];
  xAxisName: string;
  yAxisName: string;
  y1Legend?: string;
  y2Legend?: string; // Optional y2 legend
};

export default function Scatterplot({
  data,
  xAxisName,
  yAxisName,
  y1Legend,
  y2Legend,
}: ScatterplotProps) {
  const chartRef = useRef<ChartJS<"scatter">>(null);
  const [zoom, setZoom] = useState({ x: 1, y: 1 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  const isDarkMode = theme === "dark";

  const resetZoomPan = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
      setZoom({ x: 1, y: 1 });
      setPan({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    console.log("Scatterplot data:", data); // Log the received data
  }, [data]);

  // Find the maximum size in the data
  const maxSize = Math.max(...data.map((point) => point.size));
  const minSize = Math.min(...data.map((point) => point.size));
  const maxDisplaySize = 50; // Maximum display size for the largest point
  const minDisplaySize = 5; // Minimum display size for the smallest point

  const chartData = {
    datasets: [
      {
        label: y1Legend,
        data: data.map((point) => {
          const logSize = Math.log(point.size - minSize + 1); // Apply log transformation
          const normalizedSize =
            ((logSize - Math.log(1)) /
              (Math.log(maxSize - minSize + 1) - Math.log(1))) *
              (maxDisplaySize - minDisplaySize) +
            minDisplaySize; // Normalize size
          return {
            x: point.x,
            y: point.y1,
            name: point.name,
            size: normalizedSize,
            y1: point.y1,
            y2: point.y2,
          };
        }),
        backgroundColor: isDarkMode
          ? "rgba(255, 99, 132, 0.8)"
          : "rgba(255, 99, 132, 0.5)",
        pointRadius: (context) => {
          const point = context.raw as DataPoint;
          return point.size;
        },
        pointHoverRadius: (context) => {
          const point = context.raw as DataPoint;
          return Math.max(point.size, 10); // Ensure a minimum hover size of 10
        },
      },
      ...(y2Legend
        ? [
            {
              label: y2Legend,
              data: data.map((point) => {
                const logSize = Math.log(point.size - minSize + 1); // Apply log transformation
                const normalizedSize =
                  ((logSize - Math.log(1)) /
                    (Math.log(maxSize - minSize + 1) - Math.log(1))) *
                    (maxDisplaySize - minDisplaySize) +
                  minDisplaySize; // Normalize size
                return {
                  x: point.x,
                  y: point.y2,
                  name: point.name,
                  size: normalizedSize,
                  y1: point.y1,
                  y2: point.y2,
                };
              }),
              backgroundColor: isDarkMode
                ? "rgba(53, 162, 235, 0.8)"
                : "rgba(53, 162, 235, 0.5)",
              pointRadius: (context) => {
                const point = context.raw as DataPoint;
                return point.size;
              },
              pointHoverRadius: (context) => {
                const point = context.raw as DataPoint;
                return Math.max(point.size, 10); // Ensure a minimum hover size of 10
              },
            },
          ]
        : []),
    ],
  };

  const options: ChartOptions<"scatter"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear" as const,
        position: "bottom" as const,
        title: {
          display: true,
          text: xAxisName,
          color: isDarkMode ? "#e5e7eb" : "#374151",
        },
        ticks: {
          color: isDarkMode ? "#e5e7eb" : "#374151",
        },
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        type: "linear" as const,
        position: "left" as const,
        title: {
          display: true,
          text: yAxisName,
          color: isDarkMode ? "#e5e7eb" : "#374151",
        },
        ticks: {
          color: isDarkMode ? "#e5e7eb" : "#374151",
        },
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: !!y2Legend, // Conditionally display the legend
        position: "bottom" as const,
        labels: {
          color: isDarkMode ? "#e5e7eb" : "#374151",
        },
      },
      tooltip: {
        position: "nearest",
        caretPadding: 10,
        caretSize: 6,
        callbacks: {
          label: (context) => {
            const point = context.raw as DataPoint;
            const yValue =
              context.dataset.label === y1Legend ? point.y1 : point.y2;
            return `${point.name}: (${xAxisName}: ${point.x}, ${yAxisName}: ${yValue})`;
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "xy" as const,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy" as const,
        },
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [isDarkMode]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-10/12 max-w-6xl" disableHover>
        <CardHeader>
          <CardTitle>City Counterfactual Scatterplot</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="mb-4">
            When negatively shocking a particular city, the proposed model
            predicts cities that are the most correlated with the shocked city
            should benefit the most. Ie people will move to similar cities when
            their city is negatively shocked. This scatterplot shows the change
            in city shares when cities are highly correlated relative to when
            there is no correlation. The higher the relative change, the more a
            city benefits from a model with correlated choices. This plot
            illustartes unbalanced substiuttion patterns that benefits cities
            that are highly correlated with the shocked city. The size of the
            plot reflects the city's inital shares.
          </p>
          <p className="mb-6">
            The graph is interative, so feel free to zoom in and hover over the
            points to see the city names!
          </p>
          <Button
            className="mb-2"
            variant="outline"
            size="sm"
            onClick={resetZoomPan}
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Reset View
          </Button>
          <div className="h-[400px]">
            <Scatter ref={chartRef} options={options} data={chartData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
