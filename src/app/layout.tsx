import type { Metadata } from "next";
import "./globals.css";
import Chatbot from "../components/Chatbot";

export const metadata: Metadata = {
  title: "Samaya Global | Uplifting Women and Children",
  description: "Samaya Global is a US-based nonprofit dedicated to uplifting women and children facing emotional, social, and economic hardship.",
  icons: {
    icon: '/images/logo/samaya logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased">
        {children}
        
        {/* The bot goes right here below children! */}
        <Chatbot /> 
      </body>
    </html>
  )
}