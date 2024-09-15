import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useTheme } from "@/ThemeProvider";

interface ControlsProps {
  startDate: Date;
  endDate: Date;
  showConfidence: boolean;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setShowConfidence: (show: boolean) => void;
}

const ChartControls: React.FC<ControlsProps> = ({
  startDate,
  endDate,
  showConfidence,
  setStartDate,
  setEndDate,
  setShowConfidence,
}) => {
  const { theme } = useTheme();

  return (
    <Card className="w-full lg:w-1/4">
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="start-date-picker">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="start-date-picker"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? (
                  format(startDate, "PPP")
                ) : (
                  <span>Pick a start date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar selected={startDate} onSelect={setStartDate} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date-picker">End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="end-date-picker"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? (
                  format(endDate, "PPP")
                ) : (
                  <span>Pick an end date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar selected={endDate} onSelect={setEndDate} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="confidence-mode"
            checked={showConfidence}
            onCheckedChange={setShowConfidence}
            className="relative inline-flex items-center h-6 rounded-full w-11 bg-blue-500"
          >
            <span className="sr-only">Toggle Confidence</span>
            <span
              className={`${
                showConfidence ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
          <Label htmlFor="confidence-mode">Show Confidence</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartControls;
