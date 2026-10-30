import { motion, MotionConfig } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const STEPS = [
  {
    number: "01",
    title: "Prepare",
    text: "Build your skills through DSA, competitive programming and web development.",
  },
  {
    number: "02",
    title: "Track",
    text: "Keep your preparation organized and monitor your progress over time.",
  },
  {
    number: "03",
    title: "Apply",
    text: "Track companies, applications and every stage of your interview process.",
  },
  {
    number: "04",
    title: "Improve",
    text: "Understand where you stand and focus on the areas that need improvement.",
  },
];

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};

const step = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function HowItWorks() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className="bg-white px-[8%] py-28 sm:py-36"
        id="how-it-works"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-20 max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
              HOW IT WORKS
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight text-[#111] sm:text-5xl">
              From preparation
              <br />
              to progress.
            </h2>
          </motion.div>

          <motion.div
            className="relative grid gap-12 md:grid-cols-4 md:gap-6"
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-slate-200 md:block">
              <motion.div
                className="h-px origin-left bg-accent"
                variants={{
                  hidden: { scaleX: 0 },
                  show: { scaleX: 1, transition: { duration: 1.4, delay: 0.3, ease: "easeInOut" } },
                }}
              />
            </div>

            {STEPS.map(({ number, title, text }) => (
              <motion.div
                key={number}
                variants={step}
                className="group relative text-left md:text-center"
              >
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white font-mono text-xs font-semibold text-slate-500 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white md:mx-auto">
                  {number}
                </span>

                <h3 className="mt-6 text-xl font-semibold tracking-tight text-[#111]">
                  {title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500 md:mx-auto">
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

export default HowItWorks;