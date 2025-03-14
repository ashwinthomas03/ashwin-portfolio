import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import Navigation from './Navigation';
import Home from './Home';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import './index.css';

// Import typewriter-effect (you'll need to install this package)
// npm install typewriter-effect

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initial loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsMenuOpen(false); // Close the menu on desktop
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      // Set active section based on scroll position
      sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
          setActiveSection(section.id);
        }
      });

      // Show/hide scroll to top button
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Update scroll progress indicator
      const scrolled = document.documentElement.scrollTop;
      const maxHeight = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      const scrollPercent = (scrolled / maxHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: 'smooth',
    });
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Loading screen animation variants
  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.5 }
    }
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {!loadingComplete && (
          <motion.div 
            className="fixed inset-0 bg-white flex items-center justify-center z-50"
            variants={loadingVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="mb-4 text-blue-600"
              >
                <span className="text-5xl font-bold">
                  <span>&lt;</span>
                  Ashwin.dev
                  <span>/&gt;</span>
                </span>
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-1 bg-blue-500 max-w-md mx-auto"
              ></motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div 
        className="relative min-h-screen bg-gray-50"
        variants={contentVariants}
        initial="hidden"
        animate={loadingComplete ? "visible" : "hidden"}
      >
        {/* Scroll progress indicator */}
        <div 
          className="scroll-indicator"
          style={{ width: `${scrollProgress}%` }}
        ></div>

        <Navigation
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          isMenuOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        />

        <main>
          <Home />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              className="fixed right-6 bottom-6 w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center z-40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Portfolio;