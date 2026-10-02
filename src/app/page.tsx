import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Achievements from '@/components/sections/Achievements';
import GitHubSection from '@/components/sections/GitHub';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: -1, pointerEvents: 'none', overflow: 'hidden',
        background: 'var(--bg)',
      }}>
        {/* Colorful gradient blobs */}
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%', width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, var(--a1) 0%, transparent 60%)',
          filter: 'blur(100px)', opacity: 0.8
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-10%', width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, var(--a2) 0%, transparent 60%)',
          filter: 'blur(100px)', opacity: 0.8
        }} />
        
        {/* Dense bokeh pattern for glass to refract */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.15,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 40.5L18.5 29C15.5 26 15.5 21.5 18.5 18.5C21.5 15.5 26 15.5 29 18.5L30 19.5L31 18.5C34 15.5 38.5 15.5 41.5 18.5C44.5 21.5 44.5 26 41.5 29L30 40.5Z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
          filter: 'blur(1px)'
        }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 75.5L42.5 58C38 53.5 38 46 42.5 41.5C47 37 54.5 37 59 41.5L60 42.5L61 41.5C65.5 37 73 37 77.5 41.5C82 46 82 53.5 77.5 58L60 75.5Z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
          backgroundPosition: '20px 20px',
          filter: 'blur(3px)'
        }} />
      </div>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

