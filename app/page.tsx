import { Hero } from "@/components/hero";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

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

        <Hero />
      </div>
    </div>
  );
}
