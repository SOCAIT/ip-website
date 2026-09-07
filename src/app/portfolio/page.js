import CustomNavbar from "@/components/CustomNavbar";
import Portfolio from "@/components/Portfolio";
import { buildOpenGraph } from "@/lib/seo";

export const metadata = {
  title: "Portfolio",
  description: "Machine learning projects and case studies by Ioannis Pastellas. Reinforcement learning, agent systems, and applied ML.",
  keywords: [
    "ML Projects",
    "AI Portfolio",
    "Machine Learning Projects",
    "Deep Learning Applications",
    "Computer Vision Projects",
    "NLP Projects",
    "Optimization Algorithms",
    "Software Engineering Portfolio"
  ],
  alternates: {
    canonical: "https://www.ipastellas.com/portfolio",
  },
  openGraph: buildOpenGraph({
    title: "Portfolio | Ioannis Pastellas",
    description: "Machine learning projects and case studies by Ioannis Pastellas.",
    path: "/portfolio",
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
      "name": "Portfolio",
      "item": "https://www.ipastellas.com/portfolio"
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
        <Portfolio />
      </div>
    </>
  );
}


