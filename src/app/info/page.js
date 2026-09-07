import CustomNavbar from "@/components/CustomNavbar";
import Info from "@/components/Info";
import { buildOpenGraph } from "@/lib/seo";

// This route renders the "Let's Connect" page. Its metadata used to claim
// "About Me" and promise education / work history, none of which is on it.
const title = "Contact";
const description =
  "Get in touch with Ioannis Pastellas. Machine Learning Engineer working on reinforcement learning and multi-agent systems. Open to roles, collaborations, and consulting.";

export const metadata = {
  title,
  description,
  keywords: [
    "Contact Ioannis Pastellas",
    "Hire ML Engineer",
    "AI Consulting Cyprus",
    "Machine Learning Collaboration",
    "Get in touch",
  ],
  alternates: {
    canonical: "https://www.ipastellas.com/info",
  },
  openGraph: buildOpenGraph({
    title: "Contact | Ioannis Pastellas",
    description,
    path: "/info",
    type: "profile",
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
      "name": "Contact",
      "item": "https://www.ipastellas.com/info"
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
        <Info />
      </div>
    </>
  );
}
