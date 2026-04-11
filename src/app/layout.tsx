import type { Metadata } from "next";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Samaya Global | Uplifting Women and Children",
  description: "Samaya Global is a US-based nonprofit dedicated to uplifting women and children facing emotional, social, and economic hardship.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Add suppressHydrationWarning here 👇 */}
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  )
}
