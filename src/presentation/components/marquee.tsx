import { Fragment } from "react";

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
      {items.map((item) => (
        <Fragment key={item}>
          <span className="px-6 sm:px-8">{item}</span>
          <span aria-hidden="true" className="text-[0.6em]">
            ✦
          </span>
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
