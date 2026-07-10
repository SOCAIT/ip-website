import CustomNavbar from "@/components/CustomNavbar";
import Automations from "@/components/Automations";

export const metadata = {
  title: "Automations",
  description: "Automations and workflows built by Ioannis Pastellas - n8n pipelines and AI-powered automations that handle repetitive tasks, from handwritten note transcription to data syncing. Download the source workflows.",
  keywords: [
    "n8n Automations",
    "AI Automation",
    "Workflow Automation",
    "n8n Workflows",
    "No-Code Automation",
    "AI Pipelines",
    "Productivity Automation"
  ],
  alternates: {
    canonical: "https://www.ipastellas.com/automations",
  },
  openGraph: {
    title: "Automations | Ioannis Pastellas",
    description: "n8n and AI-powered automations built by Ioannis Pastellas. Download the source workflows.",
    url: "https://www.ipastellas.com/automations",
    type: "website",
  },
};

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
      "name": "Automations",
      "item": "https://www.ipastellas.com/automations"
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
        <Automations />
      </div>
    </>
  );
}
