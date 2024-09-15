import React from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { ContactForm } from "@/components/ContactForm";
import ResearchPreview from "@/components/ResearchPreview";

const ResearchPage: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <ResearchPreview />
      <ContactForm id="contact" />
    </div>
  );
};

export default ResearchPage;
