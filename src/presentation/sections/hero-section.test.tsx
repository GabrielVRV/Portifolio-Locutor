import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { announcerViewModelFixture as announcer } from "@/presentation/testing/announcer-view-model-fixture";

import { HeroSection } from "./hero-section";

describe("HeroSection", () => {
  it("presents the full name as the only main heading", () => {
    render(<HeroSection announcer={announcer} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName("Carlos Artur");
  });

  it("shows the cut-out portrait and tagline", () => {
    render(<HeroSection announcer={announcer} />);

    expect(screen.getByRole("img", { name: announcer.portrait.alt })).toBeInTheDocument();
    expect(screen.getByText(announcer.tagline)).toBeInTheDocument();
  });

  it("links to a WhatsApp quote in a new tab", () => {
    render(<HeroSection announcer={announcer} />);

    const quote = screen.getByRole("link", { name: /pedir orçamento/i });
    expect(quote).toHaveAttribute("href", announcer.whatsapp.href);
    expect(quote).toHaveAttribute("target", "_blank");
    expect(quote).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows the phone number and social profiles up front", () => {
    render(<HeroSection announcer={announcer} />);

    expect(screen.getByRole("link", { name: announcer.whatsapp.display })).toHaveAttribute(
      "href",
      announcer.whatsapp.href,
    );
    expect(screen.getByRole("link", { name: "Instagram de Carlos Artur" })).toBeInTheDocument();
  });

  it("invites visitors to learn more about the work", () => {
    render(<HeroSection announcer={announcer} />);

    expect(screen.getByRole("link", { name: /conheça o trabalho/i })).toHaveAttribute(
      "href",
      "#sobre",
    );
  });
});
