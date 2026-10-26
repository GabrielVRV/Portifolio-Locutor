"use client";

import { type CSSProperties, type Ref, useRef } from "react";

import { cn } from "@/shared/lib/cn";
import { formatClock } from "@/shared/lib/time";

const STEP_SECONDS = 5;
const PAGE_SECONDS = 15;

interface SeekableWaveformProps {
  readonly waveform: readonly number[];
  readonly durationInSeconds: number;
  readonly currentTime: number;
  readonly chapterStarts: readonly number[];
  readonly onSeek: (seconds: number) => void;
  readonly label: string;
  /**
   * Receives the element whose `--progress` (e.g. "42%") the player updates
   * every frame; the played bars and playhead follow it.
   */
  readonly progressRef?: Ref<HTMLDivElement>;
  readonly className?: string;
}

/**
 * The reel's real waveform as a seek bar. Click or drag to jump, or use the
 * keyboard as on any slider (arrows ±5 s, Page Up/Down ±15 s, Home, End).
 */
export function SeekableWaveform({
  waveform,
  durationInSeconds,
  currentTime,
  chapterStarts,
  onSeek,
  label,
  progressRef,
  className,
}: SeekableWaveformProps) {
  const dragging = useRef(false);

  const seekToPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    onSeek(ratio * durationInSeconds);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: currentTime + STEP_SECONDS,
      ArrowUp: currentTime + STEP_SECONDS,
      ArrowLeft: currentTime - STEP_SECONDS,
      ArrowDown: currentTime - STEP_SECONDS,
      PageUp: currentTime + PAGE_SECONDS,
      PageDown: currentTime - PAGE_SECONDS,
      Home: 0,
      End: durationInSeconds,
    };
    const target = moves[event.key];
    if (target === undefined) return;
    event.preventDefault();
    onSeek(Math.min(durationInSeconds, Math.max(0, target)));
  };

  const bars = (
    <>
      {waveform.map((level, index) => (
        <span
          key={index}
          className="min-w-px flex-1 rounded-full bg-current"
          style={{ height: `${Math.max(8, level * 100)}%` }}
        />
      ))}
    </>
  );

  return (
    <div
      ref={progressRef}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={Math.round(durationInSeconds)}
      aria-valuenow={Math.round(currentTime)}
      aria-valuetext={`${formatClock(currentTime)} de ${formatClock(durationInSeconds)}`}
      onKeyDown={onKeyDown}
      onPointerDown={(event) => {
        dragging.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        seekToPointer(event);
      }}
      onPointerMove={(event) => dragging.current && seekToPointer(event)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      className={cn("group relative h-24 cursor-pointer touch-none select-none", className)}
      style={{ "--progress": "0%" } as CSSProperties}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center gap-px text-paper/20 sm:gap-[3px]"
      >
        {bars}
      </div>
      {/* Played part: the same bars in brand yellow, revealed up to the playhead */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center gap-px text-brand sm:gap-[3px]"
        style={{ clipPath: "inset(0 calc(100% - var(--progress)) 0 0)" }}
      >
        {bars}
      </div>

      {chapterStarts.map((start, index) => (
        <span
          key={start}
          aria-hidden="true"
          className="absolute -top-3 bottom-0 flex flex-col items-center"
          style={{ left: `${(start / durationInSeconds) * 100}%` }}
        >
          <span className="text-[10px] leading-none font-extrabold text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="mt-1 w-px flex-1 bg-paper/25" />
        </span>
      ))}

      <span
        aria-hidden="true"
        className="absolute inset-y-0 w-0.5 -translate-x-1/2 rounded-full bg-paper shadow-[0_0_12px_2px] shadow-brand/60"
        style={{ left: "var(--progress)" }}
      />
    </div>
  );
}
