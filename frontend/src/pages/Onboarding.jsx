import { useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "../api/profile";
import { isProfileComplete } from "../utils/profile";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const INITIAL = {
  college: "",
  branch: "",
  graduationYear: "",
  cgpa: "",
  backlogs: "",
};

// Mirrors the backend's validateProfile rules.
function validate(values) {
  const errors = {};

  if (!values.college.trim()) errors.college = "Enter your college.";
  if (!values.branch.trim()) errors.branch = "Enter your branch.";

  const year = Number(values.graduationYear);
  if (!values.graduationYear) errors.graduationYear = "Enter your graduation year.";
  else if (!Number.isInteger(year) || year < 2000 || year > 2100)
    errors.graduationYear = "Enter a year between 2000 and 2100.";

  if (values.cgpa !== "") {
    const cgpa = Number(values.cgpa);
    if (Number.isNaN(cgpa) || cgpa < 0 || cgpa > 10)
      errors.cgpa = "CGPA must be between 0 and 10.";
  }

  if (values.backlogs !== "") {
    const backlogs = Number(values.backlogs);
    if (!Number.isInteger(backlogs) || backlogs < 0)
      errors.backlogs = "Enter 0 or more.";
  }

  return errors;
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

function Onboarding() {
  const { user, setUser } = useAuth();

  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Also handles the post-save redirect: once the user is updated this renders <Navigate>.
  if (isProfileComplete(user)) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setIsSubmitting(true);
    try {
      const data = await updateProfile(buildPayload(values));
      setUser(data.user);
    } catch (err) {
      setServerError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 sm:p-8">
      <h1 className="text-xl font-semibold text-ink">
        Welcome, {user?.firstName}
      </h1>
      <p className="mt-1 text-sm text-ink-muted">
        Complete your profile to start tracking your placement journey.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        {serverError && (
          <p className="rounded-lg bg-status-rejected/15 px-3 py-2 text-sm text-status-rejected">
            {serverError}
          </p>
        )}

        <Input
          label="College *"
          name="college"
          value={values.college}
          onChange={handleChange}
          error={errors.college}
        />

        <Input
          label="Branch *"
          name="branch"
          value={values.branch}
          onChange={handleChange}
          error={errors.branch}
          placeholder="e.g. Computer Science"
        />

        <Input
          label="Graduation year *"
          name="graduationYear"
          type="number"
          value={values.graduationYear}
          onChange={handleChange}
          error={errors.graduationYear}
          placeholder="e.g. 2027"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="CGPA"
            name="cgpa"
            type="number"
            step="0.01"
            value={values.cgpa}
            onChange={handleChange}
            error={errors.cgpa}
          />
          <Input
            label="Backlogs"
            name="backlogs"
            type="number"
            value={values.backlogs}
            onChange={handleChange}
            error={errors.backlogs}
          />
        </div>

        <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Continue"}
        </Button>
      </form>
    </Card>
  );
}

export default Onboarding;