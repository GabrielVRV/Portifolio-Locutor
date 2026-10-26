import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Testing Library only auto-cleans when test globals are enabled.
afterEach(cleanup);

// jsdom lacks these browser APIs; components only need them to exist.
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", NoopObserver);
vi.stubGlobal("ResizeObserver", NoopObserver);

vi.stubGlobal(
  "matchMedia",
  (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList,
);

// jsdom doesn't implement media playback; emulate the state changes and events.
function setPaused(media: HTMLMediaElement, paused: boolean) {
  Object.defineProperty(media, "paused", { configurable: true, value: paused });
  media.dispatchEvent(new Event(paused ? "pause" : "play"));
}

Object.defineProperty(HTMLMediaElement.prototype, "play", {
  configurable: true,
  value(this: HTMLMediaElement) {
    setPaused(this, false);
    return Promise.resolve();
  },
});

Object.defineProperty(HTMLMediaElement.prototype, "pause", {
  configurable: true,
  value(this: HTMLMediaElement) {
    setPaused(this, true);
  },
});
