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

const SITE_URL = "https://www.pratyakshworks.com";
const NAME = "Pratyaksh Krishnna";
const TITLE = `${NAME} — AI Engineer`;
const DESCRIPTION =
  "Pratyaksh Krishnna is an AI engineer building RAG systems, multi-agent workflows, and full-stack LLM products. Projects, experience, and contact.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${NAME}`,
  },
  description: DESCRIPTION,
  applicationName: NAME,
  keywords: [NAME, "Pratyaksh", "pratyakshworks", "AI engineer", "portfolio", "RAG", "multi-agent", "LLM", "full-stack", "open source"],
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "profile",
    firstName: "Pratyaksh",
    lastName: "Krishnna",
    url: "/portfolio",
    siteName: NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pratyaksh_k",
    creator: "@pratyaksh_k",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: NAME,
      url: `${SITE_URL}/portfolio`,
      image: `${SITE_URL}/images/avatar.jpg`,
      jobTitle: "AI Engineer",
      sameAs: [
        "https://www.linkedin.com/in/pratyaksh-krishnna/",
        "https://github.com/pratyaksh-krishnna",
        "https://x.com/pratyaksh_k",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: NAME,
      alternateName: "pratyakshworks",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
