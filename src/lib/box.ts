import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const box = cva(
  // Base shape/elevation + default surface
  "rounded-md border-0",
  {
    variants: {

      surface: {
        card: "bg-card text-card-foreground",
        popover: "bg-popover text-popover-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        muted: "bg-muted text-muted-foreground",
        transparent: "bg-transparent text-foreground"
      },

      layout: { flex: "flex" },

      direction: {
        row: "flex-row",
        col: "flex-col",
      },

      paddingX: {
        xs: "px-[var(--spacing-xs)]",
        sm: "px-[var(--spacing-sm)]",
        md: "px-[var(--spacing-md)]",
        lg: "px-[var(--spacing-lg)]",
        xl: "px-[var(--spacing-xl)]",
      },

      paddingY: {
        xs: "py-[var(--spacing-xs)]",
        sm: "py-[var(--spacing-sm)]",
        md: "py-[var(--spacing-md)]",
        lg: "py-[var(--spacing-lg)]",
        xl: "py-[var(--spacing-xl)]",
      },

      width: {
        auto: "w-auto",
        content: "max-w-prose",
        narrow: "max-w-[40rem]",
        default: "max-w-[56rem]",
        wide: "max-w-[72rem]",
        full: "w-full max-w-none",
      },

      gap: {
        none: "gap-0",
        xs: "gap-[var(--spacing-xs)]",
        sm: "gap-[var(--spacing-sm)]",
        md: "gap-[var(--spacing-md)]",
        lg: "gap-[var(--spacing-lg)]",
        xl: "gap-[var(--spacing-xl)]",
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
    },

    defaultVariants: {
      surface: "secondary",
      layout: "flex",
      direction: "col",
      gap: "sm",
      justify: 'between',
      items: "start"
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
