"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonCx } from "@/lib/button";
import { TimeDateBox } from "@/components/shared/time-date";
import { ThemeButton } from "@/components/shared/theme-buttom";
import { ContactDialog } from "@/components/shared/contact-dialog";


export function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "home" },
    { href: "/experience", label: "experience" },
    { href: "/projects", label: "projects" }
  ];

  return (
    <nav className={"flex w-[90%] mx-auto border-b-1 navbar-short-borders-bottom bg-background/80 backdrop-blur pt-[1rem]"}>
      <div className="container px-[0.5rem]">
        <div className="flex h-16">

          {/* l-section: time & location */}
          <div className="flex w-1/5 items-center pb-[0.2rem]">
            <TimeDateBox />
          </div>

          {/* center section: home, exp, projects buttons */}
          <div className="flex flex-1 items-center justify-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={buttonCx({
                    variant: isActive ? "selected" : "unselected",
                    className: "w-[16rem] text-[1.33rem] px-[3rem] py-[0.33rem] ml-[1rem] mr-[1rem] no-underline hover:underline cursor-target"
                  })}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* contact button */}
            <ContactDialog />
          </div>

          {/* R-section: toggle theme button */}
          <div className="flex w-1/5 items-center justify-end">
            <ThemeButton />
          </div>
        </div>
      </div>
    </nav>
  );
}