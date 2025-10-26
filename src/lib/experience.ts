import { InfoCardData } from "@/components/shared/InfoCard";

export const experiences: InfoCardData[] = [
  {
    title: "Client Software Developer",
    period: "April 2025 - June 2025",
    picture: {
      src: "/images/codelab.png",
      alt: "CodeLab",
      href: "https://codelabdavis.com/"
    },
    techStack: ["Next.JS", "React", "Tailwind CSS", "FastAPI", "Playwright API", "OpenAI API", "PostgreSQL", "Microsoft Azure"],
    description: "Developed a full-stack platform that automated sustainability data collection and summarization by integrating OpenAI's API with a Python-based web-scraping pipeline. Directed Frontend development, schema design, and API integration, ensuring smooth coordination across developer and design teams.",
    link: {
      text: "Read more about the project here",
      href: "https://codelabdavis.medium.com/company-z-e20927c9feaf"
    }
  },
  {
    title: "Open-Source Software Developer", 
    period: "February 2025 - April 2025",
    picture: {
      src: "/images/codelab-os.png",
      alt: "CodeLab Open-Source Logo",
      href: "https://os.codelabdavis.com/"
    },
    techStack: ["Next.JS", "Tailwind CSS", "ShadCN", "Storybook"],
    description: "Proposed and built a Stepper component for CodeLab's open-source UI library after contributing a reusable Progress Bar. The experience strengthened understanding of scalable front-end architecture and led to the acceptance in the Client cohort."
  },
  {
    title: "IET: Jr. Computer Room Consultant",
    period: "September 2024 - August 2025", 
    picture: {
      src: "/images/ucd-iet.png",
      alt: "UCD: IET Logo",
      href: "https://iet.ucdavis.edu/"
    },
    description: "Maintained reliability across seven campus computer labs by resolving hardware, network, and account-related issues on both Windows and macOS systems. Delivered tailored technical support to students and faculty while managing a database for lost and found items."
  }
];