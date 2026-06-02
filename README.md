# Vela

A lightweight CRM for small sales teams.
Extracts client data from photos using AI
and manages appointments and follow-up reminders.

## Tech Stack
- Next.js 14 + TypeScript
- Tailwind CSS
- Firebase (Auth + Firestore)
- Gemini Vision API

## Current Features
- Google Authentication
- Protected routes with Next.js middleware
- Global session observer via Context API

## In Progress
- Main dashboard
- Client management
- AI-powered data extraction from photos
- Appointments and reminders

## Local Setup
1. Clone the repo
2. Install dependencies: `npm install`
3. Create `.env.local` with your Firebase variables
4. Run the project: `npm run dev`

## Environment Variables
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=