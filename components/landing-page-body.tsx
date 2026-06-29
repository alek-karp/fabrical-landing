import { ArrowDownRight, ArrowRight, FileText, Zap } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const scopeRows = [
  { label: "Feeder routing", value: 98, tone: "bg-[#fbbf24]" },
  { label: "Panel schedules", value: 94, tone: "bg-[#a7d7ad]" },
  { label: "Change capture", value: 89, tone: "bg-[#f5c86a]" },
  { label: "Crew readiness", value: 84, tone: "bg-[#d8dce3]" },
  { label: "Procurement risk", value: 77, tone: "bg-[#d8dce3]" },
];

const loadRows = [
  { label: "Baseline plan", value: "142", width: "92%", tone: "bg-[#b9d7b3]" },
  { label: "With Fabrical", value: "67", width: "43%", tone: "bg-[#2f7f4f]" },
  { label: "Late materials", value: "96", width: "62%", tone: "bg-[#f0c58b]" },
  { label: "Open RFIs", value: "31", width: "20%", tone: "bg-[#bd4b32]" },
];

const articles = [
  {
    eyebrow: "01 - PLAN",
    date: "LIVE SYSTEM",
    title: "Turn project documents into an executable electrical plan",
    tags: ["Drawings", "Scopes", "Constraints"],
    body: "Fabrical reads drawings, schedules, RFIs, change logs, and procurement updates, then turns them into the next decisions your PMs, supers, and foremen need to make.",
    action: "See planning workflow",
    foot: "482 activities - 17 foremen - live constraint sync",
  },
  {
    eyebrow: "02 - BUILD",
    date: "FIELD READY",
    title: "Release work packages crews can execute without rework",
    tags: ["Spools", "BOM", "Sequence"],
    body: "Assemblies move from coordination into field and prefab packages with labor, material, install sequence, and risk context already attached.",
    foot: "36% faster release - 24% fewer shop questions",
  },
];

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="border border-[#d9a900] bg-[#fbbf24] px-2 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-black">
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.35em] text-[#2c3a4d]/60">
      <span className="text-black">)</span>
      <span>{children}</span>
      <span className="h-px flex-1 bg-[#d6c28a]" />
    </div>
  );
}

