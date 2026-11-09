import { useRef } from "react";
import { motion, MotionConfig } from "framer-motion";
import { Briefcase, Code2, Globe } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const tile = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const GRID_BG = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
  maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 80%)",
  WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 80%)",
};

const SPOTLIGHT_BG = {
  background:
    "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(245,130,32,0.14), transparent 60%)",
};

const LEVELS = [
  "bg-white/[0.06]",
  "bg-[#3a2412]",
  "bg-[#7c3f12]",
  "bg-[#d9660f]",
  "bg-[#f58220]",
];

const HEAT = Array.from({ length: 52 * 7 }, (_, i) => {
  const week = Math.floor(i / 7);
  const day = i % 7;
  const v = (week * 7 + day * 13 + ((week * day) % 5)) % 11;
  return v < 4 ? 0 : v < 7 ? 1 : v < 9 ? 2 : v < 10 ? 3 : 4;
});

const PIPELINE = [
  { label: "Applied", count: 6, width: "100%", color: "bg-accent/30" },
  { label: "OA", count: 3, width: "55%", color: "bg-accent/50" },
  { label: "Interview", count: 2, width: "36%", color: "bg-accent/75" },
  { label: "Offer", count: 1, width: "18%", color: "bg-accent" },
];

const SKILL_PILLS = ["React", "Node.js", "MongoDB", "Tailwind"];

function Panel({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-stone-950/70 p-3 ${className}`}
    >
      {children}
    </div>
  );
}

function HeatVisual() {
  return (
    <Panel>
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-medium text-white/70">Activity</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-0.5 text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />9 day streak
          </span>
          <span className="font-mono text-white/40">697 submissions</span>
        </span>
      </div>

      <div className="grid auto-cols-fr grid-flow-col grid-rows-7 gap-[2px]">
        {HEAT.map((level, i) => (
          <span
            key={i}
            className={`aspect-square rounded-[2px] ${LEVELS[level]}`}
          />
        ))}
      </div>
    </Panel>
  );
}

function WindowVisual() {
  return (
    <Panel className="flex h-full flex-col justify-center gap-2.5">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {SKILL_PILLS.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-white/70"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="space-y-1.5 rounded-lg border border-white/10 bg-white/[0.03] p-2">
        <span className="block h-1.5 w-2/3 rounded bg-white/20" />
        <span className="block h-3 w-full rounded bg-accent/25" />
      </div>
    </Panel>
  );
}

function PipelineVisual() {
  return (
    <Panel className="flex h-full flex-col justify-center gap-2.5">
      {PIPELINE.map(({ label, count, width, color }, i) => (
        <div key={label} className="flex items-center gap-3 text-[11px]">
          <span className="w-14 shrink-0 text-white/60">{label}</span>
          <div className="h-1.5 flex-1 rounded-full bg-white/10">
            <motion.div
              className={`h-1.5 rounded-full ${color}`}
              initial={{ width: 0 }}
              whileInView={{ width }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: EASE }}
            />
          </div>
          <span className="w-3 shrink-0 text-right font-mono text-white/40">
            {count}
          </span>
        </div>
      ))}
    </Panel>
  );
}

const ITEMS = [
  {
    number: "01",
    icon: Code2,
    title: "DSA & Competitive Programming",
    text: "Track problems, consistency and preparation progress across your coding journey.",
    visual: <HeatVisual />,
    wide: true,
    className: "md:col-span-2",
  },
  {
    number: "02",
    icon: Globe,
    title: "Web Development",
    text: "Keep track of your development skills, projects and overall progress.",
    visual: <WindowVisual />,
    className: "",
  },
  {
    number: "03",
    icon: Briefcase,
    title: "Applications & Interviews",
    text: "Track companies, applications, interview rounds and offers in one place.",
    visual: <PipelineVisual />,
    className: "",
  },
];

function TileHead({ number, icon: Icon }) {
  return (
    <div className="relative flex items-center justify-between">
      <span className="font-mono text-xs text-white/40 transition-colors group-hover:text-accent">
        {number}
      </span>
      <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/50 transition-colors group-hover:text-accent">
        <Icon size={13} />
      </span>
    </div>
  );
}

function TileText({ title, text }) {
  return (
    <div className="relative">
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p className="mt-1 text-sm leading-snug text-stone-400">{text}</p>
    </div>
  );
}

function FeatureTile({
  number,
  icon,
  title,
  text,
  visual,
  wide = false,
  className = "",
}) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      variants={tile}
      onMouseMove={handleMove}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-4 transition-colors duration-300 hover:border-accent/30 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={SPOTLIGHT_BG}
      />

      {wide ? (
        <div className="relative grid items-center gap-4 md:grid-cols-5 md:gap-6">
          <div className="flex flex-col gap-4 md:col-span-2">
            <TileHead number={number} icon={icon} />
            <TileText title={title} text={text} />
          </div>
          <div className="md:col-span-3">{visual}</div>
        </div>
      ) : (
        <>
          <TileHead number={number} icon={icon} />
          <div className="relative mt-2.5">
            <TileText title={title} text={text} />
          </div>
          <div className="relative mt-3 flex-1">{visual}</div>
        </>
      )}
    </motion.div>
  );
}

function Features() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative isolate overflow-hidden bg-stone-950 px-[8%] py-12 text-white sm:py-14"
        id="features"
      >
        <div className="absolute inset-0 -z-10" style={GRID_BG} />
        <div className="absolute -top-32 left-1/2 -z-10 h-72 w-[70%] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />

        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-white/60">
              <span className="h-px w-8 bg-accent" />
              EVERYTHING IN ONE PLACE
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              Stay organized throughout your placement journey.
            </h2>
          </motion.div>

          <motion.div
            className="grid gap-3 md:grid-cols-2"
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {ITEMS.map((item) => (
              <FeatureTile key={item.number} {...item} />
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Features;