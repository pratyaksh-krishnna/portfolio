import ThemeProvider from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Dancing_Script, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pratyakshworks.com"),
  title: "pratyakshworks",
  description: "portfolio — projects, writing, and contact",
  keywords: ["AI engineer", "portfolio", "RAG", "multi-agent", "LLM", "full-stack", "open source"],
  authors: [{ name: "Pratyaksh Krishnna" }],
  openGraph: {
    title: "pratyaksh",
    description: "portfolio — projects, writing, and contact",
    type: "website",
    url: "https://pratyakshworks.com",
    siteName: "pratyakshworks",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "pratyaksh- personal space",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pratyaksh_k",
    creator: "@pratyaksh_k",
    title: "pratyaksh",
    description: "portfolio — projects, writing, and contact",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} ${dancingScript.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light')}catch(e){}})()`,
          }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
