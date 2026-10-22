import type { Announcer } from "@/domain/entities/announcer";
import { sortByRecency } from "@/domain/entities/radio-experience";
import type { AnnouncerRepository } from "@/domain/repositories/announcer-repository";

/**
 * Returns the announcer profile ready to be showcased, with the career
 * ordered from the current job to the oldest one.
 */
export class GetAnnouncerProfile {
  constructor(private readonly announcers: AnnouncerRepository) {}

  async execute(): Promise<Announcer> {
    const announcer = await this.announcers.getProfile();

    return { ...announcer, experiences: sortByRecency(announcer.experiences) };
  }
}
