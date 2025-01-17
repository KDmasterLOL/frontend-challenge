import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import LayoutTransition from "./LayoutTransition";

const roboto = Roboto({
  weight: ["400"],
  style: ["normal"],
  subsets: ["cyrillic"],
  variable: "--font-roboto",
});
export const metadata: Metadata = {
  title: "Котики",
  description: "Фотки котиков",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} font-roboto antialiased vsc-initialized`}
      >
        <Header></Header>
        <LayoutTransition>
          <main className="px-4 sm:px-[62px] py-4 sm:py-8">{children}</main>
        </LayoutTransition>
      </body>
    </html>
  );
}
