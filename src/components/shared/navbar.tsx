"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { boxCx } from "@/lib/box";
import { buttonCx } from "@/lib/button";
import { TimeDateBox } from "@/components/shared/time-date";
import { ThemeButton } from "@/components/shared/theme-button";
import { ContactDialog } from "@/components/shared/contact-dialog";


export function Navbar({}: { className?: string }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "home" },
    { href: "/experience", label: "experience" },
    { href: "/projects", label: "projects" }
  ];

  return (
    <div
      className={boxCx({
        className: "flex w-[95%] mx-auto bg-background/67 backdrop-blur py-[var(--spacing-md)]",
      })}>
      <nav className={"flex w-[95%] mx-auto border-b-1 navbar-short-borders-bottom flex-wrap justify-between sm:flex-nowrap"}>
        
        {/* l-section: time & location */}
        <div className="flex basis-1/2 min-w-0 items-center pb-[var(--spacing-xs)] order-1 sm:basis-1/5 sm:order-none">
          <TimeDateBox />
        </div>

        {/* center section: home, exp, projects buttons + contact dialog button */}
        <div className="flex basis-full order-3 items-center gap-[var(--spacing-md)] px-[var(--spacing-md)] pb-[var(--spacing-sm)] 
        sm:order-none sm:basis-auto sm:flex-1 sm:gap-[var(--spacing-lg) sm:px-[0] sm:pb-[0]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={buttonCx({
                  surface: isActive ? "selected" : "unselected",
                  minHeight: "lg",
                  fontSize: "md",
                  padding: "xs",
                  className: "flex flex-1 justify-center no-underline hover:underline"
                })}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <ContactDialog />
        </div>

        {/* R-section: toggle theme button */}
        <div className="flex basis-1/2 min-w-0 items-center justify-end pb-[var(--spacing-sm)] order-2 sm:basis-1/5 sm:order-none">
          <ThemeButton />
        </div>

      </nav>
    </div>
  );
}