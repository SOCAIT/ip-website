import CustomNavbar from "@/components/CustomNavbar";
import Home from "@/components/Home";
import { buildOpenGraph, SITE_URL } from "@/lib/seo";

const title = "Ioannis Pastellas | ML Engineer, RL and Multi-Agent Systems";
const description =
  "Machine Learning Engineer working on reinforcement learning and multi-agent systems. Five peer-reviewed publications, offline RL with Wargaming, MSc in Artificial Intelligence. | Μηχανικός Μηχανικής Μάθησης με εξειδίκευση στην Τεχνητή Νοημοσύνη.";

export const metadata = {
  // `title.template` from the root layout does NOT apply to this file — page.js
  // shares the root segment with layout.js, so a plain string would render
  // verbatim (this is why the homepage title used to be literally "Home").
  title: { absolute: title },
  description,
  keywords: [
    "Ioannis Pastellas",
    "Ιωάννης Παστέλλας",
    "Ιωάννης Παστελλας",
    "Machine Learning Engineer Cyprus",
    "Μηχανικός Μηχανικής Μάθησης Κύπρος",
    "Reinforcement Learning",
    "Multi-Agent Systems",
    "AI Cyprus",
    "Portfolio",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: buildOpenGraph({ title, description, path: "" }),
};

export default function Page() {
  return (
    <div>
      <CustomNavbar />
      <Home />
    </div>
  );
}
