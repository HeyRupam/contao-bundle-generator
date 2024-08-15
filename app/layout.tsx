import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import FootBar from "./components/FootBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Contao Bundle Generator",
  description: "Contao Bundle Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        <FootBar />
        </body>
    </html>
  );
}
