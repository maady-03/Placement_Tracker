# Placement Tracker — Refined Dashboard Blueprint

## 1. Design diagnosis (of your current screenshot)

**Working well:** clear IA, dark theme reads calm not gloomy, blue accent is restrained, sidebar grouping (core nav / practice / account) is already correct, stat cards are legible.

**What reads as generic/AI-generated:**
- Every section is an identical rounded card of the same weight — readiness, skills, and outcomes all compete equally for attention.
- Colored icon *tiles* on Applications/Interviews/Offers (filled squares behind icons) is a stock SaaS-template move.
- Border radius is uniform and slightly too large everywhere — nothing signals structure vs. content.
- Subtitle is generic ("Here's where your placement prep stands today") — doesn't tell the student anything they don't already know.
- No sense of "what's happening" — it's a static snapshot, not something that feels alive day to day.

**Keep as-is:** dark theme, blue primary accent, sidebar structure and order, the three preparation categories, the three outcome metrics, overall minimal spacing.

**Change:** visual weight distribution, card treatment (stop making everything a card), icon tiles, subtitle content, add one small "what's actually going on" signal.

---

## 2. Refined design direction

Three tiers of visual weight, not one repeated card pattern:

1. **Readiness** — one bordered panel, largest number on the page, no competing color.
2. **Preparation (DSA / Web dev / CP)** — a single unified panel divided by hairlines (not three separate cards), so they read as one comparative module.
3. **Outcomes (Applications → Interviews → Offers)** — a horizontal strip with arrows between the numbers, reinforcing the funnel relationship (Applications lead to Interviews lead to Offers) instead of three disconnected stat boxes.

Color is functional only: blue = neutral/primary, amber = needs attention or in-progress, green = success. No icon tiles with colored backgrounds — icons stay small and muted, used for orientation only.

---

## 3. Dashboard layout, top → bottom, left → right

1. Header row: greeting (left) + status subtitle beneath it + avatar (right, small, outlined not filled).
2. Readiness panel — full width, bordered, one large percentage, thin bar, one line calling out the weakest area.
3. "Preparation" label, then a single 3-column bordered panel (DSA / Web dev / CP) with internal hairline dividers — not three separate cards.
4. "Placement activity" label, then a horizontal strip: Applications → Interviews → Offers, connected by small chevrons.
5. (Optional, only if genuinely useful) a slim single-line row: next upcoming drive or next recommended task — text only, no card.

---

## 4. Sidebar specification

- Logo/name at top, comfortable padding, no card background.
- Primary nav: Dashboard, Placement drives, Companies — flat rows, 2px left accent bar + subtle background tint on active item only (no glow, no bold blue fill).
- Divider, then a small uppercase "Practice" label (muted, letter-spaced) grouping DSA / Competitive programming / Web development.
- Divider, Notes as its own item outside Practice.
- Account block (Profile, Log out) separated by a border at the bottom, visually distinct from navigation — slightly muted since it's used rarely.
- Hover: background tint only, no border or shadow. Active: left accent bar + tinted background + full-opacity text; inactive items stay at secondary text color.
- Icon size consistent (~15–16px) throughout, all same stroke weight (outline style).

---

## 5. Component specification

- **Readiness panel:** bordered rectangle, sharper corners than default cards (this is the anchor element, it should feel structural). Label in small caps/muted above a large number (32–40px). Thin 4–6px bar below. Right-aligned one-line insight ("Web development is your weakest area") replaces a second chart — this is the "secondary indicator" without adding analytics complexity.
- **Preparation module:** one bordered panel, 3 equal columns separated by hairlines, not gaps. Each column: label + small icon, percentage, thin bar, one short status word (Strong / Needs attention / On track) colored only when it's a genuine flag (amber for the weak area).
- **Outcomes strip:** one bordered row, 3 segments separated by hairlines with a small chevron between, each segment a number + label inline (not stacked). Amber for interviews (in progress), green for the offer, default text color for applications (neutral starting point of the funnel).
- **Optional addition:** a single muted line below everything — "Next drive: [Company] on [date]" or "Next recommended: finish 2 more web dev problems." Text only, an icon prefix, no card. Add only one of these, not both.

