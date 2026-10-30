import { useState } from "react";
import { Building2 } from "lucide-react";

const SIZES = {
  sm: { box: "h-8 w-8", icon: 16 },
  md: { box: "h-10 w-10", icon: 20 },
};

// Shows the company logo, falling back to a building icon if missing or broken.
function CompanyLogo({ company, size = "md" }) {
  const [failedSrc, setFailedSrc] = useState(null);

  const src = company?.logo;
  const showImage = Boolean(src) && failedSrc !== src;
  const { box, icon } = SIZES[size];

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg ${box} ${
        showImage ? "bg-white p-1" : "bg-surface-raised text-ink-faint"
      }`}
    >
      {showImage ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => setFailedSrc(src)}
          className="h-full w-full object-contain"
        />
      ) : (
        <Building2 size={icon} />
      )}
    </div>
  );
}

export default CompanyLogo;