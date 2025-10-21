"use client";

import { useState } from "react";
import { box, boxCx } from "@/lib/box";
import { button, buttonCx } from "@/lib/button";
import { Github, Linkedin, Mail, FileUser } from "lucide-react";
import { toast } from "sonner";


export function Links() {

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText("tyler02huy@gmail.com");
            toast.success("email copied to clipboard!");
        } catch (err) {
            console.error("ERROR:", err);
            toast.error("failed to copy email");
        }
    };

    return (
        <div className={box({ 
          surface: "transparent",
          direction: "row",
          paddingX: "xs", // tbd
          paddingY: "lg",
          width: "auto", //tbd
          gap: "lg",
          justify: "between",
        })}>

            <button
              onClick={() => window.open("https://www.linkedin.com/in/tyhhuynh")}
              className={button({ 
                surface: "unselected", 
                // minHeight: "sm",
                width: "xl",
                fontSize: "md",
                padding: "sm",
                gap: "sm",
                // flex items-center gap-[0.5rem] py-[0.25rem] w-[12rem] text-[1.5rem]
                className: "flex items-center cursor-target" 
              })}>
              <Linkedin className="size-[var(--spacing-lg)]"/> linkedin
            </button>

            <button
              onClick={() => window.open("https://www.github.com/tyhhuynh")}
              className={button({ 
                surface: "unselected",
                // minHeight: "lg",
                width: "xl",
                fontSize: "md",
                padding: "sm",
                gap: "sm", 
                className: "flex items-center cursor-target" 
              })}>
              <Github className="size-[var(--spacing-lg)]"/> github
            </button>

            <button
              onClick={handleCopy}
              className={button({ 
                surface: "unselected", 
                // minHeight: "lg",
                width: "xl",
                fontSize: "md",
                padding: "sm",
                gap: "sm",
                className: "flex items-center cursor-target" 
              })}>
              <Mail className="size-[var(--spacing-lg)]"/> email
            </button>

            <button
              onClick={() => window.open("/tyhuynh_resume.pdf")}
              className={button({ 
                surface: "unselected", 
                // minHeight: "lg",
                width: "xl",
                fontSize: "md",
                padding: "sm",
                gap: "sm",
                className: "flex items-center cursor-target" 
              })}>
              <FileUser className="size-[var(--spacing-lg)]"/>resume
            </button>
        </div>
    )
}