---

## 6. Design system

**Color:** dark background (near-black, not pure black), one accent blue for primary/neutral data, amber only for "needs attention / in progress," green only for success. No purple, teal, or extra hues.

**Typography:** one sans-serif family throughout. Clear scale — page greeting > section labels (small, uppercase, muted, letter-spaced) > large stat numbers > body/status text > micro labels. Numbers get weight (medium/500), never bold-black.

**Spacing:** generous but not padded-for-padding's-sake; consistent vertical rhythm between sections (label → panel → next label).

**Border radius:** small and consistent (structural, not pill-shaped) — enough to feel modern, not enough to feel "template." Reserve any slightly larger radius for the outer page container only.

**Borders:** hairline borders define structure instead of shadows. Panels use one consistent border color; internal dividers within a panel are the same hairline, giving continuity.

**Shadows:** none, or only a barely-there shadow on hover states for interactive elements. Structure comes from borders and spacing.

**Icons:** small, outline-style, muted/secondary color — never in filled color tiles. They orient, they don't decorate.

**Buttons:** minimal, outlined or text-only for secondary actions; a single filled accent button reserved for one primary action per view (if any exists on this screen — likely none needed on the dashboard itself).

**Progress indicators:** thin bars (4–6px), single accent fill, color changes only to signal a flagged status (amber), never a rainbow per category.

---

## 7. Responsive behavior

- **Desktop/large:** as specified above, sidebar expanded with labels.
- **Laptop:** same layout, tighter horizontal padding; preparation panel and outcomes strip stay 3-column/3-segment.
- **Tablet:** sidebar collapses to icons only (tooltip or tap-to-expand on demand); preparation panel and outcomes strip remain horizontal but with reduced padding; readiness panel stays full width and remains the dominant element.
- **Mobile:** sidebar becomes a bottom nav or slide-out drawer (not a shrunk sidebar); readiness panel stays full width and full prominence at the top; preparation module stacks to a vertical list (still one bordered panel with hairline dividers, just stacked rows instead of columns); outcomes strip stacks vertically too, keeping the arrow/chevron between each to preserve the funnel meaning.

---

## 8. Empty state (new student)

- Readiness panel still shows, but reads "0%" with a supporting line like "Add your first practice session to start tracking readiness" instead of a weakness callout.
- Preparation module shows all three at 0% with bars empty — no fabricated numbers, status word becomes "Not started" in muted (not amber — amber implies risk, not absence).
- Outcomes strip shows 0 → 0 → 0, same layout, no chev-colored emphasis since nothing is in progress yet.
- Optional line at the bottom becomes an actual call to action: "Add your first placement drive" or "Log your first practice problem" — this is the one place a text link/button is appropriate.
- The dashboard should look like a clean starting point, not a broken/incomplete version of the populated one — same structure, just zeroed and worded for someone starting out.

---

## Final UX blueprint (build reference)

```
Sidebar (fixed, 200–220px, collapses to icons on tablet, drawer on mobile)
 ├─ Brand
 ├─ Nav: Dashboard*, Placement drives, Companies
 ├─ Group label: Practice
 │   └─ DSA, Competitive programming, Web development
 ├─ Notes
 └─ Account: Profile, Log out (bottom, separated)

Main
 ├─ Header: greeting + one-line real status + avatar
 ├─ Readiness panel (full width, 1 tier — dominant)
 ├─ Preparation panel (1 bordered panel, 3 hairline-divided columns)
 ├─ Outcomes strip (1 bordered row, 3 hairline-divided segments, chevrons)
 └─ (optional) 1 muted next-action / next-drive line
```

Visual rule of thumb carried into implementation: **borders + hairlines + spacing define structure; color only carries meaning; only one element on the page is allowed to be visually "loud" — the readiness number.**
