# Stellar Micropayment Streaming Platform - Design Guidelines

## Visual Theme: "Modern Tech / FinTech Dark Mode"

**Core Principle:** Build trust for a new type of financial transaction through clarity, precision, and professional polish. The UI must make users feel secure, in control, and informed as they stream their money.

**Design References:**
- **Stripe** for financial clarity and data-rich interfaces
- **Coinbase/Phantom Wallet** for blockchain interaction patterns
- **Plex** for premium media server aesthetics
- **Netflix** for familiar content browsing
- **Linear/Vercel** for modern, clean tech aesthetic

---

## Color Palette: "Trustworthy Dark Mode"

### Backgrounds
- **Primary Background:** Deep slate/navy (`#0F172A` / `#111827`) - Professional, not pure black
- **Card/Panel Backgrounds:** Slightly lighter dark grey (`#1E293B`) - Subtle elevation
- **Reason:** Dark themes make video content "pop" and feel premium while avoiding OLED burn-in

### Accent Colors
- **Primary Accent:** Stellar Blue (`#00A9FF` / `#0EA5E9`) - High-contrast, tech-forward
- **Success/Live Indicator:** Tech Green (`#10B981`) - For streaming status and positive actions
- **Used For:** Buttons, links, financial actions, live indicators

### Text Hierarchy
- **Headings:** Pure white (`#FFFFFF`) or very light grey (`#F1F5F9`)
- **Body/Descriptions:** Softer off-white grey (`#E2E8F0`) - Easier on eyes for long reading
- **Muted/Secondary:** Medium grey (`#94A3B8`) - Labels, metadata
- **Financial Data:** Always in monospace font for precision

### Borders & Dividers
- **Subtle Borders:** Very dark grey (`#334155`) - Just enough contrast to define boundaries
- **Principle:** Generous spacing reduces need for heavy borders

---

## Typography System

### Font Families

1. **UI & Headings - "The Human Font"**
   - **Primary:** Inter (Google Fonts)
   - **Usage:** Navigation, headings, body text, buttons, labels
   - **Why:** Clean, modern, designed specifically for UI readability

2. **Display Headlines**
   - **Accent Font:** Space Grotesk (Google Fonts)  
   - **Usage:** Hero headlines, major section titles
   - **Why:** Modern, tech-forward personality

3. **Numbers & Data - "The Trust Font"** ⭐
   - **Monospace:** Roboto Mono or Fira Code
   - **Usage:** ALL financial amounts, balances, transaction IDs, timestamps, prices
   - **Why:** Visually separates "data" from "text" - creates subconscious trust like a bank statement
   - **Example:**
     - Title: `Italian Pasta Masterclass` (Inter)
     - Balance: `4.9700 XLM` (Roboto Mono)

### Type Scale
- **Hero Headlines:** Space Grotesk, 56px (desktop) / 36px (mobile), font-weight 700, tracking tight (-0.02em)
- **Section Titles:** Inter, 32px (desktop) / 24px (mobile), font-weight 700
- **Video Titles:** Inter, 20px, font-weight 600
- **Body Text:** Inter, 16px, font-weight 400, line-height 1.6
- **UI Labels:** Inter, 14px, font-weight 500
- **Financial Data:** Roboto Mono, 16px-40px (context-dependent), font-weight 500-700, tabular-nums
- **Micro-copy:** Inter, 13px, font-weight 400

---

## Layout System

### Spacing Philosophy
**8-Point Grid System:** All margins, padding, and gaps in multiples of 8px

- **Tight spacing** (form elements, compact cards): 8px (p-2), 16px (p-4)
- **Standard spacing** (sections, cards): 24px (p-6), 32px (p-8)
- **Generous spacing** (page sections): 64px (py-16), 96px (py-24)

**Key Principle:** Spacious UI feels calm and premium. Avoid crowding - it feels cheap and chaotic.

### Grid System
- **Video Gallery:** grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- **Container:** max-w-7xl mx-auto px-6
- **Netflix-style carousels:** Horizontal scrolling with snap points

### Visual Elements
- **Corners:** Subtle rounded corners (`rounded-lg` / `rounded-xl`) on all cards and buttons
- **Borders:** Very subtle (`border-gray-700` equivalent) to separate panels when needed
- **Shadows:** Minimal - only for true elevation (modals, dropdowns)

---

## Key Trust-Building Components

### 1. The "Meter" Component (Header Wallet)

**Always Visible in Top-Right Corner**

**State 1 - Disconnected:**
```
[ Connect Wallet ]
```

**State 2 - Connected:**
```
[ Meter Balance: 5.0000 XLM ]
```
- Shows smart contract balance (not whole wallet)
- Monospace font for the number
- Clear labeling: "Meter Balance" not just "Balance"
- Dropdown menu: View Account, Copy Address, Disconnect

### 2. The "Live Meter" Overlay (Video Player)

**Positioned:** Top-left corner of video player
**Design:** Semi-transparent badge with backdrop blur

