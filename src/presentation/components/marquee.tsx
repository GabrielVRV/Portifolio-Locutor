import { Fragment } from "react";

import { Bolt } from "@/presentation/components/bolt";
import { cn } from "@/shared/lib/cn";

interface MarqueeProps {
  readonly items: readonly string[];
  readonly className?: string;
}

/**
 * An endless ribbon of words. The list is rendered twice and shifted by half
 * its width, so the loop is seamless. Static under reduced motion.
 */
export function Marquee({ items, className }: MarqueeProps) {
  const run = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <Fragment key={item}>
          <span className="px-6 sm:px-10">{item}</span>
          <Bolt className="h-[0.9em] w-[0.45em] text-brand" delayMs={index * 400} />
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
