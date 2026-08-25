# Vela

A lightweight CRM for small sales teams. Scan a handwritten client sheet, let AI extract the data, and manage appointments and follow-ups from there.

**Live app:** [vela-brown-beta.vercel.app](https://vela-brown-beta.vercel.app)

## The problem

At Helzberg Diamonds, client intake still runs on paper "preferred client sheets" — handwritten forms with contact info, purchase notes, and callback reminders. Following up depends on someone remembering to check a stack of paper. Vela digitizes that intake: take a photo of the sheet, review the extracted data, and the client and their next follow-up are tracked automatically.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database & Auth:** Firebase (Firestore + Google Authentication)
- **AI:** Gemini Vision API (image-to-structured-data extraction)
- **Deployment:** Vercel

## Features

**Authentication & access**
- Google Sign-In via Firebase Auth
- Protected routes enforced by Next.js middleware, backed by a session cookie synced to the Firebase auth state
- Global auth state via React Context

**Dashboard**
- Three live sections built from a single reusable query: **Today's Appointments**, **Pending Callback**, and **Follow Up**
- Follow-up status is *calculated at query time* from the appointment date rather than stored and updated by a script — no cron jobs or Cloud Functions needed to keep it accurate
- Each appointment shows the client, lead priority, and assigned associates

**AI-powered client intake**
- Photograph a handwritten client sheet from the scanner view
- The image is sent (server-side only — the API key never touches the client) to Gemini, which returns structured JSON: name, contact info, address, key dates, ring size, and purchase notes
- Extracted data prefills a review form where the associate confirms or corrects it before saving — nothing is written to the database without human review

**Client & appointment management**
- Full client directory with cursor-based pagination (Firestore `startAfter`, not offset-based) so the read cost stays flat regardless of client count
- Every client and appointment can have up to 3 co-owners (associates who share responsibility for that account)
- Associates are matched by initials extracted from the photo; if two associates share initials, both are shown by full name so the user picks the right one manually
- Sale status per appointment (`set_up` → `pending_callback` → `discarded` / `sale_closed`) drives which dashboard section an appointment appears in

## Architecture notes

A few deliberate decisions worth calling out:

- **No cron jobs for follow-ups.** Instead of a scheduled job flipping appointment status daily, "follow up" is a derived state: any appointment past its date that isn't discarded or closed. Simpler to reason about, nothing to monitor, and no infrastructure cost.
- **Client notes are mutable in this version.** In the physical process, notes are meant to be append-only. Making that change in Firestore touches the schema, the services, and every consuming component, so it's scoped for a v2 rather than the MVP.

## Local Setup

```bash
git clone https://github.com/parranopolis/Vela.git
cd Vela
npm install
```

Create a `.env.local` file with:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
GEMINI_API_KEY=
```

Run the dev server:

```bash
npm run dev
```

## Known limitations

- Gemini's free tier caps daily image-extraction requests — fine for a demo, would need a paid tier for real multi-associate daily use
- No automated tests yet
- UI is functional but not fully polished (in progress)

## Roadmap

- [ ] Automated tests (Vitest)
- [ ] Framer Motion transitions + dark mode
- [ ] Append-only note history
- [ ] Week/Month dashboard views