import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideMenu from "./SideMenu";
import { ThemeProvider } from "@/components/theme-provider";
import ConsoleWindow from "@/components/console-window/console-window";
import { ConsoleWindowProvider } from "@/components/console-window/console-window-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConsoleWindowProvider>
            <div className="flex flex-row gap-4">
              <SideMenu />
              <main>{children}</main>
            </div>
            {modal}
            <ConsoleWindow />
          </ConsoleWindowProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
