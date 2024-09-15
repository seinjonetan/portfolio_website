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
        description="This demo showcases some simple webscraping logic for historical snapshots of wikipedia pages using the wayback machine. 
        This demo begain as a tool who my friend Guillermo used to scrape wikipedia for historical snapshots of pages for politicians. 
        He performed sentiment analysis on these pages using a language model to determine if there is a negative bias towards conservative politicians. 
        You can read all about his paper using the link below. 
        This demo returns the 3 oldest snapshots of any wikipedia page, which you will be able to download as a csv. 
        It also uses websockets to update the page with the progress of the scraping."
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
