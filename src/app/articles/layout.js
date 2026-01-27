export const metadata = {
  title: "Articles",
  description: "Read technical articles and insights by Ioannis Pastellas on machine learning, AI, deep learning, software engineering, and technology trends. In-depth tutorials, research, and thought leadership.",
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
  openGraph: {
    title: "Articles | Ioannis Pastellas",
    description: "Technical articles and insights on machine learning, AI, and software engineering",
    url: "https://www.ipastellas.com/articles",
    type: "website",
  },
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
  "name": "Ioannis Pastellas - Technical Articles",
  "description": "Technical articles and insights on machine learning, AI, deep learning, and software engineering",
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

