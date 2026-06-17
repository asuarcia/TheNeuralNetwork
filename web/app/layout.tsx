import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Preloader } from "@/components/site/Preloader";

export const metadata: Metadata = {
  title: "TheNeuralNetwork — Master AI at Any Level",
  description:
    "Learn artificial intelligence by building — from beginner fundamentals to advanced neural architectures. Interactive lessons, real code, structured paths.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-neutral-950 min-h-screen text-white antialiased selection:bg-violet-500/20">
        <Preloader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
