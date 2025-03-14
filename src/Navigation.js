import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import './index.css';

const Navigation = ({ activeSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sections = ['home', 'about', 'experience', 'projects', 'contact'];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: i => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const mobileMenuVariants = {
    closed: { 
      height: 0,
      opacity: 0,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: { 
      height: "auto",
      opacity: 1,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 nav-scroll ${scrolled ? 'scrolled' : ''}`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Title */}
          <motion.h1 
            className="text-xl font-bold text-gray-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-blue-600">&lt;</span>
            Ashwin.build(dev)
            <span className="text-blue-600">/&gt;</span>
          </motion.h1>

          {/* Hamburger Icon (for mobile) */}
          <div className="lg:hidden" onClick={handleMenuToggle}>
            <motion.span 
              className="text-3xl flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </motion.span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6">
            {sections.map((section, i) => (
              <motion.button
                key={section}
                custom={i}
                variants={menuItemVariants}
                onClick={() => scrollToSection(section)}
                className={`capitalize px-4 py-2 rounded-md transition-colors duration-300 ${
                  activeSection === section
                    ? 'text-blue-600 font-medium bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="lg:hidden overflow-hidden"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
      >
        {/* Menu Items */}
        <div className="flex flex-col items-center py-4">
          {sections.map((section, i) => (
            <motion.button
              key={section}
              custom={i}
              variants={menuItemVariants}
              initial="hidden"
              animate={isMenuOpen ? "visible" : "hidden"}
              onClick={() => {
                scrollToSection(section);
                handleCloseMenu();
              }}
              className={`capitalize w-full ${
                activeSection === section
                  ? 'text-blue-600 font-medium bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              } py-3 px-6 text-center`}
            >
              {section}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;