import CustomNavbar from "@/components/CustomNavbar";
import Portfolio from "@/components/Portfolio";

export const metadata = {
  title: "Portfolio",
  description: "Explore Ioannis Pastellas' portfolio of machine learning projects, AI applications, and software engineering work. From deep learning models to optimization algorithms and full-stack applications.",
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
  openGraph: {
    title: "Portfolio | Ioannis Pastellas",
    description: "Explore machine learning projects, AI applications, and software engineering work by Ioannis Pastellas",
    url: "https://www.ipastellas.com/portfolio",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <CustomNavbar />
      <Portfolio />
    </div>
  );
}


