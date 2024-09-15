import React from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { ContactForm } from "@/components/ContactForm";
import DemoStory from "@/components/DemoStory";
import NewsChart from "@/components/NewsChart";

const NewsTempPage: React.FC = () => {
  return (
    <div>
      <DemoStory
        title="News Thermometer"
        description="This demo showcases a tool designed to scrape the internet for news articles and perform sentiment analysis on the extracted text. 
        The sentiment analysis is conducted using advanced natural language processing techniques, where the 'temperature' is calculated as the difference between negative and positive sentiments. 
        A higher temperature indicates more negative sentiment. 
        Below, you'll find a line graph component that allows users to select specific dates to view the sentiment data. 
        Users can toggle between viewing the temperature and raw sentiment scores. 
        Please note that selecting dates for which data is unavailable will result in no data being displayed."
      />
      <NavigationBar />
      <NewsChart />
      <ContactForm id="contact" />
    </div>
  );
};

export default NewsTempPage;
