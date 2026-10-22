import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { announcerViewModelFixture as announcer } from "@/presentation/testing/announcer-view-model-fixture";

import { ServicesSection } from "./services-section";

describe("ServicesSection", () => {
  it("links each service to its own WhatsApp quote", () => {
    render(<ServicesSection announcer={announcer} />);

    expect(screen.getByRole("link", { name: /carro de som/i })).toHaveAttribute(
      "href",
      "https://wa.me/1",
    );
    expect(screen.getByRole("link", { name: /vinheta/i })).toHaveAttribute(
      "href",
      "https://wa.me/3",
    );
  });

  it("closes with an open-ended call to action", () => {
    render(<ServicesSection announcer={announcer} />);

    expect(screen.getByRole("link", { name: /vamos conversar/i })).toHaveAttribute(
      "href",
      announcer.whatsapp.href,
    );
  });

  it("renders nothing without services", () => {
    const { container } = render(<ServicesSection announcer={{ ...announcer, services: [] }} />);

    expect(container).toBeEmptyDOMElement();
  });
});
