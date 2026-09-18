"use client";

import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { LEVELS, LEVEL_LABELS } from "@/lib/levels";
import { createSkill } from "@/lib/storage";
import type { SkillLevel } from "@/types/skill";

const NAME_ERROR_ID = "create-skill-name-error";
const TITLE_ID = "create-skill-title";

type SkillFormProps = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export function SkillForm({ open, onClose, onCreated }: SkillFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState(false);

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

  useEffect(() => {
    if (nameError) {
      nameInputRef.current?.focus();
    }
  }, [nameError]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    if (!name.trim()) {
      setNameError(true);
      nameInputRef.current?.focus();
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
    setNameError(false);
    onCreated();
    handleClose();
  }

  function handleClose() {
    setNameError(false);
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={TITLE_ID}
      className="w-[min(100%,28rem)] rounded-xl border border-black/10 bg-background p-6 text-foreground shadow-lg dark:border-white/15"
      onClose={handleClose}
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <h2 id={TITLE_ID} className="text-lg font-semibold">
          Create Skill
        </h2>
        <label className="flex flex-col gap-1 text-sm">
          Name
          <input
            ref={nameInputRef}
            name="name"
            autoFocus
            aria-invalid={nameError || undefined}
            aria-describedby={nameError ? NAME_ERROR_ID : undefined}
            className="rounded-md border border-black/15 bg-transparent px-3 py-2 dark:border-white/20"
          />
          {nameError ? (
            <span id={NAME_ERROR_ID} className="text-sm text-red-700 dark:text-red-400">
              Name is required
            </span>
          ) : null}
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
            onClick={handleClose}
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
