import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ContactCta } from "@/components/site/ContactCta";
import logoImage from "@/images/logo.webp";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const promoText = "Free estimate this week.";
  const promoTextMobile = "Free estimate.";
  const phoneNumber = "+1 (754) 286-9559";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeMenu = () => setMobileMenuOpen(false);
    window.addEventListener("resize", closeMenu);

    return () => window.removeEventListener("resize", closeMenu);
  }, [mobileMenuOpen]);

  const links: { to: string; label: string }[] = [
    { to: "/#services", label: "Services" },
    { to: "/projects", label: "Projects" },
    { to: "/#about", label: "About" },
    { to: "/#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="border-b border-white/25 bg-[#1d1d1f] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white sm:px-4 md:px-6 md:py-2 md:text-[12px] md:tracking-[0.14em]">
        <div className="flex items-center justify-center md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          <a
            href={`tel:${phoneNumber.replace(/[^\d+]/g, "")}`}
            aria-label="Call MAG SYSTEM INC"
            className="absolute left-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-white/90 transition-opacity hover:opacity-100 md:hidden"
          >
            <Phone className="h-3.5 w-3.5" />
          </a>
          <div className="hidden md:block" />
          <div className="text-center whitespace-nowrap md:hidden">{promoTextMobile}</div>
          <div className="hidden text-center whitespace-nowrap md:block">{promoText}</div>
          <a href={`tel:${phoneNumber.replace(/[^\d+]/g, "")}`} className="hidden justify-self-end whitespace-nowrap text-white/88 transition-opacity hover:opacity-100 md:block">
            {phoneNumber}
          </a>
        </div>
      </div>

      <div className="relative flex h-14 w-full items-center justify-between">
        <div className="flex shrink-0 items-center pl-5 md:pl-12">
          <Link to="/" className="flex items-center gap-3 text-[17px] font-semibold tracking-tight">
            <img src={logoImage} alt="MAG SYSTEM INC logo" className="h-8 w-auto object-contain" />
            <span>MAG SYSTEM INC</span>
          </Link>
        </div>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className="text-[15px] text-foreground/80 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center pr-12 md:flex">
          <ContactCta className="px-5 text-[15px] transition-opacity hover:opacity-90">
            Get a free quote
          </ContactCta>
        </div>
        <div className="flex shrink-0 items-center pr-4 md:hidden">
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center bg-transparent text-foreground"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background/95 px-6 py-6 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.to}
                href={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[16px] font-medium text-foreground/85 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <ContactCta
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 px-5 text-[15px]"
            >
              Get a free quote
            </ContactCta>
          </nav>
        </div>
      )}
    </header>
  );
}
