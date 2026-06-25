import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col text-white relative"
      style={{
        backgroundImage: "url('/hero-home.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Nav — 64px height, 24px side padding */}
        <header className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white/60" />
              </div>
              {/* heading-14: 14px, 600, -0.28px */}
              <span className="text-white text-sm font-semibold tracking-[-0.28px]">Fabrical</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Sign in</Button>
            <Button>See a demo</Button>
          </div>
        </header>

        {/* Hero — centered, 40px gap between elements */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-32 pt-10">
          {/* Announcement pill — label-12, pill radius */}
          <a
            href="#"
            className="inline-flex items-center gap-2 px-4 h-8 rounded-full border border-white/30 bg-white/10 text-xs font-medium tracking-widest text-white/70 hover:text-white transition-colors mb-10 backdrop-blur-sm"
            style={{ borderRadius: 9999 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            HELION LAUNCHES HALLUCINATIONS CORRECTION
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
            AI that talks like a human.
            <br />
            Handles millions of conversations.
          </h1>

          {/* copy-18: 18px, 400, 28px line-height */}
          <p className="text-lg text-white/70 mb-10" style={{ lineHeight: "28px" }}>
            AI agents for enterprise support
          </p>

          <Button size="lg">Talk to us</Button>
        </main>

      </div>
    </div>
  );
}
