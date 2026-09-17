import { beforeEach, describe, expect, it } from "vitest";
import {
  createSkill,
  deleteSkill,
  getSkillById,
  getSkills,
  updateSkill,
} from "@/lib/storage";

const MISSING_ID = "missing-skill-id";

function emptyCatalog() {
  for (const skill of [...getSkills()]) {
    deleteSkill(skill.id);
  }
}

describe("skill storage contract", () => {
  beforeEach(() => {
    emptyCatalog();
  });

  describe("create and read", () => {
    it("lists an empty catalog", () => {
      expect(getSkills()).toEqual([]);
    });

    it("creates a skill from a name only with defaults and includes it in the list", () => {
      const created = createSkill({ name: "  React  " });

      expect(created.id.length).toBeGreaterThan(0);
      expect(created.name).toBe("React");
      expect(created.description).toBe("");
      expect(created.notes).toBe("");
      expect(created.priority).toBe(1);
      expect(created.knowledge).toBe(1);
      expect(getSkills()).toEqual([created]);
    });

    it("returns the created skill by id and null for a missing id", () => {
      const created = createSkill({ name: "TypeScript" });

      expect(getSkillById(created.id)).toEqual(created);
      expect(getSkillById(MISSING_ID)).toBeNull();
    });
  });

  describe("update and delete", () => {
    it("updates patchable fields and leaves id unchanged", () => {
      const created = createSkill({ name: "CSS" });

      const updated = updateSkill(created.id, {
        name: "  CSS Grid  ",
        description: "Layout",
        priority: 5,
        knowledge: 3,
        notes: "Study gap",
      });

      expect(updated).not.toBeNull();
      expect(updated?.id).toBe(created.id);
      expect(getSkillById(created.id)).toEqual({
        id: created.id,
        name: "CSS Grid",
        description: "Layout",
        priority: 5,
        knowledge: 3,
        notes: "Study gap",
      });
    });

    it("returns null when updating a missing id and leaves other skills unchanged", () => {
      const kept = createSkill({ name: "Keep Me" });

      expect(updateSkill(MISSING_ID, { name: "Nope" })).toBeNull();
      expect(getSkills()).toEqual([kept]);
    });

    it("deletes an existing skill", () => {
      const created = createSkill({ name: "Remove Me" });

      expect(deleteSkill(created.id)).toEqual({ ok: true });
      expect(getSkills()).toEqual([]);
      expect(getSkillById(created.id)).toBeNull();
    });

    it("reports not-found when deleting a missing id and leaves other skills unchanged", () => {
      const kept = createSkill({ name: "Stay" });

      expect(deleteSkill(MISSING_ID)).toEqual({
        ok: false,
        reason: "not-found",
      });
      expect(getSkills()).toEqual([kept]);
    });
  });

  describe("invalid writes", () => {
    it("rejects empty or whitespace names on create", () => {
      expect(() => createSkill({ name: "" })).toThrow("Name is required");
      expect(() => createSkill({ name: "   " })).toThrow("Name is required");
      expect(getSkills()).toEqual([]);
    });

    it("rejects empty or whitespace names on update and leaves the skill unchanged", () => {
      const kept = createSkill({ name: "Zod" });

      expect(() => updateSkill(kept.id, { name: "" })).toThrow(
        "Name is required",
      );
      expect(() => updateSkill(kept.id, { name: "   " })).toThrow(
        "Name is required",
      );
      expect(getSkillById(kept.id)).toEqual(kept);
    });

    it("rejects levels outside 1–5 on create and update without changing the catalog", () => {
      const kept = createSkill({ name: "Next.js" });

      expect(() => createSkill({ name: "Bad Priority", priority: 0 })).toThrow(
        "Level must be between 1 and 5",
      );
      expect(() => createSkill({ name: "Bad Knowledge", knowledge: 6 })).toThrow(
        "Level must be between 1 and 5",
      );
      // @ts-expect-error runtime guard: 9 is not a SkillLevel
      expect(() => updateSkill(kept.id, { priority: 9 })).toThrow(
        "Level must be between 1 and 5",
      );
      // @ts-expect-error runtime guard: 9 is not a SkillLevel
      expect(() => updateSkill(kept.id, { knowledge: 0 })).toThrow(
        "Level must be between 1 and 5",
      );
      expect(getSkills()).toEqual([kept]);
    });
  });
});
