import type { PaginatedQuery } from "@/types/common";
import type { Notice, Event } from "@/types/notice";
import { notices as initialNotices, events as initialEvents } from "@/data/notices";
import { generateId, paginate, simulateLatency, success } from "./base.service";

let noticesStore = [...initialNotices];
let eventsStore = [...initialEvents];

export const noticeService = {
  async getNotices(query?: PaginatedQuery & { category?: string; published?: boolean }) {
    await simulateLatency();
    let filtered = [...noticesStore];
    if (query?.category) filtered = filtered.filter((n) => n.category === query.category);
    if (query?.published !== undefined) filtered = filtered.filter((n) => n.published === query.published);
    return success(paginate(filtered, query));
  },

  async createNotice(input: Omit<Notice, "id" | "madrasaId">) {
    await simulateLatency();
    const notice: Notice = { ...input, id: generateId("notice"), madrasaId: "madrasa_alnoor" };
    noticesStore.push(notice);
    return success(notice);
  },

  async updateNotice(id: string, input: Partial<Notice>) {
    await simulateLatency();
    const idx = noticesStore.findIndex((n) => n.id === id);
    if (idx === -1) return { success: false as const, data: null, message: "Notice not found" };
    noticesStore[idx] = { ...noticesStore[idx], ...input };
    return success(noticesStore[idx]);
  },

  async deleteNotice(id: string) {
    await simulateLatency();
    noticesStore = noticesStore.filter((n) => n.id !== id);
    return success(null);
  },

  getPublished() {
    return noticesStore.filter((n) => n.published);
  },
};

export const eventService = {
  async getEvents(query?: PaginatedQuery) {
    await simulateLatency();
    return success(paginate(eventsStore, query));
  },

  async createEvent(input: Omit<Event, "id" | "madrasaId">) {
    await simulateLatency();
    const event: Event = { ...input, id: generateId("event"), madrasaId: "madrasa_alnoor" };
    eventsStore.push(event);
    return success(event);
  },

  async updateEvent(id: string, input: Partial<Event>) {
    await simulateLatency();
    const idx = eventsStore.findIndex((e) => e.id === id);
    if (idx === -1) return { success: false as const, data: null, message: "Event not found" };
    eventsStore[idx] = { ...eventsStore[idx], ...input };
    return success(eventsStore[idx]);
  },

  async deleteEvent(id: string) {
    await simulateLatency();
    eventsStore = eventsStore.filter((e) => e.id !== id);
    return success(null);
  },

  getAll() {
    return eventsStore;
  },
};
