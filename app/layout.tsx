import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToasterClient } from "./_components/ToasterClient";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Member Service Portal",
  description: "Secure Member Data Submission Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <ToasterClient />
        {children}
      </body>
    </html>
  );
}
