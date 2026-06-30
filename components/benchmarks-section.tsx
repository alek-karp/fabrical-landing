import type { ReactNode } from "react";

import { routes } from "@/lib/routes";

const BlueprintFrame = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`relative border border-dashed border-[#d9a900] p-6 md:p-8 ${className ?? ""}`}
  >
    <span
      className="absolute -top-1 -left-1 size-2 bg-[#d9a900]"
      aria-hidden="true"
    />
    <span
      className="absolute -top-1 -right-1 size-2 bg-[#d9a900]"
      aria-hidden="true"
    />
    <span
      className="absolute -bottom-1 -left-1 size-2 bg-[#d9a900]"
      aria-hidden="true"
    />
    <span
      className="absolute -bottom-1 -right-1 size-2 bg-[#d9a900]"
      aria-hidden="true"
    />
    {children}
  </div>
);

const BrainGraphic = () => (
  <svg
    viewBox="0 0 200 180"
    className="mx-auto h-40 w-full max-w-[220px] md:h-48"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="brain-dots"
        width="6"
        height="6"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="3" cy="3" r="1.4" fill="#fbbf24" />
      </pattern>
      <path
        id="brain-shape"
        d="M100 18c-22 0-38 14-42 32-8-4-20-2-28 8-10 12-8 30 4 40-6 10-4 24 6 32 10 8 24 8 34 2 8 14 22 22 38 22 16 0 30-8 38-22 10 6 24 6 34-2 10-8 12-22 6-32 12-10 14-28 4-40-8-10-20-12-28-8-4-18-20-32-42-32z"
      />
    </defs>
    <use href="#brain-shape" fill="url(#brain-dots)" />
  </svg>
);

const RecallTimeChart = () => (
  <svg
    viewBox="0 0 280 200"
    className="mx-auto h-44 w-full max-w-[280px]"
    aria-hidden="true"
  >
    <g transform="skewY(-12)">
      <g transform="translate(24, 120)">
        <polygon points="0,60 48,60 48,0 0,0" fill="#84cc16" />
        <polygon points="48,60 72,48 72,-12 48,0" fill="#65a30d" />
        <polygon points="0,60 24,48 72,48 48,60" fill="#4d7c0f" />
      </g>
      <g transform="translate(96, 72)">
        <polygon points="0,108 48,108 48,0 0,0" fill="#ec4899" />
        <polygon points="48,108 72,96 72,-12 48,0" fill="#db2777" />
        <polygon points="0,108 24,96 72,96 48,108" fill="#be185d" />
      </g>
      <g transform="translate(168, 24)">
        <polygon points="0,156 48,156 48,0 0,0" fill="#fbbf24" />
        <polygon points="48,156 72,144 72,-12 48,0" fill="#d9a900" />
        <polygon points="0,156 24,144 72,144 48,156" fill="#c48b00" />
      </g>
    </g>
    <text
      x="204"
      y="36"
      fill="#c48b00"
      fontSize="11"
      fontFamily="ui-monospace, monospace"
      fontWeight="700"
    >
      &lt;300 ms
    </text>
    <text
      x="204"
      y="50"
      fill="#c48b00"
      fontSize="16"
      fontFamily="ui-monospace, monospace"
      fontWeight="700"
    >
      *
    </text>
    <circle cx="132" cy="58" r="10" fill="#ec4899" />
    <circle cx="60" cy="106" r="10" fill="#84cc16" />
  </svg>
);

export const BenchmarksSection = () => (
  <section className="border-b border-[#d6c28a] bg-white">
    <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4 md:px-12 lg:px-16">
      <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.35em] text-[#9ca3af]">
        <span className="text-[#9ca3af]">&gt;</span>
        <span>Benchmarks</span>
      </div>
      <span className="font-mono text-[0.7rem] tracking-[0.2em] text-[#9ca3af]">
        [4/9]
      </span>
    </div>

    <div className="grid gap-10 px-6 py-12 md:px-12 lg:grid-cols-[1.1fr_0.95fr_0.95fr] lg:gap-8 lg:px-16 lg:py-16">
      <div className="flex flex-col justify-between gap-12">
        <div>
          <h2 className="max-w-md text-4xl font-semibold leading-[1.05] tracking-normal text-[#111827] md:text-5xl">
            We don&apos;t think benchmarks tell{" "}
            <span className="text-[#c48b00]">the full story.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-[#6b7280]">
            But we lead every major one anyway. SOTA on LongMemEval, LoCoMo, and
            ConvoMem.
          </p>
        </div>
        <p className="max-w-sm text-sm leading-7 text-[#6b7280]">
          We also built{" "}
          <a
            className="font-semibold text-[#c48b00] transition-colors hover:text-[#8a6500]"
            href={routes.marketing.benchmarks}
          >
            MemoryBench
          </a>
          , an open eval platform for memory systems.
        </p>
      </div>

      <BlueprintFrame>
        <div className="flex h-full flex-col">
          <div className="font-mono text-[0.72rem] font-bold uppercase leading-relaxed tracking-[0.18em] text-[#111827]">
            Recall quality,
            <br />
            <span className="text-[#c48b00]">like the human brain.</span>
          </div>
          <div className="mt-8 flex flex-1 items-center justify-center">
            <BrainGraphic />
          </div>
        </div>
      </BlueprintFrame>

      <BlueprintFrame>
        <div className="flex h-full flex-col">
          <div className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#c48b00]">
            Recall time
          </div>
          <p className="mt-4 text-sm leading-7 text-[#6b7280]">
            Memories returned in milliseconds,{" "}
            <span className="font-medium text-[#c48b00]">
              10x faster than Zep, 25x faster than MemO.
            </span>
          </p>
          <div className="mt-6 flex flex-1 items-end justify-center pb-2">
            <RecallTimeChart />
          </div>
        </div>
      </BlueprintFrame>
    </div>
  </section>
);
