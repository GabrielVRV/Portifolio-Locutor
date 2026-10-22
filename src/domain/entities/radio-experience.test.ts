import { describe, expect, it } from "vitest";

import { DomainValidationError } from "@/domain/errors/domain-validation-error";

import { createRadioExperience, sortByRecency } from "./radio-experience";

describe("createRadioExperience", () => {
  it("trims the station name and defaults current to false", () => {
    expect(createRadioExperience({ station: "  Band FM " })).toEqual({
      station: "Band FM",
      current: false,
    });
  });

  it("rejects an empty station name", () => {
    expect(() => createRadioExperience({ station: "  " })).toThrow(DomainValidationError);
  });

  it("rejects a current experience with an end year", () => {
    expect(() =>
      createRadioExperience({ station: "Massa FM", current: true, endYear: 2020 }),
    ).toThrow(DomainValidationError);
  });

  it("rejects a start year after the end year", () => {
    expect(() =>
      createRadioExperience({ station: "Massa FM", startYear: 2020, endYear: 2010 }),
    ).toThrow(DomainValidationError);
  });
});

describe("sortByRecency", () => {
  it("puts current jobs first, then most recent, then undated in original order", () => {
    const undatedA = createRadioExperience({ station: "Undated A" });
    const old = createRadioExperience({ station: "Old", startYear: 2000, endYear: 2005 });
    const undatedB = createRadioExperience({ station: "Undated B" });
    const recent = createRadioExperience({ station: "Recent", startYear: 2010, endYear: 2018 });
    const current = createRadioExperience({ station: "Current", startYear: 2019, current: true });

    expect(sortByRecency([undatedA, old, current, undatedB, recent]).map((e) => e.station)).toEqual(
      ["Current", "Recent", "Old", "Undated A", "Undated B"],
    );
  });

  it("does not mutate the input", () => {
    const input = [
      createRadioExperience({ station: "A", startYear: 2000 }),
      createRadioExperience({ station: "B", startYear: 2010 }),
    ];

    sortByRecency(input);

    expect(input.map((e) => e.station)).toEqual(["A", "B"]);
  });
});
