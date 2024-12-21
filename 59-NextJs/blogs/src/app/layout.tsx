import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import NavMenu from "@/components/NavMenu";

export const metadata: Metadata = {
  title: "Blog",
  description: "NextJs project - Blogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <SessionProvider>
            <NavMenu />
            {children}
          </SessionProvider>
      </body>
    </html>
  );
}
