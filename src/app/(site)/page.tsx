import { Me } from "../../components/home/me";
import { Intro } from "../../components/home/intro";
import { About } from "../../components/home/about";
import { Links } from "../../components/home/links";
import { Wrench } from "lucide-react";
import { button, buttonCx } from "@/lib/button";
import Link from "next/link";


export default function HomePage() {
  return (
    <div className="flex flex-col justify-end gap-[1rem]">
      <div className="flex flex-row items-stretch"> 
        <Me />
        <Intro />
      </div>

      <div>
        <About />
        <Links />
      </div>

      <div className="fixed bottom-[4rem] right-[8rem]">
        <Link
          href="/workshop"
          className={buttonCx({
            className: "flex items-center gap-[0.5rem] text-[1.25rem] w-[16rem] h-[4rem] no-underline hover:underline cursor-target"})}>
          <Wrench className="size-[2rem]" />
          workshop
        </Link>
      </div>
    </div>
  );
}
