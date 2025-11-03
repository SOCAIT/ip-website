import CustomNavbar from "@/components/CustomNavbar";
import Info from "@/components/Info";

export const metadata = {
  title: "About Me",
  description: "Learn about Ioannis Pastellas - Machine Learning Engineer with expertise in AI, deep learning, software engineering. Education, work experience, skills, and professional background.",
  keywords: [
    "About Ioannis Pastellas",
    "ML Engineer Background",
    "AI Expertise",
    "Education",
    "Work Experience",
    "Technical Skills",
    "Professional Profile"
  ],
  alternates: {
    canonical: "https://www.ipastellas.com/info",
  },
  openGraph: {
    title: "About Me | Ioannis Pastellas",
    description: "Learn about Ioannis Pastellas - Machine Learning Engineer with expertise in AI, deep learning, and software engineering",
    url: "https://www.ipastellas.com/info",
    type: "profile",
  },
};

export default function Page() {
  return (
    <div>
      <CustomNavbar />
      <Info />
    </div>
  );
}


