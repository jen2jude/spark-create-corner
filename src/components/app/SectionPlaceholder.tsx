import type { ReactNode } from "react";
import { Panel, PanelHeader, Text, WorkflowSteps, type WorkflowStep } from "@/components/ds";

/**
 * Consistent shell for sections whose screens arrive in a later stage.
 * States the section's job and the planned capabilities, so the
 * architecture is legible without pretending features exist.
 */
export function SectionPlaceholder({
  purpose,
  planned,
  children,
}: {
  purpose: string;
  planned: ReadonlyArray<{ label: string; description: string }>;
  children?: ReactNode | undefined;
}) {
  const steps: WorkflowStep[] = planned.map((item, i) => ({
    id: `${i}`,
    label: item.label,
    description: item.description,
    state: "upcoming",
  }));

  return (
    <div className="space-y-6">
      <Panel>
        <PanelHeader title="What this section does" />
        <Text>{purpose}</Text>
      </Panel>
      <Panel>
        <PanelHeader
          title="Planned in this section"
          description="Early access is in progress; these screens land in a later stage."
        />
        <WorkflowSteps steps={steps} />
      </Panel>
      {children}
    </div>
  );
}
