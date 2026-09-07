import CustomNavbar from "@/components/CustomNavbar";
import AIAssistant from "@/components/AIAssistant";
import { buildOpenGraph } from "@/lib/seo";

export const metadata = {
  title: "AI Assistant",
  description: "Ask about my work, projects, and how we might work together.",
  keywords: [
    "AI Assistant",
    "Chatbot",
    "Ask Questions",
    "Interactive Chat",
    "ML Engineer Chat",
    "Career Information",
    "Project Discussion"
  ],
  alternates: {
    canonical: "https://www.ipastellas.com/chat",
  },
  openGraph: buildOpenGraph({
    title: "AI Assistant | Ioannis Pastellas",
    description: "Ask about my work, projects, and how we might work together.",
    path: "/chat",
  }),
};

// Breadcrumb structured data
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.ipastellas.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "AI Assistant",
      "item": "https://www.ipastellas.com/chat"
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div>
        <CustomNavbar />
        <AIAssistant />
      </div>
    </>
  );
}

