import { buildOpenGraph } from "@/lib/seo";

export const metadata = {
  // Must stay an object: a plain string here would overwrite the root layout's
  // title object and strip the "%s | Ioannis Pastellas" template from every
  // article page underneath this route.
  title: { default: "Articles", template: "%s | Ioannis Pastellas" },
  description: "Writing by Ioannis Pastellas on machine learning, reinforcement learning, and the systems around them.",
  keywords: [
    "Machine Learning Articles",
    "AI Blog",
    "Deep Learning Tutorials",
    "Tech Articles",
    "ML Insights",
    "AI Research",
    "Software Engineering Blog",
    "Technical Writing"
  ],
  alternates: {
    canonical: "https://www.ipastellas.com/articles",
  },
  openGraph: buildOpenGraph({
    title: "Articles | Ioannis Pastellas",
    description: "Writing on machine learning, reinforcement learning, and applied ML.",
    path: "/articles",
  }),
};

// Generate breadcrumb structured data for articles listing page
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
      "name": "Articles",
      "item": "https://www.ipastellas.com/articles"
    }
  ]
};

// Blog schema for articles listing page
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Ioannis Pastellas Articles",
  "description": "Writing on machine learning, reinforcement learning, and applied ML",
  "url": "https://www.ipastellas.com/articles",
  "author": {
    "@type": "Person",
    "name": "Ioannis Pastellas",
    "url": "https://www.ipastellas.com"
  },
  "publisher": {
    "@type": "Person",
    "name": "Ioannis Pastellas",
    "url": "https://www.ipastellas.com"
  },
  "inLanguage": ["en-US", "el-GR"]
};

export default function ArticlesLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {children}
    </>
  );
}

