"use client";

import { useAssessment } from "@/lib/store/useAssessment";
import StepNav from "@/components/StepNav";

export default function SetupPage() {
  const a = useAssessment((s) => s.assessment);
  const setMeta = useAssessment((s) => s.setMeta);
  if (!a) return null;

  return (
    <div>
      <div className="card space-y-6 p-6">
        <div>
          <label htmlFor="projectName" className="mb-1.5 block text-sm font-medium text-ink">
            Project name
          </label>
          <input
            id="projectName"
            className="field"
            placeholder="e.g. Prisma Health Children's ED renovation"
            value={a.projectName}
            onChange={(e) => setMeta({ projectName: e.target.value })}
          />
          <p className="mt-1.5 text-xs text-muted">
            This names your saved assessment and appears on the report.
          </p>
        </div>

        <div>
          <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-ink">
            Date
          </label>
          <input
            id="date"
            type="date"
            className="field max-w-xs"
            value={a.date}
            onChange={(e) => setMeta({ date: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink">
            Brief description <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="description"
            className="field min-h-[120px] resize-y"
            placeholder="A sentence or two on the project scope, site, and team."
            value={a.description ?? ""}
            onChange={(e) => setMeta({ description: e.target.value })}
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">
        Your answers save automatically to this browser. You can leave and return any time.
      </p>

      <StepNav slug="setup" />
    </div>
  );
}
