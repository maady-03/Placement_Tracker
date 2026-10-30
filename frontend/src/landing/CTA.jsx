import { motion, MotionConfig } from "framer-motion";
import { Link } from "react-router-dom";

const LEVELS = [
  "bg-slate-900/20",
  "bg-[#14532d]",
  "bg-[#166534]",
  "bg-[#22c55e]",
  "bg-[#4ade80]",
];

const CELLS = Array.from({ length: 44 * 7 }, (_, i) => {
  const week = Math.floor(i / 7);
  const day = i % 7;
  const v = (week * 7 + day * 13 + ((week * day) % 5) + 3) % 11;
  return v < 4 ? 0 : v < 7 ? 1 : v < 9 ? 2 : v < 10 ? 3 : 4;
});

const FADE = "radial-gradient(ellipse at center, #000 25%, transparent 72%)";

function CTA() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative isolate overflow-hidden bg-[#f7f7f5] px-6 py-32 text-center sm:py-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 flex items-center justify-center opacity-[0.1]"
          style={{ maskImage: FADE, WebkitMaskImage: FADE }}
        >
          <div className="grid auto-cols-[18px] grid-flow-col grid-rows-7 gap-[5px]">
            {CELLS.map((level, i) => (
              <span key={i} className={`h-[18px] w-[18px] rounded ${LEVELS[level]}`} />
            ))}
          </div>
        </div>

        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
            START YOUR JOURNEY
          </p>

          <h2 className="mt-6 text-4xl font-bold leading-[1.12] tracking-tight text-[#111] sm:text-5xl">
            Ready to take control
            <br />
            of your placement preparation?
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-slate-500">
            Keep your preparation organized, track your progress
            and stay ready for every opportunity.
          </p>

          <Link
            to="/register"
            className="mt-10 inline-block rounded-lg bg-[#111] px-8 py-4 text-[15px] font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#222] hover:shadow-xl hover:shadow-black/15"
          >
            Get Started
          </Link>
        </motion.div>
      </section>
    </MotionConfig>
  );
}

export default CTA;