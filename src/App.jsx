import { useEffect, useRef } from 'react';
import PixelBackground from './components/PixelBackground';
import CustomCursor from './components/CustomCursor';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Experience from './components/Experience';
import Footer from './components/Footer';

function App() {
  // Fade-in animation logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      section.classList.add('fade-in-section');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PixelBackground />
      <SplashScreen />
      <div className="noise-overlay"></div>
      <CustomCursor />

      <Navbar />

      <main>
        <Hero />
        <Portfolio />
        <Services />
        <Experience />
        <Footer />
      </main>
    </>
  );
}

export default App;
