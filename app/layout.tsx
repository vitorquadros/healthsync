import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarePulse",
  description: "Sistema de gerenciamento de saúde",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
