function DashboardPreview() {
  return (
    <section className="dashboard-preview-section">
      <div className="dashboard-preview">

        <div className="preview-sidebar">
          <div className="preview-logo">
            Placement Tracker
          </div>

          <div className="preview-nav">
            <div className="preview-nav-item active">
              Dashboard
            </div>

            <div className="preview-nav-item">
              Activities
            </div>

            <div className="preview-nav-item">
              Company Drives
            </div>

            <div className="preview-nav-item">
              DSA
            </div>

            <div className="preview-nav-item">
              CP
            </div>

            <div className="preview-nav-item">
              Web Dev
            </div>
          </div>
        </div>

        <div className="preview-main">

          <div className="preview-top">
            <div>
              <p className="preview-welcome">
                Welcome back
              </p>

              <h3>
                Your placement overview
              </h3>
            </div>

            <div className="preview-user">
              M
            </div>
          </div>

          <div className="readiness-preview">
            <div>
              <p>Overall Readiness</p>

              <strong>72%</strong>

              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>

            <span>
              Good progress
            </span>
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

            <div>
              <span>Applications</span>
              <strong>12</strong>
            </div>

            <span className="funnel-arrow">→</span>

            <div>
              <span>Interviews</span>
              <strong>5</strong>
            </div>

            <span className="funnel-arrow">→</span>

            <div>
              <span>Offers</span>
              <strong>2</strong>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default DashboardPreview;