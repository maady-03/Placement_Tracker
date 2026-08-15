import { motion } from "framer-motion";

const list = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const row = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function Features() {
  return (
    <section className="features-section" id="features">
      <div className="features-heading">
        <p className="section-label">EVERYTHING IN ONE PLACE</p>

        <h2>
          Stay organized throughout
          <br />
          your placement journey.
        </h2>
      </div>

      <motion.div
        className="features-list"
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="feature-item" variants={row}>
          <div className="feature-number">01</div>

          <div className="feature-content">
            <h3>DSA & Competitive Programming</h3>
            <p>
              Track problems, consistency and preparation progress
              across your coding journey.
            </p>
          </div>
        </motion.div>

        <motion.div className="feature-item" variants={row}>
          <div className="feature-number">02</div>

          <div className="feature-content">
            <h3>Web Development</h3>
            <p>
              Keep track of your development skills, projects
              and overall progress.
            </p>
          </div>
        </motion.div>

        <motion.div className="feature-item" variants={row}>
          <div className="feature-number">03</div>

          <div className="feature-content">
            <h3>Applications & Interviews</h3>
            <p>
              Track companies, applications, interview rounds
              and offers in one place.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Features;