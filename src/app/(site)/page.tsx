import Link from "next/link";
import { Me } from "@/components/home/me";
import { Intro } from "@/components/home/intro";
import { About } from "@/components/home/about";
import { Links } from "@/components/home/links";
import { Wrench } from "lucide-react";
import { buttonCx } from "@/lib/button";
// import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/shared/ui/tooltip";


export default function HomePage() {
  return (
    <div className="flex flex-col gap-[var(--spacing-lg)] overflow-hidden pb-[max(env(safe-area-inset-bottom),var(--spacing-lg))]">

      <div className="flex flex-row flex-wrap justify-evenly items-center pt-[var(--spacing-lg)]"> 
        <Me />
        <Intro />
      </div>

      <div className="flex flex-col items-center gap-[var(--spacing-md)] px-[var(--spacing-xl)]">
        <About />
        <Links />
      </div>

      <div className="
      w-full flex justify-center px-[var(--spacing-xl)]
      static 
      sm:fixed sm:w-auto sm:flex-none
      sm:bottom-[calc(var(--spacing-lg)*2)] sm:right-[calc(var(--spacing-xl)*2)] 
      z-50 pointer-events-auto">
        <Link
          href="/workshop"
          className={buttonCx({
            surface: "primary",
            minHeight: "lg",
            width: "xxl",
            fontSize: "md",
            padding: "md",
            gap: "sm",
            className: "flex-1 no-underline hover:underline"
          })}>
          <Wrench className="size-[var(--spacing-lg)]" />
          workshop
        </Link>
      </div>
      
    </div>
  );
}