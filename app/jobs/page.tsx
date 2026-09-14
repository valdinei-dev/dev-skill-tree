import { Suspense } from "react";
import { JobList } from "@/components/jobs/JobList";

export default function JobsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <Suspense fallback={<p>Loading...</p>}>
        <JobList />
      </Suspense>
    </div>
  );
}
