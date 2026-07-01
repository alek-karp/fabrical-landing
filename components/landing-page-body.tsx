import { Button } from "@/components/ui/button";
import { demoUrl } from "@/lib/demo-url";

// import { ArrowDownRight, ArrowRight, FileText, Zap } from "lucide-react";
// import type { ReactNode } from "react";
//
// import { BenchmarksSection } from "@/components/benchmarks-section";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { routes } from "@/lib/routes";
//
// const scopeRows = [
//   { label: "Feeder routing", value: 98, tone: "bg-[#fbbf24]" },
//   { label: "Panel schedules", value: 94, tone: "bg-[#a7d7ad]" },
//   { label: "Change capture", value: 89, tone: "bg-[#f5c86a]" },
//   { label: "Crew readiness", value: 84, tone: "bg-[#d8dce3]" },
//   { label: "Procurement risk", value: 77, tone: "bg-[#d8dce3]" },
// ];
//
// const loadRows = [
//   { label: "Baseline plan", value: "142", width: "92%", tone: "bg-[#b9d7b3]" },
//   { label: "With Fabrical", value: "67", width: "43%", tone: "bg-[#2f7f4f]" },
//   { label: "Late materials", value: "96", width: "62%", tone: "bg-[#f0c58b]" },
//   { label: "Open RFIs", value: "31", width: "20%", tone: "bg-[#bd4b32]" },
// ];
//
// const articles = [
//   {
//     eyebrow: "01 - PLAN",
//     date: "LIVE SYSTEM",
//     title: "Turn project documents into an executable electrical plan",
//     tags: ["Drawings", "Scopes", "Constraints"],
//     body: "Fabrical reads drawings, schedules, RFIs, change logs, and procurement updates, then turns them into the next decisions your PMs, supers, and foremen need to make.",
//     action: "See planning workflow",
//     foot: "482 activities - 17 foremen - live constraint sync",
//   },
//   {
//     eyebrow: "02 - BUILD",
//     date: "FIELD READY",
//     title: "Release work packages crews can execute without rework",
//     tags: ["Spools", "BOM", "Sequence"],
//     body: "Assemblies move from coordination into field and prefab packages with labor, material, install sequence, and risk context already attached.",
//     foot: "36% faster release - 24% fewer shop questions",
//   },
// ];
//
// function Tag({ children }: { children: ReactNode }) {
//   return (
//     <span className="border border-[#d9a900] bg-[#fbbf24] px-2 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-black">
//       {children}
//     </span>
//   );
// }
//
// function SectionLabel({ children }: { children: ReactNode }) {
//   return (
//     <div className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.35em] text-[#2c3a4d]/60">
//       <span className="text-black">)</span>
//       <span>{children}</span>
//       <span className="h-px flex-1 bg-[#d6c28a]" />
//     </div>
//   );
// }
//
// function MetricCard() {
//   return (
//     <Card className="rounded-none border border-[#cdbb85] bg-white shadow-none ring-0">
//       <CardHeader className="gap-8 px-6 pt-7 md:px-8">
//         <div className="flex items-center justify-between gap-4">
//           <CardDescription className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-black">
//             Execution readiness
//           </CardDescription>
//           <CardDescription className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#8b96a5]">
//             week 06
//           </CardDescription>
//         </div>
//         <CardTitle className="font-mono text-[0.75rem] font-medium text-[#111827]">
//           Scope confidence
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="flex flex-col gap-4 px-6 md:px-8">
//         {scopeRows.map((row, index) => (
//           <div
//             className="grid grid-cols-[8rem_1fr_3rem] items-center gap-3"
//             key={row.label}
//           >
//             <div className="flex min-w-0 items-center gap-2">
//               <Zap
//                 className="size-3.5 shrink-0 text-black"
//                 aria-hidden="true"
//               />
//               <span className="truncate text-sm text-[#5d6877]">
//                 {row.label}
//               </span>
//             </div>
//             <div className="h-7 bg-[#e5e8ed]">
//               <div
//                 className={`h-full ${index === 0 ? "bg-[#fbbf24]" : row.tone}`}
//                 style={{ width: `${row.value}%` }}
//               />
//             </div>
//             <span className="text-right font-mono text-sm font-bold text-[#111827]">
//               {row.value}%
//             </span>
//           </div>
//         ))}
//       </CardContent>
//       <CardFooter className="mt-3 border-t border-[#d6c28a] px-6 py-4 md:px-8">
//         <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-black">
//           Overall 91% - 14 risk items cleared - 9 day pull-ahead
//         </p>
//       </CardFooter>
//     </Card>
//   );
// }
//
// function LoadCard() {
//   return (
//     <Card className="rounded-none border border-[#cdbb85] bg-white shadow-none ring-0">
//       <CardHeader className="px-6 pt-7 md:px-8">
//         <div className="flex items-center justify-between gap-4">
//           <CardDescription className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-[#8b96a5]">
//             Constraint load
//           </CardDescription>
//           <CardDescription className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#8b96a5]">
//             128 activities
//           </CardDescription>
//         </div>
//       </CardHeader>
//       <CardContent className="flex flex-col gap-4 px-6 md:px-8">
//         {loadRows.map((row) => (
//           <div
//             className="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3"
//             key={row.label}
//           >
//             <span className="truncate text-sm text-[#4f5a69]">{row.label}</span>
//             <div className="h-4 border-b border-dotted border-[#c8b77f]">
//               <div
//                 className={`h-2.5 ${row.tone}`}
//                 style={{ width: row.width }}
//               />
//             </div>
//             <span className="text-right font-mono text-lg font-bold text-[#111827]">
//               {row.value}
//             </span>
//           </div>
//         ))}
//         <div className="mt-4 grid grid-cols-4 gap-2 border-t border-dotted border-[#c8b77f] pt-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[#8b96a5]">
//           <span>0</span>
//           <span>50</span>
//           <span>100</span>
//           <span className="text-right">150</span>
//         </div>
//       </CardContent>
//       <CardFooter className="mt-3 border-t border-[#d6c28a] px-6 py-5 md:px-8">
//         <p className="flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-black">
//           <ArrowDownRight className="size-3.5" aria-hidden="true" />
//           53% fewer unresolved blockers by install week
//         </p>
//       </CardFooter>
//     </Card>
//   );
// }
//
// function ProductIntro() {
//   return (
//     <section className="border-b border-[#d6c28a] px-6 py-8 md:px-12 lg:px-16">
//       <SectionLabel>Platform</SectionLabel>
//       <div className="grid min-h-[360px] items-end gap-10 pt-16 lg:grid-cols-[1.35fr_0.65fr]">
//         <div className="pb-4">
//           <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-normal text-[#07111f] md:text-6xl lg:text-7xl">
//             Electrical construction, connected
//           </h1>
//           <p className="mt-8 max-w-2xl text-lg leading-8 text-[#667181]">
//             Fabrical connects estimating, coordination, procurement, prefab, and
//             field execution so teams always know what is ready, what is blocked,
//             and what changed.
//           </p>
//           <div className="mt-10 flex flex-wrap gap-3">
//             <Button className="h-11 rounded-none bg-[#fbbf24] px-5 text-black hover:bg-[#e6b94f]">
//               See the product
//               <ArrowRight data-icon="inline-end" />
//             </Button>
//             <Button
//               variant="outline"
//               className="h-11 rounded-none border-[#bca765] bg-transparent px-5 text-[#1f2937] shadow-none hover:bg-[#fff1bf]"
//             >
//               Talk to sales
//             </Button>
//           </div>
//         </div>
//         <div
//           aria-hidden="true"
//           className="min-h-72 opacity-80"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle, rgba(251,191,36,0.78) 2px, transparent 2.5px)",
//             backgroundPosition: "0 0, 12px 12px",
//             backgroundSize: "18px 18px",
//             clipPath:
//               "polygon(15% 70%, 42% 70%, 42% 30%, 78% 70%, 100% 70%, 100% 96%, 15% 96%)",
//           }}
//         />
//       </div>
//     </section>
//   );
// }
//
// function PlanningSection() {
//   const article = articles[0];
//
//   return (
//     <section className="grid border-b border-[#d6c28a] lg:grid-cols-[1.05fr_0.95fr]">
//       <article className="border-b border-[#d6c28a] px-6 py-12 md:px-12 lg:border-b-0 lg:px-16">
//         <div className="max-w-2xl">
//           <div className="flex flex-wrap items-center gap-3">
//             <Tag>{article.eyebrow}</Tag>
//             <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#9aa4b2]">
//               {article.date}
//             </span>
//           </div>
//           <h2 className="mt-12 text-4xl font-semibold leading-tight tracking-normal text-[#111827] md:text-5xl">
//             {article.title}
//           </h2>
//           <div className="mt-6 flex flex-wrap gap-2">
//             {article.tags.map((tag) => (
//               <Tag key={tag}>{tag}</Tag>
//             ))}
//           </div>
//           <p className="mt-7 text-lg leading-8 text-[#6b7280]">
//             {article.body}
//           </p>
//           <Button
//             variant="outline"
//             className="mt-8 h-11 rounded-none border-[#bca765] bg-transparent px-5 text-[#1f2937] shadow-none hover:bg-[#fff1bf]"
//           >
//             {article.action}
//             <ArrowRight data-icon="inline-end" />
//           </Button>
//           <div className="mt-16 border-t border-dotted border-[#c8b77f] pt-5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.26em] text-[#9aa4b2]">
//             {article.foot}
//           </div>
//         </div>
//       </article>
//       <div className="p-6 md:p-10">
//         <MetricCard />
//       </div>
//     </section>
//   );
// }
//
// function WorkPackagesSection() {
//   const article = articles[1];
//
//   return (
//     <section className="grid border-b border-[#d6c28a] lg:grid-cols-[1.05fr_0.95fr]">
//       <article className="border-b border-[#d6c28a] px-6 py-12 md:px-12 lg:border-b-0 lg:px-16">
//         <div className="max-w-2xl">
//           <div className="flex flex-wrap items-center gap-3">
//             <Tag>{article.eyebrow}</Tag>
//             <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#9aa4b2]">
//               {article.date}
//             </span>
//           </div>
//           <h2 className="mt-12 text-4xl font-semibold leading-tight tracking-normal text-[#111827] md:text-5xl">
//             {article.title}
//           </h2>
//           <p className="mt-7 text-lg leading-8 text-[#6b7280]">
//             {article.body}
//           </p>
//           <div className="mt-10 grid gap-3 sm:grid-cols-2">
//             <Card className="rounded-none border border-[#cdbb85] bg-white p-0 text-[#111827] shadow-none ring-0">
//               <CardContent className="px-4 py-4">
//                 <div className="flex items-center justify-between gap-4">
//                   <span className="text-sm font-semibold text-[#111827]">
//                     Prefab-ready assemblies
//                   </span>
//                   <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#4b5563]">
//                     Q3
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card className="rounded-none border border-[#cdbb85] bg-white p-0 text-[#111827] shadow-none ring-0">
//               <CardContent className="px-4 py-4">
//                 <div className="flex items-center justify-between gap-4">
//                   <span className="text-sm font-semibold text-[#111827]">
//                     Field install release
//                   </span>
//                   <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#4b5563]">
//                     Q4
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//           <div className="mt-14 border-t border-dotted border-[#c8b77f] pt-5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.26em] text-[#9aa4b2]">
//             {article.foot}
//           </div>
//         </div>
//       </article>
//       <div className="p-6 md:p-10">
//         <LoadCard />
//       </div>
//     </section>
//   );
// }
//
// function ProductTourLink() {
//   return (
//     <a
//       href={routes.home}
//       className="flex items-center justify-center gap-2 border-b border-[#d6c28a] bg-[#fff8e4] px-6 py-6 text-sm font-semibold text-[#111827] transition-colors hover:bg-[#fff1bf]"
//     >
//       <FileText className="size-4" aria-hidden="true" />
//       Walk through the product experience
//       <ArrowRight className="size-4" aria-hidden="true" />
//     </a>
//   );
// }
//
// function FeaturePipeline() {
//   return (
//     <section className="border-b border-[#d6c28a] px-6 py-24 text-center md:px-12 lg:px-16">
//       <span className="inline-flex border border-[#d9a900] bg-white px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#8a6500]">
//         Features
//       </span>
//       <h2 className="mx-auto mt-6 max-w-5xl text-4xl font-semibold leading-tight tracking-normal text-[#111827] md:text-6xl">
//         From bid set to install plan,{" "}
//         <span className="text-[#c48b00]">every step stays connected.</span>
//       </h2>
//       <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#6b7280]">
//         The product keeps project knowledge live across office, shop, and field,
//         so every team works from the same current picture.
//       </p>
//     </section>
//   );
// }

