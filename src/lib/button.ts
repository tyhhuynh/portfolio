import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const button = cva(
  "inline-flex items-center justify-center border-0 hover:scale-105 focus-visible-ring rounded-md transition-all duration-100",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        primary: "bg-primary text-primary-foreground hover:bg-primary/50",
        secondary: "bg-muted text-muted-foreground hover:bg-muted/90",
        selected: "bg-primary text-primary-foreground hover:bg-primary/50",
        unselected: "bg-muted text-muted-foreground hover:bg-muted/50",
      },
      size: {
        default: "",
        sm: "h-8 text-sm rounded-md",
        md: "h-10 text-base rounded-md",
        lg: "h-12 text-base rounded-md",
        icon: "h-10 w-10 rounded-md",
      },
      padding: {
        default: "p-[0.25rem]",
        half: "p-[0.5rem]",
        one: "p-[1rem]"
      },
      fullWidth: { true: "w-full" },
      round: { true: "rounded-full" },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export type ButtonVariants = VariantProps<typeof button>;

export function buttonCx({
  className,
  ...variants
}: ButtonVariants & { className?: string }) {
  return twMerge(clsx(button(variants), className));
}