# StellarStream - Pay-Per-Second Video Streaming Platform

## Overview

StellarStream is a blockchain-powered video streaming platform built on the Stellar network that enables true micropayments for content consumption. The platform allows viewers to pay per second of content watched, eliminating traditional subscription models. Creators receive instant payments every 10 seconds through smart contracts, and viewers maintain full control of their funds through personal "smart meter" contracts.

The application demonstrates the power of Stellar's Soroban smart contracts for handling micropayments that traditional payment systems cannot process efficiently. It features a familiar Netflix-style interface combined with transparent, real-time blockchain billing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**UI Library**: Shadcn/ui components built on Radix UI primitives, providing accessible and customizable components following a "New York" style theme.

**Styling**: 
- Tailwind CSS with a custom design system
- Dark mode support with light mode default
- Custom color palette focused on trust and clarity for financial transactions
- Design references: Stripe (financial clarity), Coinbase/Phantom (blockchain patterns), Plex (premium aesthetics), Netflix (content browsing)

**State Management**:
- React Query (@tanstack/react-query) for server state management
- Local React state (useState, useEffect) for UI state
- WebSocket connections for real-time billing updates

**Routing**: Wouter for lightweight client-side routing

**Key Pages**:
- Home: Marketing page with hero section, benefits, and featured content
- Browse: Content gallery with video cards and filtering
- VideoPlayer: Real-time streaming with live billing meter
- Account: Transaction history and balance management

**Design System**:
- Typography: Inter for UI/headings, monospace fonts (Roboto Mono/Fira Code) for financial data
- Color scheme: Deep slate/navy backgrounds (#0F172A), Stellar Blue accent (#00A9FF), semantic colors for status
- Spacing: 8-point grid system for consistent layouts
- Components: Generous padding, subtle borders, rounded corners

### Backend Architecture

**Runtime**: Node.js with Express.js framework

**Language**: TypeScript with ESNext modules

**API Structure**: RESTful endpoints for content management
- GET `/api/content` - Retrieve all videos
- GET `/api/content/:id` - Retrieve specific video details

**Real-time Communication**: WebSocket server (ws library) for live billing updates
- Handles viewer "heartbeat" pings every 10 seconds
- Calculates micropayment fees based on watch time
- Triggers smart contract withdrawals through Stellar SDK
- Automatically stops billing when connection closes

**Session Management**: Express sessions with connect-pg-simple for PostgreSQL-backed session storage

**Build Process**: 
- Client: Vite bundler
- Server: esbuild for ESM bundle creation
- Deployment: Separate build and start scripts for production

### Data Storage

**Database**: PostgreSQL (via Neon serverless)

**ORM**: Drizzle ORM with type-safe schema definitions

**Schema Design**:
- `users` table: User authentication (id, username, password)
- `content` table: Video metadata including:
  - Core fields: title, creator, description, thumbnailUrl, duration
  - Blockchain fields: creatorWallet (Stellar address), pricePerTick (payment rate)
  - Analytics: views counter
  - Pricing model: pricePerTick represents cost per 10-second interval

**Migration Strategy**: Drizzle Kit for schema migrations with push-based deployment

**Database Configuration**: Connection pooling via @neondatabase/serverless with WebSocket support for serverless environments

### Authentication & Authorization

**Wallet-Based Authentication**: Freighter wallet integration (@stellar/freighter-api) for Stellar blockchain authentication
- No traditional username/password for viewers
- Wallet signature verification for identity
- Persistent wallet connection state in UI

**User Model**: Basic users table exists but primary auth flow is wallet-based

### Blockchain Integration

**Network**: Stellar blockchain with Soroban smart contracts

**SDK**: @stellar/stellar-sdk for transaction building and submission

**Smart Contract Architecture** (planned, not yet implemented):
- Personal "Smart Meter" contract per user holds pre-funded balance
- Creator can withdraw micropayments via `withdraw(amount)` function
- Trustless design: viewer funds remain under their control
- Backend calls contract functions but cannot access funds directly

**Payment Flow**:
1. Viewer deposits XLM to their smart meter contract
2. Backend sends heartbeat-triggered withdrawal requests
3. Smart contract validates and transfers micro-amounts to creator
4. Remaining balance stays safe for future viewing sessions

**Wallet Integration**: Freighter browser extension for transaction signing

**Network Configuration**: Uses Stellar testnet for development, configurable for mainnet deployment

## External Dependencies

### Third-Party Services

**Database**: Neon Serverless PostgreSQL
- Managed PostgreSQL with WebSocket support
- Connection via DATABASE_URL environment variable
- Requires provisioning before deployment

**Blockchain**: Stellar Network
- Testnet for development
- Mainnet for production deployment
- Requires funded creator wallets for receiving payments

### Key External Libraries

**UI Components**: 
- @radix-ui/* family (20+ component primitives)
- cmdk for command palette functionality
- date-fns for date formatting

**Blockchain**:
- @stellar/stellar-sdk - Core Stellar functionality
- @stellar/freighter-api - Wallet connection and signing

**Data Layer**:
- drizzle-orm - Type-safe database queries
- @neondatabase/serverless - Serverless PostgreSQL client
- zod - Schema validation (via drizzle-zod)

**Build Tools**:
- Vite - Frontend bundler and dev server
- esbuild - Backend bundler for production
- TypeScript - Type checking across full stack

**Development Tools**:
- @replit/vite-plugin-* - Replit-specific development enhancements
- ws - WebSocket server implementation

### Environment Variables

Required configuration:
- `DATABASE_URL` - PostgreSQL connection string (Neon)
- `NODE_ENV` - Environment flag (development/production)

Blockchain configuration (to be added):
- Smart contract addresses for deployed meters
- Stellar network selection (testnet/mainnet)
- Creator wallet addresses for payment routing

### Asset Management

**Static Assets**: Stored in `attached_assets` directory
- Generated thumbnail images for video content
- Design reference documents
- Technical implementation guides

**Image Handling**: Direct imports via Vite's asset pipeline with TypeScript path aliases