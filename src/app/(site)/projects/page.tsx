import { boxCx } from "@/lib/box";
import { InfoCard } from "@/components/shared/InfoCard";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
	<div className={boxCx({ 
    surface: "transparent",
    width: "auto",
    gap: "md",
    items: "center", 
    justify: "start",
    className: "py-[max(env(safe-area-inset-bottom),var(--spacing-md))] sm:py-[var(--spacing-lg))]"
    })}
    style={{
      width: "clamp(20rem, 55vw, 96rem)",
      maxWidth: "96rem"
    }}>

    {/* title */}
    <div className={boxCx({ 
      surface: "muted", 
      paddingX: "md",
      paddingY: "md",
      width: "full",
      items: "start", 
      justify: "start",
      })}
      style={{
        width: "clamp(20rem, 55vw, 96rem)",
        maxWidth: "96rem"
      }}>
        <div className={boxCx({ 
        surface: "transparent", 
        paddingX: "md",
        items: "start", 
        justify: "start",
        className: "w-full border-b-1 navbar-short-borders-bottom rounded-none text-title"
        })}>
          projects
        </div>
    </div>

    {projects.map((project, index) => (
      <InfoCard
      key={index}
      data={project}
      className="w-full"
      />
    ))}
    
	</div>
  );
}