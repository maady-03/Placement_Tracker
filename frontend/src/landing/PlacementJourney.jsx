import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const stage = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const connector = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function PlacementJourney() {
  return (
    <section className="placement-journey-section" id="about">
      <div className="placement-journey-heading">
        <p className="section-label">YOUR PLACEMENT JOURNEY</p>

        <h2>
          From preparation
          <br />
          to placement.
        </h2>
      </div>

      <motion.div
        className="journey"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="journey-stage" variants={stage}>
          <span className="journey-number">01</span>
          <div className="journey-dot"></div>
          <h3>Preparation</h3>
          <p>
            DSA, competitive programming
            and web development.
          </p>
        </motion.div>

        <motion.div className="journey-connector" variants={connector}></motion.div>

        <motion.div className="journey-stage" variants={stage}>
          <span className="journey-number">02</span>
          <div className="journey-dot"></div>
          <h3>Application</h3>
          <p>
            Companies, applications and
            application status.
          </p>
        </motion.div>

        <motion.div className="journey-connector" variants={connector}></motion.div>

        <motion.div className="journey-stage" variants={stage}>
          <span className="journey-number">03</span>
          <div className="journey-dot"></div>
          <h3>Interview</h3>
          <p>
            Interview rounds, progress
            and outcomes.
          </p>
        </motion.div>

        <motion.div className="journey-connector" variants={connector}></motion.div>

        <motion.div className="journey-stage" variants={stage}>
          <span className="journey-number">04</span>
          <div className="journey-dot"></div>
          <h3>Offer</h3>
          <p>
            Track your offers and
            placement outcomes.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default PlacementJourney;