import { motion } from "framer-motion";
import HeroShowcase from "./HeroShowcase";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function Hero() {
  return (
    <>
      <section className="hero">
        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p className="hero-label" variants={item}>
            PLACEMENT PREPARATION, ORGANIZED.
          </motion.p>

          <motion.h1 variants={item}>
            Prepare with purpose.
            <br />
            Track Your Placement Journey.
          </motion.h1>

          <motion.p className="hero-description" variants={item}>
            One place to track your DSA, development, applications,
            interviews and overall placement readiness.
          </motion.p>

          <motion.div className="hero-actions" variants={item}>
            <a href="/register" className="hero-primary-btn">
              Start Tracking
            </a>

            <a href="/login" className="hero-secondary-btn">
              Login
            </a>
          </motion.div>
        </motion.div>
      </section>

      <HeroShowcase />
    </>
  );
}

export default Hero;