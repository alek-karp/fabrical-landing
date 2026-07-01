import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  PackageCheck,
} from "lucide-react";

import { AppShell } from "@/components/app-shell";

const readinessItems = [
  { label: "Scope confidence", value: "91%", status: "14 risks cleared" },
  { label: "Crew readiness", value: "84%", status: "3 crews blocked" },
  { label: "Material coverage", value: "77%", status: "8 vendor actions" },
];

const workPackages = [
  {
    name: "Level 04 feeder rough-in",
    owner: "Foreman review",
    state: "Ready",
  },
  {
    name: "MCC room prefab release",
    owner: "Shop coordination",
    state: "Blocked",
  },
  {
    name: "Panel schedule reconciliation",
    owner: "PM approval",
    state: "Due today",
  },
];

export const AppHome = () => (
  <AppShell
    title="Project command center"
    className="grid lg:grid-cols-[1fr_22rem]"
  >
    <section className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        {readinessItems.map((item) => (
          <div
            className="border border-border bg-card p-5 text-card-foreground"
            key={item.label}
          >
            <p className="text-sm font-medium text-muted-foreground">
              {item.label}
            </p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <span className="text-4xl font-semibold">{item.value}</span>
              <CheckCircle2 className="mb-1 size-5 text-primary" />
            </div>
            <p className="mt-4 border-t border-border pt-3 text-sm text-muted-foreground">
              {item.status}
            </p>
          </div>
        ))}
      </div>

      <section className="border border-border bg-card text-card-foreground">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold tracking-normal">
              Active work packages
            </h2>
            <p className="text-sm text-muted-foreground">
              Next field releases and approval blockers
            </p>
          </div>
          <ClipboardList className="size-5 text-muted-foreground" />
        </div>
        <div className="divide-y divide-border">
          {workPackages.map((item) => (
            <div
              className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_12rem_7rem] md:items-center"
              key={item.name}
            >
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-muted-foreground">
                {item.owner}
              </span>
              <span className="w-fit border border-border px-2 py-1 text-xs font-semibold uppercase">
                {item.state}
              </span>
            </div>
          ))}
        </div>
      </section>
    </section>

    <aside className="flex flex-col gap-6">
      <section className="border border-border bg-card p-5 text-card-foreground">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-normal">
            Today&apos;s focus
          </h2>
          <CalendarDays className="size-5 text-muted-foreground" />
        </div>
        <ol className="mt-5 flex flex-col gap-4 text-sm text-muted-foreground">
          <li className="flex gap-3">
            <span className="font-semibold text-foreground">01</span>
            Resolve long-lead switchgear submittal comments.
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-foreground">02</span>
            Release prefab package for the MCC room.
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-foreground">03</span>
            Confirm crew allocation for Level 04 rough-in.
          </li>
        </ol>
      </section>

      <section className="border border-border bg-card p-5 text-card-foreground">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-normal">
            Procurement risk
          </h2>
          <AlertTriangle className="size-5 text-primary" />
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Eight material actions are within the release window. Three need PM
          escalation before install week.
        </p>
        <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
          <PackageCheck className="size-6 text-primary" />
          <span className="text-3xl font-semibold">8</span>
        </div>
      </section>
    </aside>
  </AppShell>
);
