import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Auth.css";

const contentFade = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const visualFade = {
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const fields = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const field = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// Future conditional greeting states (user detection not yet implemented):
// returning: { heading: "Good to see you again.", subtext: "Continue where you left off." }
// new:       { heading: "Ready for the next step?", subtext: "Your placement journey starts here." }
const greeting = {
  heading: "Good to see you again.",
  subtext: "Continue where you left off.",
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-page">
      <motion.div
        className="login-visual"
        variants={visualFade}
        initial="hidden"
        animate="show"
      >
        <svg viewBox="0 0 300 380" className="login-visual-svg" preserveAspectRatio="xMidYMid meet">
          <rect x="30" y="300" width="60" height="60" fill="#dedcd3" />
          <rect x="95" y="240" width="60" height="120" fill="#c9c6ba" />
          <rect x="160" y="180" width="60" height="180" fill="#b3b0a1" />
          <rect x="225" y="120" width="60" height="240" fill="#111111" />
          <circle cx="255" cy="95" r="7" fill="#111111" />
        </svg>
        <p className="login-visual-caption">01 — Keep moving</p>
      </motion.div>

      <motion.div
        className="login-content"
        variants={contentFade}
        initial="hidden"
        animate="show"
      >
        <p className="login-wordmark">Placement Tracker</p>

        <h2 className="login-heading">{greeting.heading}</h2>
        <p className="login-subtext">{greeting.subtext}</p>

        <motion.form
          className="login-form"
          variants={fields}
          initial="hidden"
          animate="show"
        >
          <motion.div className="login-field" variants={field}>
            <label htmlFor="loginId">Email or username</label>
            <input
              id="loginId"
              type="text"
              name="loginId"
              autoComplete="username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
          </motion.div>

          <motion.div className="login-field" variants={field}>
            <label htmlFor="loginPassword">Password</label>
            <div className="login-field-inline">
              <input
                id="loginPassword"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="login-toggle"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </motion.div>

          <motion.button type="submit" className="login-submit" variants={field}>
            Login
          </motion.button>
        </motion.form>

        <p className="login-register-link">
          New here? <Link to="/register">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;