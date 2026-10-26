import { Fragment } from "react";

import { Bolt } from "@/presentation/components/bolt";
import { cn } from "@/shared/lib/cn";

interface MarqueeProps {
  readonly items: readonly string[];
  readonly className?: string;
  /** Colour of the bolts between items. */
  readonly accentClassName?: string;
}

/**
 * An endless ribbon of words. The list is rendered twice and shifted by half
 * its width, so the loop is seamless. Static under reduced motion.
 */
export function Marquee({ items, className, accentClassName = "text-brand" }: MarqueeProps) {
  const run = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <Fragment key={item}>
          <span className="px-6 sm:px-10">{item}</span>
          <Bolt className={cn("h-[0.9em] w-[0.45em]", accentClassName)} delayMs={index * 400} />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="flex w-max motion-safe:animate-marquee">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
