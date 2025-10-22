import Link from "next/link";
import { Me } from "@/components/home/me";
import { Intro } from "@/components/home/intro";
import { About } from "@/components/home/about";
import { Links } from "@/components/home/links";
import { Wrench } from "lucide-react";
import { buttonCx } from "@/lib/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/shared/ui/tooltip";


export default function HomePage() {
  return (
    <div className="flex flex-col gap-[var(--spacing-lg)] h-[screen] overflow-hidden">

      <div className="flex flex-row flex-wrap justify-evenly items-center pt-[var(--spacing-lg)]"> 
        <Me />
        <Intro />
      </div>

      <div className="flex flex-col flex-wrap items-center gap-[var(--spacing-md)]">
        <About />
        <Links />
      </div>

      <div className="absolute bottom-[calc(var(--spacing-lg)*2)] right-[calc(var(--spacing-xl)*2)] z-50 pointer-events-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/workshop"
                className={buttonCx({
                  surface: "primary",
                  minHeight: "lg",
                  width: "xxl",
                  fontSize: "md",
                  padding: "md",
                  gap: "md",
                  className: "no-underline hover:underline cursor-target"
                })}>
                <Wrench className="size-[var(--spacing-lg)]" />
                workshop
              </Link>
            </TooltipTrigger>
            {/* <TooltipContent sideOffset={8} >
              <p>collection of prototypes, scraps, and digital toys</p>
            </TooltipContent> */}
          </Tooltip>
      </div>
      
    </div>
  );
}