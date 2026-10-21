import { Building2, Globe, MapPin, Factory } from "lucide-react";
import Card from "../ui/Card";
import { toHref } from "../../utils/format";

function InfoRow({ icon: Icon, children }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <Icon size={16} className="mt-0.5 shrink-0 text-ink-faint" />
      <div className="min-w-0 break-words text-ink-muted">{children}</div>
    </div>
  );
}
function CompanyInfoCard({ company }) {
  if (!company) return null;

  const { name, website, location, industry } = company;

  return (
    <Card as="section" className="p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Building2 size={20} />
        </div>
        <h2 className="min-w-0 truncate text-sm font-semibold text-ink">
          {name}
        </h2>
      </div>

      {(location || industry || website) && (
        <div className="mt-5 space-y-3">
          {location && <InfoRow icon={MapPin}>{location}</InfoRow>}
          {industry && <InfoRow icon={Factory}>{industry}</InfoRow>}
          {website && (
            <InfoRow icon={Globe}>
              <a
                href={toHref(website)}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                {website}
              </a>
            </InfoRow>
          )}
        </div>
      )}
    </Card>
  );
}

export default CompanyInfoCard;