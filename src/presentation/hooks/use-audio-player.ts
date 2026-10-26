"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Broadcast when any player starts, so every other player pauses. */
export const PLAYER_START_EVENT = "demo-reel:play";

interface UseAudioPlayerOptions {
  readonly id: string;
  readonly title: string;
  readonly artist: string;
  /** Cover shown on the phone lock screen while playing. */
  readonly artwork?: string;
  /**
   * Called on every animation frame while playing, and after each seek. Lets
   * callers paint progress straight into the DOM without re-rendering React.
   */
  readonly onFrame?: (seconds: number) => void;
}

/**
 * Drives an <audio> element: play, pause, seek, one player at a time, and
 * lock-screen controls through the Media Session API. React state changes
 * only on coarse events (play, pause, timeupdate); smooth progress goes
 * through `onFrame`.
 */
export function useAudioPlayer({ id, title, artist, artwork, onFrame }: UseAudioPlayerOptions) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const onFrameRef = useRef(onFrame);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    onFrameRef.current = onFrame;
  }, [onFrame]);

  const play = useCallback(() => {
    // play() rejects when the browser blocks autoplay; the UI stays paused.
    audioRef.current?.play().catch(() => setPlaying(false));
  }, []);

  const pause = useCallback(() => audioRef.current?.pause(), []);

  const toggle = useCallback(() => {
    if (audioRef.current?.paused) play();
    else pause();
  }, [play, pause]);

  const seek = useCallback(
    (seconds: number, { andPlay = false }: { andPlay?: boolean } = {}) => {
      const audio = audioRef.current;
      if (!audio) return;
      const end = Number.isFinite(audio.duration) ? audio.duration : seconds;
      const target = Math.min(Math.max(seconds, 0), end);
      audio.currentTime = target;
      setCurrentTime(target);
      onFrameRef.current?.(target);
      if (andPlay) play();
    },
    [play],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => {
      setPlaying(true);
      window.dispatchEvent(new CustomEvent(PLAYER_START_EVENT, { detail: id }));
      if ("mediaSession" in navigator && typeof MediaMetadata !== "undefined") {
        navigator.mediaSession.metadata = new MediaMetadata({
          title,
          artist,
          artwork: artwork ? [{ src: artwork }] : [],
        });
        navigator.mediaSession.setActionHandler("play", play);
        navigator.mediaSession.setActionHandler("pause", pause);
      }
    };
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onOtherPlayerStart = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== id) audio.pause();
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    window.addEventListener(PLAYER_START_EVENT, onOtherPlayerStart);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      window.removeEventListener(PLAYER_START_EVENT, onOtherPlayerStart);
    };
  }, [id, title, artist, artwork, play, pause]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!playing || !audio) return;

    let frame = 0;
    const tick = () => {
      onFrameRef.current?.(audio.currentTime);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  return { audioRef, playing, currentTime, play, pause, toggle, seek };
}
