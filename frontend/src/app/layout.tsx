import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SolanaWalletProvider } from "../components/SolanaWalletProvider";

export const metadata: Metadata = {
  title: "HyperToken - Solana Token Creator",
  description: "Create, manage, and trade tokens on Solana blockchain",
  keywords: ["solana", "defi", "tokens", "trading", "blockchain"],
  authors: [{ name: "HyperToken Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="gradient-bg">
      <body className="gradient-bg text-white min-h-screen">
        <SolanaWalletProvider>
          {children}
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
