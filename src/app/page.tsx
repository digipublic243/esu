import Additionals from "../components/bigs/additional";
import AdmisInfos from "../components/bigs/admisInfos";
import AdmisInfosDeux from "../components/bigs/admisInfosDeux";
import AdmisInfosTrois from "../components/bigs/admisInfosTrois";
import Cta from "../components/bigs/cta";
import HeroSection from "../components/bigs/heroSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AdmisInfos />
      <AdmisInfosDeux />
      <AdmisInfosTrois />
      <Additionals />
      <Cta />
    </div>
  );
}