function IntroSection() {
  return (
    <section className="border-b border-black/10 bg-white px-6 py-20 font-mono text-black md:px-12 lg:px-16">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="text-4xl leading-[1.05] md:text-6xl">
            We know your next
            <br />
            <strong className="font-bold">best project.</strong>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-black/60">
            Connecting project teams to the plan that keeps every trade moving.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              asChild
              className="h-9 rounded-none bg-black px-5 text-xs uppercase tracking-widest text-white hover:bg-black/85"
            >
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                Contact us
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-9 rounded-none border-black/20 bg-transparent px-5 text-xs uppercase tracking-widest text-black shadow-none hover:bg-black/5"
            >
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                See the platform
              </a>
            </Button>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="h-40 w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.35) 1px, transparent 1.5px)",
            backgroundSize: "12px 12px",
            maskImage:
              "linear-gradient(115deg, black 0%, black 55%, transparent 75%)",
            WebkitMaskImage:
              "linear-gradient(115deg, black 0%, black 55%, transparent 75%)",
          }}
        />
      </div>
    </section>
  );
}

const expertisePillars = [
  {
    title: "Preconstruction",
    body: "Turn drawings, schedules, and RFIs into a scoped, executable plan before ground breaks.",
  },
  {
    title: "Coordination",
    body: "Keep office, shop, and field working from the same live constraint picture as plans change.",
  },
  {
    title: "Field Ops",
    body: "Release work packages crews can execute without rework, tracked from release to closeout.",
  },
];

