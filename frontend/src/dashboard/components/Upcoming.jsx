function Upcoming({ data }) {
  return (
    <div className="dashboard-card dashboard-upcoming-card rounded-lg border border-[var(--dsh-border)] bg-[var(--dsh-surface)] p-6">
      <div className="text-[11px] font-semibold tracking-[2px] uppercase text-[var(--dsh-muted)] mb-4">
        Upcoming
      </div>

      {data.length === 0 ? (
        <p className="text-[13px] text-[var(--dsh-muted)]">
          Nothing scheduled yet.
        </p>
      ) : (
        <div className="flex flex-col">
          {data.map((event, index) => (
            <div
              key={event.id}
              className={`flex items-center justify-between py-2.5 ${
                index > 0 ? "border-t border-[var(--dsh-border)]" : ""
              }`}
            >
              <div>
                <div className="text-[13px] font-medium text-[var(--dsh-ink)]">
                  {event.title}
                </div>
                <div className="text-[11.5px] text-[var(--dsh-muted)] mt-0.5">
                  {event.date}
                  {event.time ? ` · ${event.time}` : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Upcoming;
