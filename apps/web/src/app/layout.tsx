import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FounderSignal — GTM Intelligence",
  description: "Search, qualify, reveal and export high-fit B2B prospects."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
