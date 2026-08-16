import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="cta-section">
      <motion.div
        className="cta-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="section-label">START YOUR JOURNEY</p>

        <h2>
          Ready to take control
          <br />
          of your placement preparation?
        </h2>

        <p className="cta-description">
          Keep your preparation organized, track your progress
          and stay ready for every opportunity.
        </p>

        <Link to="/register" className="cta-button">
          Get Started
        </Link>
      </motion.div>
    </section>
  );
}

export default CTA;