import type { Assessment, AssessmentMeta } from "@/lib/types";
import type { AssessmentStore } from "@/lib/store";

/**
 * v1 persistence: browser localStorage. Same interface a future ApiStore will
 * implement (BUILD_SPEC §7). Each assessment is stored under its own key; an
 * index key tracks metadata for list().
 */
const PREFIX = "mbh-ed:assessment:";
const INDEX_KEY = "mbh-ed:index";

function hasWindow(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

function readIndex(): AssessmentMeta[] {
  if (!hasWindow()) return [];
  try {
    const raw = window.localStorage.getItem(INDEX_KEY);
    return raw ? (JSON.parse(raw) as AssessmentMeta[]) : [];
  } catch {
    return [];
  }
}

function writeIndex(metas: AssessmentMeta[]): void {
  if (!hasWindow()) return;
  window.localStorage.setItem(INDEX_KEY, JSON.stringify(metas));
}

export class LocalStorageStore implements AssessmentStore {
  async load(id: string): Promise<Assessment | null> {
    if (!hasWindow()) return null;
    try {
      const raw = window.localStorage.getItem(PREFIX + id);
      return raw ? (JSON.parse(raw) as Assessment) : null;
    } catch {
      return null;
    }
  }

  async save(a: Assessment): Promise<void> {
    if (!hasWindow()) return;
    const toSave: Assessment = { ...a, updatedAt: new Date().toISOString() };
    window.localStorage.setItem(PREFIX + a.id, JSON.stringify(toSave));

    const metas = readIndex().filter((m) => m.id !== a.id);
    metas.push({
      id: toSave.id,
      projectName: toSave.projectName,
      date: toSave.date,
      updatedAt: toSave.updatedAt,
    });
    metas.sort((x, y) => (x.updatedAt < y.updatedAt ? 1 : -1));
    writeIndex(metas);
  }

  async list(): Promise<AssessmentMeta[]> {
    return readIndex();
  }

  async remove(id: string): Promise<void> {
    if (!hasWindow()) return;
    window.localStorage.removeItem(PREFIX + id);
    writeIndex(readIndex().filter((m) => m.id !== id));
  }
}

/** The active store implementation for v1. Swap this line to go cloud. */
export const store: AssessmentStore = new LocalStorageStore();
