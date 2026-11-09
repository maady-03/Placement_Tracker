// src/components/portfolio/MajorProject.jsx
import { useState } from "react";
import { Code2, ExternalLink, Pencil, Plus, Star, Wrench } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";
import { toHref } from "../../utils/format";
import { toTechGroups } from "../../utils/projects";

const DESC_PREVIEW_LIMIT = 220;

function MajorProject({ project, isLoading, onAdd, onEdit }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const [expanded, setExpanded] = useState(false);

  if (isLoading) return <Skeleton className="h-64 rounded-xl" />;

  if (!project) {
    return (
      <Card className="flex flex-col items-center border-dashed px-6 py-14 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-raised text-ink-muted">
          <Star size={20} />
        </span>
        <h2 className="mt-4 text-sm font-semibold text-ink">No major project yet</h2>
        <p className="mt-1 max-w-sm text-sm text-ink-muted">
          Add your best project and set it as the Major Project to feature it here.
        </p>
        <Button className="mt-5" size="sm" onClick={onAdd}>
          <Plus size={14} />
          Add project
        </Button>
      </Card>
    );
  }

  const { title, description, techStack, liveUrl, githubUrl, imageUrl } = project;
  const showImage = Boolean(imageUrl) && failedSrc !== imageUrl;
  const techGroups = toTechGroups(techStack);
  const isLong = description.length > DESC_PREVIEW_LIMIT;

  return (
    <Card
      as="section"
      className="relative isolate overflow-hidden p-6 sm:p-8"
    >
      <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className={showImage ? "grid items-center gap-8 lg:grid-cols-2" : ""}>
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
              <Star size={12} />
              Major Project
            </span>

            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(project)}
                aria-label="Edit project"
                className="rounded-md p-1.5 text-ink-faint hover:bg-surface-raised hover:text-ink"
              >
                <Pencil size={15} />
              </button>
            )}
          </div>

          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>

          <p
            className={`mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base ${
              isLong && !expanded ? "line-clamp-4" : ""
            }`}
          >
            {description}
          </p>

          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded((previous) => !previous)}
              className="mt-1.5 text-xs font-medium text-accent hover:text-accent-hover"
            >
              {expanded ? "See less" : "See more"}
            </button>
          )}

          {techGroups.length > 0 && (
            <div className="mt-5 space-y-2">
              {techGroups.map(({ key, label, items }) => (
                <div key={key} className="flex flex-wrap items-center gap-2">
                  <span className="w-24 text-xs text-ink-faint">{label}</span>
                  {items.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line bg-surface-raised px-3 py-1 text-xs text-ink-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {liveUrl ? (
              <Button as="a" href={toHref(liveUrl)} target="_blank" rel="noreferrer">
                <ExternalLink size={16} />
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
                href={toHref(githubUrl)}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
              >
                <Code2 size={16} />
                Source code
              </Button>
            )}
          </div>
        </div>

        {showImage && (
          <img
            src={imageUrl}
            alt={`${title} preview`}
            loading="lazy"
            onError={() => setFailedSrc(imageUrl)}
            className="aspect-video w-full rounded-xl border border-line object-cover"
          />
        )}
      </div>
    </Card>
  );
}

export default MajorProject;