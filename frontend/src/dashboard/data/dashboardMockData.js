// Static stand-in for a future `GET /api/dashboard` response.
// Every UI component below reads its data through props, so swapping
// this file for a real fetch later should not require touching the
// component code.

export const dashboardData = {
  meta: {
    studentName: "Manas",
    lastUpdated: "Updated just now",
  },

  readiness: {
    overall: 72,
    summary: "Steady progress. Focus on DSA and applications this week.",
    categories: [
      { name: "DSA", value: 68 },
      { name: "Development", value: 81 },
      { name: "Competitive Programming", value: 54 },
      { name: "Applications", value: 63 },
      { name: "Interviews", value: 70 },
    ],
  },

  stats: {
    dsaSolved: 247,
    weeklySolved: 18,
    applications: 32,
    interviews: 5,
    offers: 1,
  },

  dsaProgress: [
    { week: "W1", solved: 12 },
    { week: "W2", solved: 18 },
    { week: "W3", solved: 15 },
    { week: "W4", solved: 23 },
    { week: "W5", solved: 19 },
    { week: "W6", solved: 27 },
    { week: "W7", solved: 24 },
    { week: "W8", solved: 31 },
  ],

  applicationPipeline: {
    applied: 32,
    oa: 14,
    interview: 7,
    offer: 1,
  },

  weeklyGoals: [
    { id: "goal-dsa", name: "DSA", completed: 18, target: 25 },
    { id: "goal-applications", name: "Applications", completed: 4, target: 5 },
    { id: "goal-development", name: "Development", completed: 3, target: 4 },
  ],

  upcoming: [
    { id: "event-001", title: "DSA Contest", type: "contest", date: "Tomorrow", time: null },
    { id: "event-002", title: "Mock Interview", type: "interview", date: "Friday", time: "3:00 PM" },
    { id: "event-003", title: "Resume Review", type: "review", date: "Saturday", time: "11:00 AM" },
  ],

  recentActivity: [
    { id: "activity-001", title: "Solved Binary Tree Problem", type: "dsa", timestamp: "2 hours ago" },
    { id: "activity-002", title: "Applied to Amazon", type: "application", timestamp: "Yesterday" },
    { id: "activity-003", title: "Completed Authentication Module", type: "development", timestamp: "2 days ago" },
    { id: "activity-004", title: "Mock Interview Completed", type: "interview", timestamp: "3 days ago" },
  ],

  journey: [
    { id: "foundation", name: "Foundation", status: "completed" },
    { id: "dsa", name: "DSA", status: "completed" },
    { id: "development", name: "Development", status: "current" },
    { id: "applications", name: "Applications", status: "upcoming" },
    { id: "interviews", name: "Interviews", status: "upcoming" },
    { id: "offer", name: "Offer", status: "upcoming" },
  ],
};
