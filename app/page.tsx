import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col text-white relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/hero-home.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >

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
            <Button>See a demo</Button>
          </div>
        </header>

        {/* Hero — centered, 40px gap between elements */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-32 pt-10">
          {/* Announcement pill — label-12, pill radius */}
          <a
            href="#"
            className="inline-flex items-center gap-2 px-4 h-8 rounded-full border border-white/30 bg-white/10 text-xs font-medium tracking-widest text-white/70 hover:text-white transition-colors mb-10 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            ELECTRICAL CONSTRUCTION AI
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2.5L8 6L4 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

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

          <Button size="lg">Talk to us</Button>
        </main>

      </div>
    </div>
  );
}
