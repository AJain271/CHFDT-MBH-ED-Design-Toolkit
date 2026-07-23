"use client";

import { create } from "zustand";
import type { Assessment, DatAnswer } from "@/lib/types";
import { newAssessment } from "@/lib/store";
import { store } from "@/lib/store/localStorage";

const CURRENT_KEY = "mbh-ed:current";

type SaveStatus = "idle" | "saving" | "saved";

type AssessmentState = {
  assessment: Assessment | null;
  hydrated: boolean;
  saveStatus: SaveStatus;

  hydrate: () => Promise<void>;
  reset: () => Promise<void>;

  setMeta: (patch: Partial<Pick<Assessment, "projectName" | "date" | "description">>) => void;
  setPpt: (row: number | string, value: string) => void;
  setOutcomeImportance: (row: number | string, label: string) => void;
  setGuidelineReview: (row: number | string, label: string) => void;
  setPolicyResponse: (row: number | string, value: string) => void;
  setDatAnswer: (row: number | string, answer: DatAnswer) => void;
  setDatNote: (row: number | string, value: string) => void;
  setDatConflict: (row: number | string, value: string) => void;
};

let saveTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleSave(get: () => AssessmentState, set: (p: Partial<AssessmentState>) => void) {
  const a = get().assessment;
  if (!a) return;
  set({ saveStatus: "saving" });
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    const current = get().assessment;
    if (!current) return;
    await store.save(current);
    set({ saveStatus: "saved" });
  }, 500);
}

export const useAssessment = create<AssessmentState>((set, get) => {
  /** Apply an update to the current assessment and trigger autosave. */
  const update = (mutate: (a: Assessment) => Assessment) => {
    const a = get().assessment;
    if (!a) return;
    const next = { ...mutate(a), updatedAt: new Date().toISOString() };
    set({ assessment: next });
    scheduleSave(get, set);
  };

  return {
    assessment: null,
    hydrated: false,
    saveStatus: "idle",

    hydrate: async () => {
      if (get().hydrated) return;
      let a: Assessment | null = null;
      if (typeof window !== "undefined") {
        const currentId = window.localStorage.getItem(CURRENT_KEY);
        if (currentId) a = await store.load(currentId);
      }
      if (!a) {
        a = newAssessment();
        await store.save(a);
        if (typeof window !== "undefined") window.localStorage.setItem(CURRENT_KEY, a.id);
      }
      set({ assessment: a, hydrated: true, saveStatus: "saved" });
    },

    reset: async () => {
      const a = newAssessment();
      await store.save(a);
      if (typeof window !== "undefined") window.localStorage.setItem(CURRENT_KEY, a.id);
      set({ assessment: a, saveStatus: "saved" });
    },

    setMeta: (patch) => update((a) => ({ ...a, ...patch })),

    setPpt: (row, value) =>
      update((a) => ({ ...a, ppt: { ...a.ppt, [String(row)]: value } })),

    setOutcomeImportance: (row, label) =>
      update((a) => ({
        ...a,
        outcomeImportance: { ...a.outcomeImportance, [String(row)]: label },
      })),

    setGuidelineReview: (row, label) =>
      update((a) => ({
        ...a,
        guidelineReview: { ...a.guidelineReview, [String(row)]: label },
      })),

    setPolicyResponse: (row, value) =>
      update((a) => ({
        ...a,
        policyResponses: { ...a.policyResponses, [String(row)]: value },
      })),

    setDatAnswer: (row, answer) =>
      update((a) => ({ ...a, datAnswers: { ...a.datAnswers, [String(row)]: answer } })),

    setDatNote: (row, value) =>
      update((a) => ({ ...a, datNotes: { ...(a.datNotes ?? {}), [String(row)]: value } })),

    setDatConflict: (row, value) =>
      update((a) => ({
        ...a,
        datConflicts: { ...(a.datConflicts ?? {}), [String(row)]: value },
      })),
  };
});
