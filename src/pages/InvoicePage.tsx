import React from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { ContactForm } from "@/components/ContactForm";
import DemoStory from "@/components/DemoStory";
import Generator from "@/components/Generator";

const InvoicePage: React.FC = () => {
  return (
    <div>
      <DemoStory
        title="Amazing Demo"
        description="This demo showcases our groundbreaking technology that revolutionizes the way we interact with data."
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        paperTitle="Innovative Approaches in Data Interaction"
        paperUrl="https://example.com/paper.pdf"
        socialLinks={[
          { type: "linkedin", url: "https://www.linkedin.com/in/johndoe" },
          { type: "twitter", url: "https://twitter.com/johndoe" },
          { type: "github", url: "https://github.com/johndoe" },
        ]}
      />
      <NavigationBar />
      <Generator />
      <ContactForm id="contact" />
    </div>
  );
};

export default InvoicePage;
