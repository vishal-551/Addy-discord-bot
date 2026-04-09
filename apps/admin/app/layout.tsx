import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="container" style={{ display: "flex", gap: 16 }}>
          <Link href="/">Addy Admin</Link>
          <Link href="/bots">Bots</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
