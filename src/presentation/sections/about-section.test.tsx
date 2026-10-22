import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { announcerViewModelFixture as announcer } from "@/presentation/testing/announcer-view-model-fixture";

import { AboutSection } from "./about-section";

describe("AboutSection", () => {
  it("shows the bio", () => {
    render(<AboutSection announcer={announcer} />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Uma voz que a cidade reconhece.",
    );
    expect(screen.getByText("Bio")).toBeInTheDocument();
  });

  it("derives the stats from the profile", () => {
    render(<AboutSection announcer={announcer} />);
    const stats = screen.getAllByRole("listitem").map((item) => item.textContent);

    expect(stats[0]).toContain("+20");
    expect(stats[0]).toContain("anos no rádio");
    expect(stats[1]).toContain("3");
    expect(stats[1]).toContain("rádios no currículo");
    expect(stats[2]).toContain("3");
    expect(stats[2]).toContain("tipos de locução");
  });
});
