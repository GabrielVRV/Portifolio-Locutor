import announcerContent from "@content/announcer.json";
import demoReelsContent from "@content/demo-reels.json";

import { GetAnnouncerProfile } from "@/application/use-cases/get-announcer-profile";
import { ListDemoReelCategories } from "@/application/use-cases/list-demo-reel-categories";
import { ListDemoReels } from "@/application/use-cases/list-demo-reels";
import { JsonAnnouncerRepository } from "@/infrastructure/json/json-announcer-repository";
import { JsonDemoReelRepository } from "@/infrastructure/json/json-demo-reel-repository";

/**
 * Composition root: the only place that knows which implementation backs each port.
 * Swapping the content source (CMS, database...) means changing only this file.
 */
const announcerRepository = new JsonAnnouncerRepository(announcerContent, "content/announcer.json");
const demoReelRepository = new JsonDemoReelRepository(demoReelsContent, "content/demo-reels.json");

export const getAnnouncerProfile = new GetAnnouncerProfile(announcerRepository);
export const listDemoReels = new ListDemoReels(demoReelRepository);
export const listDemoReelCategories = new ListDemoReelCategories(demoReelRepository);
