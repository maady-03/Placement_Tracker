import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useCompanies from "../hooks/useCompanies";
import { createApplication } from "../api/applications";
import ApplicationForm from "../components/applications/ApplicationForm";

// Local date as YYYY-MM-DD (toISOString alone would use the UTC date).
const todayInputValue = () => {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
};

function NewApplication() {
  const navigate = useNavigate();
  const { companies, isLoading, error } = useCompanies();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (payload) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      await createApplication(payload);
      navigate("/applications");
    } catch (err) {
      setServerError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          to="/applications"
          className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink"
        >
          <ArrowLeft size={14} />
          Applications
        </Link>

        <h1 className="mt-3 text-2xl font-semibold text-ink">
          New Application
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Add a company you applied to or want to track.
        </p>
      </div>

      <ApplicationForm
        companies={companies}
        isLoadingCompanies={isLoading}
        companiesError={error}
        initialValues={{ appliedDate: todayInputValue() }}
        isSubmitting={isSubmitting}
        serverError={serverError}
        submitLabel="Create application"
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default NewApplication;