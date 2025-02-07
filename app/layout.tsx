import type { Metadata } from "next";
import { Header } from "@/components/header";
import "./globals.css";

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
        <main className="w-full h-full">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
