import { boxCx } from "@/lib/box";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export interface InfoCardData {
  title: string;
  period: string;
  picture?: {
    src: string;
    alt: string;
    href?: string; // Optional URL for clickable pictures
  };
  techStack?: string[];
  description?: string;
  link?: {
    text:string;
    href:string;
  };
}

interface InfoCardProps {
  data: InfoCardData;
  className?: string;
}

export function InfoCard({ data, className }: InfoCardProps) {
  const PictureComponent = () => {
    const imageElement = (
      <Image
        src={data.picture?.src || "/images/placeholder.svg"}
        alt={data.picture?.alt || "Company logo"}
        width={80}
        height={80}
        className="w-[clamp(3rem, 4vw, 5rem)] h-[clamp(3rem, 4vw, 5rem)] object-contain"
      />
    );

    // If there's a URL, wrap in Link, otherwise return just the image
    if (data.picture?.href) {
      return (
        <Link 
          href={data.picture.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          {imageElement}
        </Link>
      );
    }

    return imageElement;
  };

  return (
    <div className={boxCx({ 
      surface: "muted", 
      items: "start", 
      justify: "start",
      className: `${className || ""}`
    })}>
      {/* Header Section - Picture + Title/Period */}
      <div className={boxCx({ 
        surface: "muted", 
        direction: "row", 
        items: "center", 
        justify: "start",
      })}>

        {/* Picture Container */}
        <div className={boxCx({ 
          surface: "muted", 
          paddingY: "md",
          paddingX: "md",
          items: "center", 
          justify: "start",
          className: "cursor-target"
        })}>
          {data.picture ? <PictureComponent /> : "picture"}
        </div>

        {/* Title and Period Container */}
        <div className={boxCx({ 
          surface: "muted", 
          gap: "none",
          items: "start", 
          justify: "start",
        })}>
          <p className="text-action">{data.title}</p>
          <p className="italic text-caption">{data.period}</p>
        </div>
      </div>

      {data.techStack && (
        <div className={boxCx({ 
          surface: "muted", 
          direction: "row",
          paddingX: "md",
          items: "center", 
          justify: "start",
          className: "border-b-2 navbar-short-borders-bottom rounded-none mx-[var(--spacing-sm)] font-bold text-caption"
        })}>
          {data.techStack.join(", ")}
        </div>
      )}

      {data.description && (
        <div className={boxCx({ 
          surface: "muted", 
          direction: "row",
          paddingX: "sm",
          items: "center", 
          justify: "start",
          className: "text-body"
        })}>
          {data.description}
        </div>
      )}

      {data.link && (
        <div className={boxCx({ 
          surface: "muted", 
          direction: "row",
          paddingX: "sm",
          paddingY: "sm",
          items: "center", 
          justify: "start",
          className: "text-caption"
        })}>
          <Link 
            href={data.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex hover:underline text-secondary items-between gap-[var(--spacing-sm)] cursor-target"
          >
            {data.link.text} <ExternalLink className="size-[var(--spacing-lg)]" />
          </Link>
        </div>
      )}
    </div>
  );
}