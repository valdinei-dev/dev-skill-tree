import Link from "next/link";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/skills", label: "My Skills" },
  { href: "/about", label: "About" },
] as const;

export function Header() {
  return (
    <header className="border-b border-black/10 bg-background dark:border-white/15">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground"
        >
          Dev Skill Tree
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-zinc-700 hover:bg-black/4 dark:text-zinc-300 dark:hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
