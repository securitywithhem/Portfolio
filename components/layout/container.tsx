import { cn } from "@/lib/utils";

/**
 * The one sanctioned content-width wrapper — every section in Phases 2+
 * composes inside it so max-width and horizontal rhythm stay identical
 * across the site. Server Component.
 */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-5xl px-6", className)}
      {...props}
    />
  );
}
