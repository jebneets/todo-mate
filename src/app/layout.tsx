import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";
import { TRPCReactProvider } from "~/trpc/react";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Todo List",
  description: "Todo list application built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body className={poppins.className}>
        <TRPCReactProvider>
          <SessionWrapper>
            {children}
          </SessionWrapper>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
