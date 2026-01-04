import { InfoCardData } from "@/components/shared/InfoCard";

export const projects: InfoCardData[] = [
  {
    title: "AI-Powered Resume Auditor",
    period: "November 2025 - December 2025",
    picture: {
      src: "/images/ai-audit.png",
      alt: "AI-Auditor project logo",
      href: "https://github.com/tyhhuynh/resume-auditor"
    },
    techStack: ["Python, OpenAI API, Anthropic API, Pydantic, asyncio, pytest"],
    description: "A CLI tool that compares a resume to any job description using a multi-LLM pipeline. Claude extracts requirements from the JD, GPT cross-validates analysis with automatic retry on low accuracy (QA feedback), then generates tailored bullet rewrites, missing keywords, and quick-learn skill suggestions. Outputs a report in JSON."
  },
  {
    title: "Real-Time Hand Gesture Recognition",
    period: "September 2025 - November 2025",
    picture: {
      src: "/images/hand-seal.png",
      alt: "Naruto Tiger Hand Seal",
      href: "https://huggingface.co/spaces/tyhu02/naruto-hand-seals"
    },
    techStack: ["Python, TensorFlow/Keras, OpenCV, Gradio"],
    description: "Trained a VGG16 neural network on a custom dataset of 7200+ images to recognize the 12 hand seals from Naruto. Deployed the model on Hugging Face for live recognition with 93% accuracy."
  },
  {
    title: "CoDraw",
    period: "October 2025",
    picture: {
      src: "/images/codraw.png",
      alt: "CoDraw's Favicon",
      href: "https://codraw.tyhh.dev"
    },
    techStack: ["React, TypeScript, Vite.js, Tailwind CSS, Cloudflare Workers and Durable Objects, WebSockets"],
    description: "A simple digital chalkboard built for real-time collaboration. Create a private room, share the link, and start drawing together with others."
  },
  {
    title: "Innovation & Research Lab: HackNight Micro-Grant Project",
    period: "March 2025 - June 2025",
    picture: {
      src: "/images/mipi.png",
      alt: "MiPi Logo",
      href: "https://ucdhacknight.com/portfolio/picloud"
    },
    techStack: ["Raspberry Pi 5, PiVPN (WireGuard), Pi-hole, RetroPie, Jellyfin"],
    description: "Weekly demos at UCD's Student Startup Center about home-lab projects using a Pi5.",
    link: {
      text: "Read more about the project here",
      href: "https://ucdhacknight.com/portfolio/picloud"
    }
  },
];