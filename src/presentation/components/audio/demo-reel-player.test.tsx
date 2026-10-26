import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PLAYER_START_EVENT } from "@/presentation/hooks/use-audio-player";
import type { DemoReelViewModel } from "@/presentation/view-models/demo-reel-view-model";

import { DemoReelPlayer } from "./demo-reel-player";

const reel: DemoReelViewModel = {
  id: "demo",
  title: "Demo de apresentação",
  description: "Quatro estilos",
  categoryLabel: "Apresentação",
  audioSrc: "/audio/demo.mp3",
  durationInSeconds: 74.76,
  durationLabel: "1:14",
  featured: true,
  chapters: [
    { title: "Apresentação", categoryLabel: "Apresentação", startInSeconds: 0, startLabel: "0:00" },
    { title: "Notícia", categoryLabel: "Notícia", startInSeconds: 15, startLabel: "0:15" },
  ],
  waveform: [0.2, 0.6, 1, 0.4],
};

const renderPlayer = () => {
  const view = render(<DemoReelPlayer reel={reel} artist="Carlos Artur" />);
  const audio = view.container.querySelector("audio") as HTMLAudioElement;
  return { ...view, audio };
};

describe("DemoReelPlayer", () => {
  it("toggles playback from the play button", () => {
    renderPlayer();

    fireEvent.click(screen.getByRole("button", { name: "Ouvir Demo de apresentação" }));

    expect(screen.getByRole("button", { name: "Pausar Demo de apresentação" })).toBeInTheDocument();
    expect(screen.getByText("No ar")).toBeInTheDocument();
  });

  it("jumps to a chapter and plays it", () => {
    const { audio } = renderPlayer();

    fireEvent.click(screen.getByRole("button", { name: /notícia/i }));

    expect(audio.currentTime).toBe(15);
    expect(audio.paused).toBe(false);
    expect(screen.getByRole("button", { name: /notícia/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("seeks with the keyboard like a slider", () => {
    const { audio } = renderPlayer();
    const slider = screen.getByRole("slider", { name: "Posição em Demo de apresentação" });

    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(audio.currentTime).toBe(5);
    expect(slider).toHaveAttribute("aria-valuetext", "0:05 de 1:14");

    fireEvent.keyDown(slider, { key: "Home" });
    expect(audio.currentTime).toBe(0);
  });

  it("pauses when another player starts", () => {
    const { audio } = renderPlayer();
    fireEvent.click(screen.getByRole("button", { name: "Ouvir Demo de apresentação" }));

    act(() => {
      window.dispatchEvent(new CustomEvent(PLAYER_START_EVENT, { detail: "another-reel" }));
    });

    expect(audio.paused).toBe(true);
    expect(screen.getByRole("button", { name: "Ouvir Demo de apresentação" })).toBeInTheDocument();
  });
});