const scatterDashes = [
  { x: 12, y: 18, r: 22 },
  { x: 28, y: 42, r: -8 },
  { x: 45, y: 15, r: 64 },
  { x: 62, y: 30, r: -32 },
  { x: 20, y: 60, r: 48 },
  { x: 78, y: 20, r: 10 },
  { x: 55, y: 55, r: -55 },
  { x: 35, y: 75, r: 15 },
  { x: 85, y: 55, r: 70 },
  { x: 68, y: 72, r: -18 },
  { x: 10, y: 85, r: 30 },
  { x: 90, y: 82, r: -40 },
  { x: 48, y: 90, r: 5 },
  { x: 25, y: 30, r: -60 },
  { x: 75, y: 42, r: 25 },
];

function ScatterGraphic() {
  return (
    <svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
      {scatterDashes.map((dash) => (
        <line
          key={`${dash.x}-${dash.y}`}
          x1={dash.x - 5}
          y1={dash.y}
          x2={dash.x + 5}
          y2={dash.y}
          stroke="black"
          strokeWidth="1.4"
          strokeOpacity="0.75"
          transform={`rotate(${dash.r} ${dash.x} ${dash.y})`}
        />
      ))}
    </svg>
  );
}

const networkNodes = [
  { x: 14, y: 22 },
  { x: 38, y: 12 },
  { x: 60, y: 30 },
  { x: 84, y: 18 },
  { x: 26, y: 55 },
  { x: 52, y: 62 },
  { x: 78, y: 50 },
  { x: 20, y: 85 },
  { x: 66, y: 88 },
];

