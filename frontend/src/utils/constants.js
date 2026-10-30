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

export const PLATFORMS = {
  leetcode: {
    label: "LeetCode",
    badge: "bg-status-oa/15 text-status-oa",
    block: "border-status-oa bg-status-oa/15",
  },
  codeforces: {
    label: "Codeforces",
    badge: "bg-status-applied/15 text-status-applied",
    block: "border-status-applied bg-status-applied/15",
  },
  codechef: {
    label: "CodeChef",
    badge: "bg-status-interview/15 text-status-interview",
    block: "border-status-interview bg-status-interview/15",
  },
  gfg: {
    label: "GeeksforGeeks",
    badge: "bg-status-offer/15 text-status-offer",
    block: "border-status-offer bg-status-offer/15",
  },
};