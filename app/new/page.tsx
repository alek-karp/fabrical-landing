import {
  ArrowDownRight,
  ArrowRight,
  ClipboardList,
  FileText,
  Plus,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
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
  { label: "Feeder routing", value: 98, tone: "bg-[#f5c86a]" },
  { label: "Panel schedules", value: 94, tone: "bg-[#a7d7ad]" },
  { label: "Change capture", value: 89, tone: "bg-[#75a7ff]" },
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
    eyebrow: "01 - FIELD OPS",
    date: "JUN 2026",
    title: "State-of-the-art execution control for electrical teams",
    tags: ["Lookahead", "Labor", "Risk"],
    body: "Fabrical keeps constraint logs, crew plans, and prefabrication signals aligned so project teams see the next blocker before it reaches the field.",
    action: "Read field note",
    foot: "482 activities - 17 foremen - live constraint sync",
  },
  {
    eyebrow: "02 - PREFAB",
    date: "JUN 2026",
    title: "Routing packages that arrive ready for the shop",
    tags: ["Spools", "BOM", "QA"],
    body: "Mocked assemblies move from drawings to materialized work packages with estimated hours, required stock, and install sequence already attached.",
    action: "Open workflow",
    foot: "36% faster release - 24% fewer shop questions",
  },
];

const featureSteps = [
  "Estimate",
  "Coordinate",
  "Procure",
  "Prefabricate",
  "Install",
  "Report",
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-[#bfd8ff] bg-[#eef6ff] px-2 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#0068ff]">
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.35em] text-[#2c3a4d]/60">
      <span className="text-[#0068ff]">)</span>
      <span>{children}</span>
      <span className="h-px flex-1 bg-[#cfe0f5]" />
    </div>
  );
}

function MetricCard() {
  return (
    <Card className="rounded-none border border-[#d8e5f5] bg-[#fbfdff] shadow-none ring-0">
      <CardHeader className="gap-8 px-6 pt-7 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <CardDescription className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-[#0068ff]">
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
                className="size-3.5 shrink-0 text-[#0068ff]"
                aria-hidden="true"
              />
              <span className="truncate text-sm text-[#5d6877]">
                {row.label}
              </span>
            </div>
            <div className="h-7 bg-[#e5e8ed]">
              <div
                className={`h-full ${index === 0 ? "bg-[#0068ff]" : row.tone}`}
                style={{ width: `${row.value}%` }}
              />
            </div>
            <span className="text-right font-mono text-sm font-bold text-[#111827]">
              {row.value}%
            </span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="mt-3 border-t border-[#e3edf8] px-6 py-4 md:px-8">
        <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#0068ff]">
          Overall 91% - 14 risk items cleared - 9 day pull-ahead
        </p>
      </CardFooter>
    </Card>
  );
}

function LoadCard() {
  return (
    <Card className="rounded-none border border-[#d8e5f5] bg-[#fbfdff] shadow-none ring-0">
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
            <div className="h-4 border-b border-dotted border-[#c9d8ea]">
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
        <div className="mt-4 grid grid-cols-4 gap-2 border-t border-dotted border-[#c9d8ea] pt-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[#8b96a5]">
          <span>0</span>
          <span>50</span>
          <span>100</span>
          <span className="text-right">150</span>
        </div>
      </CardContent>
      <CardFooter className="mt-3 border-t border-[#e3edf8] px-6 py-5 md:px-8">
        <p className="flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#0068ff]">
          <ArrowDownRight className="size-3.5" aria-hidden="true" />
          53% fewer unresolved blockers by install week
        </p>
      </CardFooter>
    </Card>
  );
}

