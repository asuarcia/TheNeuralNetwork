import { Hero } from "@/components/site/Hero";
import { Mission } from "@/components/site/Mission";
import { About } from "@/components/site/About";
import { Projects } from "@/components/site/Projects";
import { Outcomes } from "@/components/site/Outcomes";
import { Services } from "@/components/site/Services";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <About />
      <Projects />
      <Outcomes />
      <Services />
      <Footer />
    </>
  );
}
