import { Mail } from "lucide-react";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Preconstruction", href: "/preconstruction" },
      { label: "Coordination", href: "/coordination" },
      { label: "Procurement", href: "/procurement" },
      { label: "Field Ops", href: "/field-ops" },
      { label: "Reporting", href: "/reporting" },
      { label: "Pricing", href: "/pricing" },
      { label: "API", href: "/api" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Benchmarks", href: "/benchmarks" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const socialLinks = [
  { label: "X", href: "https://x.com", icon: null },
  { label: "GitHub", href: "https://github.com", icon: null },
  { label: "LinkedIn", href: "https://linkedin.com", icon: null },
  { label: "Email", href: "mailto:hello@fabrical.ai", icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-amber-400 text-black">
      <div className="relative z-10 mx-auto grid max-w-[1920px] grid-cols-1 gap-14 px-8 pb-[28vw] pt-20 sm:px-12 md:grid-cols-[1.4fr_2fr] md:pb-[24vw] lg:px-20 xl:px-24">
        <div>
          <h2 className="max-w-md text-4xl font-semibold leading-[1.08] tracking-normal md:text-5xl">
            The intelligence layer for electrical construction.
          </h2>
          <p className="mt-8 max-w-md text-xl leading-8 text-black/72">
            One system for coordination, execution, and scale. Built for the
            contractors powering modern infrastructure.
          </p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-black/55">
                {section.title}
              </h3>
              <ul className="mt-6 space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="text-xl text-black/88 transition-colors hover:text-black"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-black/55">
              Connect
            </h3>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    aria-label={link.label}
                    className="flex size-7 items-center justify-center text-black/88 transition-colors hover:text-black"
                    href={link.href}
                    key={link.label}
                    rel="noopener noreferrer"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                  >
                    {Icon ? (
                      <Icon aria-hidden="true" className="size-6" />
                    ) : (
                      <span className="text-2xl font-medium leading-none">
                        {link.label === "LinkedIn" ? "in" : link.label[0]}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <p className="self-end text-sm font-semibold uppercase tracking-[0.28em] text-black/55 md:col-start-2 md:justify-self-end">
          &copy; {year} &middot; Fabrical Inc. &middot; All rights reserved
        </p>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 w-[110vw] -translate-x-1/2 translate-y-[22%] select-none text-center text-[clamp(7rem,23vw,27rem)] font-bold leading-none tracking-normal text-black/15"
      >
        Fabrical.
      </div>
    </footer>
  );
}
