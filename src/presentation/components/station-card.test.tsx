import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StationCard } from "./station-card";

describe("StationCard", () => {
  it("flags the stations he is still on air at", () => {
    render(
      <StationCard
        station={{ name: "Massa FM", current: true, period: "Atualmente" }}
        theme="ink"
      />,
    );

    expect(screen.getByText("Massa FM")).toBeInTheDocument();
    expect(screen.getByText("No ar hoje")).toBeInTheDocument();
  });

  it("shows the period of past stations", () => {
    render(
      <StationCard
        station={{ name: "Band FM", current: false, period: "2010–2018" }}
        theme="paper"
      />,
    );

    expect(screen.getByText("2010–2018")).toBeInTheDocument();
    expect(screen.queryByText("No ar hoje")).not.toBeInTheDocument();
  });
});
