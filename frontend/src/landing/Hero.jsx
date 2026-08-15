function Hero(){
    return (
        <section className="Hero">
            <div className="hero-content">

                <p className="hero-label">
                    PLACEMENT PREPARATION, ORGANIZED.
                </p>

                <h1>
                    Prepare with purpose.
                    <br/>
                    Track Your Placement Journey.
                </h1>

                <p className="hero-description">
                    One place to track your DSA, development, applications,
                    interviews and overall placement readiness.
                </p>

                <div className="hero-actions">
                    <a href="/register" className="hero-primary-btn">
                    Start Tracking
                    </a>

                    <a href="/login" className="hero-secondary-btn">
                    Login
                    </a>                    
                </div>
            </div>
        </section>
    );
}

export default Hero;