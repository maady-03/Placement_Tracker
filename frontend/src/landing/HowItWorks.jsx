import { motion } from "framer-motion";

const list = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const step = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function HowItWorks() {
  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="how-it-works-heading">
        <p className="section-label">HOW IT WORKS</p>

        <h2>
          From preparation
          <br />
          to progress.
        </h2>
      </div>

      <motion.div
        className="steps"
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="step" variants={step}>
          <span className="step-number">01</span>
          <div className="step-dot"></div>
          <h3>Prepare</h3>
          <p>
            Build your skills through DSA, competitive programming
            and web development.
          </p>
        </motion.div>

        <motion.div className="step" variants={step}>
          <span className="step-number">02</span>
          <div className="step-dot"></div>
          <h3>Track</h3>
          <p>
            Keep your preparation organized and monitor your
            progress over time.
          </p>
        </motion.div>

        <motion.div className="step" variants={step}>
          <span className="step-number">03</span>
          <div className="step-dot"></div>
          <h3>Apply</h3>
          <p>
            Track companies, applications and every stage of
            your interview process.
          </p>
        </motion.div>

        <motion.div className="step" variants={step}>
          <span className="step-number">04</span>
          <div className="step-dot"></div>
          <h3>Improve</h3>
          <p>
            Understand where you stand and focus on the areas
            that need improvement.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HowItWorks;