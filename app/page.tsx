import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-16 md:flex-row md:items-center md:justify-between md:gap-16">
      <div className="max-w-xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Track and improve your technical skills
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Dev Skill Tree is a personal catalog for software developers. Record
          what you know, how important each skill is, and which jobs require
          them — then jump from a job requirement straight to that skill.
        </p>
      </div>
      <Link
        href="/skills"
        className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-base font-medium text-background md:mt-0"
      >
        Create Skills
      </Link>
    </section>
  );
}
