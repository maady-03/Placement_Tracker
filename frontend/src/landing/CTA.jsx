import { motion, MotionConfig } from "framer-motion";
import { Link } from "react-router-dom";

const LEVELS = [
  "bg-stone-900/10",
  "bg-[#fbd9b8]",
  "bg-[#f6b36f]",
  "bg-[#f58220]",
  "bg-[#d9660f]",
];

const CELLS = Array.from({ length: 52 * 7 }, (_, i) => {
  const week = Math.floor(i / 7);
  const day = i % 7;
  const v = (week * 7 + day * 13 + ((week * day) % 5) + 3) % 11;
  return v < 4 ? 0 : v < 7 ? 1 : v < 9 ? 2 : v < 10 ? 3 : 4;
});

const FADE = "radial-gradient(ellipse at center, #000 25%, transparent 72%)";

function CTA() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative isolate overflow-hidden bg-[#f7f7f5] px-6 py-16 text-center sm:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 flex items-center justify-center opacity-[0.16]"
          style={{ maskImage: FADE, WebkitMaskImage: FADE }}
        >
          <div className="grid auto-cols-[14px] grid-flow-col grid-rows-7 gap-[4px]">
            {CELLS.map((level, i) => (
              <span key={i} className={`h-[14px] w-[14px] rounded-[3px] ${LEVELS[level]}`} />
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
          <p className="text-xs font-semibold tracking-[0.2em] text-stone-500">
            START YOUR JOURNEY
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-[#111] sm:text-4xl">
            Ready to take control
            <br />
            of your placement preparation?
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-stone-500">
            Keep your preparation organized, track your progress
            and stay ready for every opportunity.
          </p>

          <Link
            to="/register"
            className="mt-7 inline-block rounded-lg bg-[#111] px-7 py-3 text-[15px] font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#222] hover:shadow-xl hover:shadow-black/15"
          >
            Get Started
          </Link>
        </motion.div>
      </section>
    </MotionConfig>
  );
}

export default CTA;