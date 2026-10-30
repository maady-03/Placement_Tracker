import { motion, MotionConfig } from "framer-motion";
import { Briefcase, Code2, Globe } from "lucide-react";

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const card = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const LEVELS = [
  "bg-white/10",
  "bg-[#14532d]",
  "bg-[#166534]",
  "bg-[#22c55e]",
  "bg-[#4ade80]",
];

const HEAT = Array.from({ length: 14 * 5 }, (_, i) => {
  const week = Math.floor(i / 5);
  const day = i % 5;
  const v = (week * 7 + day * 13 + ((week * day) % 5)) % 11;
  return v < 4 ? 0 : v < 7 ? 1 : v < 9 ? 2 : v < 10 ? 3 : 4;
});

function HeatVisual() {
  return (
    <div className="grid auto-cols-[14px] grid-flow-col grid-rows-5 gap-[3px]">
      {HEAT.map((level, i) => (
        <span key={i} className={`h-3.5 w-3.5 rounded-[3px] ${LEVELS[level]}`} />
      ))}
    </div>
  );
}

function WindowVisual() {
  return (
    <div className="w-full max-w-[220px] rounded-lg border border-white/15 bg-white/5 p-3">
      <div className="flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-accent" />
      </div>
      <div className="mt-3 space-y-2">
        <span className="block h-2 w-3/4 rounded bg-white/20" />
        <span className="block h-2 w-1/2 rounded bg-white/10" />
        <span className="block h-8 w-full rounded bg-accent/30" />
      </div>
    </div>
  );
}

function BarsVisual() {
  const bars = [
    ["100%", "bg-status-applied"],
    ["62%", "bg-status-oa"],
    ["38%", "bg-status-interview"],
    ["18%", "bg-status-offer"],
  ];

  return (
    <div className="w-full max-w-[220px] space-y-3">
      {bars.map(([width, color]) => (
        <div key={color} className="h-2 rounded-full bg-white/10">
          <div className={`h-2 rounded-full ${color}`} style={{ width }} />
        </div>
      ))}
    </div>
  );
}

const ITEMS = [
  {
    number: "01",
    icon: Code2,
    title: "DSA & Competitive Programming",
    text: "Track problems, consistency and preparation progress across your coding journey.",
    visual: <HeatVisual />,
  },
  {
    number: "02",
    icon: Globe,
    title: "Web Development",
    text: "Keep track of your development skills, projects and overall progress.",
    visual: <WindowVisual />,
  },
  {
    number: "03",
    icon: Briefcase,
    title: "Applications & Interviews",
    text: "Track companies, applications, interview rounds and offers in one place.",
    visual: <BarsVisual />,
  },
];

function Features() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative isolate overflow-hidden bg-slate-950 px-[8%] py-28 text-white sm:py-36"
        id="features"
      >
        <div className="absolute -top-32 left-1/2 -z-10 h-96 w-[70%] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />

        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-16 max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-white/60">
              EVERYTHING IN ONE PLACE
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl">
              Stay organized throughout
              <br />
              your placement journey.
            </h2>
          </motion.div>

          <motion.div
            className="grid gap-5 md:grid-cols-3"
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {ITEMS.map(({ number, icon: Icon, title, text, visual }) => (
              <motion.div
                key={number}
                variants={card}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
              >
                <div className="flex h-36 items-center justify-center rounded-xl border border-white/10 bg-slate-950/60 p-4">
                  {visual}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="font-mono text-xs text-white/40 transition-colors group-hover:text-accent">
                    {number}
                  </span>
                  <Icon size={18} className="text-white/40" />
                </div>

                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-400">
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Features;