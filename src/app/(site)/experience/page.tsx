import { boxCx } from "@/lib/box";
import { InfoCard } from "@/components/shared/InfoCard";
import { experiences } from "@/lib/experience";

export default function ExperiencePage() {
  return (
    <div className={boxCx({ 
      surface: "transparent",
      width: "auto",
      gap: "md",
      items: "center", 
      justify: "start",
    })}
    style={{
      width: "clamp(20rem, 55vw, 96rem)",
      maxWidth: "96rem"
    }}>

    {/* title */}
    <div className={boxCx({ 
      surface: "muted", 
      paddingX: "lg",
      paddingY: "md",
      width: "full",
      items: "start", 
      justify: "start",
      })}>
        <div className={boxCx({ 
        surface: "transparent", 
        paddingX: "md",
        width: "full",
        items: "start", 
        justify: "start",
        className: "border-b-1 navbar-short-borders-bottom rounded-none text-title"
        })}>
          experience
        </div>
    </div>

    {experiences.map((experience, index) => (
        <InfoCard 
        key={index} 
        data={experience}
        />
      ))}

    </div>
  );
}