"use client";

import { boxCx } from "@/lib/box";
import { buttonCx } from "@/lib/button";
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
        <div className={boxCx({ 
          surface: "transparent",
          direction: "row",
          width: "full",
          gap: "md",
          className: "flex-wrap"
        })}>

            <button
              onClick={() => window.open("https://www.linkedin.com/in/tyhhuynh")}
              className={buttonCx({ 
                surface: "unselected", 
                fontSize: "md",
                padding: "sm",
                gap: "sm",
                className: "flex flex-1 items-center" 
              })}>
              <Linkedin className="size-[var(--spacing-lg)]"/> linkedin
            </button>

            <button
              onClick={() => window.open("https://www.github.com/tyhhuynh")}
              className={buttonCx({ 
                surface: "unselected",
                fontSize: "md",
                padding: "sm",
                gap: "sm", 
                className: "flex flex-1 items-center" 
              })}>
              <Github className="size-[var(--spacing-lg)]"/> github
            </button>

            <button
              onClick={handleCopy}
              className={buttonCx({ 
                surface: "unselected", 
                fontSize: "md",
                padding: "sm",
                gap: "sm",
                className: "flex flex-1 items-center" 
              })}>
              <Mail className="size-[var(--spacing-lg)]"/> email
            </button>

            <button
              onClick={() => window.open("/tyhuynh_resume.pdf")}
              className={buttonCx({ 
                surface: "unselected", 
                fontSize: "md",
                padding: "sm",
                gap: "sm",
                className: "flex flex-1 items-center" 
              })}>
              <FileUser className="size-[var(--spacing-lg)]"/>resume
            </button>
        </div>
    )
}