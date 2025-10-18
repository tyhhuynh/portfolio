import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/shared/navbar";
import TargetCursor from "@/components/shared/ui/TargetCursor";
import { Toaster } from "@/components/shared/ui/sonner";

export const metadata: Metadata = {
  title: "TH's Workshop",
  description: "drafts, debugs, discoveries",
};

export default function WorkshopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TargetCursor hideDefaultCursor={true} />
          <Navbar />
          <main className="min-h-screen flex items-start justify-center pt-[8rem] px-safe relative z-10">
            <div className="max-w-7xl">
              {children}
            </div>
          </main>
          <Toaster
            position="top-center"
            richColors={true}
            duration={3000}
            visibleToasts={3}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
