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
            justify: "center",
            padding: "custom",
            gap: "none",
            className: "max-w-[56rem] m-[0rem] py-[1rem] gap-x-[2rem]"})}>

            <button
              onClick={() => window.open("https://www.linkedin.com/in/tyhhuynh")}
              className={button({ 
                variant: "unselected", 
                className: "flex items-center gap-[0.5rem] py-[0.25rem] w-[12rem] text-[1.5rem] cursor-target" })}>
              <Linkedin className="size-[2rem]"/> linkedin
            </button>

            <button
              onClick={() => window.open("https://www.github.com/tyhhuynh")}
              className={button({ 
                variant: "unselected", 
                className: "flex items-center gap-[0.5rem] py-[0.25rem] w-[12rem] text-[1.5rem] cursor-target" })}>
              <Github className="size-[2rem]"/> github
            </button>

            <button
              onClick={handleCopy}
              className={button({ 
                variant: "unselected", 
                className: "flex items-center gap-[0.5rem] py-[0.25rem] w-[12rem] text-[1.5rem] cursor-target" })}>
              <Mail className="size-[2rem]"/> email
            </button>

            <button
              onClick={() => window.open("/tyhuynh_resume.pdf")}
              className={button({ 
                variant: "unselected", 
                className: "flex items-center gap-[0.5rem] py-[0.25rem] w-[12rem] text-[1.5rem] cursor-target" })}>
              <FileUser className="size-[2rem]"/>resume
            </button>
        </div>
    )
}