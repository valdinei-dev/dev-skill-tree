"use client";

import Link from "next/link";
import { useState } from "react";
import { SkillForm } from "@/components/skills/SkillForm";
import { labelForLevel } from "@/lib/levels";
import { useSkills } from "@/lib/storage";
import type { Skill } from "@/types/skill";

function sortSkillsForTable(skills: Skill[]): Skill[] {
  return skills.slice().sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });
}

export function SkillList() {
  const skills = useSkills();
  const [formOpen, setFormOpen] = useState(false);

  if (skills === null) {
    return <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>;
  }

  const rows = sortSkillsForTable(skills);

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">My Skills</h1>
        {skills.length > 0 ? (
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="rounded-md bg-foreground px-4 py-2 text-sm text-background"
          >
            Create Skill
          </button>
        ) : null}
      </div>

      {skills.length === 0 ? (
        <div className="flex flex-col items-start gap-4">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            You don&apos;t have any skills yet.
          </p>
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="rounded-md bg-foreground px-4 py-2 text-sm text-background"
          >
            Create your first skill
          </button>
        </div>
      ) : (
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-black/10 text-sm font-medium text-zinc-500 dark:border-white/15 dark:text-zinc-400">
              <th scope="col" className="px-2 py-2 font-medium">
                Skill
              </th>
              <th scope="col" className="px-2 py-2 font-medium">
                Priority
              </th>
              <th scope="col" className="px-2 py-2 font-medium">
                Knowledge
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((skill) => (
              <tr
                key={skill.id}
                className="border-b border-black/5 dark:border-white/10"
              >
                <td className="px-2 py-2 text-lg">
                  <Link
                    href={`/skills/${skill.id}`}
                    className="rounded-md hover:underline"
                  >
                    {skill.name}
                  </Link>
                </td>
                <td className="px-2 py-2 text-zinc-700 dark:text-zinc-300">
                  {labelForLevel(skill.priority)}
                </td>
                <td className="px-2 py-2 text-zinc-700 dark:text-zinc-300">
                  {labelForLevel(skill.knowledge)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <SkillForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onCreated={() => undefined}
      />
    </section>
  );
}
