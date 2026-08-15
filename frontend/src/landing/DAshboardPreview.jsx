import { motion } from "framer-motion";

function DashboardPreview() {
  return (
    <section className="dashboard-preview-section">
      <motion.div
        className="dashboard-preview"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="preview-sidebar">
          <div className="preview-logo">Placement Tracker</div>

          <div className="preview-nav">
            <div className="preview-nav-item active">Dashboard</div>
            <div className="preview-nav-item">Activities</div>
            <div className="preview-nav-item">Company Drives</div>
            <div className="preview-nav-item">DSA</div>
            <div className="preview-nav-item">CP</div>
            <div className="preview-nav-item">Web Dev</div>
          </div>
        </div>

        <div className="preview-main">
          <div className="preview-top">
            <div>
              <p className="preview-welcome">Welcome back</p>
              <h3>Your placement overview</h3>
            </div>

            <div className="preview-user">M</div>
          </div>

          <div className="readiness-preview">
            <div className="readiness-main">
              <p>Overall Readiness</p>
              <strong>72%</strong>

              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "72%" }}></div>
              </div>
            </div>

            <span className="readiness-tag">Good progress</span>
          </div>

          <div className="skills-preview">
            <div className="skill-preview">
              <span>DSA</span>
              <strong>68%</strong>
            </div>

            <div className="skill-preview">
              <span>Web Dev</span>
              <strong>75%</strong>
            </div>

            <div className="skill-preview">
              <span>CP</span>
              <strong>61%</strong>
            </div>
          </div>

          <div className="funnel-preview">
            <div className="funnel-stage">
              <span>Applications</span>
              <strong>12</strong>
            </div>

            <span className="funnel-arrow">→</span>

            <div className="funnel-stage">
              <span>Interviews</span>
              <strong>5</strong>
            </div>

            <span className="funnel-arrow">→</span>

            <div className="funnel-stage">
              <span>Offers</span>
              <strong>2</strong>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default DashboardPreview;