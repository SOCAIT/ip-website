import CustomNavbar from "@/components/CustomNavbar";
import AIAssistant from "@/components/AIAssistant";

export const metadata = {
  title: "AI Assistant | Chat with Ioannis",
  description: "Chat with my AI assistant to learn about my experience, skills, projects, and how we can work together. Get instant answers to your questions.",
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
  openGraph: {
    title: "AI Assistant | Ioannis Pastellas",
    description: "Chat with my AI assistant to learn about my experience, skills, and projects",
    url: "https://www.ipastellas.com/chat",
    type: "website",
  },
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

