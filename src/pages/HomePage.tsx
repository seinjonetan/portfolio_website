import React from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import ResumeTimeline from "@/components/ResumeTimeline";
import Introduction from "@/components/Intorduction";
import SkillsList from "@/components/SkillsList";
import { skillsData } from "../../public/static/skillsData";
import "./HomePage.css";

type Experience = {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  institution: string;
  description?: string;
  type: "education" | "professional";
  children?: JSX.Element;
};

type CardDetails = {
  title: string;
  description: string;
};

const workCardDetails: CardDetails = {
  title: "Work Experience",
  description: "My professional experience in finance and research.",
};

const workExperience: Experience[] = [
  {
    id: "0",
    startDate: "2024-05",
    endDate: "Present",
    title: "Research Assistant",
    institution: "University of British Columbia",
    type: "professional",
    children: (
      <ul className="custom-bullet-list">
        <li>Professor Torsten Jaccard (Vancouver School of Economics)</li>
        <li>Merging customs import data with grocery store scanner data</li>
        <li>
          Using Fuzzy matching & BERT nlp to identify misspelled machine read
          ingredients
        </li>
        <li>Correlated city location choice</li>
      </ul>
    ),
  },
  {
    id: "1",
    startDate: "2024-05",
    endDate: "Present",
    title: "Research Assistant",
    institution: "University of British Columbia",
    type: "professional",
    children: (
      <ul className="custom-bullet-list">
        <li>Professor Scott Orr (Sauder School of Business)</li>
        <li>Multi product markups with joint production in firms</li>
        <li>
          Vertically integrated firm identification of arms length corporations
        </li>
      </ul>
    ),
  },
  {
    id: "2",
    startDate: "2024-05",
    endDate: "2024-09",
    title: "Graduate Academic Assistant",
    institution: "University of British Columbia",
    type: "professional",
    children: (
      <ul className="custom-bullet-list">
        <li>
          Designing R and Python workshops for students in the Masters in Food
          Resource Economics program
        </li>
      </ul>
    ),
  },
  {
    id: "3",
    startDate: "2023-09",
    endDate: "2024-04",
    title: "Graduate Teaching Assistant",
    institution: "University of British Columbia",
    type: "professional",
    children: (
      <ul className="custom-bullet-list">
        <li>Taught Intermediate Microeconomics and International Finance</li>
      </ul>
    ),
  },
  {
    id: "4",
    startDate: "2022-10",
    endDate: "2023-06",
    title: "Research Analyst",
    institution: "iFAST Corporation",
    type: "professional",
    children: (
      <ul className="custom-bullet-list">
        <li>
          Created and maintained financial models to analyze market trends.
        </li>
        <li>
          Provided investment recommendations to high net worth and retail
          investors.
        </li>
        <li>Hosted public videos and large scale in person events.</li>
      </ul>
    ),
  },
];

const educationCardDetails: CardDetails = {
  title: "Education",
  description: "My academic background in Econ.",
};

const educationExperience: Experience[] = [
  {
    id: "6",
    startDate: "2023-09",
    endDate: "2024-08",
    title: "MA in Economics",
    institution: "University of British Columbia",
    type: "education",
    children: (
      <div>
        <div className="mb-5">
          <ul className="custom-bullet-list">
            <li>Research Focus: Urban/Spatial Economics</li>
          </ul>
        </div>
        <a href="/research">
          <Button variant="outline" size="sm" className="hover:bg-slate-500">
            View Research
          </Button>
        </a>
      </div>
    ),
  },
  {
    id: "5",
    startDate: "2019-09",
    endDate: "2022-06",
    title: "Hons BA Economics",
    institution: "McMaster University",
    type: "education",
    children: (
      <div>
        <div className="mb-5">
          <ul className="custom-bullet-list">
            <li>Dean's Honour List 2020 - 2022</li>
            <li>Graduated Summa Cum Laude</li>
          </ul>
        </div>
      </div>
    ),
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
