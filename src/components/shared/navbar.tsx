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
    <nav className={"flex w-[90%] mx-auto border-b-1 navbar-short-borders-bottom bg-background/80 backdrop-blur pt-[var(--spacing-md)]"}>
      {/* <div className="flex"> */}

        {/* l-section: time & location */}
        <div className="flex w-1/5 items-center pb-[var(--spacing-xs)]">
          <TimeDateBox />
        </div>

        {/* center section: home, exp, projects buttons + contact dialog button */}
        <div className="flex flex-1 items-center gap-[var(--spacing-lg)]">
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
                  className: "flex flex-1 justify-center no-underline hover:underline cursor-target"
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
        <div className="flex w-1/5 items-end justify-end pb-[var(--spacing-sm)]">
          <ThemeButton />
        {/* </div> */}
      </div>
    </nav>
  );
}