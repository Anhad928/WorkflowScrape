import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap content with ClerkProvider */}
        <ClerkProvider
          afterSignOutUrl={"/sign-in"}
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-sm !shadow-none",
            },
          }}
        >
          <AppProviders>{children}</AppProviders>
          {/* Place Toaster inside body */}
          <Toaster richColors />
        </ClerkProvider>
      </body>
    </html>
  );
}
