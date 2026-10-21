function Card({ as: Tag = "div", className = "", children, ...props }) {
  return (
    <Tag
      className={`rounded-xl border border-line bg-surface ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Card;