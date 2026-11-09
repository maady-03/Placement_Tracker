import { Wrench } from "lucide-react";
import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";

const CATEGORIES = [
  { key: "Tech", pill: "bg-status-applied/15 text-status-applied" },
  { key: "Outreach", pill: "bg-status-offer/15 text-status-offer" },
  { key: "Design", pill: "bg-status-interview/15 text-status-interview" },
  { key: "Other", pill: "bg-status-neutral/15 text-status-neutral" },
];

const KNOWN = new Set(CATEGORIES.map(({ key }) => key));

// Unknown categories fall into "Other"; empty groups are hidden.
function groupSkills(skills) {
  const groups = new Map(CATEGORIES.map(({ key }) => [key, []]));

  for (const skill of skills) {
    groups.get(KNOWN.has(skill.category) ? skill.category : "Other").push(skill);
  }

  return CATEGORIES.map((category) => ({
    ...category,
    items: groups.get(category.key),
  })).filter((group) => group.items.length > 0);
}

function SkillsMatrix({ skills = [], isLoading }) {
  if (isLoading) {
    return (
      <Card className="p-5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-5 h-20 w-full" />
      </Card>
    );
  }

  const groups = groupSkills(skills);

  return (
    <Card as="section" className="p-5 sm:p-6">
      <h2 className="text-sm font-semibold text-ink">Skills</h2>

      {groups.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title="No skills yet"
          description="Add skills to show what you work with."
        />
      ) : (
        <div className="mt-5 space-y-5">
          {groups.map(({ key, pill, items }) => (
            <div key={key}>
              <p className="mb-2.5 text-xs text-ink-muted">
                {key}
                <span className="ml-2 font-mono text-ink-faint">{items.length}</span>
              </p>

              <div className="flex flex-wrap gap-2">
                {items.map((skill, i) => (
                  <span
                    key={`${skill.name}-${i}`}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${pill}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default SkillsMatrix;