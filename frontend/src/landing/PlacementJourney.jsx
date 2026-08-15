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

      <div className="journey">

        <div className="journey-stage">
          <span className="journey-number">01</span>

          <div className="journey-dot"></div>

          <h3>Preparation</h3>

          <p>
            DSA, competitive programming
            and web development.
          </p>
        </div>


        <div className="journey-connector"></div>


        <div className="journey-stage">
          <span className="journey-number">02</span>

          <div className="journey-dot"></div>

          <h3>Application</h3>

          <p>
            Companies, applications and
            application status.
          </p>
        </div>


        <div className="journey-connector"></div>


        <div className="journey-stage">
          <span className="journey-number">03</span>

          <div className="journey-dot"></div>

          <h3>Interview</h3>

          <p>
            Interview rounds, progress
            and outcomes.
          </p>
        </div>


        <div className="journey-connector"></div>


        <div className="journey-stage">
          <span className="journey-number">04</span>

          <div className="journey-dot"></div>

          <h3>Offer</h3>

          <p>
            Track your offers and
            placement outcomes.
          </p>
        </div>

      </div>
    </section>
  );
}

export default PlacementJourney;