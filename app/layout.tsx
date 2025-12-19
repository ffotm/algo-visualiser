import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./navBar";
import Home from "./page";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body>
        <NavBar />

        {children}
      </body>
    </html>
  );
}
