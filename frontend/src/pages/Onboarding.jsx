import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "../api/profile";
import { isProfileComplete } from "../utils/profile";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const EASE = [0.16, 1, 0.3, 1];

const INITIAL = {
  college: "",
  branch: "",
  graduationYear: "",
  cgpa: "",
  backlogs: "",
};

const STEPS = [
  {
    name: "college",
    question: "Which college are you studying at?",
    hint: "Enter the full name of your institute.",
    placeholder: "e.g. IIIT Bhagalpur",
    required: true,
  },
  {
    name: "branch",
    question: "What is your branch?",
    hint: "The course or department you are enrolled in.",
    placeholder: "e.g. Computer Science",
    required: true,
  },
  {
    name: "graduationYear",
    question: "When do you graduate?",
    hint: "Your graduation year.",
    placeholder: "e.g. 2028",
    type: "number",
    inputMode: "numeric",
    required: true,
  },
  {
    name: "cgpa",
    question: "What is your current CGPA?",
    hint: "Optional. A number between 0 and 10.",
    placeholder: "e.g. 8.5",
    type: "number",
    step: "0.01",
    inputMode: "decimal",
    required: false,
  },
  {
    name: "backlogs",
    question: "Any active backlogs?",
    hint: "Optional. Enter 0 if you have none.",
    placeholder: "e.g. 0",
    type: "number",
    inputMode: "numeric",
    required: false,
  },
];

const LAST = STEPS.length - 1;

// Mirrors the backend's validateProfile rules, one field at a time.
function validateField(name, raw) {
  const value = String(raw).trim();

  switch (name) {
    case "college":
      return value ? "" : "Enter your college.";
    case "branch":
      return value ? "" : "Enter your branch.";
    case "graduationYear": {
      if (!value) return "Enter your graduation year.";
      const year = Number(value);
      return Number.isInteger(year) && year >= 2000 && year <= 2100
        ? ""
        : "Enter a year between 2000 and 2100.";
    }
    case "cgpa": {
      if (value === "") return "";
      const cgpa = Number(value);
      return !Number.isNaN(cgpa) && cgpa >= 0 && cgpa <= 10
        ? ""
        : "CGPA must be between 0 and 10.";
    }
    case "backlogs": {
      if (value === "") return "";
      const backlogs = Number(value);
      return Number.isInteger(backlogs) && backlogs >= 0
        ? ""
        : "Enter 0 or more.";
    }
    default:
      return "";
  }
}

function buildPayload(values) {
  const payload = {
    college: values.college.trim(),
    branch: values.branch.trim(),
    graduationYear: Number(values.graduationYear),
  };

  if (values.cgpa !== "") payload.cgpa = Number(values.cgpa);
  if (values.backlogs !== "") payload.backlogs = Number(values.backlogs);

  return payload;
}

const slide = {
  enter: (dir) => ({ opacity: 0, x: dir * 36 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
  exit: (dir) => ({
    opacity: 0,
    x: dir * -36,
    transition: { duration: 0.2, ease: EASE },
  }),
};

function Onboarding() {
  const { user, setUser } = useAuth();

  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Also handles the post-save redirect: once the user is updated this renders <Navigate>.
  if (isProfileComplete(user)) return <Navigate to="/dashboard" replace />;

  const step = STEPS[index];
  const isLast = index === LAST;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setServerError("");
  };

  const goTo = (next) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  const submit = async () => {
    const found = {};
    STEPS.forEach(({ name }) => {
      const message = validateField(name, values[name]);
      if (message) found[name] = message;
    });

    if (Object.keys(found).length > 0) {
      setErrors(found);
      const firstBad = STEPS.findIndex(({ name }) => found[name]);
      goTo(firstBad);
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await updateProfile(buildPayload(values));
      setUser(data.user);
    } catch (err) {
      setServerError(err.message);
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const message = validateField(step.name, values[step.name]);
    if (message) {
      setErrors((previous) => ({ ...previous, [step.name]: message }));
      return;
    }

    if (isLast) submit();
    else goTo(index + 1);
  };

  const handleSkip = () => {
    setValues((previous) => ({ ...previous, [step.name]: "" }));
    setErrors((previous) => ({ ...previous, [step.name]: "" }));
    if (isLast) submit();
    else goTo(index + 1);
  };

  const error = errors[step.name];

  return (
    <MotionConfig reducedMotion="user">
      <Card className="overflow-hidden p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-ink-muted">Welcome, {user?.firstName}</p>
          <p className="font-mono text-xs text-ink-faint">
            {String(index + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </p>
        </div>

        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          {STEPS.map(({ name }, i) => (
            <span
              key={name}
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-line"
            >
              <motion.span
                className="absolute inset-0 origin-left rounded-full bg-accent"
                initial={false}
                animate={{ scaleX: i <= index ? 1 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            </span>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-8">
          <div className="min-h-[11rem]">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={step.name}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <label htmlFor={step.name} className="block">
                  <span className="block text-2xl font-semibold leading-snug tracking-tight text-ink">
                    {step.question}
                  </span>
                  <span className="mt-1.5 block text-sm text-ink-muted">
                    {step.hint}
                  </span>
                </label>

                <input
                  id={step.name}
                  name={step.name}
                  type={step.type || "text"}
                  step={step.step}
                  inputMode={step.inputMode}
                  value={values[step.name]}
                  onChange={handleChange}
                  placeholder={step.placeholder}
                  autoFocus
                  autoComplete="off"
                  aria-invalid={Boolean(error)}
                  className={`mt-6 w-full border-0 border-b-2 bg-transparent pb-2 text-xl text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent ${
                    error ? "border-status-rejected" : "border-line"
                  } ${step.type === "number" ? "font-mono" : ""}`}
                />

                <p
                  role="alert"
                  className="mt-2 min-h-5 text-sm text-status-rejected"
                >
                  {error || serverError}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0 || isSubmitting}
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-0"
            >
              <ArrowLeft size={15} />
              Back
            </button>

            <div className="flex items-center gap-3">
              {!step.required && (
                <button
                  type="button"
                  onClick={handleSkip}
                  disabled={isSubmitting}
                  className="text-sm text-ink-muted transition-colors hover:text-ink disabled:opacity-50"
                >
                  Skip
                </button>
              )}

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Saving..."
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    {isLast ? "Finish" : "Continue"}
                    <ArrowRight size={15} />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </MotionConfig>
  );
}

export default Onboarding;