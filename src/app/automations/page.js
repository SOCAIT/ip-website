import { notFound } from "next/navigation";
import CustomNavbar from "@/components/CustomNavbar";
import Automations from "@/components/Automations";
import { SHOW_AUTOMATIONS } from "@/lib/features";

export const metadata = {
  title: "Automations",
  description: "n8n workflows I use to take repetitive work off my plate. Download the source and run them yourself.",
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
  if (!SHOW_AUTOMATIONS) notFound();

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
