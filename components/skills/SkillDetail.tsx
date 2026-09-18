"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { SkillEditForm } from "@/components/skills/SkillEditForm";
import { labelForLevel } from "@/lib/levels";
import { deleteSkill, useSkills } from "@/lib/storage";

const DELETE_TITLE_ID = "delete-skill-title";

type SkillDetailProps = {
  id: string;
};

export function SkillDetail({ id }: SkillDetailProps) {
  const router = useRouter();
  const skills = useSkills();
  const [deleted, setDeleted] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const skipFocusRestore = useRef(false);

  useEffect(() => {
    if (!confirmOpen) {
      return;
    }
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (!dialog.open) {
      dialog.showModal();
    }
    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [confirmOpen]);

  useEffect(() => {
    if (editOpen || confirmOpen) {
      return;
    }
    if (skipFocusRestore.current) {
      skipFocusRestore.current = false;
      return;
    }
    openerRef.current?.focus();
  }, [editOpen, confirmOpen]);

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

  function openEdit(event: MouseEvent<HTMLButtonElement>) {
    openerRef.current = event.currentTarget;
    setEditOpen(true);
  }

  function openDelete(event: MouseEvent<HTMLButtonElement>) {
    openerRef.current = event.currentTarget;
    setConfirmOpen(true);
  }

  function handleCloseConfirm() {
    setConfirmOpen(false);
  }

  function handleCloseEdit() {
    setEditOpen(false);
  }

  function handleConfirmDelete() {
    const result = deleteSkill(id);
    if (result.ok) {
      skipFocusRestore.current = true;
      setConfirmOpen(false);
      setDeleted(true);
      router.replace("/skills");
    }
  }

  return (
    <section className="flex max-w-xl flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">{skill.name}</h1>
        <button
          type="button"
          onClick={openEdit}
          className="rounded-md bg-foreground px-4 py-2 text-sm text-background"
        >
          Edit
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-normal text-zinc-600 dark:text-zinc-400">
            Description
          </h2>
          <p className="min-h-6 whitespace-pre-wrap text-base">
            {skill.description}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-normal text-zinc-600 dark:text-zinc-400">
              Priority
            </h2>
            <p className="text-base">{labelForLevel(skill.priority)}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-normal text-zinc-600 dark:text-zinc-400">
              Knowledge
            </h2>
            <p className="text-base">{labelForLevel(skill.knowledge)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-normal text-zinc-600 dark:text-zinc-400">
            Notes
          </h2>
          <p className="min-h-6 whitespace-pre-wrap text-base">
            {skill.notes}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 border-t border-black/10 pt-6 dark:border-white/15">
        <button
          type="button"
          onClick={openDelete}
          className="rounded-md border border-red-700/40 px-4 py-2 text-sm text-red-800 dark:text-red-300"
        >
          Delete
        </button>
      </div>

      {confirmOpen ? (
        <dialog
          ref={dialogRef}
          aria-labelledby={DELETE_TITLE_ID}
          className="w-[min(100%,28rem)] rounded-xl border border-black/10 bg-background p-6 text-foreground shadow-lg dark:border-white/15"
          onClose={handleCloseConfirm}
          onCancel={(event) => {
            event.preventDefault();
            handleCloseConfirm();
          }}
        >
          <h2 id={DELETE_TITLE_ID} className="text-lg font-semibold">
            Delete Skill
          </h2>
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
      ) : null}

      {editOpen ? (
        <SkillEditForm
          open
          skill={skill}
          onClose={handleCloseEdit}
        />
      ) : null}
    </section>
  );
}
