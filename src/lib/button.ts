import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const button = cva(
  "inline-flex items-center justify-center border-0 hover:scale-105 focus-visible-ring rounded-md transition-all duration-100",
  {
    variants: {

      surface: {
        default: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        primary: "bg-primary text-primary-foreground hover:bg-primary/50",
        secondary: "bg-muted text-muted-foreground hover:bg-muted/90",
        selected: "bg-primary text-primary-foreground hover:bg-primary/50",
        unselected: "bg-muted text-muted-foreground hover:bg-muted/50",
      },

      minHeight: {
        sm: "min-h-[clamp(2.25rem, calc(0.6vw + 1.5rem), 2.75rem)]",  // ~36–44px
        md: "min-h-[clamp(2.5rem, calc(0.8vw + 1.75rem), 3.25rem)]",  // ~40–52px
        lg: "min-h-[clamp(3rem, calc(1vw + 2rem), 4rem)]",            // ~48–64px
      },

      width: {
        auto: "w-auto",
        full: "w-full",
        sm: "w-[var(--spacing-xl)]",          // ~2rem
        md: "w-[calc(var(--spacing-xl)*2)]",  // ~4rem  
        lg: "w-[calc(var(--spacing-xl)*3)]",  // ~6rem
        xl: "w-[calc(var(--spacing-xl)*4)]",  // links
        xxl: "w-[calc(var(--spacing-xl)*5)]", // workshop
        xxxl: "w-[calc(var(--spacing-xl)*6)]" // navbar
      },

      fontSize: {
        sm: "text-[length:var(--text-caption)]",
        md: "text-[length:var(--text-body)]", 
        lg: "text-[length:var(--text-action)]",
        xl: "text-[length:var(--text-title)]",
      },

      iconSize: {
        xs: "size-[var(--spacing-sm)]",
        sm: "size-[var(--spacing-md)]",
        md: "size-[var(--spacing-lg)]", 
        lg: "size-[var(--spacing-xl)]",
      },

      padding: {
        xs: "p-[var(--spacing-xs)]",
        sm: "p-[var(--spacing-sm)]",
        md: "p-[var(--spacing-md)]",
        lg: "p-[var(--spacing-lg)]",
        xl: "p-[var(--spacing-xl)]",
      },

      gap: {
        none: "gap-0",
        xs: "gap-[var(--spacing-xs)]",
        sm: "gap-[var(--spacing-sm)]", 
        md: "gap-[var(--spacing-md)]",
        lg: "gap-[var(--spacing-lg)]",
      },

      focus: { 
        subtle: "focus-visible:ring-1", 
        strong: "focus-visible:ring-2" 
      },

    },

    defaultVariants: { 
      surface: "primary", 
      // minHeight: "md",
      // fontSize: "md",
      // iconSize: "md",
      // padding:"sm",
      // gap: "sm", 
    },
  }
);

export type ButtonVariants = VariantProps<typeof button>;

export function buttonCx({
  className,
  ...variants
}: ButtonVariants & { className?: string }) {
  return twMerge(clsx(button(variants), className));
}