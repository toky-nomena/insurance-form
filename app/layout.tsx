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
      <body>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto">{children}</div>]
        </div>
      </body>
    </html>
  );
}
