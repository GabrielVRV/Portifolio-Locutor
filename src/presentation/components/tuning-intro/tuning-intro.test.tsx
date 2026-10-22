import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { INTRO_SEEN_KEY } from "./intro-boot";
import { TuningIntro } from "./tuning-intro";

describe("TuningIntro", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.documentElement.setAttribute("data-intro", "playing");
  });

  afterEach(() => {
    vi.useRealTimers();
    sessionStorage.clear();
    document.documentElement.removeAttribute("data-intro");
    document.documentElement.removeAttribute("data-intro-seen");
  });

  it("releases the page and remembers the visit when skipped", () => {
    render(<TuningIntro name="Carlos Artur" headline="Locutor e radialista" />);

    fireEvent.click(screen.getByRole("button", { name: "Pular abertura" }));
    expect(document.documentElement).not.toHaveAttribute("data-intro");

    act(() => vi.advanceTimersByTime(1000));

    expect(screen.queryByRole("button", { name: "Pular abertura" })).not.toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("data-intro-seen");
    expect(sessionStorage.getItem(INTRO_SEEN_KEY)).toBe("1");
  });

  it("can be skipped with the keyboard", () => {
    render(<TuningIntro name="Carlos Artur" headline="Locutor e radialista" />);

    fireEvent.keyDown(window, { key: "Escape" });

    expect(document.documentElement).not.toHaveAttribute("data-intro");
  });
});
