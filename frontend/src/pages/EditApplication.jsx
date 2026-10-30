import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useApplication from "../hooks/useApplication";
import useCompanies from "../hooks/useCompanies";
import { updateApplication } from "../api/applications";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import ApplicationForm from "../components/applications/ApplicationForm";
import { toDateInputValue } from "../utils/format";

function EditApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { application, isLoading, error } = useApplication(id);
  const companiesState = useCompanies();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (payload) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      await updateApplication(id, payload);
      navigate(`/applications/${id}`);
    } catch (err) {
      setServerError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          to={`/applications/${id}`}
          className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink"
        >
          <ArrowLeft size={14} />
          Back
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-ink">
          Edit Application
        </h1>
      </div>

      {isLoading && <Skeleton className="h-96 rounded-xl" />}

      {!isLoading && (error || !application) && (
        <Card className="flex items-center justify-between gap-4 p-5">
          <p className="text-sm text-status-rejected">
            {error || "Application not found."}
          </p>
          <Button as={Link} to="/applications" variant="secondary" size="sm">
            Back to list
          </Button>
        </Card>
      )}

      {!isLoading && application && (
        <ApplicationForm
          isEdit
          companies={companiesState.companies}
          isLoadingCompanies={companiesState.isLoading}
          companiesError={companiesState.error}
          initialValues={{
            companyId: application.company?._id ?? "",
            role: application.role,
            location: application.location ?? "",
            type: application.type,
            appliedDate: toDateInputValue(application.appliedDate),
            deadline: toDateInputValue(application.deadline),
            source: application.source ?? "",
            jobLink: application.jobLink ?? "",
            resumeVersion: application.resumeVersion ?? "",
            notes: application.notes ?? "",
          }}
          isSubmitting={isSubmitting}
          serverError={serverError}
          submitLabel="Save changes"
          cancelTo={`/applications/${id}`}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default EditApplication;