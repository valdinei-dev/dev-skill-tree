import type { SkillLevel } from "@/types/skill";

export const LEVELS: SkillLevel[] = [1, 2, 3, 4, 5];

export const LEVEL_LABELS: Record<SkillLevel, string> = {
  1: "Very Low",
  2: "Low",
  3: "Medium",
  4: "High",
  5: "Very High",
};

export function isSkillLevel(value: unknown): value is SkillLevel {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
}

export function labelForLevel(value: SkillLevel): string {
  return LEVEL_LABELS[value];
}
