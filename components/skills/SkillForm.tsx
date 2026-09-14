"use client";

import { useEffect, useRef, type SubmitEvent } from "react";
import { LEVELS, LEVEL_LABELS } from "@/lib/levels";
import { createSkill } from "@/lib/storage";
import type { SkillLevel } from "@/types/skill";

type SkillFormProps = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export function SkillForm({ open, onClose, onCreated }: SkillFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (open && !dialog.open) {
      dialog.showModal();
    }
    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    if (!name.trim()) {
      form.reportValidity();
      return;
    }

    createSkill({
      name,
      description: String(data.get("description") ?? ""),
      notes: String(data.get("notes") ?? ""),
      priority: Number(data.get("priority")) as SkillLevel,
      knowledge: Number(data.get("knowledge")) as SkillLevel,
    });
    form.reset();
    onCreated();
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="w-[min(100%,28rem)] rounded-xl border border-black/10 bg-background p-6 text-foreground shadow-lg dark:border-white/15"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Create Skill</h2>
        <label className="flex flex-col gap-1 text-sm">
          Name
          <input
            name="name"
            required
            autoFocus
            className="rounded-md border border-black/15 bg-transparent px-3 py-2 dark:border-white/20"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Description
          <input
            name="description"
            className="rounded-md border border-black/15 bg-transparent px-3 py-2 dark:border-white/20"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Priority
          <select
            name="priority"
            defaultValue="1"
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
            defaultValue="1"
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
          Notes
          <textarea
            name="notes"
            rows={3}
            className="rounded-md border border-black/15 bg-transparent px-3 py-2 dark:border-white/20"
          />
        </label>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-black/15 px-4 py-2 text-sm dark:border-white/20"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-foreground px-4 py-2 text-sm text-background"
          >
            Create
          </button>
        </div>
      </form>
    </dialog>
  );
}
