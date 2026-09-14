"use client";

import Link from "next/link";
import { useEffect, useRef, type SubmitEvent } from "react";
import { createJob } from "@/lib/storage";
import type { Skill } from "@/types/skill";

type JobFormProps = {
  open: boolean;
  skills: Skill[];
  onClose: () => void;
  onCreated: () => void;
};

export function JobForm({ open, skills, onClose, onCreated }: JobFormProps) {
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

    const selected = data.getAll("skills").map(String);
    createJob({ name, skills: selected });
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
        <h2 className="text-lg font-semibold">Create Job</h2>
        <label className="flex flex-col gap-1 text-sm">
          Job Name
          <input
            name="name"
            required
            autoFocus
            className="rounded-md border border-black/15 bg-transparent px-3 py-2 dark:border-white/20"
          />
        </label>
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm">Skills</legend>
          {skills.length === 0 ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              No skills yet. Create a skill first, then associate it here.{" "}
              <Link href="/skills" className="underline" onClick={onClose}>
                My Skills
              </Link>
            </p>
          ) : (
            <ul className="flex max-h-48 flex-col gap-1 overflow-auto">
              {skills.map((skill) => (
                <li key={skill.id}>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="skills" value={skill.id} />
                    {skill.name}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </fieldset>
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
