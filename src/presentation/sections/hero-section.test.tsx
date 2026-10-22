import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

import { HeroSection } from "./hero-section";

const announcer: AnnouncerViewModel = {
  name: "Carlos Artur",
  headline: "Locutor e radialista",
  tagline: "A voz que faz a cidade parar para ouvir.",
  bio: ["Bio"],
  experienceLabel: "+20 anos no rádio",
  photo: { src: "/images/carlos-artur.jpg", alt: "Carlos Artur no estúdio" },
  whatsapp: { href: "https://wa.me/5519997355358", display: "(19) 99735-5358" },
  socialLinks: [
    {
      network: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/carlosarturlocutor/",
    },
  ],
  stations: ["Massa FM", "Band FM"],
};

describe("HeroSection", () => {
  it("presents the announcer name as the main heading", () => {
    render(<HeroSection announcer={announcer} />);

    expect(screen.getByRole("heading", { level: 1, name: "Carlos Artur" })).toBeInTheDocument();
    expect(screen.getByText(announcer.tagline)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Carlos Artur no estúdio" })).toBeInTheDocument();
  });

  it("links to a WhatsApp quote in a new tab", () => {
    render(<HeroSection announcer={announcer} />);

    const quote = screen.getByRole("link", { name: /pedir orçamento/i });
    expect(quote).toHaveAttribute("href", "https://wa.me/5519997355358");
    expect(quote).toHaveAttribute("target", "_blank");
    expect(quote).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("gives icon social links an accessible name", () => {
    render(<HeroSection announcer={announcer} />);

    expect(screen.getByRole("link", { name: "Instagram de Carlos Artur" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/carlosarturlocutor/",
    );
  });

  it("lists the radio stations", () => {
    render(<HeroSection announcer={announcer} />);

    expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toEqual([
      "Massa FM",
      "Band FM",
    ]);
  });
});
