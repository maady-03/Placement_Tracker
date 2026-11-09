// src/components/portfolio/ProjectCarousel.jsx
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  FolderOpen,
  Pencil,
  Wrench,
} from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";
import ProjectDetailModal from "./ProjectDetailModal";
import { toTechGroups } from "../../utils/projects";
import { toHref } from "../../utils/format";

const STEP = 304; // card width (288) + gap (16)
const SPEED = 40; // px per second
const LOOP_MIN = 4; // below this the row is static
const MAX_TECH = 4;

function ProjectCard({ project, onOpen, onEdit, clone }) {
  const { title, description, techStack, liveUrl, githubUrl } = project;
  const tabIndex = clone ? -1 : undefined;
  const techs = toTechGroups(techStack).flatMap((group) => group.items);

  const stop = (e) => e.stopPropagation();

  return (
    <div
      role="button"
      tabIndex={clone ? -1 : 0}
      aria-label={`View ${title}`}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project);
        }
      }}
      className="h-full w-72 cursor-pointer rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    >
      <Card className="flex h-full w-full flex-col p-5 transition-colors hover:border-accent/40">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 truncate text-sm font-semibold text-ink">{title}</h3>
          <button
            type="button"
            tabIndex={tabIndex}
            onClick={(e) => {
              stop(e);
              onEdit(project);
            }}
            aria-label={`Edit ${title}`}
            className="-mr-1.5 -mt-1.5 rounded-md p-1.5 text-ink-faint hover:bg-surface-raised hover:text-ink"
          >
            <Pencil size={14} />
          </button>
        </div>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
          {description}
        </p>

        {techs.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {techs.slice(0, MAX_TECH).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-surface-raised px-2.5 py-0.5 text-[11px] text-ink-muted"
              >
                {tech}
              </span>
            ))}
            {techs.length > MAX_TECH && (
              <span className="px-1 py-0.5 font-mono text-[11px] text-ink-faint">
                +{techs.length - MAX_TECH}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center gap-4 pt-5 text-xs">
          {liveUrl ? (
            <a
              href={toHref(liveUrl)}
              target="_blank"
              rel="noreferrer"
              tabIndex={tabIndex}
              onClick={stop}
              className="flex items-center gap-1.5 text-accent hover:text-accent-hover"
            >
              <ExternalLink size={13} />
              Live
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-ink-faint">
              <Wrench size={13} />
              In development
            </span>
          )}
          {githubUrl && (
            <a
              href={toHref(githubUrl)}
              target="_blank"
              rel="noreferrer"
              tabIndex={tabIndex}
              onClick={stop}
              className="flex items-center gap-1.5 text-ink-muted hover:text-ink"
            >
              <Code2 size={13} />
              Code
            </a>
          )}
        </div>
      </Card>
    </div>
  );
}

function ProjectCarousel({ projects, isLoading, onAdd, onEdit }) {
  const trackRef = useRef(null);
  const paused = useRef(false);
  const [overflowing, setOverflowing] = useState(false);
  const [selected, setSelected] = useState(null);
  const [reduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const ready = !isLoading && projects.length > 0;
  const loop = projects.length >= LOOP_MIN;
  // The list is doubled so the loop restarts without a visible jump.
  const items = loop ? [...projects, ...projects] : projects;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() =>
      setOverflowing(el.scrollWidth > el.clientWidth + 1)
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [ready, items.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !loop || reduceMotion) return;

    let raf;
    let last = performance.now();
    let pos = el.scrollLeft;

    const tick = (now) => {
      const dt = now - last;
      last = now;
      const half = el.scrollWidth / 2;

      if (paused.current) {
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        pos = el.scrollLeft;
      } else {
        pos += (SPEED * dt) / 1000;
        if (pos >= half) pos -= half;
        el.scrollLeft = pos;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, loop, reduceMotion]);

  const nudge = (direction) => {
    const el = trackRef.current;

    if (loop && direction < 0 && el.scrollLeft < STEP) {
      el.scrollLeft += el.scrollWidth / 2;
    }
    el.scrollBy({ left: direction * STEP, behavior: "smooth" });
  };

  const pause = () => {
    paused.current = true;
  };
  const resume = () => {
    paused.current = false;
  };

  const closeDetails = () => setSelected(null);
  const editFromDetails = (project) => {
    setSelected(null);
    onEdit(project);
  };

  if (isLoading) return <Skeleton className="h-52 rounded-xl" />;

  if (projects.length === 0) {
    return (
      <Card className="flex items-center justify-between gap-4 border-dashed p-5">
        <div className="flex items-center gap-3">
          <FolderOpen size={18} className="text-ink-faint" />
          <p className="text-sm text-ink-muted">No other projects yet.</p>
        </div>
        <Button variant="secondary" size="sm" onClick={onAdd}>
          Add project
        </Button>
      </Card>
    );
  }

  return (
    <>
      <section
        onPointerEnter={pause}
        onPointerLeave={resume}
        onFocus={pause}
        onBlur={resume}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">
            Other Projects
            <span className="ml-2 font-mono text-xs font-normal text-ink-muted">
              {projects.length}
            </span>
          </h2>

          {overflowing && (
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                aria-label="Scroll left"
                onClick={() => nudge(-1)}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                aria-label="Scroll right"
                onClick={() => nudge(1)}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </div>

        <div
          ref={trackRef}
          className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,#000_4%,#000_96%,transparent)]"
        >
          {items.map((project, i) => (
            <div
              key={`${project._id}-${i}`}
              className="shrink-0 pr-4"
              aria-hidden={i >= projects.length && loop ? true : undefined}
            >
              <ProjectCard
                project={project}
                onOpen={setSelected}
                onEdit={onEdit}
                clone={loop && i >= projects.length}
              />
            </div>
          ))}
        </div>
      </section>

      <ProjectDetailModal
        open={Boolean(selected)}
        project={selected}
        onClose={closeDetails}
        onEdit={editFromDetails}
      />
    </>
  );
}

export default ProjectCarousel;