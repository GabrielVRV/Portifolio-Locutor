import type { ReactNode } from "react";

import { Bolt } from "@/presentation/components/bolt";
import { Reveal } from "@/presentation/components/effects/reveal";
import { ScrambleText } from "@/presentation/components/effects/scramble-text";
import { cn } from "@/shared/lib/cn";

interface SectionHeadingProps {
  readonly id: string;
  /** Section number, e.g. "01". */
  readonly index: string;
  readonly label: string;
  /** Heading content; wrap words in <em> to paint them with the highlighter. */
  readonly children: ReactNode;
  readonly align?: "left" | "center";
  readonly className?: string;
}

/**
 * Numbered label that decodes like a signal, above a bold title whose <em>
 * words get a marker stroke when the heading scrolls into view.
 */
export function SectionHeading({
  id,
  index,
  label,
  children,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn(align === "center" && "text-center", className)}>
      <p
        className={cn(
          "flex items-center gap-2 text-xs font-extrabold tracking-[0.25em] text-muted uppercase",
          align === "center" && "justify-center",
        )}
      >
        <Bolt className="h-4 w-2 text-current" />
        <ScrambleText text={`${index} — ${label}`} />
      </p>
      <h2
        id={id}
        className="with-markers mt-5 font-display text-5xl leading-[1.05] tracking-[0.02em] text-balance uppercase sm:text-7xl"
      >
        {children}
      </h2>
    </Reveal>
  );
}
