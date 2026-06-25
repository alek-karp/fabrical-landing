import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-white relative overflow-hidden">

      {/* Background layer — slightly blurred, scaled up to avoid soft edges */}
      <div
        className="pointer-events-none absolute inset-0 z-0 scale-105"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/hero-datacenter.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          filter: "blur(3px)",
        }}
      />

      {/* Technical frame — inset margin/header/footer lines with corner squares */}
      <div className="pointer-events-none absolute inset-4 md:inset-6 z-20">
        {/* Margin lines (left/right) */}
        <div className="absolute inset-y-0 left-0 w-px bg-white/20" />
        <div className="absolute inset-y-0 right-0 w-px bg-white/20" />
        {/* Header/footer lines (top/bottom) */}
        <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />
        {/* Perfect squares at the corners */}
        <div className="absolute -top-1 -left-1 size-2 bg-white" />
        <div className="absolute -top-1 -right-1 size-2 bg-white" />
        <div className="absolute -bottom-1 -left-1 size-2 bg-white" />
        <div className="absolute -bottom-1 -right-1 size-2 bg-white" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Nav — 64px height, 24px side padding */}
        <header className="flex items-center justify-between px-8 md:px-12 h-16 mt-4 md:mt-6">
          <Logo />
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="outline"
              className="rounded-none border-white/30 bg-white/5 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-sm h-9 px-5 hover:bg-white/10 hover:text-white hover:border-white/50 shadow-none"
            >
              <a
                href="https://calendar.notion.so/meet/alekkarp/chat"
                target="_blank"
                rel="noopener noreferrer"
              >
                See a demo
              </a>
            </Button>
          </div>
        </header>

        {/* Hero — centered, 40px gap between elements */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-32 pt-10">
          {/* Eyebrow — technical tag with square indicator and corner ticks */}
          <div className="group relative inline-flex items-center gap-2 px-4 h-8 rounded-none border border-white/30 bg-white/5 text-xs font-medium tracking-widest text-white/70 mb-10 backdrop-blur-sm">
            <span className="size-1.5 bg-white/60" />
            ELECTRICAL CONSTRUCTION AI
            {/* Corner ticks */}
            <span className="pointer-events-none absolute -top-px -left-px size-1.5 border-t border-l border-white/60" />
            <span className="pointer-events-none absolute -top-px -right-px size-1.5 border-t border-r border-white/60" />
            <span className="pointer-events-none absolute -bottom-px -left-px size-1.5 border-b border-l border-white/60" />
            <span className="pointer-events-none absolute -bottom-px -right-px size-1.5 border-b border-r border-white/60" />
          </div>

          {/* heading-72: 72px, 600, -4.32px — fluid between 40px and 72px */}
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

          {/* copy-18: 18px, 400, 28px line-height */}
          <p className="text-lg text-white/70 mb-10 max-w-2xl" style={{ lineHeight: "28px" }}>
            The next era of energy, compute, manufacturing, and infrastructure
            depends on electrical contractors. We build AI systems that help them
            coordinate, execute, and scale like never before.
          </p>

          {/* Primary CTA — technical button with corner-bracket accents */}
          <div className="group relative inline-flex">
            <Button
              asChild
              size="lg"
              className="rounded-none bg-white text-black text-xs font-semibold tracking-widest uppercase h-11 px-7 hover:bg-white/90"
            >
              <a
                href="https://calendar.notion.so/meet/alekkarp/chat"
                target="_blank"
                rel="noopener noreferrer"
              >
                Talk to us
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </a>
            </Button>
            {/* Corner ticks */}
            <span className="pointer-events-none absolute -top-1 -left-1 size-2 border-t border-l border-white/60 transition-colors group-hover:border-white" />
            <span className="pointer-events-none absolute -top-1 -right-1 size-2 border-t border-r border-white/60 transition-colors group-hover:border-white" />
            <span className="pointer-events-none absolute -bottom-1 -left-1 size-2 border-b border-l border-white/60 transition-colors group-hover:border-white" />
            <span className="pointer-events-none absolute -bottom-1 -right-1 size-2 border-b border-r border-white/60 transition-colors group-hover:border-white" />
          </div>
        </main>

      </div>
    </div>
  );
}
