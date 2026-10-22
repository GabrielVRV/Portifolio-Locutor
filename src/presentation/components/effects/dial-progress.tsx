"use client";

import { useEffect, useRef } from "react";

const MIN_FREQUENCY = 88;
const MAX_FREQUENCY = 108;
const LABELS = [88, 92, 96, 100, 104, 108];

/**
 * Scroll progress drawn as an FM dial: the needle travels 88 → 108 MHz as the
 * page scrolls. Purely decorative, desktop only.
 */
export function DialProgress() {
  const needleRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      const frequency = MIN_FREQUENCY + progress * (MAX_FREQUENCY - MIN_FREQUENCY);

      if (needleRef.current) needleRef.current.style.left = `${progress * 100}%`;
      if (readoutRef.current) readoutRef.current.textContent = frequency.toFixed(1);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-5 left-1/2 z-40 hidden w-[min(560px,56vw)] -translate-x-1/2 items-center gap-4 rounded-full bg-ink/90 px-5 py-2 text-[10px] font-bold text-paper/60 tabular-nums shadow-2xl shadow-ink/30 backdrop-blur-xl lg:flex"
    >
      <span className="text-brand">FM</span>
      <div className="relative h-6 flex-1">
        <div
          className="absolute inset-x-0 top-0 h-2.5 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgb(250 248 242 / 0.5) 0 1px, transparent 1px 8px)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 flex justify-between leading-none">
          {LABELS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div
          ref={needleRef}
          className="absolute -top-1 h-8 w-0.5 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_10px_2px] shadow-brand/60"
          style={{ left: 0 }}
        />
      </div>
      <span ref={readoutRef} className="w-9 text-right text-paper">
        88.0
      </span>
    </div>
  );
}
