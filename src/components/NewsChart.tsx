import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/ThemeProvider";
import ChartControls from "./ChartControls";

export default function NewsChart() {
  const [showConfidence, setShowConfidence] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date(2024, 8, 4));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [data, setData] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("src/static/cache.json");
        const jsonData = await response.json();
        console.log(jsonData);

        const processedData = jsonData.map((item: any) => ({
          ...item,
          temperature: item.averageNegative - item.averagePositive,
        }));

        setData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(
    (item) => new Date(item.date) >= startDate && new Date(item.date) <= endDate
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Daily News Temperature</h2>
        <p className="text-lg text-gray-600">
          Track the daily temperature and confidence levels
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-3/4">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
                  borderColor: theme === "dark" ? "#374151" : "#E5E7EB",
                }}
                labelStyle={{ color: theme === "dark" ? "#D1D5DB" : "#374151" }}
              />
              {!showConfidence && (
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke={theme === "dark" ? "#10B981" : "#059669"}
                  strokeWidth={2}
                />
              )}
              {showConfidence && (
                <>
                  <Line
                    type="monotone"
                    dataKey="averagePositive"
                    stroke={theme === "dark" ? "#34D399" : "#10B981"}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="averageNeutral"
                    stroke={theme === "dark" ? "#FBBF24" : "#F59E0B"}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="averageNegative"
                    stroke={theme === "dark" ? "#EF4444" : "#DC2626"}
                    strokeWidth={2}
                  />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ChartControls
          startDate={startDate}
          endDate={endDate}
          showConfidence={showConfidence}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setShowConfidence={setShowConfidence}
        />
      </div>
    </div>
  );
}
