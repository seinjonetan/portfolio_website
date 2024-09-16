import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTheme } from "../ThemeProvider"; // Import the useTheme hook
import GithubIcon from "@/icons/GithubIcon"; // Updated import
import LinkedinIcon from "@/icons/LinkedinIcon"; // Updated import
import MailIcon from "@/icons/MailIcon";

export function ContactForm({ id }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // To handle submission status

  const { theme } = useTheme(); // Use the useTheme hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await fetch(`${NODE_API}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (response.ok) {
        setStatus("Data submitted successfully");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("Error submitting data");
      }
    } catch (error) {
      setStatus("Error submitting data");
    }
  };

  return (
    <div
      id={id}
      className={`grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 p-6 md:p-10 ${
        theme === "dark"
          ? "dark:bg-black dark:text-foreground"
          : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-2">
          <a href="mailto:seinjonetan@proton.me">
            <MailIcon
              className={`w-6 h-6 ${
                theme === "dark"
                  ? "text-primary hover:text-gray-600"
                  : "text-black hover:text-gray-600"
              }`}
            />
          </a>
          <span>Email me at seinjonetan@proton.me</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/seinjonetan/"
            className={`text-muted-foreground hover:text-primary hover:text-gray-600 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            <GithubIcon className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/sein-jone-tan-01b7422a6/"
            className={`text-muted-foreground hover:text-primary hover:text-gray-600 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            <LinkedinIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
      <Card
        className={`${
          theme === "dark"
            ? "dark:bg-card dark:text-card-foreground"
            : "bg-white text-black"
        }`}
        disableHover
      >
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Get in touch</CardTitle>
            <CardDescription>
              If you're interested in hiring me, collaborating on a project, or
              simply want to leave a comment, please fill out the form below.
              For those looking to hire or collaborate, don't forget to include
              your contact information so I can get back to you as soon as
              possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className={`${
                    theme === "dark"
                      ? "dark:text-card-foreground"
                      : "text-black"
                  }`}
                >
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${
                    theme === "dark"
                      ? "dark:bg-card dark:text-card-foreground dark:border-card-foreground hover:bg-slate-800"
                      : "bg-white text-black border-black hover:bg-slate-200"
                  }`}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={`${
                    theme === "dark"
                      ? "dark:text-card-foreground"
                      : "text-black"
                  }`}
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${
                    theme === "dark"
                      ? "dark:bg-card dark:text-card-foreground dark:border-card-foreground hover:bg-slate-800"
                      : "bg-white text-black border-black hover:bg-slate-200"
                  }`}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className={`${
                  theme === "dark" ? "dark:text-card-foreground" : "text-black"
                }`}
              >
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`${
                  theme === "dark"
                    ? "dark:bg-card dark:text-card-foreground dark:border-card-foreground hover:bg-slate-800"
                    : "bg-white text-black border-black hover:bg-slate-200"
                }`}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="message"
                className={`${
                  theme === "dark" ? "dark:text-card-foreground" : "text-black"
                }`}
              >
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`min-h-[100px] ${
                  theme === "dark"
                    ? "dark:bg-card dark:text-card-foreground dark:border-card-foreground hover:bg-slate-800"
                    : "bg-white text-black border-black hover:bg-slate-200"
                }`}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className={`${
                theme === "dark"
                  ? "dark:bg-primary dark:text-primary-foreground"
                  : "bg-black text-white"
              }`}
            >
              Submit
            </Button>
            <div className="ml-4">{status && <p>{status}</p>}</div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
