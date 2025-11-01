# Stellar Micropayment Streaming Platform - Design Guidelines

## Design Approach

**Selected Approach:** Hybrid Reference-Based drawing from:
- **YouTube/Vimeo** for video catalog and player patterns
- **Coinbase/Phantom Wallet** for blockchain interaction clarity
- **Linear/Vercel** for modern, clean tech aesthetic
- **Netflix** for content browsing experience

**Core Principle:** Make complex blockchain micropayments feel effortlessly simple through clear visual hierarchy, real-time feedback, and intuitive workflows.

---

## Typography System

**Primary Font:** Inter (Google Fonts) - exceptional readability for UI and financial data
**Accent Font:** Space Grotesk (Google Fonts) - modern, tech-forward for hero headlines

**Hierarchy:**
- Hero Headlines: Space Grotesk, 56px (desktop) / 36px (mobile), font-weight 700, tracking tight (-0.02em)
- Section Titles: Inter, 32px (desktop) / 24px (mobile), font-weight 700
- Video Titles: Inter, 20px, font-weight 600
- Body Text: Inter, 16px, font-weight 400, line-height 1.6
- UI Labels: Inter, 14px, font-weight 500, tracking wide (0.01em)
- Pricing/Financial Data: Inter, 16px, font-weight 600, tabular numbers
- Micro-copy/Helper Text: Inter, 13px, font-weight 400, slightly muted opacity

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Tight spacing (form elements, cards): p-4, gap-2
- Standard spacing (sections, containers): p-8, gap-6
- Generous spacing (page sections): py-16 to py-24, gap-12

**Grid System:**
- Video Gallery: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Feature Sections: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Container: max-w-7xl mx-auto px-6

---

## Component Library

### Navigation
**Desktop Header:**
- Fixed top position with subtle backdrop blur
- Logo left, primary nav center (How It Works, Browse Videos, Wallet), Connect Wallet button right
- Height: h-16
- Balance indicator when wallet connected (pill-shaped badge showing XLM balance with refresh icon)

**Mobile:**
- Hamburger menu (top-right)
- Logo top-left
- Full-screen overlay menu with large touch targets (min-h-14 each)

### Hero Section (Landing Page)
**Layout:** Full viewport height (min-h-screen) split layout
- Left 60%: Content area with headline, subheading, dual CTAs, trust indicators
- Right 40%: Animated visualization showing "streaming meter" concept (video player preview with ticking balance display)

**Content Structure:**
- Headline: "Stream Content. Pay Only for What You Watch."
- Subheading: "Blockchain-powered micropayments. Pay per second. Keep your funds safe."
- Primary CTA: "Start Watching" (large, prominent)
- Secondary CTA: "See How It Works" (outlined style)
- Trust indicators: "Built on Stellar • 0.001 XLM/sec average • Zero subscription fees"

### Video Gallery Cards
**Card Design:**
- Aspect ratio: 16:9 thumbnail with rounded corners (rounded-xl)
- Hover state: Subtle lift (scale-105) with shadow increase
- Overlay on hover: Play icon, duration badge
- Below thumbnail:
  - Video title (truncate after 2 lines)
  - Creator name (smaller, muted)
  - Pricing: "0.001 XLM/sec" in pill badge
  - Stats row: Views count, rating (if applicable)

**Grid:** Responsive 1-2-3-4 column layout with gap-6

### Video Player Interface
**Layout:** Theater mode player
- Video: 16:9 ratio, max-width centered
- Below player:
  - Left: Video title, creator info, description (expandable)
  - Right: Billing meter card (sticky position)

**Billing Meter Card:**
- Prominent card (rounded-2xl, elevated shadow)
- Real-time balance display (large numbers, tabular)
- "Cost/second" indicator
- "Time watched" counter
- "Total spent this session" running total
- Progress bar showing depletion rate
- "Top Up" button when balance < 1 XLM
- Status indicator: "Streaming" (green pulse) / "Paused" / "Disconnected"

**Player Controls:**
- Standard controls: Play/pause, timeline scrubber, volume, fullscreen
- Custom addition: Balance warning overlay when funds low (15 seconds remaining)

### Wallet Connection Flow
**Connect Button States:**
1. Disconnected: "Connect Wallet" (prominent styling)
2. Connecting: Loading spinner with "Connecting..."
3. Connected: Truncated address (0x1234...5678) with dropdown menu
   - Dropdown shows: Full address (copy button), balance, view transactions, disconnect

**Top-Up Modal:**
- Centered modal (max-w-md)
- Header: "Add Funds to Streaming Meter"
- Input: Amount selector with preset buttons (5 XLM, 10 XLM, 25 XLM, Custom)
- Calculation preview: "≈ X hours of streaming at avg 0.001 XLM/sec"
- Confirm button triggers Freighter wallet
- Loading state during blockchain confirmation
- Success state with transaction hash link

### Landing Page Sections

**How It Works (3-column grid):**
1. "Fund Your Meter" - Icon: Wallet, Description: Deposit XLM to your smart contract
2. "Watch & Stream" - Icon: Play, Description: Pay automatically per second watched
3. "Keep the Rest" - Icon: Shield, Description: Remaining funds stay in your contract

**Benefits Section (2-column feature blocks):**
- "True Micropayments" feature with visual of small transaction amounts
- "No Subscriptions" feature with crossed-out calendar
- "Trustless & Secure" feature with blockchain visualization
- "Instant Creator Payouts" feature with real-time payment flow

**Stats Bar:** Full-width, centered
- "10,000+ Videos Streamed"
- "$50K+ Paid to Creators"
- "0.0001 XLM Avg Transaction Fee"

**Creator CTA Section:**
- Split layout: Left - "Start Earning from Your Content", Right - "List Your Video" form preview
- Highlight: "Receive payments every 10 seconds"

### Footer
**Multi-column layout:**
- Column 1: Logo, tagline, social links
- Column 2: Product (How It Works, Pricing Calculator, FAQ)
- Column 3: Resources (Stellar Docs, Soroban Guide, Support)
- Column 4: Newsletter signup (simple email input + subscribe button)
- Bottom row: Copyright, Terms, Privacy, Stellar network status indicator

---

## Real-Time Feedback Elements

**Connection Status Indicators:**
- WebSocket connection: Small dot indicator (green/yellow/red) with tooltip
- Blockchain confirmation: Progress toast notifications
- Balance updates: Smooth number transitions with subtle highlight flash

**Loading States:**
- Video buffering: Skeleton loader over player
- Transaction pending: Spinner with estimated time
- Gallery loading: Shimmer effect on card skeletons

---

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px - Single column, stacked layouts
- Tablet: 768px-1024px - 2-column grids, condensed navigation
- Desktop: > 1024px - Full multi-column layouts

**Video Player:** 
- Mobile: Full-width player, billing meter moves below
- Desktop: Side-by-side layout with sticky billing card

---

## Accessibility

- All interactive elements: min-h-11 touch targets
- Form inputs: Clear labels, error states with icons and text
- Balance displays: Always show currency symbol, use aria-live for updates
- Keyboard navigation: Full support with visible focus states (ring-2 offset)
- Screen reader: Announce balance changes, connection status updates

---

## Images

**Hero Section:** Large visual showing abstract representation of streaming content with overlay of "meter" ticking down - suggest using a blurred video montage with glowing XLM coin elements

**How It Works Icons:** Use Heroicons for consistency (wallet, play-circle, shield-check)

**Video Thumbnails:** Real video preview frames or high-quality placeholder images per video

**No generic stock photography** - all visuals should reinforce the blockchain/streaming concept through modern, tech-forward imagery