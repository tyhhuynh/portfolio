import { FaTools } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { box } from "@/lib/box";

export default function ExperiencePage() {
  return (
	<div className={box({ surface: "muted", direction: "row", items: "center", className: "justify-start my-[16rem] rounded-xl" })}>
	  <FaTools size={64} className="mx-[1rem]" />
	  <h1>page is currently under construction</h1>
	  <FaGear size={64} className="mx-[1rem]" />
	</div>
  );
}