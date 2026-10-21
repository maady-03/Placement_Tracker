const VARIANTS = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary: "border border-line bg-surface text-ink hover:bg-surface-raised",
  ghost: "text-ink-muted hover:bg-surface-raised hover:text-ink",
  danger:
    "bg-status-rejected/15 text-status-rejected hover:bg-status-rejected/25",
};

const SIZES = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
};

function Button({
  as: Tag = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const typeProp = Tag === "button" ? { type: "button" } : {};

  return (
    <Tag
      {...typeProp}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Button;
