import CaseStudies from "../components/CaseStudies";
import CTABanner from "../components/CTABanner";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import Services from "../components/Services";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <CTABanner />
      <CaseStudies />
    </main>
  );
}