import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./global.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"], 
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Data Engineer — Harison Rios",
  description: "Portfólio - Harison Rios",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.variable}`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
