import { motion, MotionConfig } from "framer-motion";
import { CheckCircle2, Flame } from "lucide-react";

const PIPELINE = [
  { label: "Applied", value: 6, width: "100%", bar: "bg-status-applied" },
  { label: "OA", value: 3, width: "50%", bar: "bg-status-oa" },
  { label: "Interview", value: 2, width: "33%", bar: "bg-status-interview" },
  { label: "Offer", value: 1, width: "17%", bar: "bg-status-offer" },
];

const UPCOMING = [
  { name: "Weekly Contest 526", meta: "LeetCode", when: "2 days", tone: "bg-status-oa/15 text-status-oa" },
  { name: "Atlassian OA", meta: "Deadline", when: "3 days", tone: "bg-status-rejected/15 text-status-rejected" },
  { name: "Zepto assessment", meta: "Deadline", when: "7 days", tone: "bg-status-neutral/15 text-status-neutral" },
];

const LEVELS = [
  "bg-surface-raised",
  "bg-[#14532d]",
  "bg-[#166534]",
  "bg-[#22c55e]",
  "bg-[#4ade80]",
];

// Deterministic pattern, so the showcase looks the same on every render.
const CELLS = Array.from({ length: 30 * 7 }, (_, i) => {
  const week = Math.floor(i / 7);
  const day = i % 7;
  const v = (week * 7 + day * 13 + ((week * day) % 5)) % 11;
  return v < 4 ? 0 : v < 7 ? 1 : v < 9 ? 2 : v < 10 ? 3 : 4;
});

const CARD =
  "rounded-2xl border border-line bg-surface p-5 text-ink shadow-2xl shadow-black/25";
const CHIP =
  "flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-xs font-medium text-ink shadow-xl shadow-black/20";

// Reveals on load, then drifts gently. Sample content only.
function Floating({ className, delay = 0, distance = 8, duration = 6, children }) {
  return (
    <div className={`absolute ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={{ y: [0, -distance, 0] }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

function HeroShowcase() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-hidden="true"
        className="pointer-events-none relative mx-auto -mt-12 h-[440px] w-full max-w-5xl select-none overflow-hidden px-4 sm:h-[500px]"
      >
        <div className="absolute left-1/2 top-24 h-72 w-[70%] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl" />

        <Floating className="left-1/2 top-10 z-10 w-[88%] -translate-x-1/2 sm:w-[560px]" delay={0.1} distance={6} duration={7}>
          <div className={`${CARD} overflow-hidden`}>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold">Activity</p>
              <p className="font-mono text-xs text-ink-muted">697 submissions</p>
            </div>
            <div className="grid auto-cols-[12px] grid-flow-col grid-rows-7 gap-[3px]">
              {CELLS.map((level, i) => (
                <span key={i} className={`h-3 w-3 rounded-[3px] ${LEVELS[level]}`} />
              ))}
            </div>
          </div>
        </Floating>

        <Floating className="left-4 top-40 z-20 hidden w-60 md:block lg:left-10" delay={0.35} distance={10} duration={6}>
          <div className={`${CARD} -rotate-3`}>
            <p className="text-sm font-semibold">Pipeline</p>
            <div className="mt-4 space-y-3">
              {PIPELINE.map(({ label, value, width, bar }) => (
                <div key={label}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="text-ink-muted">{label}</span>
                    <span className="font-mono">{value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-raised">
                    <div className={`h-1.5 rounded-full ${bar}`} style={{ width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Floating>

        <Floating className="right-4 top-28 z-20 hidden w-64 md:block lg:right-10" delay={0.5} distance={9} duration={6.5}>
          <div className={`${CARD} rotate-2`}>
            <p className="text-sm font-semibold">Upcoming</p>
            <div className="mt-4 space-y-3.5">
              {UPCOMING.map(({ name, meta, when, tone }) => (
                <div key={name} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium">{name}</p>
                    <p className="text-[11px] text-ink-muted">{meta}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[11px] ${tone}`}>
                    {when}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Floating>

        <Floating className="left-[10%] top-2 z-30" delay={0.7} distance={7} duration={5}>
          <div className={CHIP}>
            <Flame size={14} className="text-accent" />
            <span className="font-mono">9</span> day streak
          </div>
        </Floating>

        <Floating className="bottom-28 right-[12%] z-30" delay={0.85} distance={8} duration={5.5}>
          <div className={CHIP}>
            <CheckCircle2 size={14} className="text-status-offer" />
            Offer received
          </div>
        </Floating>

        <div className="absolute inset-x-0 bottom-0 z-40 h-40 bg-gradient-to-t from-[#f7f7f5] to-transparent" />
      </section>
    </MotionConfig>
  );
}

export default HeroShowcase;