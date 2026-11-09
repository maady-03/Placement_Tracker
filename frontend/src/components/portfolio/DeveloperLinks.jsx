// src/components/portfolio/DeveloperLinks.jsx
import { useState } from "react";
import { Code2, Globe, Pencil } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "../../api/profile";
import Card from "../ui/Card";
import Button from "../ui/Button";
import LinksEditor from "./LinksEditor";
import { toHref } from "../../utils/format";

const LINKS = [
  { key: "github", label: "GitHub", icon: Code2 },
  { key: "portfolio", label: "Portfolio", icon: Globe },
];

function DeveloperLinks() {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);

  const links = user?.profile?.links ?? {};
  const filled = LINKS.filter(({ key }) => links[key]?.trim());

  const handleSave = async (nextLinks) => {
    const res = await updateProfile({ links: nextLinks });
    setUser(res.user);
    setEditing(false);
  };

  return (
    <Card as="section" className="p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-ink">Developer Links</h2>
        <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
          <Pencil size={14} />
          Edit links
        </Button>
      </div>

      {filled.length === 0 ? (
        <p className="mt-4 text-sm text-ink-muted">
          No links yet. Click "Edit links" to add them.
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-3">
          {filled.map(({ key, label, icon: Icon }) => (
            <a
              key={key}
              href={toHref(links[key])}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface-raised px-4 py-2 text-sm text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
        </div>
      )}

      <LinksEditor
        open={editing}
        links={links}
        onClose={() => setEditing(false)}
        onSave={handleSave}
      />
    </Card>
  );
}

export default DeveloperLinks;