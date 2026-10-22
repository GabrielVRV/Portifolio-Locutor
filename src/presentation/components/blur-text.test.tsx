import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BlurText } from "./blur-text";

let reveal: () => void = () => {};

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        reveal = () =>
          callback(
            [{ isIntersecting: true } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver,
          );
      }
      observe() {}
      disconnect() {}
    },
  );
});

describe("BlurText", () => {
  it("exposes the full text once to assistive technology", () => {
    render(<BlurText as="h1" text="CARLOS" by="letters" />);

    expect(screen.getByRole("heading", { level: 1, name: "CARLOS" })).toBeInTheDocument();
  });

  it("splits words and reveals them when scrolled into view", () => {
    const { container } = render(<BlurText text="A voz que faz" />);
    const root = container.firstElementChild;

    expect(container.querySelectorAll(".blur-text-segment")).toHaveLength(4);
    expect(root).toHaveAttribute("data-visible", "false");

    act(() => reveal());

    expect(root).toHaveAttribute("data-visible", "true");
  });

  it("staggers each segment", () => {
    const { container } = render(<BlurText text="ABC" by="letters" stagger={100} delay={50} />);
    const delays = [...container.querySelectorAll<HTMLElement>(".blur-text-segment")].map(
      (segment) => segment.style.transitionDelay,
    );

    expect(delays).toEqual(["50ms", "150ms", "250ms"]);
  });
});
