import { motion, MotionConfig } from "framer-motion";

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

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25 } },
};

const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stripe = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, delay: 0.3, ease: "easeInOut" } },
};

function PlacementJourney() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative isolate overflow-hidden bg-slate-950 px-[8%] py-28 text-white sm:py-36"
        id="about"
      >
        <div className="absolute -bottom-40 right-0 -z-10 h-96 w-[60%] rounded-full bg-accent/15 blur-3xl" />

        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-16 max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-white/60">
              YOUR PLACEMENT JOURNEY
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl">
              From preparation
              <br />
              to placement.
            </h2>
          </motion.div>

          <motion.div
            className="grid gap-4 md:grid-cols-4"
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {STAGES.map(({ number, title, text }, i) => {
              const isLast = i === STAGES.length - 1;

              return (
                <motion.div
                  key={number}
                  variants={card}
                  className={`relative overflow-hidden rounded-2xl border p-6 backdrop-blur-md ${
                    isLast
                      ? "border-accent/50 bg-accent/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <motion.span
                    variants={stripe}
                    className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
                  />

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white/40">
                      {number}
                    </span>
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        isLast
                          ? "bg-accent shadow-[0_0_14px_rgba(245,130,32,0.9)]"
                          : "bg-white/50"
                      }`}
                    />
                  </div>

                  <h3 className="mt-8 text-xl font-semibold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default PlacementJourney;