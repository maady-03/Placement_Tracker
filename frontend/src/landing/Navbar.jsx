import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#about", label: "About" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 12));

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? "border-black/5 bg-white/75 backdrop-blur-xl"
          : "border-transparent bg-[#f7f7f5]"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <a
          href="/"
          className="flex items-center gap-2 text-[17px] font-bold tracking-tight text-[#111]"
        >
          <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
          Placement Tracker
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="group relative py-1 text-sm font-medium text-slate-600 transition-colors hover:text-[#111]"
            >
              {label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#111] transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href="/login"
            className="text-sm font-medium text-slate-700 transition-colors hover:text-[#111]"
          >
            Login
          </a>
          <a
            href="/register"
            className="rounded-lg bg-[#111] px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#222] hover:shadow-lg hover:shadow-black/15"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-md p-2 text-[#111] md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="border-t border-black/5 px-6 pb-6 pt-3 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base font-medium text-slate-700"
              >
                {label}
              </a>
            ))}

            <div className="mt-3 flex items-center gap-4 border-t border-black/5 pt-5">
              <a href="/login" className="text-sm font-medium text-slate-700">
                Login
              </a>
              <a
                href="/register"
                className="rounded-lg bg-[#111] px-5 py-2.5 text-sm font-medium text-white"
              >
                Get Started
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;