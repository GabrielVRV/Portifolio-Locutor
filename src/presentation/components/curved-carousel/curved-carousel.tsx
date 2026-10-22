"use client";

import { type ReactNode, useEffect, useId, useRef, useState } from "react";

import { cn } from "@/shared/lib/cn";

import {
  type CarouselLayout,
  CAMERA,
  MAX_TILE_WIDTH,
  hiddenShare,
  measure,
  radiusShare,
  toRadians,
} from "./geometry";

/*
 * A row of tiles streaming right to left around the inside of a cylinder.
 * A CSS box can't bend, so each tile is cut into vertical strips, each a flat
 * facet of the cylinder showing its share of the tile. The strips sit still
 * inside their tile and the tile (preserve-3d) is what moves: one rotateY
 * carries it along the arc, so its strips can never drift apart. Motion is
 * transform-only on the compositor; the fade is a static mask over it.
 * Adapted from the "Scroll Tilted Grid" hero to render any React content.
 */

/** Overlap between strips; 1px still shows seams on flat colours when scaled. */
const SEAM_OVERLAP_PX = 2;

interface CurvedCarouselProps<T> {
  /** Items stream in order; a tile takes the next one each time it wraps. */
  readonly items: readonly T[];
  readonly renderItem: (item: T) => ReactNode;
  /** Seconds for the row to advance by one tile. */
  readonly speed?: number;
  /** Tile height as % of the frame height. */
  readonly tileHeight?: number;
  /** Tile width divided by tile height. */
  readonly aspectRatio?: number;
  /** Space between tiles as % of the tile height. */
  readonly gap?: number;
  /** Vertical centre of the row as % of the frame height. */
  readonly axis?: number;
  /** Degrees the row has bent by the frame edge (clamped to 5–85). */
  readonly curve?: number;
  /** Width of the edge fade as % of the frame width. */
  readonly fade?: number;
  /** Strips per tile: more is smoother, fewer is cheaper. */
  readonly slices?: number;
  readonly className?: string;
}

export function CurvedCarousel<T>({
  items,
  renderItem,
  speed = 4,
  tileHeight = 30,
  aspectRatio = 16 / 10,
  gap = 8,
  axis = 50,
  curve = 70,
  fade = 10,
  slices = 14,
  className,
}: CurvedCarouselProps<T>) {
  const frameRef = useRef<HTMLDivElement>(null);
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const orbit = `carousel-orbit-${id}`;
  const tileClass = `carousel-tile-${id}`;
  const bend = toRadians(Math.min(85, Math.max(5, curve)));

  // Null until measured: the band stays hidden so a wrong-size first paint never shows.
  const [layout, setLayout] = useState<CarouselLayout | null>(null);
  // Which item each tile shows. It only changes when a tile wraps, out of sight.
  const [shown, setShown] = useState<Record<number, number>>({});

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      const next = measure({ width, height, tileHeight, aspectRatio, gap, bend });
      setLayout((prev) =>
        prev?.columns === next.columns && prev.sweep === next.sweep && prev.unit === next.unit
          ? prev
          : next,
      );
    });

    observer.observe(frame);
    return () => observer.disconnect();
  }, [tileHeight, aspectRatio, gap, bend]);

  const current =
    layout ?? measure({ width: 1200, height: 560, tileHeight, aspectRatio, gap, bend });
  const { columns, sweep, unit } = current;

  // Every length is a multiple of the tile height, which follows the frame
  // height until MAX_TILE_WIDTH caps it on narrow screens.
  const tileUnit = `min(${tileHeight}cqh, ${+(MAX_TILE_WIDTH / aspectRatio).toFixed(4)}cqw)`;
  const u = (n: number) => `calc(${+n.toFixed(4)} * ${tileUnit})`;

  const radiusPct = 100 * radiusShare(bend);
  const radius = `${+radiusPct.toFixed(3)}cqw`;
  // Out to the axis, around it, back in: a box sits on the cylinder at that angle.
  const turn = (deg: number) =>
    `translateZ(${radius}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${radius})`;

  const hide = hiddenShare(current);
  const keyframes =
    `@keyframes ${orbit}{` +
    `from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}` +
    `0%,${hide}%,${100 - hide}%,100%{visibility:hidden}` +
    `${hide + 0.001}%,${100 - hide - 0.001}%{visibility:visible}}` +
    // Pausing keeps every tile placed by its negative delay: a finished still.
    `@media(prefers-reduced-motion:reduce){.${tileClass}{animation-play-state:paused}}`;

  const share = aspectRatio / slices;
  const duration = columns * speed;
  const mask = `linear-gradient(90deg,transparent,#000 ${fade}%,#000 ${100 - fade}%,transparent)`;
  const corner = u(0.06);

  return (
    <div
      ref={frameRef}
      className={cn("relative overflow-hidden", className)}
      style={{ containerType: "size" }}
    >
      <style>{keyframes}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: layout ? 1 : 0,
          perspective: `${+(radiusPct * CAMERA).toFixed(3)}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {items.length > 0 &&
          Array.from({ length: columns }, (_, tile) => {
            // Tile `columns - 1` starts nearest the exit, so this is the order tiles come on.
            const first = columns - 1 - tile;
            const item = items[(shown[tile] ?? first) % items.length] as T;
            const content = renderItem(item);

            return (
              <div
                key={tile}
                className={cn(tileClass, "absolute")}
                style={{
                  left: `calc(50% - ${u(aspectRatio / 2)})`,
                  top: `calc(${axis}% - ${u(0.5)})`,
                  width: u(aspectRatio),
                  height: u(1),
                  transformStyle: "preserve-3d",
                  animation: `${orbit} ${duration}s linear ${-tile * speed}s infinite`,
                }}
                onAnimationIteration={(event) => {
                  // elapsedTime counts whole loops, missed events included.
                  const lap = Math.round(event.elapsedTime / duration);
                  const next = lap * columns + first;
                  setShown((prev) => (prev[tile] === next ? prev : { ...prev, [tile]: next }));
                }}
              >
                {Array.from({ length: slices }, (_, strip) => {
                  const isFirst = strip === 0;
                  const isLast = strip === slices - 1;
                  return (
                    <div
                      key={strip}
                      className="absolute top-0 overflow-hidden"
                      style={{
                        left: u((aspectRatio - share) / 2),
                        // Wider than its share so neighbouring facets overlap and no
                        // hairline opens between them, even on scaled-down screens.
                        width: isLast ? u(share) : `calc(${u(share)} + ${SEAM_OVERLAP_PX}px)`,
                        height: u(1),
                        borderRadius: isFirst
                          ? `${corner} 0 0 ${corner}`
                          : isLast
                            ? `0 ${corner} ${corner} 0`
                            : undefined,
                        transform: turn((aspectRatio / 2 - (strip + 0.5) * share) * unit),
                      }}
                    >
                      <div
                        className="absolute top-0"
                        style={{
                          left: u(-strip * share),
                          width: u(aspectRatio),
                          height: u(1),
                          containerType: "size",
                        }}
                      >
                        {content}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
