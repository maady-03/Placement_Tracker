// Status keys match the backend's `byStatus` keys and application `status` values.
export const STATUSES = {
  wishlist: {
    label: "Wishlist",
    badge: "bg-status-neutral/15 text-status-neutral",
  },
  applied: {
    label: "Applied",
    badge: "bg-status-applied/15 text-status-applied",
  },
  oa: {
    label: "OA",
    badge: "bg-status-oa/15 text-status-oa",
  },
  interview: {
    label: "Interview",
    badge: "bg-status-interview/15 text-status-interview",
  },
  offer: {
    label: "Offer",
    badge: "bg-status-offer/15 text-status-offer",
  },
  rejected: {
    label: "Rejected",
    badge: "bg-status-rejected/15 text-status-rejected",
  },
  withdrawn: {
    label: "Withdrawn",
    badge: "bg-status-neutral/15 text-status-neutral",
  },
};

export const STATUS_KEYS = Object.keys(STATUSES);

export const APPLICATION_TYPES = {
  internship: "Internship",
  "full-time": "Full-time",
};