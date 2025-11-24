import type { ReactNode } from "react";

import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Next.js Starter Kit",
    template: "%s | Next.js Starter Kit",
  },
  description: "Advanced Next.js starter kit with strict TypeScript and ESLint",
  keywords: ["nextjs", "react", "typescript", "tailwindcss"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  robots: {
    index: true,
    follow: true,
  },
};

interface IRootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps): ReactNode {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
