import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import TypewriterComponent from 'typewriter-effect';
import SocialButtons from './SocialButtons';
import './index.css';

const Home = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative bg-gradient-to-b from-white to-blue-50 pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-blue-100 opacity-50"></div>
        <div className="absolute -left-20 top-1/3 w-64 h-64 rounded-full bg-blue-100 opacity-30"></div>
        <div className="absolute right-20 bottom-20 w-48 h-48 rounded-full bg-blue-200 opacity-30"></div>
      </div>

      <motion.div 
        className="container mx-auto px-6 text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            Welcome to my portfolio
          </span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
          Hi, I'm <span className="text-blue-600">Ashwin Thomas</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="text-xl md:text-2xl text-gray-600 mb-12">
          <TypewriterComponent
            options={{
              strings: [
                'Problem Solver',
                'Computer Science Student',
                'Software Developer',
                'UI/UX Enthusiast'
              ],
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 50,
            }}
          />
        </motion.div>

        {/* Social and Resume Buttons Bar - With increased spacing */}
        <motion.div variants={itemVariants} className="mb-16">
          <SocialButtons />
        </motion.div>

        {/* Action Buttons - Better aligned */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6">
          <motion.a 
            href="#projects"
            className="custom-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
          
          <motion.a 
            href="#contact"
            className="custom-button-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: [0.2, 1, 0.2], 
          y: [0, 10, 0] 
        }}
        transition={{ 
          duration: 1.5, 
          ease: "easeInOut", 
          repeat: Infinity,
          repeatDelay: 0.5
        }}
      >
        <FiArrowDown size={30} className="text-blue-600" />
      </motion.div>
    </section>
  );
};

export default Home;