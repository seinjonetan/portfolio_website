import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Briefcase, GraduationCap } from "lucide-react";
import { useTheme } from "../ThemeProvider"; // Adjust the import path as needed

type Experience = {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  institution: string;
  description: string;
  type: "education" | "professional";
  children?: JSX.Element;
};

type CardDetails = {
  title: string;
  description: string;
};

type ResumeTimelineProps = {
  id?: string;
  experiences: Experience[];
  cardDetails: CardDetails; // Update to a single CardDetails object
};

export default function ResumeTimeline({
  id,
  experiences,
  cardDetails,
}: ResumeTimelineProps) {
  const { theme } = useTheme(); // Use the useTheme hook

  return (
    <div id={id} className="container mx-auto p-4">
      <Card
        className={`mb-8 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
        disableHover
      >
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {cardDetails.title}
          </CardTitle>
          {cardDetails.description && (
            <CardDescription>{cardDetails.description}</CardDescription>
          )}{" "}
          {/* Use the description prop */}
        </CardHeader>
      </Card>
      <div className="space-y-8">
        {experiences.map((exp) => (
          <Card
            key={exp.id}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
              theme === "dark" ? "dark:bg-black" : "bg-white"
            }`}
          >
            <div className="absolute top-0 left-0 h-full w-1 bg-primary"></div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  {exp.title}
                </CardTitle>
                {exp.type === "education" ? (
                  <GraduationCap className="h-6 w-6 text-primary" />
                ) : (
                  <Briefcase className="h-6 w-6 text-primary" />
                )}
              </div>
              <CardDescription>{exp.institution}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {exp.startDate} - {exp.endDate}
              </div>
              <p className="text-foreground">{exp.description}</p>
            </CardContent>
            {exp.children && <CardFooter>{exp.children}</CardFooter>}
          </Card>
        ))}
      </div>
    </div>
  );
}
