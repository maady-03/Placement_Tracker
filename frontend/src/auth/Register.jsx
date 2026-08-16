import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Auth.css";

const container = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const fields = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04 },
  },
};

const field = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");

  const strength = Math.min(
    3,
    [
      password.length >= 6,
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
    ].filter(Boolean).length,
  );

  return (
    <div className="register-page">
      <svg
        className="liquid-frame liquid-top"
        viewBox="0 0 800 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C150,90 300,10 450,50 C600,90 700,20 800,55 L800,0 L0,0 Z"
          className="liquid-shape-a"
        />
        <path
          d="M0,55 C180,100 320,30 480,65 C620,95 720,40 800,70 L800,0 L0,0 Z"
          className="liquid-shape-b"
        />
        <ellipse
          cx="220"
          cy="35"
          rx="60"
          ry="14"
          className="liquid-highlight"
        />
        <ellipse
          cx="560"
          cy="45"
          rx="80"
          ry="10"
          className="liquid-highlight-soft"
        />
      </svg>

      <svg
        className="liquid-frame liquid-bottom"
        viewBox="0 0 800 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C150,70 300,150 450,110 C600,70 700,140 800,105 L800,160 L0,160 Z"
          className="liquid-shape-a"
        />
        <path
          d="M0,105 C180,60 320,130 480,95 C620,65 720,120 800,90 L800,160 L0,160 Z"
          className="liquid-shape-b"
        />
        <ellipse
          cx="260"
          cy="125"
          rx="70"
          ry="12"
          className="liquid-highlight-soft"
        />
      </svg>

      <motion.div
        className="register-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="register-brand">
          <span className="brand-dot" />
          <span>Placement Tracker</span>
        </div>

        <h2 className="register-heading">Create your account</h2>
        <p className="register-subtext">
          Start tracking your placement preparation.
        </p>

        <motion.form
          className="register-form"
          variants={fields}
          initial="hidden"
          animate="show"
        >
          <motion.div className="form-row" variants={field}>
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                autoComplete="given-name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                autoComplete="family-name"
              />
            </div>
          </motion.div>

          <motion.div className="form-group" variants={field}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              autoComplete="username"
            />
          </motion.div>

          <motion.div className="form-group" variants={field}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" autoComplete="email" />
          </motion.div>

          <motion.div className="form-group" variants={field}>
            <label htmlFor="password">Password</label>
            <div className="input-with-action">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="input-toggle"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="strength-bar">
              <span className={strength >= 1 ? "filled" : ""} />
              <span className={strength >= 2 ? "filled" : ""} />
              <span className={strength >= 3 ? "filled" : ""} />
            </div>
          </motion.div>

          <motion.div className="form-group" variants={field}>
            <label htmlFor="confirmPassword">Confirm password</label>
            <div className="input-with-action">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="input-toggle"
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            className="register-submit"
            variants={field}
          >
            Create Account
          </motion.button>
        </motion.form>

        <p className="register-login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
