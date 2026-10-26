import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { announcerViewModelFixture as announcer } from "@/presentation/testing/announcer-view-model-fixture";

import { ListenSection } from "./listen-section";

describe("ListenSection", () => {
  it("renders nothing until there is a demo to listen to", () => {
    const { container } = render(<ListenSection reels={[]} announcer={announcer} />);

    expect(container).toBeEmptyDOMElement();
  });
});
