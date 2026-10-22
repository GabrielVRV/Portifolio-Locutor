import { DomainValidationError } from "@/domain/errors/domain-validation-error";

/**
 * A radio station in the announcer's career. Years are optional because the
 * exact period is not always known.
 */
export interface RadioExperience {
  readonly station: string;
  readonly city?: string;
  readonly startYear?: number;
  readonly endYear?: number;
  readonly current: boolean;
}

export type RadioExperienceProps = Omit<RadioExperience, "current"> & { current?: boolean };

export function createRadioExperience(props: RadioExperienceProps): RadioExperience {
  const station = props.station.trim();
  const current = props.current ?? false;

  if (!station) {
    throw new DomainValidationError("Radio experience requires a station name");
  }
  if (current && props.endYear !== undefined) {
    throw new DomainValidationError(`Current experience at "${station}" cannot have an end year`);
  }
  if (
    props.startYear !== undefined &&
    props.endYear !== undefined &&
    props.startYear > props.endYear
  ) {
    throw new DomainValidationError(`Start year after end year at "${station}"`);
  }

  return { ...props, station, current };
}

/**
 * Current jobs first, then the most recent ones. Experiences without dates go last,
 * keeping their original order.
 */
export function sortByRecency(experiences: readonly RadioExperience[]): RadioExperience[] {
  const recency = (experience: RadioExperience) =>
    experience.current
      ? Number.POSITIVE_INFINITY
      : (experience.endYear ?? experience.startYear ?? Number.NEGATIVE_INFINITY);

  return [...experiences].sort((a, b) => {
    const diff = recency(b) - recency(a);
    return Number.isNaN(diff) ? 0 : diff;
  });
}
