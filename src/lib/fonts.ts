import { Space_Grotesk, Geist, JetBrains_Mono } from "next/font/google";

const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const fonts = { display, body, mono };
