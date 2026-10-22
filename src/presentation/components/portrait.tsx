import Image from "next/image";
import type { ReactNode } from "react";

import type { Photo } from "@/domain/entities/announcer";
import { Bolt } from "@/presentation/components/bolt";
import { cn } from "@/shared/lib/cn";

interface PortraitProps {
  /** A cut-out photo (transparent background). */
  readonly portrait: Photo;
  /** Floating elements placed over the composition (chips, badges). */
  readonly children?: ReactNode;
  readonly className?: string;
}

/**
 * The cut-out portrait composed like the logo: a paper disc, an offset ink
 * speech-bubble outline and sparks of lightning. The head rises above the
 * disc while the body stays inside its round bottom edge.
 */
export function Portrait({ portrait, children, className }: PortraitProps) {
  return (
    <div className={cn("relative aspect-[4/5] w-full", className)}>
      {/* Speech-bubble outline, offset like the logo */}
      <div
        aria-hidden="true"
        className="absolute right-[9%] bottom-[4%] aspect-square w-[88%] rounded-full border-[3px] border-ink"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        className="absolute bottom-[1%] left-[4%] w-[17%] overflow-visible text-ink"
      >
        <path
          d="M30 6 6 36l30-12"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Disc */}
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 aspect-square w-[88%] rounded-full bg-paper"
      />

      {/* Portrait clipped to a "U": straight sides, round bottom, open top */}
      <div className="absolute right-0 bottom-0 h-full w-[88%] overflow-hidden rounded-b-full">
        <div className="absolute bottom-0 left-1/2 aspect-square w-[112%] -translate-x-1/2">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            fill
            sizes="(min-width: 1024px) 32rem, 90vw"
            loading="eager"
            fetchPriority="high"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      <Bolt className="absolute top-[6%] right-[2%] h-16 w-8 rotate-12 text-ink" />
      <Bolt className="absolute top-[18%] -right-[4%] h-10 w-5 rotate-45 text-ink" delayMs={700} />

      {children}
    </div>
  );
}
