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

export function ContactForm({ id }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const { theme } = useTheme(); // Use the useTheme hook

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ name, email, phone, message });
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
          <a href="#">
            <MailIcon
              className={`w-6 h-6 ${
                theme === "dark"
                  ? "text-primary hover:text-gray-600"
                  : "text-black hover:text-gray-600"
              }`}
            />
          </a>
          <span>Email me at example@email.com</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className={`text-muted-foreground hover:text-primary hover:text-gray-600 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            <GithubIcon className="w-6 h-6" />
          </a>
          <a
            href="#"
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
              Fill out the form below and I'll get back to you as soon as
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
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

function GithubIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
