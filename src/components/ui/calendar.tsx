import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
} from "date-fns";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useTheme } from "@/ThemeProvider";

type CustomComponents = {
  IconLeft?: (props: any) => JSX.Element;
  IconRight?: (props: any) => JSX.Element;
};

type CalendarProps = {
  className?: string;
  classNames?: Record<string, string>;
  showOutsideDays?: boolean;
  selected?: Date;
  onSelect?: (date: Date) => void;
  components?: CustomComponents;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  const { theme } = useTheme();
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div
      className={cn(
        "p-3 relative z-50 rounded-md",
        className,
        theme === "dark" ? "bg-black" : "bg-white"
      )}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 p-0 opacity-50 hover:opacity-100"
          )}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button
          onClick={handleNextMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 p-0 opacity-50 hover:opacity-100"
          )}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={cn(
              "relative p-0 text-center text-sm flex-1 cursor-pointer",
              !isSameMonth(day, currentMonth) && !showOutsideDays
                ? "hidden"
                : "",
              isToday(day) ? "bg-accent text-accent-foreground" : "",
              isSameDay(day, selected) ? "bg-blue-500 text-white" : "",
              theme === "dark" ? "bg-black" : "bg-white"
            )}
            onClick={() => onSelect && onSelect(day)}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
