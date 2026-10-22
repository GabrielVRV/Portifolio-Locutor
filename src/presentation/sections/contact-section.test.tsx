import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { announcerViewModelFixture as announcer } from "@/presentation/testing/announcer-view-model-fixture";

import { ContactSection } from "./contact-section";

describe("ContactSection", () => {
  it("lists the services in natural Portuguese", () => {
    render(<ContactSection announcer={announcer} />);

    expect(
      screen.getByText(/^Carro de som, spot comercial e vinheta\. Chama no WhatsApp/),
    ).toBeInTheDocument();
  });

  it("shows the WhatsApp number as the call to action", () => {
    render(<ContactSection announcer={announcer} />);

    expect(screen.getByRole("link", { name: /\(19\) 99735-5358/ })).toHaveAttribute(
      "href",
      announcer.whatsapp.href,
    );
  });

  it("labels icon-only social links", () => {
    render(<ContactSection announcer={announcer} />);

    expect(screen.getByRole("link", { name: "Instagram de Carlos Artur" })).toBeInTheDocument();
  });
});
