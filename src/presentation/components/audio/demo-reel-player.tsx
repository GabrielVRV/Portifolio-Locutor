"use client";

import { useCallback, useEffect, useRef } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";

import { chapterIndexAt } from "@/domain/entities/demo-reel";
import { BroadcastRings } from "@/presentation/components/broadcast-rings";
import { useAudioPlayer } from "@/presentation/hooks/use-audio-player";
import type { DemoReelViewModel } from "@/presentation/view-models/demo-reel-view-model";
import { cn } from "@/shared/lib/cn";
import { formatClock } from "@/shared/lib/time";

import { SeekableWaveform } from "./seekable-waveform";

interface DemoReelPlayerProps {
  readonly reel: DemoReelViewModel;
  /** Shown on the lock screen while playing. */
  readonly artist: string;
  readonly artwork?: string;
}

/**
 * A studio-console player: big play button, the reel's real waveform as a
 * seek bar, and chapter buttons that jump straight to each style.
 */
export function DemoReelPlayer({ reel, artist, artwork }: DemoReelPlayerProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  const paint = useCallback(
    (seconds: number) => {
      const ratio = Math.min(1, seconds / reel.durationInSeconds);
      progressRef.current?.style.setProperty("--progress", `${ratio * 100}%`);
      if (clockRef.current) clockRef.current.textContent = formatClock(seconds);
    },
    [reel.durationInSeconds],
  );

  const { audioRef, playing, currentTime, toggle, seek } = useAudioPlayer({
    id: reel.id,
    title: reel.title,
    artist,
    artwork,
    onFrame: paint,
  });

  // Coarse updates (timeupdate, seeks while paused) keep the bar in sync too.
  useEffect(() => paint(currentTime), [currentTime, paint]);

  const activeChapter = chapterIndexAt(reel.chapters, currentTime);
  const started = playing || currentTime > 0;

  return (
    <article className="relative overflow-hidden rounded-[2.5rem] border border-line bg-ink-soft p-6 shadow-[0_40px_80px_-40px] shadow-black sm:p-10">
      <audio ref={audioRef} src={reel.audioSrc} preload="metadata" />

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        <div className="relative grid size-24 shrink-0 place-items-center sm:size-28">
          {playing && <BroadcastRings className="-inset-10" />}
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? `Pausar ${reel.title}` : `Ouvir ${reel.title}`}
            className="relative grid size-full cursor-pointer place-items-center rounded-full bg-brand text-ink shadow-[0_0_0_8px] shadow-brand/15 transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            {playing ? (
              <FaPause aria-hidden="true" className="size-8" />
            ) : (
              <FaPlay aria-hidden="true" className="ml-1.5 size-8" />
            )}
          </button>
        </div>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.2em] text-muted uppercase">
            <span
              aria-hidden="true"
              className={cn(
                "size-2 rounded-full",
                playing ? "animate-on-air bg-on-air" : "bg-paper/30",
              )}
            />
            {playing ? "No ar" : reel.categoryLabel}
          </p>
          <h3 className="mt-2 font-display text-4xl leading-tight tracking-[0.02em] uppercase sm:text-5xl">
            {reel.title}
          </h3>
          {reel.description && <p className="mt-2 max-w-xl text-muted">{reel.description}</p>}
        </div>

        <p className="font-display text-3xl tracking-wide tabular-nums sm:text-right">
          <span ref={clockRef} className={cn(!started && "text-muted")}>
            0:00
          </span>
          <span className="text-muted"> / {reel.durationLabel}</span>
        </p>
      </div>

      <SeekableWaveform
        progressRef={progressRef}
        waveform={reel.waveform}
        durationInSeconds={reel.durationInSeconds}
        currentTime={currentTime}
        chapterStarts={reel.chapters.map((chapter) => chapter.startInSeconds)}
        onSeek={(seconds) => seek(seconds)}
        label={`Posição em ${reel.title}`}
        className="mt-10"
      />

      {reel.chapters.length > 0 && (
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {reel.chapters.map((chapter, index) => {
            const active = index === activeChapter && started;
            return (
              <li key={chapter.startInSeconds}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => seek(chapter.startInSeconds, { andPlay: true })}
                  className={cn(
                    "group flex w-full cursor-pointer items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                    active
                      ? "border-brand bg-brand text-ink"
                      : "border-line hover:-translate-y-0.5 hover:border-brand/60",
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-3xl leading-none",
                      active ? "text-ink" : "text-brand",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-extrabold">{chapter.title}</span>
                    <span
                      className={cn(
                        "text-xs font-bold tracking-wider tabular-nums",
                        active ? "text-ink/70" : "text-muted",
                      )}
                    >
                      {chapter.startLabel}
                    </span>
                  </span>
                  <FaPlay
                    aria-hidden="true"
                    className={cn(
                      "size-3 transition-opacity",
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </article>
  );
}
