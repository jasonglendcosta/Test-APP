# Homepage Rebuild Plan

## Goal
Rebuild homepage to be 95% identical to original ODSDEV app, with 5% change being a popup for current launch project brief linking to subpage.

## Todo Items

- [x] Update globals.css with original styling (nav, hero, sections, cards, KPIs, modal)
- [x] Rewrite page.tsx to match original structure exactly
- [x] Add project brief popup modal component
- [x] Add popup trigger (auto-show on load)
- [x] Link popup button to One Residence subpage
- [x] Test and verify layout compiles

---

## Review Section

### Summary of Changes

**1. globals.css - Complete Rewrite**
- Added all original CSS classes from ODSDEV bundle
- Navigation, Hero, Stats, Section headers
- Vision grid (5 cards), Ecosystem grid (4 cards)
- ONE App section with hub/spoke visual
- Timeline bar with Q1-Q4 animation
- KPI dashboard cards with hover effects
- Phase tabs and initiative cards
- Modal popup styling with animations
- Responsive breakpoints for mobile

**2. page.tsx - Complete Rewrite**
- Restructured to match original ODSDEV layout:
  - **Navigation**: Logo + Vision, ONE App, Roadmap, Project Brief links
  - **Hero**: "2026 Strategic Blueprint" / "Digital Transformation" + 3 stats
  - **Vision Section**: 5 AI pillars cards
  - **Ecosystem Section**: 4 AI domain cards
  - **ONE App Section**: Central hub with 5 spokes
  - **Action Plan**: Timeline, 5 KPIs, tabbed initiatives
- All initiative data from original (Delivered, In Progress, Q1-Q4, ONE App)
- Project Brief subpage kept with tabs (Overview, Units, Financials, Amenities)

**3. Popup Modal (5% Change)**
- Auto-shows 2 seconds after page load (first visit only)
- Uses sessionStorage to prevent repeat displays
- Shows One Residence summary (196 units, 452M AED, 2028)
- "View Full Project Brief" button navigates to subpage
- Can be dismissed with X button or clicking outside

### Files Modified
- `/src/styles/globals.css` - 900+ lines of original styling
- `/src/app/page.tsx` - Complete homepage + project brief page

### Testing
- App compiles successfully at http://localhost:3000
- Minor Next.js warnings about metadata (non-blocking)
