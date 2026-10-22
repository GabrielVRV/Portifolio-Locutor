import { act, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CurvedCarousel } from "./curved-carousel";
import { measure, toRadians } from "./geometry";

let resize: (width: number, height: number) => void = () => {};

beforeEach(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback: ResizeObserverCallback) {
        resize = (width, height) =>
          callback(
            [{ contentRect: { width, height } } as ResizeObserverEntry],
            this as unknown as ResizeObserver,
          );
      }
      observe() {}
      disconnect() {}
    },
  );
});

const tiles = (container: HTMLElement) => container.querySelectorAll('[class*="carousel-tile-"]');

describe("CurvedCarousel", () => {
  const props = {
    items: ["A", "B", "C"],
    renderItem: (item: string) => <span>{item}</span>,
  };
  const columnsFor = (width: number, height: number) =>
    measure({ width, height, tileHeight: 30, aspectRatio: 16 / 10, gap: 8, bend: toRadians(70) })
      .columns;

  it("mounts no tiles before the frame is measured", () => {
    const { container } = render(<CurvedCarousel {...props} />);

    expect(tiles(container)).toHaveLength(0);
  });

  it("mounts every tile at once after measuring, so they stay in step", () => {
    const { container } = render(<CurvedCarousel {...props} />);

    act(() => resize(1200, 600));

    expect(tiles(container)).toHaveLength(columnsFor(1200, 600));
  });

  it("remounts all tiles together when the layout changes", () => {
    const { container } = render(<CurvedCarousel {...props} />);
    act(() => resize(1200, 600));
    const before = tiles(container)[0];

    act(() => resize(380, 320));

    expect(tiles(container)).toHaveLength(columnsFor(380, 320));
    expect(tiles(container)[0]).not.toBe(before);
  });
});
