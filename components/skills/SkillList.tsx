"use client";

import Link from "next/link";
import { useState } from "react";
import { SkillForm } from "@/components/skills/SkillForm";
import { LEVELS, labelForLevel } from "@/lib/levels";
import { useSkills } from "@/lib/storage";
import type { Skill, SkillLevel } from "@/types/skill";

function groupByPriority(skills: Skill[]): { level: SkillLevel; skills: Skill[] }[] {
  return LEVELS.slice()
    .reverse()
    .map((level) => ({
      level,
      skills: skills
        .filter((skill) => skill.priority === level)
        .sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
        ),
    }))
    .filter((group) => group.skills.length > 0);
}

export function SkillList() {
  const skills = useSkills();
  const [formOpen, setFormOpen] = useState(false);

  if (skills === null) {
    return <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>;
  }

  const groups = groupByPriority(skills);

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">My Skills</h1>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="rounded-md bg-foreground px-4 py-2 text-sm text-background"
            >
              Create Skill
            </button>
            <Link
              href="/jobs?create=1"
              className="rounded-md border border-black/15 px-4 py-2 text-sm dark:border-white/20"
            >
              Create Job
            </Link>
          </div>
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
        <div className="flex flex-col gap-8">
          {groups.map((group) => (
            <section key={group.level} className="flex flex-col gap-3">
              <h2 className="border-b border-black/10 pb-2 text-sm font-medium uppercase tracking-wide text-zinc-500 dark:border-white/15 dark:text-zinc-400">
                {labelForLevel(group.level)}
              </h2>
              <ul className="flex flex-col gap-1">
                {group.skills.map((skill) => (
                  <li key={skill.id}>
                    <Link
                      href={`/skills/${skill.id}`}
                      className="block rounded-md px-2 py-2 text-lg hover:bg-black/[.04] dark:hover:bg-white/10"
                    >
                      {skill.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <SkillForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onCreated={() => undefined}
      />
    </section>
  );
}
