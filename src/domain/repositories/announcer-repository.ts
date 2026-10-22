import type { Announcer } from "@/domain/entities/announcer";

export interface AnnouncerRepository {
  getProfile(): Promise<Announcer>;
}
