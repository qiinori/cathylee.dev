import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import PixelBackground from './components/PixelBackground';
import CustomCursor from './components/CustomCursor';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Capabilities from './components/Capabilities';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Archive from './components/Archive';

// Component to handle animations and scroll on route change
const NavigationHandler = () => {
  const { pathname, hash } = useLocation();
  const location = useLocation();

  // Scroll handling
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  // Animation handling
  useEffect(() => {
    const shouldPreventAnimation = location.state?.preventAnimation;

    if (shouldPreventAnimation) {
      // Returning from Archive: Make everything visible immediately
      const elements = document.querySelectorAll('.animate-on-scroll, .section');
      elements.forEach(el => el.classList.add('visible'));
    } else {
      // Normal load: Setup observer
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

      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(el => observer.observe(el));

      return () => observer.disconnect();
    }
  }, [location.state]);

  return null;
};

// Main Home Component (Existing Layout)
const Home = () => (
  <>
    <PixelBackground />
    <SplashScreen />
    <div className="noise-overlay"></div>
    <CustomCursor />
    <Navbar />
    <main>
      <Hero />
      <Portfolio />
      {/* <Capabilities /> */}
      <Experience />
      <Footer />
    </main>
  </>
);

function App() {
  return (
    <Router>
      <NavigationHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={
          <>
            <PixelBackground />
            <div className="noise-overlay"></div>
            <CustomCursor />
            <Archive />
          </>
        } />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;
