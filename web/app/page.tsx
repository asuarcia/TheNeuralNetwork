import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Projects } from "@/components/site/Projects";
import { Services } from "@/components/site/Services";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Services />
      <Footer />
    </>
  );
}
