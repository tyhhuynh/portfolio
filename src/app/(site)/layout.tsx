import type { Metadata } from 'next';
import '../globals.css';
import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/shared/navbar';
import TargetCursor from '@/components/shared/ui/TargetCursor';
import { Toaster } from '@/components/shared/ui/sonner';
import { ThemeDither } from '@/components/shared/ui/ThemeDither';

export const metadata: Metadata = {
  title: 'Tyler Huynh',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed inset-0 z-0">
            {/* <ThemeDither /> */}
          </div>

          <TargetCursor hideDefaultCursor={true} />
          <Navbar />
          <main className="min-h-screen flex items-start justify-center px-safe relative pointer-events-none">
            <div className="max-w-7xl">{children}</div>
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
