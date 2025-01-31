import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Insurance app",
  description: "Insurance app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <header className="w-full bg-white shadow-sm">
          <Header />
        </header>
        <main className="w-full">
          <div className="container mx-auto space-y-8 py-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