**Streaming State:**
```
🟢 STREAMING | 4.9700 XLM
```
- Green dot with slow pulse animation
- Status in bold caps: "STREAMING"
- Balance in monospace

**Paused State:**
```
⏸ PAUSED | 4.9700 XLM
```
- Grey/yellow static dot
- Proves user control - billing has stopped

### 3. The "Tick" Animation ⭐ CRITICAL

**The "Money Shot" for Demo**

When balance updates every 10 seconds:
- **Before:** `4.9700 XLM`
- **During (0.3-0.5s):** Number flashes **bright green** (`text-green-500`)
- **After:** Fades back to normal color

**Implementation:**
```tsx
const [balanceJustChanged, setBalanceJustChanged] = useState(false);

useEffect(() => {
  if (isStreaming) {
    setBalanceJustChanged(true);
    setTimeout(() => setBalanceJustChanged(false), 300);
  }
}, [balance]);

<div className={`font-mono text-3xl font-bold transition-colors duration-300 ${
  balanceJustChanged ? 'text-green-500' : ''
}`}>
  {balance.toFixed(4)} XLM
</div>
```

**Why This Matters:** This tiny "juice" gives satisfying, visible proof that transactions are happening in real-time.

### 4. Video Card Price Tags

**Don't show per-second** - it's meaningless (`0.001 XLM`)

**Do show per-hour** - clear budgeting:
```
~3.60 XLM/hour
```
- Monospace font
- Tilde (~) indicates approximate
- Pill-shaped badge with subtle outline

### 5. Transaction History Table

**Design like a bank ledger:**
- Clean table with clear column headers
- **All numbers in monospace font**
- Deposits in **green** (`text-green-600`)
- Payments in white/muted
- "Confirmed" status badges
- Export button for transparency

**Columns:**
| Date & Time | Content | Amount | Status |
|-------------|---------|--------|--------|
| 11/01/2025 1:12 PM | Deposit | +5.00 XLM | Confirmed |
| 11/01/2025 1:14 PM | "Sintel" | -0.01 XLM | Confirmed |

---

## Real-Time Feedback Elements

### Connection Status Indicators
- **WebSocket:** Small dot (green/yellow/red) with tooltip
- **Blockchain:** Progress toast notifications
- **Balance Updates:** "Tick" animation with green flash

### Loading States
- **Video Buffering:** Skeleton loader
- **Transaction Pending:** Spinner with estimated time
- **Gallery Loading:** Shimmer effect on card skeletons

### Status Badges
- **Streaming:** Green pulse dot + "STREAMING" in bold
- **Paused:** Grey static dot + "PAUSED"
- **Low Balance:** Yellow/orange warning state

---

## Component Library

### Video Gallery Cards
- 16:9 thumbnail with rounded corners (`rounded-xl`)
- Hover: Subtle lift (`scale-105`) with shadow
- Play icon overlay on hover
- Duration badge (bottom-right)
- Title (2-line truncate)
- Creator name (muted)
- **Price badge:** `~3.60 XLM/hour` (monospace, prominent)
- Views count (if available)

### Billing Meter Card (Video Player)
- Sticky position on desktop
- Large balance display (monospace, 36-40px)
- Status badge: STREAMING/PAUSED
- Progress bar showing depletion
- Price per hour (monospace)
- Time watched
- Total spent this session
- "Top Up Meter" button
- Low balance warning when < 1 XLM

### Top-Up Modal
- Centered modal (max-w-md)
- "Add Funds to Streaming Meter" header
- Preset amounts: 5 XLM, 10 XLM, 25 XLM, Custom
- Calculation preview: "≈ X hours of streaming"
- Freighter wallet integration
- Success state with transaction hash link

### Account Page
**Balance Management Section:**
- Current balance (large, monospace)
- Smart contract address (copyable)
- "Top Up Meter" button
- "Withdraw to Wallet" button - **HUGE trust builder**
- Disclaimer: "Your funds are always under your control"

**Transaction History Section:**
- Query actual Stellar Horizon API
- Verifiable on-chain proof
- Export functionality
- Clean table design with monospace numbers

---

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px - Single column, stacked
- Tablet: 768px-1024px - 2-column grids
- Desktop: > 1024px - Full multi-column

**Video Player:**
- Mobile: Full-width, billing meter below
- Desktop: Side-by-side with sticky billing card

---

## Accessibility

- All interactive elements: min-h-11 touch targets
- Clear labels with error states
- Balance displays: aria-live for screen reader updates
- Keyboard navigation: Full support with visible focus states
- Announce: Balance changes, connection status updates

---

## Trust-Building Principles Summary

1. **Transparency:** Always show where money is going
2. **Control:** Pause = billing stops, withdraw anytime
3. **Precision:** Monospace fonts for all financial data
4. **Feedback:** Visual "tick" proves system is working
5. **Familiarity:** Netflix-like browsing + wallet clarity
6. **Clarity:** Price per hour, not per second
