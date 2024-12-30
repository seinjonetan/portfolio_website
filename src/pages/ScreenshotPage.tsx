import React from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { ContactForm } from "@/components/ContactForm";
import DemoStory from "@/components/DemoStory";
import WebpageSelector from "@/components/WebpageSelector";

const ScreenshotPage: React.FC = () => {
  return (
    <div>
      <DemoStory
        title="Webpage Screenshot Tool"
        description="This tool was created to help a friend who needed an easier way to take clean, customizable screenshots of webpages. 
        With this tool, users can visually select and delete specific elements of a webpage before taking a screenshot. 
        It also allows users to define the horizontal and vertical resolutions to alter the screenshot's size and crop the page. 
        The tool stores presets for each domain in local storage, which are loaded every time a link with that domain is entered. 
        Resetting the parameters will reset the domain's presets. 
        Once the page is customized, users can download the screenshot with a single click.
        For users with adblock enabled, the ad elements have been removed from the page, preventing them from being selected, resulting in a screenshot with ads.
        To enable the ad elements to be selected, users should disable the adblocker for the page."
      />
      <NavigationBar />
      <WebpageSelector />
      <ContactForm id="contact" />
    </div>
  );
};

export default ScreenshotPage;
