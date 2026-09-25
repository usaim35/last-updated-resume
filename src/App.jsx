import { useState, useEffect } from 'react';
import NetflixPreloader from './components/NetflixPreloader';
import CustomCursor from './components/CustomCursor';
import FloatingActions from './components/FloatingActions';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Expertise from './components/Expertise';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('usaim-theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('usaim-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <main className={`bg-[#050505] min-h-screen w-full overflow-x-hidden text-white relative lg:cursor-none selection:bg-[#f5b942] selection:text-black ${theme === 'light' ? 'theme-light' : ''}`}>
      {/* Cinematic Preloader */}
      {loading && <NetflixPreloader onComplete={() => setLoading(false)} />}

      {/* Global Mouse Hover Effects & Spotlight across ALL sections */}
      <CustomCursor />

      {/* Floating WhatsApp + Back-to-top */}
      <FloatingActions />

      {/* Portfolio Sections */}
      <Hero theme={theme} toggleTheme={toggleTheme} />
      <About />
      <Experience />
      <Expertise />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;