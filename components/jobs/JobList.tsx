"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { JobForm } from "@/components/jobs/JobForm";
import { useJobs, useSkills } from "@/lib/storage";

export function JobList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobs = useJobs();
  const skills = useSkills();
  const [userOpened, setUserOpened] = useState(false);
  const [dismissedQuery, setDismissedQuery] = useState(false);
  const createFromQuery = searchParams.get("create") === "1" && !dismissedQuery;
  const formOpen = userOpened || createFromQuery;

  function closeForm() {
    setUserOpened(false);
    if (searchParams.get("create") === "1") {
      setDismissedQuery(true);
      router.replace("/jobs");
    }
  }

  if (jobs === null || skills === null) {
    return <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>;
  }

  const skillById = new Map(skills.map((skill) => [skill.id, skill]));

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">Jobs</h1>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setUserOpened(true)}
            className="rounded-md bg-foreground px-4 py-2 text-sm text-background"
          >
            Create Job
          </button>
          <Link
            href="/skills"
            className="rounded-md border border-black/15 px-4 py-2 text-sm dark:border-white/20"
          >
            My Skills
          </Link>
        </div>
      </div>

      {jobs.length === 0 ? (
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          No jobs yet. Create a job and associate existing skills.
        </p>
      ) : (
        <ul className="flex flex-col gap-8">
          {jobs.map((job) => {
            const resolved = job.skills.flatMap((id) => {
              const skill = skillById.get(id);
              return skill ? [{ id: skill.id, name: skill.name }] : [];
            });

            return (
              <li key={job.id} className="flex flex-col gap-3">
                <h2 className="text-xl font-medium">{job.name}</h2>
                <div className="border-t border-black/10 dark:border-white/15" />
                {resolved.length === 0 ? (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    No skills associated
                  </p>
                ) : (
                  <ul className="flex flex-col gap-1">
                    {resolved.map((skill) => (
                      <li key={skill.id}>
                        <Link
                          href={`/skills/${skill.id}`}
                          className="rounded-md px-1 py-1 hover:underline"
                        >
                          {skill.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <JobForm
        open={formOpen}
        skills={skills}
        onClose={closeForm}
        onCreated={() => undefined}
      />
    </section>
  );
}
