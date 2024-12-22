"use client";

import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function AppProviders({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
  return <ThemeProvider attribute="class"
  defaultTheme="system" enableSystem>
    {children}
  </ThemeProvider>
}

