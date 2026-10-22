import type { ReactNode } from "react";

import { ScrambleText } from "@/presentation/components/effects/scramble-text";
import { cn } from "@/shared/lib/cn";

interface SectionHeadingProps {
  readonly id: string;
  /** Section number, e.g. "01". */
  readonly index: string;
  readonly label: string;
  /** Heading content; wrap a word in <em> to make it gold italic. */
  readonly children: ReactNode;
  readonly align?: "left" | "center";
  readonly className?: string;
}

/**
 * Numbered section label that decodes like a signal, above a large serif title.
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
    <div className={cn(align === "center" && "text-center", className)}>
      <ScrambleText
        as="p"
        text={`${index} — ${label}`}
        className="font-mono text-xs tracking-[0.3em] text-gold uppercase"
      />
      <h2
        id={id}
        className="mt-5 font-serif text-5xl leading-[0.95] tracking-tight text-balance sm:text-7xl [&_em]:-mr-[0.06em] [&_em]:text-gold-gradient [&_em]:pr-[0.08em]"
      >
        {children}
      </h2>
    </div>
  );
}