const networkEdges: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [1, 5],
  [4, 5],
  [5, 6],
  [2, 6],
  [4, 7],
  [5, 8],
  [6, 8],
];

function NetworkGraphic() {
  return (
    <svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
      {networkEdges.map(([from, to]) => {
        const a = networkNodes[from];
        const b = networkNodes[to];
        return (
          <line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="black"
            strokeWidth="0.6"
            strokeOpacity="0.4"
          />
        );
      })}
      {networkNodes.map((node) => (
        <rect
          key={`${node.x}-${node.y}`}
          x={node.x - 2}
          y={node.y - 2}
          width="4"
          height="4"
          fill="black"
        />
      ))}
    </svg>
  );
}

function SwirlGraphic() {
  const spiralPoints = Array.from({ length: 90 }, (_, i) => {
    const angle = i * 0.35;
    const radius = 1.1 * i;
    return `${50 + radius * Math.cos(angle)},${50 + radius * Math.sin(angle)}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
      <polyline
        points={spiralPoints}
        fill="none"
        stroke="black"
        strokeWidth="1"
        strokeOpacity="0.7"
      />
      <circle cx="50" cy="50" r="1.6" fill="black" />
    </svg>
  );
}

const expertiseGraphics = [ScatterGraphic, NetworkGraphic, SwirlGraphic];

function ExpertiseSection() {
  return (
    <section className="border-b border-black/10 bg-black px-6 py-16 font-mono text-white md:px-12 lg:px-16">
      <h2 className="text-4xl md:text-5xl">Expertise</h2>
      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {expertisePillars.map((pillar, index) => {
          const Graphic = expertiseGraphics[index];

          return (
            <div key={pillar.title}>
              <div className="aspect-square w-full border border-white/10 bg-white p-4">
                <Graphic />
              </div>
              <h3 className="mt-6 text-lg">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">
                {pillar.body}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ScaleSection() {
  return (
    <section className="border-b border-black/10 bg-white px-6 py-20 font-mono text-black md:px-12 lg:px-16">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div
          aria-hidden="true"
          className="mx-auto aspect-square w-full max-w-sm rounded-full border border-black/10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.5) 1px, transparent 1.5px)",
            backgroundSize: "10px 10px",
            maskImage: "radial-gradient(circle, black 70%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(circle, black 70%, transparent 72%)",
          }}
        />
        <div>
          <h2 className="text-3xl leading-tight md:text-4xl">
            Present in <strong className="font-bold">12 states</strong>, every
            project phase.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-black/60">
            From single-building tenant improvements to multi-site
            infrastructure programs. We keep preconstruction, coordination, and
            field crews on <span className="underline">the same live plan</span>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="bg-black px-6 py-28 text-center font-mono text-white md:px-12 lg:px-16">
      <h2 className="text-3xl leading-tight md:text-5xl">
        Ready to connect your
        <br />
        <strong className="font-bold">next project?</strong>
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/60">
        Whether it&apos;s preconstruction, coordination, or field execution,
        tell us what you&apos;re building.
      </p>
      <Button
        asChild
        className="mt-10 h-11 rounded-none bg-white px-7 text-xs font-semibold uppercase tracking-widest text-black hover:bg-white/90"
      >
        <a href={demoUrl} target="_blank" rel="noopener noreferrer">
          Get in touch
        </a>
      </Button>
    </section>
  );
}

export function LandingPageBody() {
  return (
    <main className="min-h-screen bg-white text-[#111827]">
      <div className="mx-auto w-full max-w-[1400px] border-x border-black/10 bg-white">
        {/* <ProductIntro /> */}
        <IntroSection />
        <ExpertiseSection />
        {/* <PlanningSection /> */}
        {/* <WorkPackagesSection /> */}
        {/* <BenchmarksSection /> */}
        <ScaleSection />
        {/* <ProductTourLink /> */}
        {/* <FeaturePipeline /> */}
        <ClosingCta />
      </div>
    </main>
  );
}
