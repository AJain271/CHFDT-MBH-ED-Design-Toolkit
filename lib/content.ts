import raw from "@/content/content.json";
import type { Content } from "@/lib/types";

/**
 * Typed accessor for the toolkit content. All screens read from here so the
 * toolkit can be updated by editing content.json alone (BUILD_SPEC §1).
 */
export const content = raw as unknown as Content;

export const config = content.config;
