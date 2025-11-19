import { InfoCardData } from "@/components/shared/InfoCard";

export const experiences: InfoCardData[] = [
  {
    title: "Client Software Developer",
    period: "April 2025 - July 2025",
    picture: {
      src: "/images/codelab.png",
      alt: "CodeLab",
      href: "https://codelabdavis.com/"
    },
    techStack: ["Next.JS", "React", "Tailwind CSS", "FastAPI", "Playwright API", "OpenAI API", "PostgreSQL", "Microsoft Azure"],
    description: "Developed a full-stack web application that extracted, summarized, and stored data, which populated a scalable dashboard that displayed key metrics.",
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
    description: "Maintained system stability across seven campus computer labs by resolving IT-related issues such as hardware, network, and account access/permissions on both Windows and macOS systems. Delivered tailored technical support to students and faculty while managing a database for lost and found items."
  }
];