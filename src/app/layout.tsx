import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reserve CRM",
  description: "Small salon reservation and CRM system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
