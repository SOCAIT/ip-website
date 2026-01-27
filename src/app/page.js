import CustomNavbar from "@/components/CustomNavbar";
import Home from "@/components/Home";

export const metadata = {
  title: "Home",
  description: "Welcome to Ioannis Pastellas' portfolio. Machine Learning Engineer specializing in AI, deep learning, and innovative software solutions. Explore cutting-edge ML projects and technical insights. | Καλώς ήρθατε στο χαρτοφυλάκιο του Ιωάννη Παστέλλα. Μηχανικός Μηχανικής Μάθησης με εξειδίκευση στην Τεχνητή Νοημοσύνη.",
  keywords: [
    "Ioannis Pastellas",
    "Ιωάννης Παστέλλας",
    "Ιωάννης Παστελλας",
    "Machine Learning Engineer Cyprus",
    "Μηχανικός Μηχανικής Μάθησης Κύπρος",
    "AI Cyprus",
    "Portfolio"
  ],
  alternates: {
    canonical: "https://www.ipastellas.com",
  },
  openGraph: {
    title: "Ioannis Pastellas | Machine Learning Engineer | Μηχανικός Μηχανικής Μάθησης",
    description: "Machine Learning Engineer specializing in AI, deep learning, and innovative software solutions | Μηχανικός Μηχανικής Μάθησης με εξειδίκευση στην Τεχνητή Νοημοσύνη",
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
