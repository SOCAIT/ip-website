import CustomNavbar from "@/components/CustomNavbar";
import Home from "@/components/Home";

export const metadata = {
  title: "Home",
  description: "Welcome to Ioannis Pastellas' portfolio. Machine Learning Engineer specializing in AI, deep learning, and innovative software solutions. Explore cutting-edge ML projects and technical insights.",
  alternates: {
    canonical: "https://www.ipastellas.com",
  },
  openGraph: {
    title: "Ioannis Pastellas | Machine Learning Engineer",
    description: "Machine Learning Engineer specializing in AI, deep learning, and innovative software solutions",
    url: "https://www.ipastellas.com",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <CustomNavbar />
      <Home />
    </div>
  );
}
