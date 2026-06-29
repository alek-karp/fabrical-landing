import { Button } from "@/components/ui/button";

const demoUrl = "https://calendar.notion.so/meet/alekkarp/chat";

export function Hero() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-32 pt-10">
      <div className="group relative inline-flex items-center gap-2 px-4 h-8 rounded-none border border-white/30 bg-white/5 text-xs font-medium tracking-widest text-white/70 mb-10 backdrop-blur-sm">
        <span className="size-1.5 bg-white/60" />
        NEW ERA OF ELECTRICAL CONSTRUCTION
        <span className="pointer-events-none absolute -top-px -left-px size-1.5 border-t border-l border-white/60" />
        <span className="pointer-events-none absolute -top-px -right-px size-1.5 border-t border-r border-white/60" />
        <span className="pointer-events-none absolute -bottom-px -left-px size-1.5 border-b border-l border-white/60" />
        <span className="pointer-events-none absolute -bottom-px -right-px size-1.5 border-b border-r border-white/60" />
      </div>

      <h1
        className="font-semibold text-white mb-6 w-full"
        style={{
          fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
          lineHeight: 1,
          letterSpacing: "clamp(-1.5px, -0.06em, -4.32px)",
        }}
      >
        Building the intelligence layer
        <br />
        for electrical construction.
      </h1>

      <p
        className="text-lg text-white/70 mb-10 max-w-2xl"
        style={{ lineHeight: "28px" }}
      >
        The next era of energy, compute, manufacturing, and infrastructure
        depends on electrical contractors. We build AI systems that help them
        coordinate, execute, and scale like never before.
      </p>

      <div className="group relative inline-flex">
        <Button
          asChild
          size="lg"
          className="rounded-none bg-white text-black text-xs font-semibold tracking-widest uppercase h-11 px-7 hover:bg-white/90"
        >
          <a href={demoUrl} target="_blank" rel="noopener noreferrer">
            Talk to us
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </a>
        </Button>
        <span className="pointer-events-none absolute -top-1 -left-1 size-2 border-t border-l border-white/60 transition-colors group-hover:border-white" />
        <span className="pointer-events-none absolute -top-1 -right-1 size-2 border-t border-r border-white/60 transition-colors group-hover:border-white" />
        <span className="pointer-events-none absolute -bottom-1 -left-1 size-2 border-b border-l border-white/60 transition-colors group-hover:border-white" />
        <span className="pointer-events-none absolute -bottom-1 -right-1 size-2 border-b border-r border-white/60 transition-colors group-hover:border-white" />
      </div>
    </main>
  );
}
