import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "日本語チューター — Japanese AI Tutor",
  description: "Practice conversational Japanese with an AI tutor",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={geist.className}>{children}</body>
    </html>
  );
}
