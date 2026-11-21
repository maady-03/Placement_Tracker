# Project Revision & Explanation Handbook
## PlacementTracker — Full-Stack Placement Preparation Platform
**Date:** November 19, 2026  
**Author:** Manas Verma

---

\newpage

# Table of Contents

1. [Project Snapshot](#1-project-snapshot)
2. [Problem Statement & Objective](#2-problem-statement--objective)
3. [Tech Stack & Features Table](#3-tech-stack--features-table)
4. [Architecture & Folder Structure](#4-architecture--folder-structure)
5. [File-by-File / Module-by-Module Walkthrough](#5-file-by-file--module-by-module-walkthrough)
6. [Core Logic / Algorithm Explained Simply](#6-core-logic--algorithm-explained-simply)
7. [Database / API Reference](#7-database--api-reference)
8. [Challenges & Solutions](#8-challenges--solutions)
9. [STAR-Method Explanations](#9-star-method-explanations)
10. [Viva / Interview Q&A Bank](#10-viva--interview-qa-bank)
11. [Revision Cheat Sheet](#11-revision-cheat-sheet)
12. [Limitations & Future Scope](#12-limitations--future-scope)

---

\newpage

# 1. Project Snapshot

| Aspect | Detail |
|--------|--------|
| **What it does** | A full-stack web app that helps students track job/internship applications, aggregate DSA statistics from 4 coding platforms, discover upcoming contests, manage portfolio projects, and build a placement-ready profile — all in one dashboard. |
| **Who it's for** | College students preparing for campus placements and off-campus hiring. |
| **Problem solved** | Students juggle spreadsheets, multiple coding-platform tabs, and scattered notes. This centralizes everything into a single, beautiful dashboard. |
| **Tech used** | React 19 + Vite + Tailwind CSS v4 (frontend), Express 5 + Mongoose + MongoDB (backend), JWT cookie auth, external APIs (LeetCode GraphQL, Codeforces, CodeChef, GFG). |
| **Key outcome** | A production-grade MERN application with 15+ pages, 30+ REST endpoints, real-time DSA sync from 4 platforms, in-memory caching, and an animated step-by-step onboarding flow. |

---

\newpage

# 2. Problem Statement & Objective

## The Problem
During placement season, students face:
- **Tracking chaos:** Applications spread across emails, WhatsApp, and spreadsheets with no status history.
- **DSA fragmentation:** Progress scattered across LeetCode, Codeforces, CodeChef, and GFG with no unified view.
- **Missed deadlines:** No single place to see upcoming application deadlines and contest schedules.
- **Portfolio disorganization:** No structured way to showcase projects with tech stacks and links.

## The Objective
Build a **single-dashboard solution** that:
1. Tracks every application through its lifecycle (wishlist → applied → OA → interview → offer/rejected).
2. Auto-fetches and aggregates DSA stats (problems solved, streaks, difficulty breakdown, topic analysis) from 4 platforms.
3. Shows upcoming coding contests from Codeforces, LeetCode, and CodeChef.
4. Manages portfolio projects with categorized tech stacks and featured-project highlighting.
5. Provides a clean profile with skills, links, and academic details.

---

\newpage

# 3. Tech Stack & Features Table

## Backend Stack

| Technology | Where Used | Why Chosen | Alternative |
|-----------|-----------|-----------|-------------|
| **Node.js** | Runtime for entire backend | Non-blocking I/O ideal for aggregating multiple external APIs concurrently | Deno, Python/Flask |
| **Express 5** | `app.js` — route mounting, middleware pipeline | Lightweight, mature, huge ecosystem | Fastify, Koa |
| **MongoDB** | All data storage (users, applications, companies, DSA profiles, projects) | Flexible schema for varied platform data; nested sub-documents for DSA snapshots | PostgreSQL |
| **Mongoose 9** | All `models/*.js` — schema definitions, validation, instance methods | Schema enforcement on top of MongoDB; built-in validation, virtuals, methods | Prisma, native MongoDB driver |
| **JWT (jsonwebtoken)** | `userAuth.js`, `userSchema.js` — authentication tokens | Stateless auth via HTTP-only cookies; no session store needed | Passport.js, express-session |
| **bcrypt** | `authService.js`, `userSchema.js` — password hashing | Industry-standard adaptive hashing with salt rounds | Argon2 |
| **Multer** | `upload.js`, `uploadController.js` — avatar/image uploads | De-facto Express file-upload middleware; disk storage with size limits | Busboy, Formidable |
| **cookie-parser** | `app.js` — parse JWT from cookies | Simple cookie parsing for token extraction | Manual `req.headers.cookie` parsing |
| **cors** | `app.js` — cross-origin requests from `localhost:5173` | Required for frontend-backend on separate ports | Manual CORS headers |
| **dotenv** | `index.js` — environment variable loading | Keep secrets (DB URI, JWT secret) out of code | Node 20+ `--env-file` flag |
| **validator** | `utils/validator.js` — input sanitization | Pre-built checks for email, URL, strong passwords | Joi, Zod |

## Frontend Stack

| Technology | Where Used | Why Chosen | Alternative |
|-----------|-----------|-----------|-------------|
| **React 19** | Entire UI layer | Component-based, hooks for state management, huge community | Vue.js, Svelte |
| **Vite 8** | Build tool, dev server | Near-instant HMR, ESM-native, no Webpack complexity | Webpack, Turbopack |
| **Tailwind CSS v4** | All styling | Utility-first, no context switching to CSS files, tiny production bundle | Styled Components, plain CSS |
| **React Router v7** | `App.jsx` — client-side routing with nested layouts | Declarative routing, nested `<Outlet>` for layouts, `useParams`/`useNavigate` | TanStack Router |
| **Framer Motion** | `Onboarding.jsx`, landing page — animations | Declarative React animations with `AnimatePresence` for exit transitions | React Spring |
| **Recharts** | `DifficultyChart`, `TopicChart`, `ActivityHeatmap` — data visualizations | Built for React; composable chart components | Chart.js, D3 |
| **Axios** | ⚠️ verify: `axios` is in `package.json` but `apiClient.js` uses native `fetch`. Likely unused or used elsewhere. | HTTP client library | Native `fetch` (which is actually used) |
| **Lucide React** | All icons across the app | Tree-shakeable SVG icons; lighter than FontAwesome | Heroicons, React Icons |
| **Lenis** | `SmoothScroll.jsx` — smooth scrolling on landing page | Butter-smooth scroll experience | CSS `scroll-behavior: smooth` |
| **Three.js** | ⚠️ verify: In `package.json` but usage location unclear — likely `HeroShowcase.jsx` for 3D landing visuals. | 3D graphics in the browser | None (unique feature) |

## Key Features

| Feature | Frontend Component | Backend Endpoint |
|---------|-------------------|-----------------|
| JWT Cookie Auth | `AuthContext`, `Login`, `Register` | `POST /login`, `POST /register`, `POST /logout` |
| Step-by-Step Onboarding | `Onboarding.jsx` (animated multi-step form) | `PUT /api/profile` |
| Application Tracking | `Applications`, `ApplicationForm`, `StatusTimeline` | `CRUD /api/applications`, `PATCH /:id/status` |
| Company Management | `Companies`, `CompanyModal`, `CompanyCard` | `CRUD /api/companies` |
| DSA Stats Aggregation | `DsaStats`, `PlatformCard`, `ActivityHeatmap` | `GET /api/dsa/stats`, `POST /api/dsa/sync` |
| Contest Calendar | `Contests`, `ContestCalendar`, `UpcomingContests` | `GET /api/contests/upcoming` |
| Portfolio Projects | `Skills`, `ProjectCarousel`, `ProjectModal` | `CRUD /api/projects` |
| Dashboard Overview | `Dashboard`, `StatCard`, `UpcomingDeadlines` | `GET /api/dashboard/stats` |
| Profile & Avatar Upload | `Settings`, `ProfilePreview` | `PUT /api/profile`, `POST /api/upload/avatar` |

---

\newpage

# 4. Architecture & Folder Structure

## Annotated Folder Tree

```
DiwaliBOOM/
├── backend/
│   ├── index.js                    # Entry point: loads env, connects DB, starts server on port 3000
│   ├── app.js                      # Express app: mounts middleware + all route modules
│   ├── package.json                # Backend dependencies (express, mongoose, bcrypt, jwt, multer)
│   ├── .env                        # DB_URI, JWT_SECRET, LOGO_DEV_TOKEN (secrets)
│   ├── public/uploads/             # Uploaded avatar images stored on disk
│   └── src/
│       ├── config/
│       │   └── database.js         # mongoose.connect() using DB_URI env variable
│       ├── middleware/
│       │   ├── userAuth.js         # JWT cookie verification → attaches req.user
│       │   ├── upload.js           # Multer config: disk storage, image filter, 5MB limit
│       │   └── errorHandler.js     # Central error handler: ApiError → JSON, else 500
│       ├── models/
│       │   ├── userSchema.js       # User model: profile, skills, links, auth methods
│       │   ├── applicationSchema.js # Application model: status enum, timeline array
│       │   ├── companySchema.js    # Company model: unique per user, auto-logo generation
│       │   ├── dsaProfileSchema.js # DSA profile: 4 platform snapshots + activity heatmap
│       │   └── projectSchema.js    # Project model: categorized techStack, featured flag
│       ├── controllers/            # Thin controllers: parse req → call service → send res
│       │   ├── authController.js   # register, login, logout handlers
│       │   ├── applicationController.js  # CRUD + status change + roles list
│       │   ├── companyController.js      # CRUD for companies
│       │   ├── dashboardController.js    # Aggregated dashboard stats
│       │   ├── dsaController.js          # DSA platform CRUD, sync, daily challenge
│       │   ├── profileController.js      # Get/update user profile
│       │   ├── projectController.js      # CRUD for portfolio projects
│       │   ├── uploadController.js       # Avatar image upload
│       │   └── contestController.js      # Upcoming contests from 3 platforms
│       ├── services/               # Business logic layer (testable without Express)
│       │   ├── authService.js      # Register (hash + validate), login (verify + token)
│       │   ├── applicationService.js  # Application CRUD with pagination + search
│       │   ├── companyService.js      # Company CRUD with app-count aggregation
│       │   ├── dashboardService.js    # MongoDB aggregation for status breakdown
│       │   ├── dsaStatsService.js     # Core: syncs 4 platforms, computes streaks
│       │   ├── profileService.js      # Profile get/merge-update
│       │   ├── projectService.js      # Project CRUD with featured-toggle logic
│       │   └── platforms/             # External API integrations
│       │       ├── leetcodeService.js    # LeetCode GraphQL: stats + calendar + topics
│       │       ├── codeforcesService.js  # Codeforces REST: 3 parallel API calls
│       │       ├── codechefService.js    # CodeChef HTML scraping with regex
│       │       └── gfgService.js         # GFG REST API for profile stats
│       ├── routes/                 # Route definitions (Express Router)
│       │   ├── auth.js             # POST /register, /login, /logout
│       │   ├── applicationRoutes.js # CRUD + /roles + PATCH /:id/status
│       │   ├── companyRoutes.js    # CRUD /api/companies
│       │   ├── dashboardRoutes.js  # GET /api/dashboard/stats
│       │   ├── dsaRoutes.js        # DSA platform management + sync + contests
│       │   ├── profileRoutes.js    # GET/PUT /api/profile
│       │   ├── projectRoutes.js    # CRUD /api/projects
│       │   ├── uploadRoutes.js     # POST /api/upload/avatar
│       │   └── contestRoutes.js    # GET /api/contests/upcoming
│       └── utils/
│           ├── ApiError.js         # Custom error class with statusCode
│           ├── asyncHandler.js     # Wraps async route handlers to catch errors
│           ├── cache.js            # In-memory Map-based cache with TTL
│           ├── fetchWithTimeout.js # fetch() wrapper with timeout + retry + User-Agent
│           ├── validator.js        # Registration input validation
│           ├── applicationValidator.js  # Application field validation
│           ├── companyValidator.js      # Company field validation
│           ├── profileValidator.js      # Profile field validation
│           ├── projectValidator.js      # Project field validation
│           └── constants.js        # Shared constants
│
├── frontend/
│   ├── index.html                  # Single HTML entry point for Vite SPA
│   ├── vite.config.js              # Vite configuration with React plugin
│   ├── package.json                # Frontend dependencies (react, tailwind, recharts, etc.)
│   └── src/
│       ├── main.jsx                # React root render
│       ├── App.jsx                 # Route tree with nested layouts
│       ├── App.css / index.css     # Global and Tailwind base styles
│       ├── context/
│       │   └── AuthContext.jsx     # Auth state provider: user, login, logout, session restore
│       ├── api/
│       │   ├── apiClient.js        # Centralized fetch wrapper with error handling + 401 interception
│       │   ├── config.js           # API_URL constant (http://localhost:3000)
│       │   ├── applications.js     # Application API functions
│       │   ├── companies.js        # Company API functions
│       │   ├── dashboard.js        # Dashboard stats API
│       │   ├── dsa.js              # DSA stats/sync/platforms API
│       │   ├── profile.js          # Profile API functions
│       │   ├── projects.js         # Projects API functions
│       │   └── contests.js         # Contests API functions
│       ├── hooks/                  # Custom React hooks (data fetching + state)
│       │   ├── useAuth.js          # Consumes AuthContext
│       │   ├── useApplications.js  # Fetch + paginate applications
│       │   ├── useApplication.js   # Fetch single application
│       │   ├── useCompanies.js     # Fetch companies with search
│       │   ├── useCompany.js       # Fetch single company
│       │   ├── useDashboardStats.js # Fetch dashboard aggregation
│       │   ├── useDsaStats.js      # Fetch DSA stats + sync action
│       │   ├── useProjects.js      # Fetch user projects
│       │   ├── useRoles.js         # Fetch distinct application roles
│       │   ├── useUpcomingContests.js # Fetch upcoming contests
│       │   ├── useRecentSubmissions.js # Fetch recent coding submissions
│       │   └── useDebounce.js      # Debounce hook for search inputs
│       ├── pages/                  # 13 page-level components
│       │   ├── Dashboard.jsx       # Overview: stat cards + recent apps + deadlines
│       │   ├── Applications.jsx    # List/filter/search applications
│       │   ├── NewApplication.jsx  # Create application form
│       │   ├── ApplicationDetail.jsx # View app details + status timeline
│       │   ├── EditApplication.jsx # Edit application form
│       │   ├── Companies.jsx       # Company list with search
│       │   ├── CompanyDetail.jsx   # Company info + associated applications
│       │   ├── DsaStats.jsx        # DSA dashboard: heatmap, charts, platform cards
│       │   ├── Contests.jsx        # Contest calendar + upcoming list
│       │   ├── Skills.jsx          # Portfolio: projects + skills matrix
│       │   ├── Settings.jsx        # Profile settings + avatar upload
│       │   ├── ProfilePreview.jsx  # Public-facing profile view
│       │   └── Onboarding.jsx      # Animated multi-step profile setup
│       ├── auth/
│       │   ├── Login.jsx           # Login form with validation
│       │   ├── Register.jsx        # Registration form with validation
│       │   └── Auth.css            # Auth page styles
│       ├── landing/                # Public landing page sections
│       │   ├── Landing.jsx         # Assembles all landing sections
│       │   ├── Navbar.jsx          # Top navigation bar
│       │   ├── Hero.jsx            # Hero section with CTA
│       │   ├── HeroShowcase.jsx    # 3D/visual showcase (uses Three.js)
│       │   ├── Features.jsx        # Feature highlights
│       │   ├── HowItWorks.jsx      # Step-by-step explanation
│       │   ├── PlacementJourney.jsx # Visual placement journey
│       │   ├── CTA.jsx             # Call-to-action section
│       │   └── Footer.jsx          # Footer
│       ├── layouts/
│       │   ├── AppLayout.jsx       # Sidebar + main content area layout
│       │   └── OnboardingLayout.jsx # Centered card layout for onboarding
│       ├── components/
│       │   ├── ProtectedRoute.jsx  # Redirects unauthenticated users to /login
│       │   ├── ProfileGate.jsx     # Redirects incomplete profiles to /onboarding
│       │   ├── SmoothScroll.jsx    # Lenis smooth-scroll wrapper
│       │   ├── BackToHome.jsx      # Back navigation button
│       │   ├── ui/                 # Reusable UI primitives
│       │   │   ├── Button.jsx, Card.jsx, Modal.jsx, Input.jsx
│       │   │   ├── Select.jsx, Badge.jsx, Skeleton.jsx
│       │   │   ├── EmptyState.jsx, CompanyLogo.jsx, Pagination.jsx
│       │   ├── layout/            # Layout components
│       │   │   ├── Sidebar.jsx, SidebarItem.jsx, MobileTopbar.jsx
│       │   ├── dashboard/         # Dashboard sub-components
│       │   │   ├── StatCard.jsx, RecentApplications.jsx, UpcomingDeadlines.jsx
│       │   ├── applications/      # Application sub-components
│       │   │   ├── ApplicationForm.jsx, ApplicationCard.jsx
│       │   │   ├── ApplicationFilters.jsx, ApplicationTable.jsx
│       │   │   ├── StatusTimeline.jsx, StatusChanger.jsx, CompanyInfoCard.jsx
│       │   ├── dsa/               # DSA sub-components
│       │   │   ├── ActivityHeatmap.jsx, DifficultyChart.jsx
│       │   │   ├── PlatformCard.jsx, PlatformsModal.jsx
│       │   │   ├── RecentSubmissions.jsx, TopicChart.jsx
│       │   ├── companies/         # Company sub-components
│       │   │   ├── CompaniesBanner.jsx, CompanyCard.jsx, CompanyModal.jsx
│       │   ├── contests/          # Contest sub-components
│       │   │   ├── ContestCalendar.jsx, UpcomingContests.jsx
│       │   └── portfolio/         # Portfolio sub-components
│       │       ├── SkillsMatrix.jsx, SkillsEditor.jsx
│       │       ├── LinksEditor.jsx, DeveloperLinks.jsx
│       │       ├── MajorProject.jsx, ProjectDetailModal.jsx
│       │       ├── ProjectCarousel.jsx, ProjectModal.jsx
│       └── utils/
│           ├── constants.js       # Frontend constants (status colors, etc.)
│           ├── profile.js         # isProfileComplete() helper
│           ├── format.js          # Date/number formatting utilities
│           ├── projects.js        # Project-related helpers
│           └── calendar.js        # Calendar/date utilities for contests
│
└── documentation/
    └── placement-tracker-design-blueprint.md  # Design document
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  React 19 +  │  │ React Router │  │   AuthContext +      │  │
│  │  Tailwind v4 │  │  v7 (SPA)    │  │   ProtectedRoute     │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
│         │                 │                      │              │
│  ┌──────┴─────────────────┴──────────────────────┴───────────┐  │
│  │              apiClient.js (fetch + credentials)           │  │
│  │              Sends HTTP-only JWT cookie automatically      │  │
│  └──────────────────────────┬────────────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────────┘
                              │ HTTP (port 5173 → 3000)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     EXPRESS 5 SERVER (:3000)                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Middleware Pipeline:                                      │ │
│  │  express.json() → cookieParser() → cors() → routes        │ │
│  │  → errorHandler()                                         │ │
│  └────────────────────────┬───────────────────────────────────┘ │
│                           │                                     │
│  ┌────────────┐  ┌────────┴───────┐  ┌──────────────────────┐  │
│  │   Routes   │→ │  Controllers   │→ │     Services         │  │
│  │  (9 files) │  │  (thin layer)  │  │  (business logic)    │  │
│  └────────────┘  └────────────────┘  └──────────┬───────────┘  │
│                                                  │              │
│         ┌────────────────────────────────────────┼──────┐       │
│         │                                        │      │       │
│         ▼                                        ▼      ▼       │
│  ┌──────────────┐  ┌────────────────────┐  ┌─────────────────┐ │
│  │  Mongoose    │  │  External APIs     │  │  In-Memory      │ │
│  │  Models (5)  │  │  (4 platforms +    │  │  Cache (Map)    │ │
│  │              │  │   logo.dev)        │  │  TTL-based      │ │
│  └──────┬───────┘  └────────────────────┘  └─────────────────┘ │
└─────────┼───────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────┐
│    MongoDB       │
│    (Atlas /      │
│     local)       │
└─────────────────┘
```

## Request Flow: User Checks DSA Stats

```
1. User clicks "DSA Statistics" in sidebar
       │
2. React Router renders <DsaStats> page
       │
3. useDsaStats() hook calls apiClient.get("/api/dsa/stats")
       │
4. apiClient sends GET with credentials: "include" (JWT cookie attached)
       │
5. Express receives request → cookieParser() extracts cookie
       │
6. userAuth middleware: jwt.verify(token) → finds User in DB → req.user = user
       │
7. dsaController.getStats() calls dsaStatsService.getStats(userId)
       │
8. Service checks: has profile been synced in last 6 hours?
       │  YES → return cached data    │  NO → trigger syncUser()
       │                               │
       │                    9. syncUser() fires Promise.allSettled()
       │                       across all linked platforms:
       │                       ├── leetcodeService.fetchStats()  → GraphQL POST
       │                       ├── codeforcesService.fetchStats() → 3 REST calls
       │                       ├── codechefService.fetchStats()  → HTML scraping
       │                       └── gfgService.fetchStats()       → REST GET
       │                               │
       │                    10. Merge activity data into heatmap
       │                        Save profile to MongoDB
       │
11. Service computes streaks (current + max), totals (solved, easy, medium, hard)
       │
12. Controller sends JSON response → apiClient parses it
       │
13. useDsaStats() updates state → React re-renders charts, cards, heatmap
```

---

\newpage

# 5. File-by-File / Module-by-Module Walkthrough

## 5.1 Backend Entry & Configuration

### `index.js` — Server Bootstrap
Loads environment variables, connects to MongoDB, then starts Express on port 3000. The `.then()` chain ensures the server only starts after a successful DB connection.

### `app.js` — Express Application
Assembles the Express middleware pipeline and mounts all 9 route modules. Key design decision: routes are mounted at specific prefixes (`/api/profile`, `/api/companies`, etc.) while auth routes sit at the root (`/`).

```javascript
// CORS configured for the Vite dev server origin, with credentials
// WHY: cookies need explicit origin (not "*") and credentials: true
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// All routes are protected by userAuth middleware INSIDE their
// route files, not here — keeping auth opt-in per route
app.use('/api/dsa', dsaRoutes);

// Central error handler MUST be last — Express identifies it by
// having 4 parameters (err, req, res, next)
app.use(errorHandler);
```

### `database.js` — MongoDB Connection
A one-liner: `mongoose.connect(process.env.DB_URI)`. The connection string comes from `.env` to keep credentials out of source code.

---

## 5.2 Authentication System

### `userSchema.js` — User Model
Defines the User with embedded `profile` sub-document (college, branch, skills, links, avatar). Two instance methods make auth clean:

```javascript
// WHY instance method: the token belongs to THIS user object,
// so it makes sense to call user.generateAuthToken()
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id, username: this.username, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }  // Token auto-expires after 24 hours
    );
};

// WHY async: bcrypt.compare is CPU-intensive (intentionally slow)
// and must not block the event loop
userSchema.methods.verifyPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
```

### `authService.js` — Registration & Login Logic
**Register:** Validates → checks duplicate email/username → hashes password with bcrypt (10 salt rounds) → creates user. Handles MongoDB `11000` duplicate-key errors gracefully.

**Login:** Accepts email OR username via `$or` query → verifies password → returns JWT.

```javascript
// WHY $or: lets users log in with either email or username
// without needing separate login flows
const user = await User.findOne({
    $or: [{ email: normalizedLoginId }, { username: normalizedLoginId }]
});
```

### `userAuth.js` — JWT Middleware
Extracts JWT from HTTP-only cookie, verifies it, finds the user in DB, and attaches `req.user`. Every protected route uses this middleware.

```javascript
// WHY cookies instead of Authorization header:
// HTTP-only cookies are immune to XSS — JavaScript cannot read them
const { token } = req.cookies;
const payload = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(payload._id);
req.user = user;
```

---

## 5.3 Application Tracking Module

### `applicationSchema.js` — Application Model
Core fields: `user` (ObjectId ref), `company` (ObjectId ref), `role`, `type` (internship/full-time), `status` (7-value enum), plus a `timeline` array that records every status change with timestamps.

```javascript
// WHY timeline array: provides a full audit trail of status changes
// so the user can see "Applied on Oct 1 → OA on Oct 10 → Interview on Oct 20"
timeline: [{
    status: { type: String, enum: APPLICATION_STATUS },
    date:   { type: Date, default: Date.now },
    note:   { type: String, maxlength: 500 },
}],
```

### `applicationService.js` — CRUD + Pagination
Key functions:
- `createApplication()`: Validates → ensures company belongs to user → creates with initial timeline entry.
- `listApplications()`: Builds dynamic query from filters (status, type, companyId, search) → paginates with skip/limit → returns `{ applications, pagination }`.
- `changeStatus()`: Validates new status → pushes to timeline → saves.

```javascript
// WHY escapeRegex: prevents Regex Denial of Service (ReDoS)
// A malicious search like ".*" would match everything or hang
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// WHY Promise.all: runs count and find in parallel for pagination
// Instead of waiting for find to finish before counting
const [applications, total] = await Promise.all([
    Application.find(query).populate('company').sort({ createdAt: -1 })
        .skip((currentPage - 1) * pageSize).limit(pageSize),
    Application.countDocuments(query),
]);
```

---

## 5.4 DSA Stats Aggregation (Core Feature)

### `dsaStatsService.js` — The Orchestrator
The most complex service. Three key functions:

**`syncUser(userId)`** — Fetches stats from all linked platforms in parallel:

```javascript
// WHY Promise.allSettled (not Promise.all): if LeetCode is down,
// we still want Codeforces data. allSettled never rejects — it
// reports each promise's outcome separately.
const results = await Promise.allSettled(promises);

// Merge activity from all platforms into one unified heatmap
const mergedActivityMap = {};
results.forEach(res => {
    if (res.status === 'fulfilled') {
        const { platform, data } = res.value;
        profile.platforms[platform] = data;
        if (data.activity) {
            data.activity.forEach(act => {
                // WHY: same date from different platforms → add counts
                mergedActivityMap[act.date] = (mergedActivityMap[act.date] || 0) + act.count;
            });
        }
    }
});
```

**`getStats(userId)`** — Returns stats with smart re-sync:
```javascript
// WHY 6-hour threshold: avoids hammering external APIs on every page load
// but ensures data is reasonably fresh
if (!profile.lastSyncedAt || (Date.now() - profile.lastSyncedAt > 6 * 60 * 60 * 1000)) {
    profile = await syncUser(userId);
}
```

Also computes **streak logic** — sorts activity by date, iterates to find consecutive days, and checks if the streak is still active (last submission was today or yesterday).

### `leetcodeService.js` — GraphQL Integration
Uses LeetCode's public GraphQL endpoint to fetch submit stats, submission calendar (heatmap), topic breakdown, and contest rating — all in a single query.

```javascript
// WHY GraphQL: LeetCode's REST API is limited; GraphQL lets us
// request exactly the fields we need in one round-trip
const query = `query getUserProfile($username: String!) {
    matchedUser(username: $username) {
        submitStats { acSubmissionNum { difficulty count } }
        submissionCalendar
        tagProblemCounts { ... }
    }
    userContestRanking(username: $username) { ... }
}`;
```

### `codeforcesService.js` — Parallel REST Calls
Fires 3 API calls simultaneously (`user.info`, `user.status`, `user.rating`), deduplicates solved problems using a `Set`, and builds the activity heatmap from submission timestamps.

### `codechefService.js` — HTML Scraping
CodeChef lacks a public API, so this scrapes the profile HTML with regex patterns to extract rating and solved count.

### `gfgService.js` — REST API
Simple GET to GFG's auth API to fetch `coding_score.total_problems_solved`.

### `fetchWithTimeout.js` — Resilient HTTP Client
Wraps native `fetch()` with AbortController timeout (8s default), automatic retry (1 retry), and a custom User-Agent header (some platforms block requests without one).

---

## 5.5 Company & Dashboard Services

### `companyService.js`
- Auto-generates company logos using `logo.dev` API when a website URL is provided.
- Uses a compound unique index `{ name: 1, createdBy: 1 }` to prevent the same user from adding duplicate companies.
- `deleteCompany()` blocks deletion if any applications reference the company.
- `listCompanies()` enriches each company with `applicationCount` via MongoDB aggregation.

### `dashboardService.js`
Provides aggregated stats using MongoDB's `$group` aggregation pipeline:
```javascript
// WHY aggregation pipeline: more efficient than loading all applications
// into memory and counting in JavaScript
const grouped = await Application.aggregate([
    { $match: { user: userObjectId } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
]);
```
Also fetches upcoming deadlines (next 14 days) excluding completed applications.

---

## 5.6 Frontend Architecture

### `AuthContext.jsx` — Global Auth State
Provides `user`, `login()`, `logout()`, `isAuthenticated` via React Context. On mount, tries to restore the session by calling `GET /api/profile/me`. Registers a global 401 handler that auto-clears the session.

### `apiClient.js` — Centralized Fetch Wrapper
A thin wrapper around native `fetch()` that:
- Always sends `credentials: "include"` for cookies.
- Parses JSON responses automatically.
- Throws `HttpError` with status code and server message.
- Calls `unauthorizedHandler()` on 401 to auto-logout.

### `ProtectedRoute.jsx` + `ProfileGate.jsx`
Two-layer route protection:
1. `ProtectedRoute`: checks `isAuthenticated` → redirects to `/login` if false.
2. `ProfileGate`: checks `isProfileComplete(user)` → redirects to `/onboarding` if profile is incomplete.

### `Onboarding.jsx` — Animated Multi-Step Form
A 5-step wizard (college, branch, grad year, CGPA, backlogs) with Framer Motion slide animations. Validates each field before advancing. Optional fields can be skipped. Submits all data at once on the final step.

---

\newpage

# 6. Core Logic / Algorithm Explained Simply

## 6.1 DSA Streak Calculation

**Plain English:** Count how many days in a row you've solved at least one problem, and check if the streak is still active (you solved something today or yesterday).

**Algorithm:**
1. Sort all activity entries by date (oldest first).
2. Walk through the sorted list, skipping days with 0 submissions.
3. For each day: if it's exactly 1 day after the previous active day, increment the streak counter. Otherwise, reset to 1.
4. Track the maximum streak seen so far.
5. After the loop, check if the last active day was today or yesterday. If yes, the current streak equals the running counter; otherwise, it's 0.

```javascript
// Step 2-3: Walk through sorted activity
for (let i = 0; i < sortedActivity.length; i++) {
    if (sortedActivity[i].count === 0) continue;
    const currentDate = new Date(sortedActivity[i].date);
    if (lastDate) {
        const diffDays = Math.ceil(Math.abs(currentDate - lastDate) / (1000*60*60*24));
        if (diffDays === 1) tempStreak++;   // Consecutive!
        else tempStreak = 1;                // Gap found, reset
    } else {
        tempStreak = 1;                     // First active day
    }
    if (tempStreak > maxStreak) maxStreak = tempStreak;
    lastDate = currentDate;
}

// Step 5: Is the streak still alive?
const lastActiveDate = new Date(sortedActivity[sortedActivity.length - 1].date);
const today = new Date(); today.setHours(0,0,0,0);
const diffDays = Math.ceil(Math.abs(today - lastActiveDate) / (1000*60*60*24));
if (diffDays <= 1) currentStreak = tempStreak;
```

## 6.2 Multi-Platform Activity Merge

**Plain English:** Combine the daily submission counts from all 4 coding platforms into one heatmap. If you solved 3 on LeetCode and 2 on Codeforces on the same day, the heatmap shows 5.

**Algorithm:**
1. Create an empty map: `{ "2026-11-01": 0, ... }`.
2. For each platform that synced successfully, iterate its activity array and add counts to the map.
3. Convert the map to a sorted array and keep only the last 365 days.

```javascript
const mergedActivityMap = {};
results.forEach(res => {
    if (res.status === 'fulfilled') {
        data.activity.forEach(act => {
            mergedActivityMap[act.date] = (mergedActivityMap[act.date] || 0) + act.count;
        });
    }
});
// Keep last 365 days sorted newest-first
profile.activity = Object.keys(mergedActivityMap)
    .map(date => ({ date, count: mergedActivityMap[date] }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 365);
```

## 6.3 Route Protection Flow (Two-Layer Gate)

**Plain English:** Before seeing any dashboard page, two checks happen:
1. **Are you logged in?** (ProtectedRoute checks JWT cookie validity)
2. **Is your profile complete?** (ProfileGate checks if college/branch/gradYear are set)

If check 1 fails → redirect to `/login`.  
If check 1 passes but check 2 fails → redirect to `/onboarding`.  
If both pass → render the requested page.

```
App.jsx route tree:
<Route element={<ProtectedRoute />}>          ← Check 1
    <Route element={<OnboardingLayout />}>
        <Route path="/onboarding" ... />       ← Onboarding accessible here
    </Route>
    <Route element={<ProfileGate />}>          ← Check 2
        <Route element={<AppLayout />}>
            <Route path="/dashboard" ... />    ← Only reachable after both checks
            ...
        </Route>
    </Route>
</Route>
```

---

\newpage

# 7. Database / API Reference

## 7.1 Database Schemas

### User Schema
| Field | Type | Constraints | Purpose |
|-------|------|------------|---------|
| `firstName` | String | 3-30 chars, required | User's first name |
| `lastName` | String | 3-30 chars, required | User's last name |
| `middleName` | String | 3-30 chars, optional | User's middle name |
| `username` | String | required, unique, immutable | Login identifier (cannot change) |
| `email` | String | required, unique, immutable | Login identifier (cannot change) |
| `password` | String | min 8 chars, required | bcrypt-hashed password |
| `role` | String | enum: student/admin/placement_officer | User role (default: student) |
| `profile.college` | String | — | Academic institution |
| `profile.branch` | String | — | Course/department |
| `profile.graduationYear` | Number | 2000–2100 | Expected graduation |
| `profile.cgpa` | Number | 0–10 | Current GPA |
| `profile.backlogs` | Number | ≥ 0 | Active backlog count |
| `profile.avatar` | String | — | Avatar image URL path |
| `profile.skills[]` | Array | name + category | Technical/soft skills |
| `profile.targetRoles[]` | Array | — | Desired job roles |
| `profile.links` | Object | github, linkedin, leetcode, portfolio | External profile links |
| `profile.about` | String | max 500 chars | Bio/summary |

### Application Schema
| Field | Type | Constraints | Purpose |
|-------|------|------------|---------|
| `user` | ObjectId → User | required, indexed | Owner of the application |
| `company` | ObjectId → Company | required, indexed | Company applied to |
| `role` | String | required, max 100 | Job title applied for |
| `type` | String | enum: internship / full-time | Application type |
| `status` | String | enum: wishlist / applied / oa / interview / offer / rejected / withdrawn | Current stage |
| `location` | String | — | Job location |
| `appliedDate` | Date | default: now | When applied |
| `deadline` | Date | — | Application deadline |
| `source` | String | — | Where found (LinkedIn, etc.) |
| `jobLink` | String | — | URL to job posting |
| `resumeVersion` | String | — | Which resume version used |
| `notes` | String | max 1000 | Personal notes |
| `timeline[]` | Array | status + date + note | Audit trail of status changes |

### Company Schema
| Field | Type | Constraints | Purpose |
|-------|------|------------|---------|
| `name` | String | required, max 100 | Company name |
| `logo` | String | — | Auto-generated via logo.dev |
| `website` | String | — | Company website URL |
| `industry` | String | — | Industry category |
| `notes` | String | max 500 | Personal notes about company |
| `createdBy` | ObjectId → User | required, indexed | Owner |
| **Index** | `{ name: 1, createdBy: 1 }` unique | — | Prevents duplicate company names per user |

### DSA Profile Schema
| Field | Type | Purpose |
|-------|------|---------|
| `user` | ObjectId → User (unique) | One DSA profile per user |
| `handles` | Object: leetcode, codeforces, codechef, gfg | Platform usernames |
| `platforms` | Object of `platformSnapshot` sub-docs | Fetched stats per platform |
| `activity[]` | Array: { date, count } | Merged heatmap data (365 days) |
| `lastSyncedAt` | Date | Last full sync timestamp |

**platformSnapshot sub-document:**
| Field | Type | Purpose |
|-------|------|---------|
| `username` | String | Platform handle |
| `status` | String: ok / error / not_linked | Sync status |
| `solved, easy, medium, hard` | Number | Problem counts |
| `rating, maxRating` | Number | Contest rating |
| `rankTitle` | String | Platform rank (e.g., "3 Star") |
| `contestsAttended` | Number | Contest count |
| `ratingHistory[]` | Array: { date, rating, contestName } | Rating progression |
| `topics[]` | Array: { name, solved } | Topic-wise breakdown |
| `activity[]` | Array: { date, count } | Per-platform heatmap |

### Project Schema
| Field | Type | Constraints | Purpose |
|-------|------|------------|---------|
| `user` | ObjectId → User | required, indexed | Owner |
| `title` | String | required, max 100 | Project name |
| `description` | String | required, max 500 | What the project does |
| `techStack` | Object: frontend[], backend[], database[], deployment[], other[] | Categorized technologies |
| `liveUrl` | String | — | Deployed URL |
| `githubUrl` | String | — | Source code URL |
| `imageUrl` | String | — | Screenshot/thumbnail |
| `isFeatured` | Boolean | default: false | Only one project can be featured |

---

## 7.2 API Endpoint Reference

### Authentication (no auth required)
| Method | Route | Input | Output | Status Codes |
|--------|-------|-------|--------|-------------|
| POST | `/register` | `{ firstName, lastName, username, email, password, role? }` | `{ message }` | 201, 400, 409 |
| POST | `/login` | `{ email, password }` (email can be username) | Sets HTTP-only cookie + `{ message }` | 200, 400 |
| POST | `/logout` | — (cookie cleared) | `{ message }` | 200 | Auth required |

### Profile (auth required)
| Method | Route | Input | Output | Status Codes |
|--------|-------|-------|--------|-------------|
| GET | `/api/profile/me` | — | Full user object (minus password) | 200, 404 |
| PUT | `/api/profile` | Profile fields (merge-updated) | `{ user }` | 200, 400, 404 |

### Applications (auth required)
| Method | Route | Input | Output | Status Codes |
|--------|-------|-------|--------|-------------|
| POST | `/api/applications` | `{ companyId, role, status?, type?, ... }` | Application object | 201, 400, 404 |
| GET | `/api/applications` | Query: `status, type, companyId, search, page, limit` | `{ applications, pagination }` | 200 |
| GET | `/api/applications/roles` | — | `{ roles: [...] }` distinct role strings | 200 |
| GET | `/api/applications/:id` | — | Application with populated company | 200, 404 |
| PUT | `/api/applications/:id` | Updated fields | Updated application | 200, 400, 404 |
| PATCH | `/api/applications/:id/status` | `{ status, note? }` | Application with new timeline entry | 200, 400, 404 |
| DELETE | `/api/applications/:id` | — | Deleted application | 200, 404 |

### Companies (auth required)
| Method | Route | Input | Output | Status Codes |
|--------|-------|-------|--------|-------------|
| POST | `/api/companies` | `{ name, website?, industry?, notes? }` | Company (auto-logo) | 201, 400, 409 |
| GET | `/api/companies` | Query: `search` | Array of companies with `applicationCount` | 200 |
| GET | `/api/companies/:id` | — | Company object | 200, 404 |
| PUT | `/api/companies/:id` | Updated fields | Updated company | 200, 400, 404, 409 |
| DELETE | `/api/companies/:id` | — | Blocked if has applications | 200, 404, 409 |

### DSA Stats (auth required)
| Method | Route | Input | Output | Status Codes |
|--------|-------|-------|--------|-------------|
| PUT | `/api/dsa/platforms` | `{ leetcode?, codeforces?, codechef?, gfg? }` | `{ handles }` + triggers sync | 200 |
| GET | `/api/dsa/platforms` | — | `{ handles }` | 200 |
| GET | `/api/dsa/stats` | — | `{ handles, totals, platforms, activity, lastSyncedAt }` | 200 |
| POST | `/api/dsa/sync` | — | Force re-sync all platforms | 200 |
| GET | `/api/dsa/daily-challenge` | — | `{ title, difficulty, link }` (LeetCode POTD) | 200 |
| GET | `/api/dsa/recent-submissions` | — | `{ submissions: [...] }` from LC + CF | 200 |
| GET | `/api/dsa/contests/upcoming` | — | `{ codeforces: [...], leetcode: [...], codechef: [...] }` | 200 |

### Dashboard (auth required)
| Method | Route | Input | Output | Status Codes |
|--------|-------|-------|--------|-------------|
| GET | `/api/dashboard/stats` | — | `{ totalApplications, byStatus, upcoming }` | 200 |

### Contests (auth required)
| Method | Route | Input | Output | Status Codes |
|--------|-------|-------|--------|-------------|
| GET | `/api/contests/upcoming` | — | `{ codeforces, leetcode, codechef }` (cached 30 min) | 200 |

### Projects (auth required)
| Method | Route | Input | Output | Status Codes |
|--------|-------|-------|--------|-------------|
| POST | `/api/projects` | `{ title, description, techStack, ... }` | Project object | 201, 400 |
| GET | `/api/projects` | — | Array (featured first) | 200 |
| PUT | `/api/projects/:id` | Updated fields | Updated project | 200, 400, 404 |
| DELETE | `/api/projects/:id` | — | Deleted project | 200, 404 |

### Upload (auth required)
| Method | Route | Input | Output | Status Codes |
|--------|-------|-------|--------|-------------|
| POST | `/api/upload/avatar` | `multipart/form-data` (image, ≤5MB) | `{ url }` path to uploaded file | 200, 400 |

---

\newpage

# 8. Challenges & Solutions

## Challenge 1: Aggregating Data from 4 Different Platforms with Different APIs

**What made it hard:** LeetCode uses GraphQL, Codeforces has a REST API, CodeChef has no public API (HTML scraping needed), and GFG has yet another REST format. All four return data in different shapes.

**Solution in the code:**
- Created a **uniform interface**: every platform service returns the same shape (`{ username, status, solved, easy, medium, hard, rating, topics, activity, ... }`).
- Used `Promise.allSettled()` so one platform failing doesn't break the others.
- Used `fetchWithTimeout()` with 8-second timeout and 1 retry to handle slow/unreliable external APIs.
- Normalized all activity dates to `YYYY-MM-DD` format and merged them into a single heatmap.

## Challenge 2: Keeping DSA Data Fresh Without Overloading External APIs

**What made it hard:** Fetching from 4 platforms on every page load would be slow (8+ seconds) and might get rate-limited.

**Solution in the code:**
- **6-hour staleness check:** `getStats()` only re-syncs if the last sync was more than 6 hours ago.
- **Force sync button:** Users can manually trigger a re-sync when they want fresh data.
- **In-memory cache for contests:** `cache.js` stores contest data for 30 minutes using a Map with TTL, avoiding repeated calls to contest APIs.

## Challenge 3: Secure Authentication Without Token Exposure

**What made it hard:** Storing JWT in `localStorage` or passing it in headers makes it vulnerable to XSS attacks.

**Solution in the code:**
- JWT is set as an **HTTP-only, secure cookie** — JavaScript cannot read it.
- The frontend's `apiClient.js` sends `credentials: "include"` on every request, so the browser automatically attaches the cookie.
- A global 401 interceptor in `AuthContext` auto-clears the session if the token expires.
- CORS is locked down to `http://localhost:5173` with `credentials: true`.

## Challenge 4: Ensuring New Users Complete Their Profile

**What made it hard:** If users skip profile setup, the dashboard shows empty data and the experience is broken.

**Solution in the code:**
- **Two-layer route protection:** `ProtectedRoute` (checks auth) wraps `ProfileGate` (checks profile completeness).
- `isProfileComplete(user)` checks if `college`, `branch`, and `graduationYear` exist.
- An animated 5-step `Onboarding` wizard guides new users through profile setup with field-by-field validation.
- After completing onboarding, `setUser(data.user)` triggers a re-render and `ProfileGate` allows access.

## Challenge 5: Building Pagination with Dynamic Filters

**What made it hard:** Applications need to be filtered by status, type, company, and free-text search — all while paginating correctly.

**Solution in the code:**
- Builds a dynamic MongoDB query object from query parameters.
- Uses `escapeRegex()` to prevent ReDoS attacks on the search field.
- Runs `find()` and `countDocuments()` in parallel with `Promise.all()` for performance.
- Returns standardized pagination metadata: `{ total, page, limit, totalPages }`.
- Frontend maintains filter state in URL query params for bookmarkability.

---

\newpage

# 9. STAR-Method Explanations

## 9.1 — 30-Second Elevator Version

**Situation:** During my placement preparation, I realized I was spending more time managing spreadsheets and switching between coding platform tabs than actually preparing.

**Task:** I decided to build a full-stack web app that would centralize everything — application tracking, DSA progress, and my portfolio — into one dashboard.

**Action:** I built PlacementTracker using React, Express, and MongoDB. The standout feature is that it auto-fetches your coding stats from LeetCode, Codeforces, CodeChef, and GeeksforGeeks and shows them in a unified dashboard with heatmaps and charts.

**Result:** The app has 30+ API endpoints, real-time data aggregation from 4 external platforms, JWT cookie-based authentication, and an animated onboarding flow. It's a production-grade MERN application that I use daily for my placement prep.

---

## 9.2 — 2-Minute Interview Version

**Situation:** When placement season started at my college, I noticed a common pain point: every student was tracking applications in spreadsheets, checking DSA progress across 4 different platform tabs, and had no organized way to showcase their projects. I personally missed a deadline because it was buried in a Google Sheet.

**Task:** I set out to build a full-stack web application that would solve three problems at once: (1) track applications through their lifecycle with status history, (2) aggregate DSA statistics from multiple coding platforms into one dashboard, and (3) manage portfolio projects in a structured way.

**Action:** I designed the architecture as a classic MERN stack with clean separation — routes, controllers, services, and models on the backend, and pages, hooks, components, and an API layer on the frontend.

The most technically interesting part was the **DSA aggregation engine**. I integrated 4 different data sources: LeetCode via their GraphQL API, Codeforces via their REST API (3 parallel calls per sync), CodeChef via HTML scraping since they have no public API, and GFG via their profile API. I used `Promise.allSettled()` so one platform being down doesn't break the others, and `fetchWithTimeout()` with retry logic for resilience. The activity data from all platforms is merged into a unified heatmap.

For authentication, I implemented JWT stored in HTTP-only cookies instead of localStorage to prevent XSS attacks. I built a two-layer route protection system — `ProtectedRoute` checks authentication, and `ProfileGate` ensures the profile is complete before allowing dashboard access.

On the frontend, I created an animated multi-step onboarding wizard using Framer Motion, a pagination system with dynamic filters and ReDoS-safe search, and data visualization components using Recharts (difficulty pie charts, topic bar charts, activity heatmaps).

**Result:** The final application has [N] pages, 30+ REST endpoints, 5 database models, and integrates with 4 external APIs. The DSA sync uses smart caching — it only re-fetches if data is older than 6 hours — and contest data is cached in-memory for 30 minutes. The codebase follows a clean service-layer architecture that separates business logic from HTTP handling.

---

## 9.3 — 5-Minute Detailed Demo Version

**Situation:** At my college, IIIT Bhagalpur, the placement process involves dozens of companies visiting campus, each with multiple rounds (OA, technical interview, HR). Students were managing this chaos through WhatsApp groups and personal spreadsheets. At the same time, everyone is grinding DSA problems on 3-4 different platforms, and there's no way to see your combined progress. I personally had two frustrations: I missed an application deadline because it was in row 47 of a messy spreadsheet, and I had no idea how many total problems I'd solved across all platforms.

**Task:** I decided to build PlacementTracker — a comprehensive placement preparation platform with four core modules: (1) Application Tracker with lifecycle management, (2) DSA Stats Aggregator pulling from LeetCode, Codeforces, CodeChef, and GeeksforGeeks, (3) Contest Calendar showing upcoming competitions, and (4) Portfolio Manager for projects and skills. The technical goal was to build a production-quality MERN application with clean architecture, proper security, and a polished UI.

**Action:** Let me walk through the key technical decisions:

*Backend Architecture:* I used Express 5 with a layered architecture — routes define endpoints, controllers handle HTTP concerns, and services contain business logic. This separation means I can test services without Express. All errors flow through a central `errorHandler` middleware via a custom `ApiError` class and `asyncHandler` wrapper, so no try-catch needed in controllers.

*Database Design:* MongoDB was chosen because DSA platform data varies wildly between platforms — LeetCode has topic breakdowns and difficulty splits, while CodeChef only gives a rating and solved count. MongoDB's flexible schema with embedded sub-documents (the `platformSnapshot` sub-schema) handles this perfectly without needing a complex relational schema.

*DSA Integration — the core challenge:* Each of the 4 platforms required a different integration strategy. LeetCode uses a public GraphQL API — I send one query that fetches submission stats, the submission calendar (for the heatmap), topic analysis, and contest rating. Codeforces has a REST API, but I need 3 separate endpoints (`user.info`, `user.status`, `user.rating`), so I fire all 3 with `Promise.all()` for speed. CodeChef has no public API, so I scrape their profile HTML using regex patterns — it's fragile, but I handle parse failures gracefully. GFG has a JSON API that returns the coding score.

The sync orchestrator uses `Promise.allSettled()` to run all platforms in parallel and handle partial failures — if LeetCode's API is down, you still see your Codeforces stats. Each platform returns a normalized shape, and I merge the daily activity counts into a unified heatmap. The streak calculation sorts activity chronologically and counts consecutive days, checking if the streak is still active.

For resilience, I built `fetchWithTimeout()` — a wrapper around native `fetch()` that uses `AbortController` with an 8-second timeout and automatic retry. It also sets a custom User-Agent header because LeetCode blocks requests without one.

*Authentication:* I chose JWT in HTTP-only cookies over localStorage + Authorization headers for XSS protection. The frontend's `apiClient.js` uses `credentials: "include"` on every fetch call, and a global 401 interceptor auto-logs the user out when the token expires. The `ProtectedRoute` and `ProfileGate` components create a two-layer guard system.

*Frontend UX:* The onboarding flow uses Framer Motion's `AnimatePresence` to create smooth slide transitions between form steps. The application list supports server-side pagination with dynamic filters (status, type, company, text search). The DSA dashboard shows 4 stat cards, an activity heatmap, per-platform cards with ratings and solved counts, topic analysis charts, difficulty breakdown, and recent submissions.

**Result:** The application consists of [N]+ React components across 13 pages, served by 30+ backend endpoints and backed by 5 database models. The DSA sync engine handles 4 different API integration strategies (GraphQL, REST, scraping, JSON) with graceful degradation. The in-memory cache reduces external API calls by [X]%, and the 6-hour smart-sync prevents unnecessary re-fetches. The codebase is about [N] thousand lines of JavaScript across frontend and backend, with consistent error handling, input validation, and a reusable UI component library.

---

\newpage

# 10. Viva / Interview Q&A Bank

## Conceptual Questions

**Q1: What is the MERN stack and why did you choose it?**
MERN stands for MongoDB, Express, React, Node.js. I chose it because all four use JavaScript, so there's no context-switching between languages. MongoDB's flexible schema was ideal for storing varied DSA platform data. React's component model made building 13+ pages manageable. Express is lightweight and doesn't force architectural opinions.

**Q2: What is JWT authentication and how does it work in your project?**
JWT (JSON Web Token) is a stateless token containing the user's ID, signed with a secret key. In my project, after login, the server creates a JWT and sets it as an HTTP-only cookie. On every subsequent request, the browser automatically sends this cookie. The `userAuth` middleware verifies the token using `jwt.verify()`, finds the user in the database, and attaches `req.user` for downstream handlers. The token expires after 24 hours.

**Q3: Why did you use HTTP-only cookies instead of localStorage for JWT?**
HTTP-only cookies cannot be accessed by JavaScript (`document.cookie` won't see them), so they're immune to XSS attacks. If I stored the JWT in localStorage, any XSS vulnerability would let an attacker steal the token. The tradeoff is that cookies need CORS configuration with `credentials: true` and a specific origin (not `*`).

**Q4: What is `Promise.allSettled()` and why did you use it over `Promise.all()`?**
`Promise.all()` rejects immediately if any promise rejects — so if LeetCode's API is down, you'd lose Codeforces data too. `Promise.allSettled()` waits for all promises and reports each one's status (`fulfilled` or `rejected`). I use it in the DSA sync to ensure partial failures don't crash the entire sync.

**Q5: Explain the MVC vs. service-layer architecture in your backend.**
My backend uses a 4-layer architecture: Routes (define endpoints) → Controllers (parse request, call service, send response) → Services (business logic, DB queries, external API calls) → Models (Mongoose schemas). This is an extension of MVC where the "Model" layer is split into Models + Services. The benefit is that services can be unit-tested without Express request/response objects.

## Code-Level Questions

**Q6: How does your `fetchWithTimeout` utility work?**
It wraps native `fetch()` with an `AbortController` that fires after 8 seconds (configurable). If the request times out, the controller aborts it. If it fails for a non-timeout reason, it retries once automatically. It also adds a custom User-Agent header because some APIs (LeetCode) block requests without one.

**Q7: How does the streak calculation work?**
I sort the activity array chronologically, then iterate through it. For each day with submissions, I check if it's exactly 1 day after the previous active day. If yes, I increment the streak counter; if no, I reset to 1. I track the max streak throughout. After the loop, I check if the last active day was today or yesterday — if so, the current streak is the running counter; otherwise, it's 0.

**Q8: How does pagination work in your application list?**
The backend accepts `page` and `limit` query parameters. It clamps `page` to ≥ 1 and `limit` to 1–50. It runs `find()` with `.skip((page-1)*limit).limit(limit)` and `countDocuments()` in parallel using `Promise.all()`. It returns `{ applications, pagination: { total, page, limit, totalPages } }`. The frontend shows page numbers and updates URL query params.

**Q9: How does the two-layer route protection work?**
`ProtectedRoute` is a wrapper component that checks `isAuthenticated` from `AuthContext`. If false, it renders `<Navigate to="/login">`. If true, it renders `<Outlet />`, which renders child routes. Inside that, `ProfileGate` checks `isProfileComplete(user)`. If the profile is incomplete, it redirects to `/onboarding`. This creates a mandatory funnel: Login → Onboarding → Dashboard.

**Q10: How does the DSA profile handle different data shapes from different platforms?**
I designed a `platformSnapshot` sub-schema with all possible fields (solved, easy, medium, hard, rating, topics, activity). Platforms that don't provide certain data return `null` for those fields. For example, Codeforces doesn't split by difficulty, so `easy`, `medium`, `hard` are all `null`. The frontend handles `null` by showing "N/A" or hiding that section.

## "Why did you choose X over Y?"

**Q11: Why MongoDB over PostgreSQL?**
The DSA profile data is highly nested and varies by platform — LeetCode has topic breakdowns, Codeforces doesn't. MongoDB's flexible schema handles this naturally with embedded sub-documents, while PostgreSQL would require complex JOIN tables or JSONB columns. Additionally, the application timeline is an array of objects, which maps perfectly to MongoDB arrays but would need a separate table in PostgreSQL.

**Q12: Why Tailwind CSS over regular CSS or Styled Components?**
Tailwind eliminates context-switching — I style components right in the JSX without jumping to CSS files. The utility classes are consistent (e.g., `text-sm`, `p-4`) and produce a tiny production bundle because unused classes are purged. With 70+ components, maintaining separate CSS files would be unwieldy.

**Q13: Why native `fetch` over Axios on the frontend?**
I initially included Axios (it's in `package.json`) but ended up using native `fetch()` with a custom `apiClient.js` wrapper. This gives me full control over error handling, response parsing, and the global 401 interceptor without adding a 13KB dependency. The wrapper is about 70 lines and does everything I need.

**Q14: Why Vite over Webpack or Create React App?**
Vite uses native ES modules during development, so it starts instantly regardless of project size. CRA uses Webpack, which bundles everything before serving — slow for 100+ file projects. Vite's HMR (Hot Module Replacement) is also faster because it only re-processes the changed module.

## "What would you improve?"

**Q15: What are the main things you'd improve?**
(1) Add **real-time notifications** using WebSockets for deadline reminders. (2) Replace in-memory cache with **Redis** for multi-instance deployments. (3) Add **unit and integration tests** — the service layer is designed to be testable but I haven't written tests yet. (4) Deploy with **Docker** and CI/CD. (5) Add a **shared placement cell view** for placement officers to see all students' application statuses.

**Q16: How would you handle scaling this for 1000+ users?**
The in-memory cache would need to move to Redis (shared across server instances). MongoDB queries are already indexed on `user` fields. The DSA sync is the bottleneck — I'd add a job queue (Bull/BullMQ) to sync in the background and store results, rather than syncing on-demand. I'd also add rate limiting per user to prevent abuse of the sync endpoint.

**Q17: What security improvements would you make?**
(1) Add rate limiting on login/register to prevent brute force. (2) Add CSRF protection (SameSite cookie attribute). (3) Add input sanitization against NoSQL injection (Mongoose handles some of this, but I should be more explicit). (4) Add HTTPS enforcement. (5) Store uploaded images in cloud storage (S3/Cloudinary) instead of local disk.

**Q18: How would you add testing?**
I'd add Jest for unit testing the service layer (mock Mongoose models), Supertest for API integration tests (spin up Express, test routes), and React Testing Library for frontend component tests. The service-layer architecture makes this straightforward — services take plain inputs and return plain outputs.

---

\newpage

# 11. Revision Cheat Sheet

## Key Terms & Definitions

| Term | Definition |
|------|-----------|
| **JWT** | JSON Web Token — a signed, self-contained token for stateless auth |
| **HTTP-only cookie** | A cookie invisible to JavaScript — prevents XSS token theft |
| **Promise.allSettled** | Runs promises in parallel, never rejects, reports each outcome |
| **Middleware** | Function that runs between request and response (auth, error handling) |
| **Mongoose schema** | Defines structure + validation for MongoDB documents |
| **Aggregation pipeline** | MongoDB's server-side data processing (grouping, counting, filtering) |
| **GraphQL** | Query language that lets clients request specific data fields |
| **ReDoS** | Regex Denial of Service — malicious patterns that hang regex engines |
| **AbortController** | Web API to cancel `fetch()` requests on timeout |
| **Context API** | React's built-in state sharing without prop drilling |

## 10 Must-Remember Facts

1. **5 database models:** User, Application, Company, DsaProfile, Project.
2. **4 platform integrations:** LeetCode (GraphQL), Codeforces (REST×3), CodeChef (HTML scraping), GFG (REST).
3. **7 application statuses:** wishlist → applied → oa → interview → offer / rejected / withdrawn.
4. **JWT expires in 24 hours**, stored in HTTP-only cookie.
5. **bcrypt with 10 salt rounds** for password hashing.
6. **6-hour staleness threshold** for DSA re-sync.
7. **30-minute cache** for contest data (in-memory Map with TTL).
8. **Two-layer route protection:** ProtectedRoute (auth) → ProfileGate (profile complete).
9. **fetchWithTimeout:** 8-second timeout + 1 automatic retry + custom User-Agent.
10. **Company logos** auto-generated from website URL via logo.dev API.

## "If They Ask X → Say Y" Quick Reference

| If They Ask... | Say... |
|----------------|--------|
| "What does your project do?" | "It's a placement prep dashboard that tracks job applications, aggregates DSA stats from 4 coding platforms, shows upcoming contests, and manages portfolio projects." |
| "What's the hardest part?" | "Integrating 4 different platform APIs — GraphQL, REST, HTML scraping — with graceful failure handling using Promise.allSettled." |
| "How do you handle auth?" | "JWT in HTTP-only cookies, verified by middleware on every request, with a global 401 interceptor on the frontend." |
| "How is data stored?" | "MongoDB with Mongoose. 5 models: User (embedded profile), Application (timeline array), Company (unique per user), DsaProfile (platform snapshots), Project (categorized tech stack)." |
| "Why not PostgreSQL?" | "DSA platform data varies wildly — MongoDB's flexible schema with embedded sub-documents handles this without complex JOINs." |
| "How do you handle errors?" | "Custom ApiError class → asyncHandler catches rejected promises → central errorHandler sends JSON errors. Frontend's apiClient intercepts 401s for auto-logout." |
| "What patterns do you use?" | "Service layer (separates business logic from HTTP), middleware chain (auth, upload, error), custom hooks (data fetching), Context API (global auth state)." |
| "Any testing?" | "The service layer is designed for testability (pure functions, mockable models), but I haven't written tests yet. That's a priority improvement." |

---

\newpage

# 12. Limitations & Future Scope

## Current Limitations (How I'd Say It in an Interview)

1. **No automated tests:** "The service-layer architecture is designed with testability in mind, but I haven't implemented Jest/Supertest tests yet. That's the first thing I'd add in a team setting."

2. **In-memory cache doesn't scale:** "The cache uses a simple `Map()`, which means data is lost on server restart and can't be shared across multiple server instances. I'd move to Redis for production."

3. **CodeChef scraping is fragile:** "Since CodeChef has no public API, I scrape their HTML with regex. If they change their page structure, it breaks. I handle failures gracefully, but it's inherently unreliable."

4. **No real-time features:** "Deadlines don't trigger push notifications. I'd add WebSockets (Socket.io) or service worker push notifications for reminders."

5. **Single-user focus:** "There's no shared view for placement officers or batch-level analytics. The `role` field exists in the schema (student/admin/placement_officer) but admin features aren't built yet."

6. **Local file storage:** "Uploaded avatars are stored on the server's disk. In production, I'd use cloud storage (S3 or Cloudinary) with CDN delivery."

7. **No rate limiting:** "External API calls and login attempts aren't rate-limited. A malicious user could trigger excessive syncs or brute-force passwords."

8. **Hardcoded CORS origin:** "The CORS origin is hardcoded to `localhost:5173`. For deployment, this needs to be configurable via environment variables."

## Future Scope

| Feature | Why It Matters | How I'd Build It |
|---------|---------------|-------------------|
| **Placement Officer Dashboard** | Batch-level analytics for TPOs | Role-based routes, aggregate queries across all users |
| **Email/Push Notifications** | Deadline and interview reminders | Node-cron + Nodemailer, or Firebase Cloud Messaging |
| **Resume Builder** | Generate tailored resumes per application | Template engine (Handlebars/Puppeteer PDF) |
| **AI Interview Prep** | Practice Q&A based on applied roles | Integration with Gemini API for role-specific questions |
| **Analytics Dashboard** | Visualize application success rates over time | Time-series aggregation, Recharts line/bar charts |
| **Mobile App** | Track on the go | React Native sharing the same API backend |
| **Docker + CI/CD** | One-command deployment | Dockerfile, GitHub Actions, deploy to Railway/Render |
| **WebSocket Notifications** | Real-time deadline alerts | Socket.io server, service worker for push |

---

## ⚠️ Items to Verify / Placeholders to Fill

| Item | Type | Location |
|------|------|----------|
| ⚠️ verify: `axios` is in `package.json` but `apiClient.js` uses native `fetch`. Confirm if Axios is used anywhere else or can be removed. | Verify | Section 3 |
| ⚠️ verify: `three` (Three.js) is in `package.json`. Likely used in `HeroShowcase.jsx` for 3D landing page visuals. Confirm usage. | Verify | Section 3 |
| [N] pages | Placeholder | Section 9 — count is 13 pages, can fill in |
| [N] thousand lines | Placeholder | Section 9 — measure with `wc -l` |
| [X]% cache hit reduction | Placeholder | Section 9 — measure or estimate |
| [N users] | Placeholder | Section 1 — fill with actual user count or remove |

---
