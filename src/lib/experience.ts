import { InfoCardData } from "@/components/shared/InfoCard";

export const experiences: InfoCardData[] = [
  {
    title: "Client-Associate Software Developer",
    period: "April 2025 - July 2025",
    picture: {
      src: "/images/codelab.png",
      alt: "CodeLab",
      href: "https://codelabdavis.com/"
    },
    techStack: ["Next.JS", "React", "Tailwind CSS", "FastAPI", "Playwright API", "OpenAI API", "PostgreSQL", "Microsoft Azure"],
    description: "Developed a full-stack internal tool that automated the extraction, summarization, and storage of specific data, which populated on a scalable analytics dashboard that displayed key insights.",
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
    description: "Developed two reusable components (Progress Bar & Stepper) for CodeLab's open-source UI library, which led to the understanding of scalable front-end architecture and the acceptance into Client cohort."
  },
  {
    title: "IET: Jr. Computer Room Consultant",
    period: "September 2024 - August 2025", 
    picture: {
      src: "/images/ucd-iet.png",
      alt: "UCD: IET Logo",
      href: "https://iet.ucdavis.edu/"
    },
    description: "Maintained system stability across seven campus computer labs by resolving IT-related issues such as hardware, software, network, and account authentication/authorization on both Windows and macOS systems. Delivered onsite technical support and troubleshooting to students and faculty while managing a database for lost & found items."
  }
];