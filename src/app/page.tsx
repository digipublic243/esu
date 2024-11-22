import Additionals from "../components/bigs/additional";
import AdmisInfos from "../components/bigs/admisInfos";
import AdmisInfosDeux from "../components/bigs/admisInfosDeux";
import AdmisInfosTrois from "../components/bigs/admisInfosTrois";
import Cta from "../components/bigs/cta";
import Footer from "../components/bigs/footer";
import HeroSection from "../components/bigs/heroSection";
import Header from "@/src/components/bigs/header";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <AdmisInfos />
      <AdmisInfosDeux />
      <AdmisInfosTrois />
      <Additionals />
      <Cta />
      <Footer />
    </div>
  );
}
