"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { BrandMark } from "@/presentation/components/brand-mark";
import { scrambleFrame, seededRandom } from "@/presentation/components/effects/scramble";
import { cn } from "@/shared/lib/cn";
import { prefersReducedMotion } from "@/shared/lib/motion";

import { INTRO_SEEN_KEY } from "./intro-boot";
import {
  MAX_FREQUENCY,
  MIN_FREQUENCY,
  frequencyAt,
  needlePosition,
  signalStrength,
} from "./tuning";

type Phase = "tuning" | "tuned" | "leaving" | "done";

const TUNE_MS = 2200;
const TUNED_HOLD_MS = 1000;
const LEAVE_MS = 900;
/** Static is drawn at a fraction of the screen resolution, then scaled up. */
const NOISE_SCALE = 3;
const DIAL_LABELS = Array.from(
  { length: (MAX_FREQUENCY - MIN_FREQUENCY) / 4 + 1 },
  (_, i) => MIN_FREQUENCY + i * 4,
);

interface TuningIntroProps {
  readonly name: string;
  readonly headline: string;
}

function drawStatic(context: CanvasRenderingContext2D) {
  const { width, height } = context.canvas;
  const image = context.createImageData(width, height);
  for (let i = 0; i < image.data.length; i += 4) {
    const shade = Math.random() * 255;
    image.data[i] = shade;
    image.data[i + 1] = shade * 0.92;
    image.data[i + 2] = shade * 0.8;
    image.data[i + 3] = 255;
  }
  context.putImageData(image, 0, 0);
}

/**
 * Opening screen: an FM dial sweeps through static and tunes into the
 * announcer's name, then the curtain lifts. Plays once per session, can be
 * skipped, and never shows under prefers-reduced-motion (see intro-boot.ts).
 */
export function TuningIntro({ name, headline }: TuningIntroProps) {
  const [phase, setPhase] = useState<Phase>("tuning");
  const needleRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lifting the curtain releases the page, so its entrance animations play now.
  const leave = useCallback(() => {
    document.documentElement.removeAttribute("data-intro");
    setPhase((current) => (current === "done" ? current : "leaving"));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (root.hasAttribute("data-intro-seen") || prefersReducedMotion()) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas) {
      canvas.width = Math.ceil(window.innerWidth / NOISE_SCALE);
      canvas.height = Math.ceil(window.innerHeight / NOISE_SCALE);
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / TUNE_MS);
      const position = needlePosition(t);
      const signal = signalStrength(t);

      if (needleRef.current) needleRef.current.style.left = `${position * 100}%`;
      if (readoutRef.current) readoutRef.current.textContent = frequencyAt(position);
      if (nameRef.current) nameRef.current.textContent = scrambleFrame(name, signal);
      if (canvas && context) {
        drawStatic(context);
        canvas.style.opacity = String(0.35 * (1 - signal));
      }

      if (t < 1) frame = requestAnimationFrame(tick);
      else setPhase((current) => (current === "tuning" ? "tuned" : current));
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [name]);

  useEffect(() => {
    if (phase === "tuned") {
      const timer = setTimeout(leave, TUNED_HOLD_MS);
      return () => clearTimeout(timer);
    }

    if (phase === "leaving") {
      const timer = setTimeout(() => {
        try {
          sessionStorage.setItem(INTRO_SEEN_KEY, "1");
        } catch {
          // Storage may be blocked; the intro will simply play again next time.
        }
        document.documentElement.setAttribute("data-intro-seen", "");
        setPhase("done");
      }, LEAVE_MS);
      return () => clearTimeout(timer);
    }
  }, [phase, leave]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") leave();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [leave]);

  if (phase === "done") return null;

  const [firstName, ...rest] = name.split(" ");
  const tuned = phase !== "tuning";

  return (
    <div
      // The intro opens the HTML; keep its scrambled text out of search snippets.
      data-nosnippet=""
      className="tuning-intro tone-ink fixed inset-0 z-[100] flex flex-col px-6 py-6 transition-[clip-path] ease-[cubic-bezier(0.7,0,0.2,1)] sm:px-10"
      style={{
        clipPath: phase === "leaving" ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
        transitionDuration: `${LEAVE_MS}ms`,
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full opacity-35 mix-blend-screen [image-rendering:pixelated]"
      />

      <div className="relative flex items-center justify-between text-xs font-extrabold tracking-[0.2em] text-muted uppercase">
        <span>{headline}</span>
        <span className={cn("flex items-center gap-2", tuned && "text-brand")}>
          <span
            aria-hidden="true"
            className={cn("size-2 rounded-full bg-muted", tuned && "animate-on-air bg-on-air")}
          />
          {tuned ? "Sinal encontrado" : "Sintonizando…"}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <BrandMark
          className={cn(
            "size-20 text-paper transition-all duration-700 sm:size-24",
            tuned ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        />
        <p className="font-display text-[clamp(3.5rem,12vw,10rem)] leading-none uppercase">
          {tuned ? (
            <span key="tuned">
              {firstName} <span className="text-brand">{rest.join(" ")}</span>
            </span>
          ) : (
            <span key="scrambling" ref={nameRef}>
              {scrambleFrame(name, 0, seededRandom(name.length))}
            </span>
          )}
        </p>
        <p
          className={cn(
            "text-xs font-extrabold tracking-[0.35em] text-muted uppercase transition-opacity duration-700",
            tuned ? "opacity-100" : "opacity-0",
          )}
        >
          {headline}
        </p>
      </div>

      <div aria-hidden="true" className="relative mx-auto mb-10 w-full max-w-3xl">
        <div className="mb-4 flex items-baseline gap-2">
          <span ref={readoutRef} className="font-display text-5xl text-brand tabular-nums">
            {MIN_FREQUENCY.toFixed(1)}
          </span>
          <span className="text-xs font-bold text-muted">MHz</span>
        </div>
        <div className="relative h-14 border-t border-line">
          <div
            className="absolute inset-x-0 top-0 h-3"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--color-muted) 0 1px, transparent 1px 2.5%)",
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--color-paper) 0 1.5px, transparent 1.5px 20%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10px] font-bold text-muted tabular-nums sm:text-xs">
            {DIAL_LABELS.map((label) => (
              <span key={label} className="w-0 text-center">
                <span className="-ml-3 inline-block w-6">{label}</span>
              </span>
            ))}
          </div>
          <div
            ref={needleRef}
            className="absolute -top-3 h-12 w-1 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_16px_3px] shadow-brand/70"
            style={{ left: 0 }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={leave}
        className="relative mx-auto cursor-pointer rounded-full border-2 border-line px-5 py-2 text-xs font-extrabold tracking-[0.2em] text-muted uppercase transition-colors hover:border-brand hover:text-brand"
      >
        Pular abertura
      </button>
    </div>
  );
}
