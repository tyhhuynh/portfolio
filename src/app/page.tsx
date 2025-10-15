import { AboutSection } from "../components/about/about";

export default function HomePage() {
  const boxClass = "p-6 rounded-md border bg-secondary";

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="p-12 rounded-md border bg-secondary">
        test padding
        <div className="md:col-span-1">
          <AboutSection boxClass={boxClass} />
        </div>
      </div>
    </main>
  );
}
