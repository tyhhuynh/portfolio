import { boxCx } from "@/lib/box";

export default function ExperiencePage() {
  return (
    <div className={boxCx({ 
      surface: "transparent", 
      // direction: "col", 
      paddingY: "md",
      // width: "full",
      items: "center", 
      justify: "start",
      className: "w-[72rem] h-[36rem] border-1" 
    })}>
    {/* title */}
    <div className={boxCx({ 
      surface: "muted", 
      // direction: "col",
      paddingX: "lg",
      paddingY: "md",
      width: "full",
      items: "start", 
      justify: "start",
      className: ""
      })}>
        <div className={boxCx({ 
        surface: "transparent", 
        // direction: "col",
        paddingX: "md",
        // paddingY: "xs",
        width: "full",
        items: "start", 
        justify: "start",
        className: "border-b-1 navbar-short-borders-bottom rounded-none text-title"
        })}>
          experience
        </div>
    </div>

      {/* client */}
      <div className={boxCx({ 
      surface: "muted", 
      // direction: "col", 
      // paddingY: "lg",
      width: "full",
      items: "center", 
      justify: "start",
      className: "border-1"
      })}>
        <div className={boxCx({ 
      surface: "muted", 
      direction: "row", 
      // paddingY: "xl",
      width: "full",
      items: "center", 
      justify: "start",
      className: "border-1"
        })}>
          <div className={boxCx({ 
            surface: "muted", 
            // direction: "row", 
            paddingY: "lg",
            // width: "full",
            items: "center", 
            justify: "start",
            className: "border-1"
          })}>
            picture
          </div>

          <div className={boxCx({ 
            surface: "muted", 
            // direction: "row", 
            paddingY: "lg",
            width: "full",
            items: "start", 
            justify: "start",
            className: "border-1"
          })}>
            client software developer
          </div>

        </div>
        <div className={boxCx({ 
            surface: "muted", 
            direction: "row", 
            paddingY: "lg",
            width: "full",
            items: "center", 
            justify: "start",
            className: "border-1"
          })}>
            techstack
        </div>
        <div className={boxCx({ 
            surface: "muted", 
            direction: "row", 
            paddingY: "lg",
            width: "full",
            items: "center", 
            justify: "start",
            className: "border-1"
          })}>
            description
        </div>
      </div>
      
      {/* open-source */}
      <div className={boxCx({ 
      surface: "muted", 
      // direction: "col", 
      // paddingY: "lg",
      width: "full",
      items: "center", 
      justify: "start",
      className: "border-1"
      })}>
        <div className={boxCx({ 
      surface: "muted", 
      direction: "row", 
      // paddingY: "xl",
      width: "full",
      items: "center", 
      justify: "start",
      className: "border-1"
        })}>

          <div className={boxCx({ 
            surface: "muted", 
            // direction: "row", 
            paddingY: "lg",
            // width: "full",
            items: "center", 
            justify: "start",
            className: "border-1"
          })}>
            picture
          </div>

          <div className={boxCx({ 
            surface: "muted", 
            // direction: "row", 
            paddingY: "lg",
            width: "full",
            items: "start", 
            justify: "start",
            className: "border-1"
          })}>
            open-source software developer
          </div>

        </div>
        <div className={boxCx({ 
            surface: "muted", 
            direction: "row", 
            paddingY: "lg",
            width: "full",
            items: "center", 
            justify: "start",
            className: "border-1"
          })}>
            techstack
          </div>
          <div className={boxCx({ 
            surface: "muted", 
            direction: "row", 
            paddingY: "lg",
            width: "full",
            items: "center", 
            justify: "start",
            className: "border-1"
          })}>
            description
          </div>
      </div>

      {/* iet */}
      <div className={boxCx({ 
      surface: "muted", 
      // direction: "col", 
      // paddingY: "lg",
      width: "full",
      items: "center", 
      justify: "start",
      className: "border-1"
      })}>
        <div className={boxCx({ 
      surface: "muted", 
      direction: "row", 
      // paddingY: "xl",
      width: "full",
      items: "center", 
      justify: "start",
      className: "border-1"
        })}>

          <div className={boxCx({ 
            surface: "muted", 
            // direction: "row", 
            paddingY: "lg",
            // width: "full",
            items: "center", 
            justify: "start",
            className: "border-1"
          })}>
            picture
          </div>

          <div className={boxCx({ 
            surface: "muted", 
            // direction: "row", 
            paddingY: "lg",
            width: "full",
            items: "start", 
            justify: "start",
            className: "border-1"
          })}>
            IET: jr. computer room consultant
          </div>

        </div>
        <div className={boxCx({ 
            surface: "muted", 
            direction: "row", 
            paddingY: "lg",
            width: "full",
            items: "center", 
            justify: "start",
            className: "border-1"
          })}>
            techstack
          </div>
          <div className={boxCx({ 
            surface: "muted", 
            direction: "row", 
            paddingY: "lg",
            width: "full",
            items: "center", 
            justify: "start",
            className: "border-1"
          })}>
            description
          </div>
      </div>

    </div>
  );
}