function MetricCard() {
  return (
    <Card className="rounded-none border border-[#cdbb85] bg-white shadow-none ring-0">
      <CardHeader className="gap-8 px-6 pt-7 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <CardDescription className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-black">
            Execution readiness
          </CardDescription>
          <CardDescription className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#8b96a5]">
            week 06
          </CardDescription>
        </div>
        <CardTitle className="font-mono text-[0.75rem] font-medium text-[#111827]">
          Scope confidence
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-6 md:px-8">
        {scopeRows.map((row, index) => (
          <div
            className="grid grid-cols-[8rem_1fr_3rem] items-center gap-3"
            key={row.label}
          >
            <div className="flex min-w-0 items-center gap-2">
              <Zap
                className="size-3.5 shrink-0 text-black"
                aria-hidden="true"
              />
              <span className="truncate text-sm text-[#5d6877]">
                {row.label}
              </span>
            </div>
            <div className="h-7 bg-[#e5e8ed]">
              <div
                className={`h-full ${index === 0 ? "bg-[#fbbf24]" : row.tone}`}
                style={{ width: `${row.value}%` }}
              />
            </div>
            <span className="text-right font-mono text-sm font-bold text-[#111827]">
              {row.value}%
            </span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="mt-3 border-t border-[#d6c28a] px-6 py-4 md:px-8">
        <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-black">
          Overall 91% - 14 risk items cleared - 9 day pull-ahead
        </p>
      </CardFooter>
    </Card>
  );
}

function LoadCard() {
  return (
    <Card className="rounded-none border border-[#cdbb85] bg-white shadow-none ring-0">
      <CardHeader className="px-6 pt-7 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <CardDescription className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-[#8b96a5]">
            Constraint load
          </CardDescription>
          <CardDescription className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#8b96a5]">
            128 activities
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-6 md:px-8">
        {loadRows.map((row) => (
          <div
            className="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3"
            key={row.label}
          >
            <span className="truncate text-sm text-[#4f5a69]">{row.label}</span>
            <div className="h-4 border-b border-dotted border-[#c8b77f]">
              <div
                className={`h-2.5 ${row.tone}`}
                style={{ width: row.width }}
              />
            </div>
            <span className="text-right font-mono text-lg font-bold text-[#111827]">
              {row.value}
            </span>
          </div>
        ))}
        <div className="mt-4 grid grid-cols-4 gap-2 border-t border-dotted border-[#c8b77f] pt-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[#8b96a5]">
          <span>0</span>
          <span>50</span>
          <span>100</span>
          <span className="text-right">150</span>
        </div>
      </CardContent>
      <CardFooter className="mt-3 border-t border-[#d6c28a] px-6 py-5 md:px-8">
        <p className="flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-black">
          <ArrowDownRight className="size-3.5" aria-hidden="true" />
          53% fewer unresolved blockers by install week
        </p>
      </CardFooter>
    </Card>
  );
}

function ProductIntro() {
  return (
    <section className="border-b border-[#d6c28a] px-6 py-8 md:px-12 lg:px-16">
      <SectionLabel>Platform</SectionLabel>
      <div className="grid min-h-[360px] items-end gap-10 pt-16 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="pb-4">
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-normal text-[#07111f] md:text-6xl lg:text-7xl">
            Electrical construction, connected
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#667181]">
            Fabrical connects estimating, coordination, procurement, prefab, and
            field execution so teams always know what is ready, what is blocked,
            and what changed.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button className="h-11 rounded-none bg-[#fbbf24] px-5 text-black hover:bg-[#e6b94f]">
              See the product
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              className="h-11 rounded-none border-[#bca765] bg-transparent px-5 text-[#1f2937] shadow-none hover:bg-[#fff1bf]"
            >
              Talk to sales
            </Button>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="min-h-72 opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(251,191,36,0.78) 2px, transparent 2.5px)",
            backgroundPosition: "0 0, 12px 12px",
            backgroundSize: "18px 18px",
            clipPath:
              "polygon(15% 70%, 42% 70%, 42% 30%, 78% 70%, 100% 70%, 100% 96%, 15% 96%)",
          }}
        />
      </div>
    </section>
  );
}

function PlanningSection() {
  const article = articles[0];

  return (
    <section className="grid border-b border-[#d6c28a] lg:grid-cols-[1.05fr_0.95fr]">
      <article className="border-b border-[#d6c28a] px-6 py-12 md:px-12 lg:border-b-0 lg:px-16">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <Tag>{article.eyebrow}</Tag>
            <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#9aa4b2]">
              {article.date}
            </span>
          </div>
          <h2 className="mt-12 text-4xl font-semibold leading-tight tracking-normal text-[#111827] md:text-5xl">
            {article.title}
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <p className="mt-7 text-lg leading-8 text-[#6b7280]">
            {article.body}
          </p>
          <Button
            variant="outline"
            className="mt-8 h-11 rounded-none border-[#bca765] bg-transparent px-5 text-[#1f2937] shadow-none hover:bg-[#fff1bf]"
          >
            {article.action}
            <ArrowRight data-icon="inline-end" />
          </Button>
          <div className="mt-16 border-t border-dotted border-[#c8b77f] pt-5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.26em] text-[#9aa4b2]">
            {article.foot}
          </div>
        </div>
      </article>
      <div className="p-6 md:p-10">
        <MetricCard />
      </div>
    </section>
  );
}

function WorkPackagesSection() {
  const article = articles[1];

  return (
    <section className="grid border-b border-[#d6c28a] lg:grid-cols-[1.05fr_0.95fr]">
      <article className="border-b border-[#d6c28a] px-6 py-12 md:px-12 lg:border-b-0 lg:px-16">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <Tag>{article.eyebrow}</Tag>
            <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#9aa4b2]">
              {article.date}
            </span>
          </div>
          <h2 className="mt-12 text-4xl font-semibold leading-tight tracking-normal text-[#111827] md:text-5xl">
            {article.title}
          </h2>
          <p className="mt-7 text-lg leading-8 text-[#6b7280]">
            {article.body}
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <Card className="rounded-none border border-[#cdbb85] bg-white p-0 text-[#111827] shadow-none ring-0">
              <CardContent className="px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-[#111827]">
                    Prefab-ready assemblies
                  </span>
                  <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#4b5563]">
                    Q3
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-none border border-[#cdbb85] bg-white p-0 text-[#111827] shadow-none ring-0">
              <CardContent className="px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-[#111827]">
                    Field install release
                  </span>
                  <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#4b5563]">
                    Q4
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-14 border-t border-dotted border-[#c8b77f] pt-5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.26em] text-[#9aa4b2]">
            {article.foot}
          </div>
        </div>
      </article>
      <div className="p-6 md:p-10">
        <LoadCard />
      </div>
    </section>
  );
}

function ProductTourLink() {
  return (
    <a
      href="/"
      className="flex items-center justify-center gap-2 border-b border-[#d6c28a] bg-[#fff8e4] px-6 py-6 text-sm font-semibold text-[#111827] transition-colors hover:bg-[#fff1bf]"
    >
      <FileText className="size-4" aria-hidden="true" />
      Walk through the product experience
      <ArrowRight className="size-4" aria-hidden="true" />
    </a>
  );
}

function FeaturePipeline() {
  return (
    <section className="border-b border-[#d6c28a] px-6 py-24 text-center md:px-12 lg:px-16">
      <span className="inline-flex border border-[#d9a900] bg-white px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#8a6500]">
        Features
      </span>
      <h2 className="mx-auto mt-6 max-w-5xl text-4xl font-semibold leading-tight tracking-normal text-[#111827] md:text-6xl">
        From bid set to install plan,{" "}
        <span className="text-[#c48b00]">every step stays connected.</span>
      </h2>
      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#6b7280]">
        The product keeps project knowledge live across office, shop, and field,
        so every team works from the same current picture.
      </p>
    </section>
  );
}

export function LandingPageBody() {
  return (
    <main className="min-h-screen bg-[#f5efd8] px-4 text-[#111827] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl border-x border-[#c39a26] bg-white">
        <div
          className="h-20 border-b border-[#c39a26]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(251,191,36,0.42) 1px, transparent 1.5px)",
            backgroundSize: "12px 12px",
          }}
        />
        <ProductIntro />
        <PlanningSection />
        <WorkPackagesSection />
        <ProductTourLink />
        <FeaturePipeline />
      </div>
    </main>
  );
}
