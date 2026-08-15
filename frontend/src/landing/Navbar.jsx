function Navbar(){
    return (
        <nav className="navbar">
            <div className="logo">
                Placement Tracker
            </div>

            <div className="nav-links">
                <a href="#features">Features</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#about">About</a>
            </div>

            <div className="nav-actions">
                <a href="/login" className="login-link">
                Login
                </a>

                <a href="/register" className="get-started-btn">
                Get Started
                </a>
            </div>
        </nav>
    );
}
export default Navbar;