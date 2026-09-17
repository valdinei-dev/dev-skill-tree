"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { LEVELS, LEVEL_LABELS, labelForLevel } from "@/lib/levels";
import { deleteSkill, updateSkill, useSkills } from "@/lib/storage";
import type { SkillLevel } from "@/types/skill";

type SkillDetailProps = {
  id: string;
};

export function SkillDetail({ id }: SkillDetailProps) {
  const router = useRouter();
  const skills = useSkills();
  const [saved, setSaved] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (confirmOpen && !dialog.open) {
      dialog.showModal();
    }
    if (!confirmOpen && dialog.open) {
      dialog.close();
    }
  }, [confirmOpen]);

  if (deleted) {
    return <p>Loading...</p>;
  }

  if (skills === null) {
    return <p>Loading...</p>;
  }

  const skill = skills.find((item) => item.id === id) ?? null;
  if (!skill) {
    return <p>Skill not found</p>;
  }

  function handleSave(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    if (!name.trim()) {
      event.currentTarget.reportValidity();
      return;
    }

    const updated = updateSkill(id, {
      name,
      description: String(data.get("description") ?? ""),
      notes: String(data.get("notes") ?? ""),
      priority: Number(data.get("priority")) as SkillLevel,
      knowledge: Number(data.get("knowledge")) as SkillLevel,
    });

    if (!updated) {
      return;
    }
    setSaved(true);
  }

  function handleCloseConfirm() {
    setConfirmOpen(false);
  }

  function handleConfirmDelete() {
    const result = deleteSkill(id);
    if (result.ok) {
      setConfirmOpen(false);
      setDeleted(true);
      router.replace("/skills");
    }
  }

  return (
    <section className="flex max-w-xl flex-col gap-6">
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Name
          <input
            name="name"
            required
            defaultValue={skill.name}
            key={`${skill.id}-name-${skill.name}`}
            className="rounded-md border border-black/15 bg-transparent px-3 py-2 text-2xl font-semibold dark:border-white/20"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Description
          <textarea
            name="description"
            rows={2}
            defaultValue={skill.description}
            key={`${skill.id}-description-${skill.description}`}
            className="rounded-md border border-black/15 bg-transparent px-3 py-2 dark:border-white/20"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            Priority
            <select
              name="priority"
              defaultValue={skill.priority}
              key={`${skill.id}-priority-${skill.priority}`}
              className="rounded-md border border-black/15 bg-background px-3 py-2 dark:border-white/20"
            >
              {LEVELS.map((level) => (
                <option key={level} value={level}>
                  {LEVEL_LABELS[level]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Knowledge
            <select
              name="knowledge"
              defaultValue={skill.knowledge}
              key={`${skill.id}-knowledge-${skill.knowledge}`}
              className="rounded-md border border-black/15 bg-background px-3 py-2 dark:border-white/20"
            >
              {LEVELS.map((level) => (
                <option key={level} value={level}>
                  {LEVEL_LABELS[level]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Current: {labelForLevel(skill.priority)} priority,{" "}
          {labelForLevel(skill.knowledge)} knowledge.
        </p>
        <label className="flex flex-col gap-1 text-sm">
          Notes
          <textarea
            name="notes"
            rows={4}
            defaultValue={skill.notes}
            key={`${skill.id}-notes-${skill.notes}`}
            className="rounded-md border border-black/15 bg-transparent px-3 py-2 dark:border-white/20"
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="rounded-md bg-foreground px-4 py-2 text-sm text-background"
          >
            Save
          </button>
          {saved ? (
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Saved
            </span>
          ) : null}
        </div>
      </form>

      <div className="flex flex-col items-start gap-2 border-t border-black/10 pt-6 dark:border-white/15">
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="rounded-md border border-red-700/40 px-4 py-2 text-sm text-red-800 dark:text-red-300"
        >
          Delete
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="w-[min(100%,28rem)] rounded-xl border border-black/10 bg-background p-6 text-foreground shadow-lg dark:border-white/15"
        onClose={handleCloseConfirm}
        onCancel={(event) => {
          event.preventDefault();
          handleCloseConfirm();
        }}
      >
        <h2 className="text-lg font-semibold">Delete Skill</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          You are about to delete the skill “{skill.name}”. This cannot be
          undone.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCloseConfirm}
            className="rounded-md border border-black/15 px-4 py-2 text-sm dark:border-white/20"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            className="rounded-md border border-red-700/40 px-4 py-2 text-sm text-red-800 dark:text-red-300"
          >
            Delete
          </button>
        </div>
      </dialog>
    </section>
  );
}
