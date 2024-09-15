import React from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { ContactForm } from "@/components/ContactForm";
import DemoStory from "@/components/DemoStory";
import Generator from "@/components/Generator";

const InvoicePage: React.FC = () => {
  return (
    <div>
      <DemoStory
        title="Invoice Generator"
        description="This project began as a solution for a friend who needed to send invoices for lessons they conducted every month. 
        The requirement was to generate an invoice for each student, with charges based on the number of hours their lessons took on any given day. 
        This app simplifies the invoicing process by generating a CSV template for any given month when a CSV file containing students' names is uploaded. 
        After filling out this template with the relevant lesson details and uploading the completed file, the app generates a ZIP file containing individual invoices for each student. 
        The app also features real-time progress updates via websockets, ensuring users are informed throughout the process."
        videoUrl="https://www.youtube.com/embed/s-mjPzXMvu8"
      />
      <NavigationBar />
      <Generator />
      <ContactForm id="contact" />
    </div>
  );
};

export default InvoicePage;
