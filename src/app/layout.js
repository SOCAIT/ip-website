import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import FloatingAIButton from "@/components/FloatingAIButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Loaded here rather than via an @import in globals.css, which was a
// render-blocking request to fonts.googleapis.com on every page load.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata = {
  metadataBase: new URL('https://www.ipastellas.com'),
  title: {
    default: "Ioannis Pastellas | Machine Learning Engineer | Μηχανικός Μηχανικής Μάθησης",
    template: "%s | Ioannis Pastellas"
  },
  description: "Portfolio of Ioannis Pastellas. Machine Learning Engineer working on reinforcement learning, multi-agent systems, and applied ML. | Χαρτοφυλάκιο του Ιωάννη Παστέλλα. Μηχανικός Μηχανικής Μάθησης με εξειδίκευση στην Τεχνητή Νοημοσύνη και την ενισχυτική μάθηση.",
  icons: {
    icon: [
      { url: '/socait.ico', type: 'image/x-icon', sizes: 'any' },
      { url: '/ip_no_slogan.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/ip_no_slogan.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/ip_no_slogan.png',
      },
    ],
  },
  keywords: [
    // English keywords
    "Ioannis Pastellas",
    "Machine Learning Engineer",
    "AI Specialist",
    "Deep Learning",
    "Artificial Intelligence",
    "Software Engineer",
    "Portfolio",
    "ML Projects",
    "AI Solutions",
    "Python",
    "TensorFlow",
    "PyTorch",
    "Computer Vision",
    "NLP",
    "Optimization Algorithms",
    // Greek keywords (Ελληνικά) - Multiple variations for better search coverage
    "Ιωάννης Παστέλλας",
    "Ιωάννης Παστελλας", // Without accent - common search variation
    "Ioannis Pastellas Κύπρος",
    "Ioannis Pastellas Cyprus",
    "Μηχανικός Μηχανικής Μάθησης",
    "Μηχανικός AI",
    "Τεχνητή Νοημοσύνη",
    "Βαθιά Μάθηση",
    "Μηχανική Μάθηση",
    "Ανάπτυξη Λογισμικού",
    "Χαρτοφυλάκιο",
    "Έργα ML",
    "Λύσεις AI",
    "Προγραμματιστής Python",
    "Data Scientist Κύπρος",
    "AI Engineer Cyprus",
    "Πανεπιστήμιο Κύπρου",
    "University of Cyprus"
  ],
  authors: [{ name: "Ioannis Pastellas", url: "https://www.ipastellas.com" }],
  creator: "Ioannis Pastellas",
  publisher: "Ioannis Pastellas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["el_GR"],
    url: "https://www.ipastellas.com",
    siteName: "Ioannis Pastellas Portfolio | Χαρτοφυλάκιο Ιωάννη Παστέλλα",
    title: "Ioannis Pastellas | Machine Learning Engineer",
    description: "Portfolio of Ioannis Pastellas. Machine Learning Engineer working on reinforcement learning, multi-agent systems, and applied ML. | Χαρτοφυλάκιο Μηχανικού Μηχανικής Μάθησης με εξειδίκευση στην Τεχνητή Νοημοσύνη.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ioannis Pastellas, Machine Learning Engineer | Μηχανικός Μηχανικής Μάθησης",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ioannis Pastellas | Machine Learning Engineer",
    description: "Portfolio of Ioannis Pastellas. Machine Learning Engineer working on reinforcement learning, multi-agent systems, and applied ML.",
    images: ["/og-image.png"],
  },
  robots: process.env.SITE_PASSWORD
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
  verification: {
    // Add your verification codes when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://www.ipastellas.com",
  },
};

export default function RootLayout({ children }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ioannis Pastellas",
    "alternateName": ["Ιωάννης Παστέλλας", "Ιωάννης Παστελλας"], // Multiple Greek name variations
    "jobTitle": "Machine Learning Engineer",
    "description": "Machine Learning Engineer working on reinforcement learning, multi-agent systems, and applied ML",
    "url": "https://www.ipastellas.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CY" // Cyprus
    },
    "sameAs": [
      "https://github.com/giannisp09",
      "https://cy.linkedin.com/in/giannis-pastellas-a420611a6",
      "https://orcid.org/0000-0002-1193-6280"
    ],
    "knowsAbout": [
      "Machine Learning",
      "Artificial Intelligence",
      "Deep Learning",
      "Software Engineering",
      "Python",
      "TensorFlow",
      "PyTorch",
      "Computer Vision",
      "Natural Language Processing"
    ],
    "knowsLanguage": [
      {
        "@type": "Language",
        "name": "English",
        "alternateName": "en"
      },
      {
        "@type": "Language",
        "name": "Greek",
        "alternateName": "el"
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ioannis Pastellas Portfolio",
    "alternateName": "Χαρτοφυλάκιο Ιωάννη Παστέλλα",
    "description": "Portfolio of machine learning projects, papers, and writing",
    "url": "https://www.ipastellas.com",
    "author": {
      "@type": "Person",
      "name": "Ioannis Pastellas"
    },
    "inLanguage": ["en-US", "el-GR"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.ipastellas.com/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Font variables go on <html>, not <body>: globals.css defines --font-heading
  // on :root in terms of --font-instrument-serif, so that variable has to exist
  // at :root or the whole --font-heading declaration resolves to nothing and
  // every serif heading silently falls back to the sans stack.
  const fontVariables = `${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`;

  return (
    <html lang="en" prefix="og: http://ogp.me/ns#" className={fontVariables}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f0f0f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Language alternates for multilingual SEO */}
        <link rel="alternate" hrefLang="en" href="https://www.ipastellas.com" />
        <link rel="alternate" hrefLang="el" href="https://www.ipastellas.com" />
        <link rel="alternate" hrefLang="x-default" href="https://www.ipastellas.com" />

        {/* RSS */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Ioannis Pastellas Articles"
          href="/articles/rss.xml"
        />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <FloatingAIButton />
      </body>
    </html>
  );
}
