import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Achievements from '@/components/sections/Achievements';
import GitHubSection from '@/components/sections/GitHub';
import Contact from '@/components/sections/Contact';
import SystemStatus from '@/components/sections/SystemStatus';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Achievements />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
      <SystemStatus />
    </>
  );
}
