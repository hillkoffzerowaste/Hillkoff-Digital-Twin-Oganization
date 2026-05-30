# Deployment Guide

## 1. Configure Firebase

1. Create a Firebase project.
2. Enable Authentication, Firestore, Storage, Analytics, Messaging, and Functions.
3. Add a Web App and copy config values into `.env.local`.
4. Create a service account for server-side seed and Functions deployment.

## 2. Environment Variables

Copy `.env.example` to `.env.local` and fill:

- `NEXT_PUBLIC_FIREBASE_*`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `OPENAI_API_KEY`
- `LINE_CHANNEL_ACCESS_TOKEN`
- `LINE_CHANNEL_SECRET`

## 3. Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 4. Seed Data

```bash
npm run seed
```

This writes character profiles, deliveries, inventory, knowledge documents, scenarios, settings, and agent memories.

## 5. Firebase Rules

```bash
firebase deploy --only firestore:rules,storage
```

## 6. Functions

```bash
cd functions
npm install
npm run build
firebase deploy --only functions
```

## 7. Vercel

1. Import this repository into Vercel.
2. Set the same environment variables in Project Settings.
3. Deploy the Next.js app.

Use Firebase Hosting only for Functions, Firestore, Storage, and optional emulator workflows. Use Vercel for the Next.js production frontend.
