// src/components/portfolio/ProjectDetailModal.jsx
import { useState } from "react";
import { Code2, ExternalLink, Pencil, Wrench } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { toHref } from "../../utils/format";
import { toTechGroups } from "../../utils/projects";

function ProjectDetails({ project, onEdit }) {
  const [imageFailed, setImageFailed] = useState(false);

  const { title, description, techStack, liveUrl, githubUrl, imageUrl } = project;
  const techGroups = toTechGroups(techStack);
  const showImage = Boolean(imageUrl) && !imageFailed;

  return (
    <div className={showImage ? "grid gap-6 md:grid-cols-2" : ""}>
      {showImage && (
        <div className="md:self-start">
          <img
            src={imageUrl}
            alt={`${title} preview`}
            onError={() => setImageFailed(true)}
            className="aspect-video w-full rounded-lg border border-line object-cover"
          />
        </div>
      )}

      <div className="flex min-w-0 flex-col space-y-5">
        <div>
          <h3 className="text-lg font-semibold text-ink">{title}</h3>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink-muted">
            {description}
          </p>
        </div>

        {techGroups.length > 0 && (
          <div className="space-y-2">
            {techGroups.map(({ key, label, items }) => (
              <div key={key} className="flex flex-wrap items-center gap-2">
                <span className="w-24 text-xs text-ink-faint">{label}</span>
                {items.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-line bg-surface-raised px-2.5 py-0.5 text-xs text-ink-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
          {liveUrl ? (
            <Button as="a" size="sm" href={toHref(liveUrl)} target="_blank" rel="noreferrer">
              <ExternalLink size={14} />
              Live demo
            </Button>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-ink-muted">
              <Wrench size={13} />
              In development
            </span>
          )}
          {githubUrl && (
            <Button
              as="a"
              size="sm"
              variant="secondary"
              href={toHref(githubUrl)}
              target="_blank"
              rel="noreferrer"
            >
              <Code2 size={14} />
              Source code
            </Button>
          )}
          {onEdit && (
            <Button
              size="sm"
              variant="ghost"
              className="ml-auto"
              onClick={() => onEdit(project)}
            >
              <Pencil size={14} />
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectDetailModal({ open, project, onClose, onEdit }) {
  return (
    <Modal
      open={open && Boolean(project)}
      onClose={onClose}
      title="Project details"
      size="sm:max-w-3xl"
    >
      {/* keyed so the image-failed state resets per project */}
      {project && <ProjectDetails key={project._id} project={project} onEdit={onEdit} />}
    </Modal>
  );
}

export default ProjectDetailModal;