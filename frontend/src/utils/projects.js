export const TECH_CATEGORIES = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "deployment", label: "Deployment" },
  { key: "other", label: "Other" },
];

// Returns only the non-empty groups. A legacy flat array is shown under "Other".
export const toTechGroups = (techStack) => {
  const source = Array.isArray(techStack) ? { other: techStack } : techStack ?? {};

  return TECH_CATEGORIES.map(({ key, label }) => ({
    key,
    label,
    items: source[key] ?? [],
  })).filter((group) => group.items.length > 0);
};