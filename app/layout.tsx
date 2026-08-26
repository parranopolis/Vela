import { AuthProvider, useAuth } from "@/lib/firebase/auth-context";
import type { Metadata } from "next";
import Script from 'next/script'
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vela",
  description: "A lightweight CRM built for small sales teams — specifically designed around a workflow where reps capture client info from photos (business cards, notes, forms) using Gemini AI, then manage appointments and follow-ups through a clean dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children} 
        </AuthProvider>
        <Script type="module" src="https://unpkg.com/ionicons@8.0.13/dist/ionicons/ionicons.esm.js"></Script>
        {/* <script type="module" src="https://unpkg.com/ionicons@8.0.13/dist/ionicons/ionicons.esm.js"></script> */}
        <Script noModule src="https://unpkg.com/ionicons@8.0.13/dist/ionicons/ionicons.js"></Script>
      </body>
    </html>
  );
}
