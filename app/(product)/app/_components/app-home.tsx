import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  PackageCheck,
} from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset className="min-h-svh bg-[#eef1f4] text-[#101820]">
      <header className="border-b border-[#c9d0d8] bg-white px-6 py-4 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <SidebarTrigger className="-ml-2 text-[#334155] hover:bg-[#eef1f4]" />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#637083]">
                Fabrical app
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-normal">
                Project command center
              </h1>
            </div>
          </div>
          <a
            className="inline-flex h-10 items-center gap-2 border border-[#aeb8c5] bg-white px-4 text-sm font-semibold text-[#101820] transition-colors hover:bg-[#f7f8fa]"
            href="/"
          >
            Landing
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-6 md:px-10 lg:grid-cols-[1fr_22rem]">
        <section className="flex flex-col gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            {readinessItems.map((item) => (
              <div
                className="border border-[#c9d0d8] bg-white p-5"
                key={item.label}
              >
                <p className="text-sm font-medium text-[#637083]">
                  {item.label}
                </p>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <span className="font-mono text-4xl font-semibold">
                    {item.value}
                  </span>
                  <CheckCircle2 className="mb-1 size-5 text-[#2f7f4f]" />
                </div>
                <p className="mt-4 border-t border-[#e0e4e8] pt-3 text-sm text-[#637083]">
                  {item.status}
                </p>
              </div>
            ))}
          </div>

          <section className="border border-[#c9d0d8] bg-white">
            <div className="flex items-center justify-between border-b border-[#e0e4e8] px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold tracking-normal">
                  Active work packages
                </h2>
                <p className="text-sm text-[#637083]">
                  Next field releases and approval blockers
                </p>
              </div>
              <ClipboardList className="size-5 text-[#637083]" />
            </div>
            <div className="divide-y divide-[#e0e4e8]">
              {workPackages.map((item) => (
                <div
                  className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_12rem_7rem] md:items-center"
                  key={item.name}
                >
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-[#637083]">{item.owner}</span>
                  <span className="w-fit border border-[#c9d0d8] px-2 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#334155]">
                    {item.state}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </section>

        <aside className="flex flex-col gap-6">
          <section className="border border-[#c9d0d8] bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold tracking-normal">
                Today&apos;s focus
              </h2>
              <CalendarDays className="size-5 text-[#637083]" />
            </div>
            <ol className="mt-5 flex flex-col gap-4 text-sm text-[#334155]">
              <li className="flex gap-3">
                <span className="font-mono font-semibold text-[#101820]">
                  01
                </span>
                Resolve long-lead switchgear submittal comments.
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-semibold text-[#101820]">
                  02
                </span>
                Release prefab package for the MCC room.
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-semibold text-[#101820]">
                  03
                </span>
                Confirm crew allocation for Level 04 rough-in.
              </li>
            </ol>
          </section>

          <section className="border border-[#c9d0d8] bg-[#101820] p-5 text-white">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold tracking-normal">
                Procurement risk
              </h2>
              <AlertTriangle className="size-5 text-[#fbbf24]" />
            </div>
            <p className="mt-4 text-sm leading-6 text-white/72">
              Eight material actions are within the release window. Three need
              PM escalation before install week.
            </p>
            <div className="mt-6 flex items-end justify-between border-t border-white/15 pt-4">
              <PackageCheck className="size-6 text-[#fbbf24]" />
              <span className="font-mono text-3xl font-semibold">8</span>
            </div>
          </section>
        </aside>
      </div>
    </SidebarInset>
  </SidebarProvider>
);
