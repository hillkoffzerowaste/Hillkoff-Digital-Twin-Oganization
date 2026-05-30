# Hillkoff Digital Twin Organization

Living Digital Organization platform for Hillkoff. The system combines realtime Firebase data, AI Agents, character memory, and interactive simulators so users can ask questions, analyze operations, train staff, run meetings, and tell the company story.

## Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Shadcn-inspired local UI primitives
- Firebase Authentication, Firestore, Storage, Functions, Analytics, Cloud Messaging
- OpenAI API
- Vercel
- LINE OA integration-ready webhook

## Main Modules

- Dashboard: sales, delivery, inventory, ESG, KPI, and alerts
- AI Command Center: CEO, Sales, Delivery, Warehouse, ESG, HR, Finance, Customer, Knowledge, and Analytics agents
- Delivery Management: job status, route, driver, ETA
- Inventory Management: stock, reorder point, location alerts
- ESG Center: carbon, waste, circular packaging metrics
- Knowledge Center: SOP, manual, product knowledge, story documents, RAG-ready
- Character System: persona, avatar, expertise, access level, memory seed
- Organization Simulator: meeting, training, customer, crisis, executive, and story scenarios

## Project Structure

```txt
src/
  app/
    actions/          Server Actions for AI
    globals.css
    layout.tsx
    page.tsx
  components/
    ui/               Reusable UI primitives
  data/               Seedable platform data
  lib/
    firebase/         Client and admin setup
  types/              Domain types
functions/            Firebase Functions
docs/                 Schema, API, deployment docs
scripts/              Seed scripts
```

## Getting Started

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` for Firebase and OpenAI credentials.

## Verification

```bash
npm run typecheck
npm run build
```

## Notes

The AI Command Center works in demo mode without `OPENAI_API_KEY`. Once the key is set, the server action calls OpenAI with operational context and Thai-language instructions.
