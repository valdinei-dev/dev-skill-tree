import { SkillDetail } from "@/components/skills/SkillDetail";

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <SkillDetail id={id} />
    </div>
  );
}
