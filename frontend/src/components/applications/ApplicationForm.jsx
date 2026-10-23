import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { APPLICATION_TYPES, STATUSES } from "../../utils/constants";
import { isValidUrl } from "../../utils/format";

const EMPTY_VALUES = {
  companyId: "",
  role: "",
  type: "internship",
  status: "applied",
  appliedDate: "",
  deadline: "",
  source: "",
  jobLink: "",
  resumeVersion: "",
  notes: "",
};

const OPTIONAL_FIELDS = [
  "appliedDate",
  "deadline",
  "source",
  "jobLink",
  "resumeVersion",
  "notes",
];

const NOTES_LIMIT = 1000;

// Mirrors the backend's validateApplication rules.
function validate(values) {
  const errors = {};

  if (!values.companyId) errors.companyId = "Select a company.";

  if (!values.role.trim()) errors.role = "Enter the role.";
  else if (values.role.trim().length > 100)
    errors.role = "Role must be under 100 characters.";

  if (values.jobLink.trim() && !isValidUrl(values.jobLink.trim()))
    errors.jobLink = "Enter a valid URL.";

  return errors;
}

function buildPayload(values, isEdit) {
  const payload = {
    companyId: values.companyId,
    role: values.role.trim(),
    type: values.type,
  };

  // Status changes go through the status changer so they hit the timeline.
  if (!isEdit) payload.status = values.status;

  for (const key of OPTIONAL_FIELDS) {
    const value = values[key].trim();
    if (value) payload[key] = value;
    else if (isEdit) payload[key] = null; // lets an emptied field clear on the server
  }

  return payload;
}

function ApplicationForm({
  companies,
  isLoadingCompanies,
  companiesError,
  initialValues,
  submitLabel = "Save application",
  isSubmitting = false,
  serverError = "",
  cancelTo = "/applications",
  isEdit = false,
  onSubmit,
}) {
  const [values, setValues] = useState({ ...EMPTY_VALUES, ...initialValues });
  const [errors, setErrors] = useState({});

  const hasNoCompanies =
    !isLoadingCompanies && !companiesError && companies.length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit(buildPayload(values, isEdit));
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Card className="p-5 sm:p-6">
        {serverError && (
          <p className="mb-5 rounded-lg bg-status-rejected/15 px-3 py-2 text-sm text-status-rejected">
            {serverError}
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Select
              label="Company *"
              name="companyId"
              value={values.companyId}
              onChange={handleChange}
              error={errors.companyId}
              disabled={isLoadingCompanies || hasNoCompanies}
            >
              <option value="">
                {isLoadingCompanies ? "Loading companies..." : "Select a company"}
              </option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </Select>

            {companiesError && (
              <p className="mt-1.5 text-xs text-status-rejected">
                {companiesError}
              </p>
            )}

            {hasNoCompanies && (
              <p className="mt-1.5 text-xs text-ink-muted">
                You have no companies yet.{" "}
                <Link
                  to="/companies"
                  className="font-medium text-accent hover:text-accent-hover"
                >
                  Add one first
                </Link>
                .
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <Input
              label="Role *"
              name="role"
              value={values.role}
              onChange={handleChange}
              error={errors.role}
              maxLength={100}
              placeholder="e.g. SDE Intern"
            />
          </div>

          <div className={isEdit ? "sm:col-span-2" : ""}>
            <Select
              label="Type"
              name="type"
              value={values.type}
              onChange={handleChange}
            >
              {Object.entries(APPLICATION_TYPES).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </Select>
          </div>

          {!isEdit && (
            <Select
              label="Status"
              name="status"
              value={values.status}
              onChange={handleChange}
            >
              {Object.entries(STATUSES).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </Select>
          )}

          <Input
            label="Applied date"
            name="appliedDate"
            type="date"
            value={values.appliedDate}
            onChange={handleChange}
            className="[color-scheme:dark]"
          />

          <Input
            label="Deadline"
            name="deadline"
            type="date"
            value={values.deadline}
            onChange={handleChange}
            className="[color-scheme:dark]"
          />

          <Input
            label="Source"
            name="source"
            value={values.source}
            onChange={handleChange}
            placeholder="LinkedIn, referral, campus..."
          />

          <Input
            label="Resume version"
            name="resumeVersion"
            value={values.resumeVersion}
            onChange={handleChange}
            placeholder="e.g. v3-backend"
          />

          <div className="sm:col-span-2">
            <Input
              label="Job link"
              name="jobLink"
              value={values.jobLink}
              onChange={handleChange}
              error={errors.jobLink}
              placeholder="https://..."
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="notes"
              className="mb-1.5 block text-xs font-medium text-ink-muted"
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              maxLength={NOTES_LIMIT}
              value={values.notes}
              onChange={handleChange}
              className="w-full resize-y rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            <p className="mt-1 text-right font-mono text-xs text-ink-faint">
              {values.notes.length}/{NOTES_LIMIT}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:justify-end">
          <Button as={Link} to={cancelTo} variant="secondary">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || hasNoCompanies}>
            {isSubmitting ? "Saving..." : submitLabel}
          </Button>
        </div>
      </Card>
    </form>
  );
}

export default ApplicationForm;