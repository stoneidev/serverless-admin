"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration";

Amplify.configure(config, { ssr: true });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            {children}
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
