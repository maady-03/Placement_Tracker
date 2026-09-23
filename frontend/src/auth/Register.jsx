import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api/config";
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
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const strength = Math.min(
    3,
    [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
    ].filter(Boolean).length
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setFormError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setErrors({});
    setFormError("");

    const newErrors = {};

    // First name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Please enter your first name.";
    }

    // Last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Please enter your last name.";
    }

    // Username
    if (!formData.username.trim()) {
      newErrors.username = "Choose a username to continue.";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters and numbers.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    // Password
    if (!password) {
      newErrors.password =
        "Create a password to secure your account.";
    } else if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>_\-\\[\]/;'`~+=]/.test(password)
    ) {
      newErrors.password =
        "Use 8+ characters with uppercase, lowercase, number and symbol.";
    }

    // Confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    // Stop if validation failed
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      const hasEmptyField =
        !formData.firstName.trim() ||
        !formData.lastName.trim() ||
        !formData.username.trim() ||
        !formData.email.trim() ||
        !password ||
        !confirmPassword;

      if (hasEmptyField) {
        setFormError(
          "Please fill in the missing required fields."
        );
      }

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Registration failed."
        );
      }

      navigate("/login");
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* Top liquid design */}
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

      {/* Bottom liquid design */}
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

        <h2 className="register-heading">
          Create your account
        </h2>

        <p className="register-subtext">
          Start tracking your placement preparation.
        </p>

        <motion.form
          className="register-form"
          variants={fields}
          initial="hidden"
          animate="show"
          onSubmit={handleRegister}
        >

          {/* Overall error */}
          {formError && (
            <p className="auth-form-error">
              ⚠ {formError}
            </p>
          )}

          {/* First + Last name */}
          <motion.div
            className="form-row"
            variants={field}
          >

            <div className="form-group">
              <label htmlFor="firstName">
                First name{" "}
                <span className="required">*</span>
              </label>

              <input
                id="firstName"
                type="text"
                name="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                className={
                  errors.firstName
                    ? "input-error"
                    : ""
                }
              />

              {errors.firstName && (
                <span className="field-error">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Last name{" "}
                <span className="required">*</span>
              </label>

              <input
                id="lastName"
                type="text"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                className={
                  errors.lastName
                    ? "input-error"
                    : ""
                }
              />

              {errors.lastName && (
                <span className="field-error">
                  {errors.lastName}
                </span>
              )}
            </div>

          </motion.div>

          {/* Username */}
          <motion.div
            className="form-group"
            variants={field}
          >

            <label htmlFor="username">
              Username{" "}
              <span className="required">*</span>
            </label>

            <input
              id="username"
              type="text"
              name="username"
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
              className={
                errors.username
                  ? "input-error"
                  : ""
              }
            />

            {errors.username && (
              <span className="field-error">
                {errors.username}
              </span>
            )}

          </motion.div>

          {/* Email */}
          <motion.div
            className="form-group"
            variants={field}
          >

            <label htmlFor="email">
              Email{" "}
              <span className="required">*</span>
            </label>

            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={
                errors.email
                  ? "input-error"
                  : ""
              }
            />

            {errors.email && (
              <span className="field-error">
                {errors.email}
              </span>
            )}

          </motion.div>

          {/* Password */}
          <motion.div
            className="form-group"
            variants={field}
          >

            <label htmlFor="password">
              Password{" "}
              <span className="required">*</span>
            </label>

            <div
              className={
                errors.password
                  ? "input-with-action input-error-wrapper"
                  : "input-with-action"
              }
            >

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  setErrors((previous) => ({
                    ...previous,
                    password: "",
                  }));

                  setFormError("");
                }}
              />

              <button
                type="button"
                className="input-toggle"
                onClick={() =>
                  setShowPassword((v) => !v)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

            <div className="strength-bar">
              <span
                className={
                  strength >= 1
                    ? "filled"
                    : ""
                }
              />

              <span
                className={
                  strength >= 2
                    ? "filled"
                    : ""
                }
              />

              <span
                className={
                  strength >= 3
                    ? "filled"
                    : ""
                }
              />
            </div>

            {errors.password && (
              <span className="field-error">
                {errors.password}
              </span>
            )}

          </motion.div>

          {/* Confirm password */}
          <motion.div
            className="form-group"
            variants={field}
          >

            <label htmlFor="confirmPassword">
              Confirm password{" "}
              <span className="required">*</span>
            </label>

            <div
              className={
                errors.confirmPassword
                  ? "input-with-action input-error-wrapper"
                  : "input-with-action"
              }
            >

              <input
                id="confirmPassword"
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(
                    e.target.value
                  );

                  setErrors((previous) => ({
                    ...previous,
                    confirmPassword: "",
                  }));

                  setFormError("");
                }}
              />

              <button
                type="button"
                className="input-toggle"
                onClick={() =>
                  setShowConfirm((v) => !v)
                }
              >
                {showConfirm ? "Hide" : "Show"}
              </button>

            </div>

            {errors.confirmPassword && (
              <span className="field-error">
                {errors.confirmPassword}
              </span>
            )}

          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            className="register-submit"
            variants={field}
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </motion.button>

        </motion.form>

        <p className="register-login-link">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
}

export default Register;