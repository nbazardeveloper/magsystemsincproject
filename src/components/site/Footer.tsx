import { Link } from "@tanstack/react-router";
import logoImage from "@/images/logo.webp";

export function Footer() {
  return (
    <footer className="bg-[#1d1d1f] text-white">
      <div className="grid gap-[5px] bg-white p-[5px] md:grid-cols-4">
        <div className="bg-[#1d1d1f] px-7 py-10 text-[13px] text-white/72 md:px-8">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="MAG SYSTEM INC logo" className="h-10 w-auto object-contain" />
            <div className="text-base font-semibold tracking-tight text-white">MAG SYSTEM INC</div>
          </div>
          <p className="mt-3 type-body type-body-light">
            Stress-free renovation, handyman service, and turnkey kitchen and bathroom projects in Manatee County and Sarasota County, Florida.
          </p>
        </div>
        <div className="bg-[#1d1d1f] px-7 py-10 text-[13px] text-white/72 md:px-8">
          <div className="mb-3 type-kicker type-kicker-light">Services</div>
          <ul className="space-y-2">
            <li><Link to="/kitchen" className="transition-colors hover:text-white">Kitchen</Link></li>
            <li><Link to="/bathroom" className="transition-colors hover:text-white">Bathroom</Link></li>
            <li><Link to="/full-remodel" className="transition-colors hover:text-white">Full remodel</Link></li>
            <li><Link to="/handyman" className="transition-colors hover:text-white">Handyman services</Link></li>
            <li><Link to="/tile" className="transition-colors hover:text-white">Tile replacement & installation</Link></li>
            <li><Link to="/flooring" className="transition-colors hover:text-white">Flooring installation</Link></li>
          </ul>
        </div>
        <div className="bg-[#1d1d1f] px-7 py-10 text-[13px] text-white/72 md:px-8">
          <div className="mb-3 type-kicker type-kicker-light">Company</div>
          <ul className="space-y-2">
            <li><a href="/#about" className="transition-colors hover:text-white">About</a></li>
            <li><a href="/#projects" className="transition-colors hover:text-white">Projects</a></li>
            <li><Link to="/contact" className="transition-colors hover:text-white">Contact</Link></li>
            <li>
              <Link to="/contractors" className="transition-colors hover:text-white">Become a Partner</Link>
            </li>
          </ul>
        </div>
        <div className="bg-[#1d1d1f] px-7 py-10 text-[13px] text-white/72 md:px-8">
          <div className="mb-3 type-kicker type-kicker-light">Contact</div>
          <ul className="space-y-2">
            <li><a href="tel:+17542869559" className="transition-colors hover:text-white">+1 (754) 286-9559</a></li>
            <li><a href="mailto:magsysteminc@gmail.com" className="transition-colors hover:text-white">magsysteminc@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/12">
        <div className="flex w-full flex-col items-center justify-between gap-3 px-8 py-5 text-[12px] text-white/52 md:flex-row md:px-12">
          <span>© {new Date().getFullYear()} MAG SYSTEM INC. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link to="/terms-of-use" className="transition-colors hover:text-white">Terms of Use</Link>
            <Link to="/admin" className="transition-colors hover:text-white">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
