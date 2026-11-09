// src/pages/ProfilePreview.jsx
import { useEffect, useState } from "react";
import {
  Code2,
  ExternalLink,
  Globe,
  GraduationCap,
  Trophy,
  Wrench,
} from "lucide-react";
import { getProfilePreview } from "../api/profile";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";
import { toHref } from "../utils/format";
import { toTechGroups } from "../utils/projects";

const LINKS = [
  { key: "github", label: "GitHub", icon: Code2 },
  { key: "portfolio", label: "Portfolio", icon: Globe },
];

const groupSkills = (skills = []) => {
  const groups = {};
  for (const { name, category } of skills) {
    (groups[category || "Other"] ??= []).push(name);
  }
  return Object.entries(groups);
};

function BigStat({ label, value, hint, className = "" }) {
  return (
    <Card className={`relative isolate overflow-hidden p-5 ${className}`}>
      <div className="absolute -right-10 -top-10 -z-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
      <p className="text-xs font-medium text-ink-muted">{label}</p>
      <p className="mt-3 font-mono text-4xl font-semibold tracking-tight text-ink">
        {value ?? 0}
      </p>
      {hint && <p className="mt-1 text-xs text-ink-faint">{hint}</p>}
    </Card>
  );
}

function Funnel({ journey }) {
  const total = journey?.totalApplications ?? 0;
  const steps = [
    { label: "Applications", value: total, bar: "bg-status-applied" },
    { label: "Reached OA", value: journey?.reachedOA ?? 0, bar: "bg-status-oa" },
    {
      label: "Interviews",
      value: journey?.reachedInterview ?? 0,
      bar: "bg-status-interview",
    },
    { label: "Offers", value: journey?.offers ?? 0, bar: "bg-status-offer" },
  ];

  return (
    <Card className="p-5 md:col-span-4">
      <h2 className="text-sm font-semibold text-ink">Placement Journey</h2>
      <div className="mt-4 space-y-3">
        {steps.map(({ label, value, bar }) => {
          const pct = total ? (value / total) * 100 : 0;
          return (
            <div key={label} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-xs text-ink-muted">{label}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-raised">
                <div
                  className={`h-full rounded-full ${bar}`}
                  style={{ width: `${value > 0 ? Math.max(pct, 4) : 0}%` }}
                />
              </div>
              <span className="w-6 text-right font-mono text-sm text-ink">{value}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function ProjectTile({ project, featured = false }) {
  const techs = toTechGroups(project.techStack).flatMap((group) => group.items);

  return (
    <Card
      className={`flex flex-col overflow-hidden ${featured ? "md:col-span-4" : "md:col-span-2"}`}
    >
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={`${project.title} preview`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className={`w-full border-b border-line object-cover ${
            featured ? "aspect-[21/9]" : "aspect-video"
          }`}
        />
      )}

      <div className="flex flex-1 flex-col p-5">
        {featured && (
          <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-medium text-accent">
            <Trophy size={11} />
            Major Project
          </span>
        )}
        <h3 className="text-sm font-semibold text-ink">{project.title}</h3>
        <p
          className={`mt-1.5 text-sm leading-relaxed text-ink-muted ${
            featured ? "line-clamp-3" : "line-clamp-2"
          }`}
        >
          {project.description}
        </p>

        {techs.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {techs.slice(0, featured ? 8 : 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-surface-raised px-2.5 py-0.5 text-[11px] text-ink-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center gap-4 pt-4 text-xs">
          {project.liveUrl ? (
            <a
              href={toHref(project.liveUrl)}
              target="_blank"
              rel="noreferrer"
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
          {project.githubUrl && (
            <a
              href={toHref(project.githubUrl)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-ink-muted hover:text-ink"
            >
              <Code2 size={13} />
              Code
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}

function ProfilePreview() {
  const [state, setState] = useState({ data: null, error: "" });

  useEffect(() => {
    let cancelled = false;

    getProfilePreview()
      .then((data) => !cancelled && setState({ data, error: "" }))
      .catch(
        (err) =>
          !cancelled &&
          setState({ data: null, error: err?.message || "Could not load preview." })
      );

    return () => {
      cancelled = true;
    };
  }, []);

  const { data, error } = state;

  if (error) {
    return <Card className="p-5 text-sm text-status-rejected">{error}</Card>;
  }

  if (!data) {
    return (
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Skeleton className="h-[480px] rounded-xl" />
        <Skeleton className="h-[480px] rounded-xl" />
      </div>
    );
  }

  const { user, dsaSummary, placementJourney, projects = [] } = data;
  const profile = user.profile ?? {};
  const links = LINKS.filter(({ key }) => profile.links?.[key]?.trim());
  const skillGroups = groupSkills(profile.skills);
  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "U";

  const featured = projects.find((p) => p.isFeatured) ?? projects[0] ?? null;
  const others = projects.filter((p) => p._id !== featured?._id);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[320px_1fr]">
      {/* Fixed profile panel */}
      <Card
        as="aside"
        className="relative isolate overflow-hidden p-6 lg:sticky lg:top-6"
      >
        <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-accent/15 to-transparent" />

        <div className="flex flex-col items-center text-center">
          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-accent/60 bg-surface-raised text-3xl font-semibold text-ink-muted">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          <h1 className="mt-4 text-xl font-semibold tracking-tight text-ink">
            {user.firstName} {user.lastName}
          </h1>

          {profile.about && (
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{profile.about}</p>
          )}
        </div>

        {links.length > 0 && (
          <div className="mt-5 flex justify-center gap-2">
            {links.map(({ key, label, icon: Icon }) => (
              <a
                key={key}
                href={toHref(profile.links[key])}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-raised px-3 py-1.5 text-xs text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </div>
        )}

        <div className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
          {profile.college && (
            <div className="flex items-start gap-2.5 text-ink-muted">
              <GraduationCap size={16} className="mt-0.5 shrink-0 text-ink-faint" />
              <span>
                {profile.college}
                {profile.branch && (
                  <span className="block text-xs text-ink-faint">{profile.branch}</span>
                )}
              </span>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              ["Class of", profile.graduationYear],
              ["CGPA", profile.cgpa],
              ["Backlogs", profile.backlogs],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-line bg-surface-raised px-2 py-2 text-center"
              >
                <p className="font-mono text-sm font-semibold text-ink">{value ?? "-"}</p>
                <p className="mt-0.5 text-[10px] text-ink-faint">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Bento grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <BigStat
          label="Problems solved"
          value={dsaSummary?.totalSolved}
          hint="Across all linked platforms"
          className="md:col-span-2"
        />
        <BigStat
          label="LeetCode rating"
          value={dsaSummary?.leetcodeRating}
          hint="Current contest rating"
          className="md:col-span-2"
        />

        <Funnel journey={placementJourney} />

        {skillGroups.length > 0 && (
          <Card className="p-5 md:col-span-4">
            <h2 className="text-sm font-semibold text-ink">Skills</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {skillGroups.map(([category, names]) => (
                <div key={category}>
                  <p className="mb-2 text-xs text-ink-faint">{category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {names.map((name) => (
                      <span
                        key={name}
                        className="rounded-full border border-line bg-surface-raised px-3 py-1 text-xs text-ink-muted"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {featured && <ProjectTile project={featured} featured />}
        {others.map((project) => (
          <ProjectTile key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProfilePreview;