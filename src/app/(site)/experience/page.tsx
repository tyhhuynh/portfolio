import { FaTools } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { boxCx } from "@/lib/box";

export default function ExperiencePage() {
  return (
    <div className={boxCx({ 
      surface: "muted", 
      direction: "row", 
      paddingY: "lg",
      items: "center", 
      justify: "start",
      className: "my-[12rem] rounded-xl" 
    })}>
      <FaTools size={64} className="mx-[1rem]" />
      <h1>page is currently under construction</h1>
      <FaGear size={64} className="mx-[1rem]" />
    </div>
    );
  }