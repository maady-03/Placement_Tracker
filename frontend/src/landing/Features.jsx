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

      <div className="features-list">

        <div className="feature-item">
          <div className="feature-number">01</div>

          <div className="feature-content">
            <h3>DSA & Competitive Programming</h3>

            <p>
              Track problems, consistency and preparation progress
              across your coding journey.
            </p>
          </div>
        </div>


        <div className="feature-item">
          <div className="feature-number">02</div>

          <div className="feature-content">
            <h3>Web Development</h3>

            <p>
              Keep track of your development skills, projects
              and overall progress.
            </p>
          </div>
        </div>


        <div className="feature-item">
          <div className="feature-number">03</div>

          <div className="feature-content">
            <h3>Applications & Interviews</h3>

            <p>
              Track companies, applications, interview rounds
              and offers in one place.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Features;