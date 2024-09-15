import React from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { ContactForm } from "@/components/ContactForm";
import DemoStory from "@/components/DemoStory";
import WebScraper from "@/components/WebScraper";

const InvoicePage: React.FC = () => {
  return (
    <div>
      <DemoStory
        title="Wikipedia Webscraper"
        description="This demo showcases a sophisticated web scraping tool designed to gather and analyze historical snapshots of Wikipedia articles. 
        Initially developed for a project by my colleague Guillermo, this tool scrapes Wikipedia for historical snapshots of pages for politicians using the Wayback Machine. 
        The primary objective was to perform sentiment analysis on these pages using the BERT base uncased language model to determine if there is a negative bias towards conservative politicians. 
        The demo also features a websocket implementation to provide live updates on the scraping progress. 
        For a deeper understanding of the methodology and findings, you can refer to Guillermo's comprehensive paper linked below."
        paperTitle="Righting the Writers: Assessing Bias in Wikipedia’s Political Content — An Event Study and Sentiment Analysis"
        paperUrl="https://github.com/gillyparra/righting_the_writers/blob/main/Summer_Research_Paper.pdf"
        socialLinks={[
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/guillermo-parra-1b2290189/",
          },
          { type: "github", url: "https://github.com/gillyparra" },
          { type: "website", url: "https://guillermoparra.com/" },
        ]}
        socialHeading="Connect with Guillermo"
      />
      <NavigationBar />
      <WebScraper />
      <ContactForm id="contact" />
    </div>
  );
};

export default InvoicePage;
