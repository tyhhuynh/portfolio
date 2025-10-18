import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const box = cva(
  // Base shape/elevation + default surface
  "rounded-md border-0",
  {
    variants: {

      // Surface colors (theme-aware)
      surface: {
        card: "bg-card text-card-foreground",
        popover: "bg-popover text-popover-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        muted: "bg-muted text-muted-foreground",
        transparent: "bg-transparent text-foreground"
      },

      // Internal padding scale
      padding: {
        default: "p-[0.5rem]",
        custom: "p-[0rem]"
      },

      layout: { flex: "flex" },

      // Flex-only variants
      direction: {
        row: "flex-row",
        col: "flex-col",
      },
      
      justify: {
        start: "justify-start",
        center: "justify-center",
        between: "justify-between",
        end: "justify-end",
      },

      items: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
      },

      // spacing for flex children
      gap: {
        none: "gap-0",
        sm: "gap-[2px]",
        default: "gap-[2px]",
        lg: "gap-[0.5rem]",
      },

    },

    defaultVariants: {
      surface: "secondary",
      padding: "default",
      layout: "flex",
      direction: "col",
      justify: 'between',
      items: "start",
      gap: "default",
    },
  }
);

export type BoxVariants = VariantProps<typeof box>;

export function boxCx({
  className,
  ...variants
}: BoxVariants & { className?: string }) {
  return twMerge(clsx(box(variants), className));
}
