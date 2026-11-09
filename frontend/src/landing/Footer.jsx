import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const SKILL_ROWS = [
  {
    direction: -1,
    duration: 70,
    skills: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Redis", "Vercel", "DSA", "System Design"],
  },
  {
    direction: 1,
    duration: 85,
    skills: ["SQL", "AI/ML", "Git", "REST APIs", "JWT", "Competitive Programming", "Backend", "Frontend", "Clean Architecture"],
  },
];

const LINK_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "About", href: "#about" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", to: "/login" },
      { label: "Get started", to: "/register" },
    ],
  },
];

const FADE_MASK =
  "linear-gradient(to right, transparent, black 15%, black 85%, transparent)";
const linkClass = "text-sm text-stone-400 transition-colors hover:text-accent";

function SkillRow({ skills, direction, duration, animated }) {
  const items = [...skills, ...skills];
  const from = direction === -1 ? "0%" : "-50%";
  const to = direction === -1 ? "-50%" : "0%";

  return (
    <motion.div
      className="flex w-max"
      initial={{ x: from }}
      animate={animated ? { x: to } : { x: from }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
    >
      {items.map((skill, i) => (
        <span
          key={`${skill}-${i}`}
          className="mr-3 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-stone-400"
        >
          {skill}
        </span>
      ))}
    </motion.div>
  );
}

function SkillsMarquee() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative flex select-none flex-col gap-3 overflow-hidden border-b border-white/10 py-6 opacity-70"
      style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
    >
      {SKILL_ROWS.map((row, i) => (
        <SkillRow key={i} {...row} animated={!reduceMotion} />
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-stone-950">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <SkillsMarquee />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <h3 className="text-base font-semibold text-white">
            Placement<span className="text-accent"> Tracker</span>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-stone-400">
            Stay organized. Stay prepared. Track applications, DSA progress and
            contests in one place.
          </p>
        </div>

        <div className="flex gap-14">
          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                {group.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to} className={linkClass}>
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className={linkClass}>
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-4 text-xs text-stone-500">
          © {new Date().getFullYear()} Placement Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;