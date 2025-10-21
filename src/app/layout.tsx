import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import { StepProvider } from "@/context/StepContext";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"]
});

export const metadata: Metadata = {
  title: "FocusPlan",
  description: "Sistema de planejamento de tarefas e estudo com Pomodoro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${lexend.variable} font-sans antialiased`}
      >
        <StepProvider>{children}</StepProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
