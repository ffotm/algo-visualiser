import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./navBar";
import Home from "./page";
import Preview from "./preview";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Electrolize&family=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=Instrument+Serif:ital@0;1&family=Lusitana:wght@400;700&display=swap');
        font-family: "Electrolize", sans-serif;
      </style>
      <body >

        {children}
      </body>
    </html>
  );
}
