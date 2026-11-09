import { useRef } from "react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const STAGES = [
  {
    number: "01",
    title: "Preparation",
    text: "DSA, competitive programming and web development.",
  },
  {
    number: "02",
    title: "Application",
    text: "Companies, applications and application status.",
  },
  {
    number: "03",
    title: "Interview",
    text: "Interview rounds, progress and outcomes.",
  },
  {
    number: "04",
    title: "Offer",
    text: "Track your offers and placement outcomes.",
  },
];

const LAST = STAGES.length - 1;
const LIFT_STEP = 1.25; // rem each step rises

const gridStyle = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
  maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 75%)",
};

function Node({ progress, at }) {
  const lit = useTransform(progress, [at - 0.03, at], [0, 1]);

  return (
    <span className="relative z-10 block h-3 w-3 rounded-full border border-white/25 bg-stone-950">
      <motion.span
        style={{ opacity: lit }}
        className="absolute -inset-px rounded-full bg-accent shadow-[0_0_12px_rgba(245,130,32,0.9)]"
      />
    </span>
  );
}

function Stem({ progress, at, height }) {
  const start = Math.min(at, 0.88);
  const fill = useTransform(progress, [start, start + 0.12], [0, 1]);

  return (
    <div
      className="relative hidden w-px bg-white/10 md:block"
      style={{ height }}
    >
      <motion.span
        style={{ scaleY: fill }}
        className="absolute inset-0 origin-bottom bg-accent"
      />
    </div>
  );
}

function PlacementJourney() {
  const reduce = useReducedMotion();
  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 65%"],
  });
  const progress = useTransform(scrollYProgress, (v) => (reduce ? 1 : v));

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative isolate overflow-hidden bg-stone-950 px-[8%] py-12 text-white sm:py-14"
        id="about"
      >
        <div className="absolute inset-0 -z-10" style={gridStyle} />
        <div className="absolute -top-32 left-1/2 -z-10 h-72 w-[60%] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-32 right-0 -z-10 h-72 w-[50%] rounded-full bg-accent/10 blur-3xl" />

        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-white/60">
              <span className="h-px w-8 bg-accent" />
              YOUR PLACEMENT JOURNEY
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              From preparation to placement.
            </h2>
          </motion.div>

          <ol
            ref={trackRef}
            className="relative grid list-none gap-3 md:grid-cols-4 md:items-end md:gap-3"
          >
            {/* mobile vertical line */}
            <span className="absolute bottom-6 left-[5.5px] top-6 w-px bg-white/10 md:hidden" />
            <motion.span
              style={{ scaleY: progress }}
              className="absolute bottom-6 left-[5.5px] top-6 w-px origin-top bg-accent md:hidden"
            />

            {/* desktop rail */}
            <span
              className="absolute bottom-[5px] hidden h-px bg-white/10 md:block"
              style={{
                left: "calc((100% - 2.25rem) / 8)",
                right: "calc((100% - 2.25rem) / 8)",
              }}
            />
            <motion.span
              style={{
                scaleX: progress,
                left: "calc((100% - 2.25rem) / 8)",
                right: "calc((100% - 2.25rem) / 8)",
              }}
              className="absolute bottom-[5px] hidden h-px origin-left bg-accent md:block"
            />

            {STAGES.map(({ number, title, text }, i) => {
              const isLast = i === LAST;
              const at = i / LAST;
              const stemHeight = `${1 + i * LIFT_STEP}rem`;

              return (
                <li
                  key={number}
                  className="relative pl-8 md:flex md:flex-col md:items-center md:pl-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                    className={`relative w-full overflow-hidden rounded-2xl border p-4 backdrop-blur-md ${
                      isLast
                        ? "border-accent/50 bg-accent/10 shadow-[0_0_40px_-12px_rgba(245,130,32,0.55)]"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-1 -top-3 select-none font-mono text-[4.5rem] font-bold leading-none text-transparent"
                      style={{
                        WebkitTextStroke: isLast
                          ? "1px rgba(245,130,32,0.35)"
                          : "1px rgba(255,255,255,0.09)",
                      }}
                    >
                      {number}
                    </span>

                    <div className="relative">
                      <span
                        className={`font-mono text-xs ${
                          isLast ? "text-accent" : "text-white/40"
                        }`}
                      >
                        {number}
                      </span>

                      <h3 className="mt-4 text-base font-semibold tracking-tight">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm leading-snug text-stone-400">
                        {text}
                      </p>
                    </div>
                  </motion.div>

                  <Stem progress={progress} at={at} height={stemHeight} />

                  <div className="absolute left-0 top-5 md:static">
                    <Node progress={progress} at={at} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </MotionConfig>
  );
}

export default PlacementJourney;