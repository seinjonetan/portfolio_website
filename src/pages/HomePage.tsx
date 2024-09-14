import React from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import ResumeTimeline from "@/components/ResumeTimeline";
import Introduction from "@/components/Intorduction";
import SkillsList from "@/components/SkillsList";

type Experience = {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  institution: string;
  description: string;
  type: "education" | "professional";
  children: JSX.Element;
};

type CardDetails = {
  title: string;
  description: string;
};

const workCardDetails: CardDetails = {
  title: "Work Experience",
  description: "My professional experience in software development.",
};

const workExperience: Experience[] = [
  {
    id: "1",
    startDate: "2020-01-01",
    endDate: "2021-01-01",
    title: "Software Engineer",
    institution: "Tech Company",
    description:
      "Developing scalable web applications using React and Node.js.",
    type: "professional",
    children: (
      <div className="space-x-2">
        <Button variant="outline" size="sm" className="hover:bg-slate-500">
          View Projects
        </Button>
        <Button variant="outline" size="sm" className="hover:bg-slate-500">
          Request Reference
        </Button>
      </div>
    ),
  },
  // Add more experiences...
];

const educationCardDetails: CardDetails = {
  title: "Education",
  description: "My academic background in computer science.",
};

const educationExperience: Experience[] = [
  {
    id: "2",
    startDate: "2016-01-01",
    endDate: "2020-01-01",
    title: "Bachelor's Degree in Computer Science",
    institution: "University",
    description: "Graduated with honors.",
    type: "education",
    children: (
      <Button variant="outline" size="sm" className="hover:bg-slate-500">
        View Transcript
      </Button>
    ),
  },
];

const skillsData = [
  {
    name: "Programming Languages",
    skills: [
      {
        name: "JavaScript",
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      { name: "Python", link: "https://www.python.org/" },
      { name: "Java" },
    ],
  },
  {
    name: "Web Technologies",
    skills: [
      { name: "React", link: "https://reactjs.org/" },
      { name: "Next.js", link: "https://nextjs.org/" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    name: "Tools & Platforms",
    skills: [
      { name: "Git", link: "https://git-scm.com/" },
      { name: "Docker" },
      { name: "AWS" },
    ],
  },
];

const HomePage: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <Introduction />
      <SkillsList categories={skillsData} id="skills" />
      <ResumeTimeline
        id="work-experience"
        experiences={workExperience}
        cardDetails={workCardDetails}
      />
      <ResumeTimeline
        id="education"
        experiences={educationExperience}
        cardDetails={educationCardDetails}
      />
      <ContactForm id="contact" />
    </div>
  );
};

export default HomePage;
