"use client";

import { useSyncExternalStore } from "react";
import { isSkillLevel } from "@/lib/levels";
import type { Skill, SkillLevel } from "@/types/skill";

const SKILLS_KEY = "skills";

export type CreateSkillInput = {
  name: string;
  description?: string;
  priority?: number;
  knowledge?: number;
  notes?: string;
};

export type DeleteSkillResult =
  | { ok: true }
  | { ok: false; reason: "not-found" };

const listeners = new Set<() => void>();
let skillsCache: Skill[] | null = null;

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeStorage(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function isSkill(value: unknown): value is Skill {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    typeof record.id === "string" &&
    typeof record.name === "string" &&
    typeof record.description === "string" &&
    isSkillLevel(record.priority) &&
    isSkillLevel(record.knowledge) &&
    typeof record.notes === "string"
  );
}

function readCollection<T>(key: string, guard: (value: unknown) => value is T): T[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(guard);
  } catch {
    return [];
  }
}

function writeCollection<T>(key: string, items: T[]): void {
  if (!canUseStorage()) {
    return;
  }
  localStorage.setItem(key, JSON.stringify(items));
}

function requireName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error("Name is required");
  }
  return trimmed;
}

function requireLevel(value: number | undefined, fallback: SkillLevel): SkillLevel {
  if (value === undefined) {
    return fallback;
  }
  if (!isSkillLevel(value)) {
    throw new Error("Level must be between 1 and 5");
  }
  return value;
}

function persistSkills(next: Skill[]): void {
  skillsCache = next;
  writeCollection(SKILLS_KEY, next);
  emit();
}

export function getSkills(): Skill[] {
  if (!canUseStorage()) {
    return [];
  }
  if (!skillsCache) {
    skillsCache = readCollection(SKILLS_KEY, isSkill);
  }
  return skillsCache;
}

export function getSkillById(id: string): Skill | null {
  return getSkills().find((skill) => skill.id === id) ?? null;
}

export function createSkill(input: CreateSkillInput): Skill {
  const skill: Skill = {
    id: crypto.randomUUID(),
    name: requireName(input.name),
    description: input.description ?? "",
    priority: requireLevel(input.priority, 1),
    knowledge: requireLevel(input.knowledge, 1),
    notes: input.notes ?? "",
  };
  persistSkills([...getSkills(), skill]);
  return skill;
}

export function updateSkill(
  id: string,
  patch: Partial<Omit<Skill, "id">>,
): Skill | null {
  const skills = getSkills();
  const index = skills.findIndex((skill) => skill.id === id);
  if (index === -1) {
    return null;
  }

  const current = skills[index];
  const next: Skill = { ...current, id: current.id };

  if (patch.name !== undefined) {
    next.name = requireName(patch.name);
  }
  if (patch.priority !== undefined) {
    next.priority = requireLevel(patch.priority, current.priority);
  }
  if (patch.knowledge !== undefined) {
    next.knowledge = requireLevel(patch.knowledge, current.knowledge);
  }
  if (patch.description !== undefined) {
    next.description = patch.description;
  }
  if (patch.notes !== undefined) {
    next.notes = patch.notes;
  }

  persistSkills(skills.map((skill, i) => (i === index ? next : skill)));
  return next;
}

export function deleteSkill(id: string): DeleteSkillResult {
  const existing = getSkillById(id);
  if (!existing) {
    return { ok: false, reason: "not-found" };
  }

  persistSkills(getSkills().filter((skill) => skill.id !== id));
  return { ok: true };
}

export function useSkills(): Skill[] | null {
  return useSyncExternalStore(subscribeStorage, getSkills, () => null);
}
