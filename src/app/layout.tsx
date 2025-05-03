import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import DarkModeProvider from './DarkModeProvider'

export const metadata: Metadata = {
  title: "FitBuddy AI - Futuristic Fitness",
  description: "AI-powered fitness companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
        if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(reg => console.log('Service Worker registered'))
          .catch(err => console.log('Service Worker registration failed: ', err));
          });
    }
  `
        }} />
      </head>
      <body>
        <Navbar />
        <DarkModeProvider>
          <main>
            {children}
          </main>
        </DarkModeProvider>
      </body>
    </html>
  );
}