export default function NewPage() {
  return (
    <>
      <Hero />
      <main className="min-h-screen bg-[#eef4fb] px-4 text-[#111827] sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl border-x border-[#cfe0f5] bg-[#f6f9fd]">
          <div
            className="h-20 border-b border-[#d6e5f6]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(0,104,255,0.22) 1px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />

          <section className="border-b border-[#cfe0f5] px-6 py-8 md:px-12 lg:px-16">
            <SectionLabel>Research</SectionLabel>
            <div className="grid min-h-[360px] items-end gap-10 pt-16 lg:grid-cols-[1fr_0.9fr]">
              <div className="pb-4">
                <h1 className="max-w-4xl text-6xl font-semibold leading-[0.96] tracking-normal text-[#07111f] md:text-7xl lg:text-8xl">
                  Field systems research
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-[#667181]">
                  Mocked notes on coordination, retrieval, labor planning, and
                  how intelligent workflows move electrical projects from plan
                  to installation.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button className="h-11 rounded-none bg-[#0068ff] px-5 text-white hover:bg-[#0058d9]">
                    Check code
                    <ArrowRight data-icon="inline-end" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 rounded-none border-[#cbdcf0] bg-transparent px-5 text-[#1f2937] shadow-none hover:bg-[#eaf3ff]"
                  >
                    Explore docs
                  </Button>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="min-h-72 opacity-80"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(0,104,255,0.42) 2px, transparent 2.5px)",
                  backgroundPosition: "0 0, 12px 12px",
                  backgroundSize: "18px 18px",
                  clipPath:
                    "polygon(15% 70%, 42% 70%, 42% 30%, 78% 70%, 100% 70%, 100% 96%, 15% 96%)",
                }}
              />
            </div>
          </section>

          <section className="grid border-b border-[#cfe0f5] lg:grid-cols-[1.05fr_0.95fr]">
            <article className="border-b border-[#cfe0f5] px-6 py-12 md:px-12 lg:border-b-0 lg:px-16">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <Tag>{articles[0].eyebrow}</Tag>
                  <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#9aa4b2]">
                    {articles[0].date}
                  </span>
                </div>
                <h2 className="mt-12 text-4xl font-semibold leading-tight tracking-normal text-[#111827] md:text-5xl">
                  {articles[0].title}
                </h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {articles[0].tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <p className="mt-7 text-lg leading-8 text-[#6b7280]">
                  {articles[0].body}
                </p>
                <Button
                  variant="outline"
                  className="mt-8 h-11 rounded-none border-[#cbdcf0] bg-transparent px-5 text-[#1f2937] shadow-none hover:bg-[#eaf3ff]"
                >
                  {articles[0].action}
                  <ArrowRight data-icon="inline-end" />
                </Button>
                <div className="mt-16 border-t border-dotted border-[#c5d9f1] pt-5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.26em] text-[#9aa4b2]">
                  {articles[0].foot}
                </div>
              </div>
            </article>
            <div className="p-6 md:p-10">
              <MetricCard />
            </div>
          </section>

          <section className="grid border-b border-[#cfe0f5] lg:grid-cols-[1.05fr_0.95fr]">
            <article className="border-b border-[#cfe0f5] px-6 py-12 md:px-12 lg:border-b-0 lg:px-16">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <Tag>{articles[1].eyebrow}</Tag>
                  <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#9aa4b2]">
                    {articles[1].date}
                  </span>
                </div>
                <h2 className="mt-12 text-4xl font-semibold leading-tight tracking-normal text-[#111827] md:text-5xl">
                  {articles[1].title}
                </h2>
                <p className="mt-7 text-lg leading-8 text-[#6b7280]">
                  {articles[1].body}
                </p>
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  <Card className="rounded-none border border-[#d8e5f5] bg-[#faffef] p-0 shadow-none ring-0">
                    <CardContent className="px-4 py-4">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-semibold">
                          One-line prefab kit
                        </span>
                        <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#8b96a5]">
                          Q3
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="rounded-none border border-[#d8e5f5] bg-[#eef6ff] p-0 shadow-none ring-0">
                    <CardContent className="px-4 py-4">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-semibold">
                          Panel room release
                        </span>
                        <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#8b96a5]">
                          Q4
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="mt-14 border-t border-dotted border-[#c5d9f1] pt-5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.26em] text-[#9aa4b2]">
                  {articles[1].foot}
                </div>
              </div>
            </article>
            <div className="p-6 md:p-10">
              <LoadCard />
            </div>
          </section>

          <a
            href="/"
            className="flex items-center justify-center gap-2 border-b border-[#cfe0f5] bg-[#e3f0ff] px-6 py-6 text-sm font-semibold text-[#0068ff] transition-colors hover:bg-[#d8eaff]"
          >
            <FileText className="size-4" aria-hidden="true" />
            Browse all mocked research notes
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>

          <section className="px-6 py-20 text-center md:px-12 lg:px-16">
            <Tag>Features</Tag>
            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-[#111827] md:text-6xl">
              How project signal becomes a reliable work plan.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#6b7280]">
              Every estimate, drawing, constraint, and field note is normalized
              into a single operational memory that teams can act on.
            </p>
            <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 border border-[#d8e5f5] bg-[#fbfdff] md:grid-cols-3 lg:grid-cols-6">
              {featureSteps.map((step, index) => (
                <div
                  className="flex min-h-32 flex-col items-center justify-center gap-4 border-[#d8e5f5] p-5 max-lg:border-b max-md:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0"
                  key={step}
                >
                  <span className="flex size-9 items-center justify-center border border-[#bfd8ff] bg-[#eef6ff] font-mono text-xs font-bold text-[#0068ff]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold text-[#1f2937]">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-[#cfe0f5] bg-[#07111f] px-6 py-12 text-white md:px-12 lg:px-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-white/50">
                  <ClipboardList className="size-4" aria-hidden="true" />
                  Mocked implementation layer
                </div>
                <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-normal md:text-5xl">
                  Industrial systems for the contractors building the grid.
                </h2>
              </div>
              <Button className="h-11 w-fit rounded-none bg-[#f5c86a] px-5 text-black hover:bg-[#e6b94f]">
                Start planning
                <Plus data-icon="inline-end" />
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
