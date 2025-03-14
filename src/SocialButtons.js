import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiFileText } from 'react-icons/fi';
import './index.css';

const SocialButtons = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="flex justify-center items-center space-x-8 py-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* LinkedIn */}
      <motion.a 
        href="https://linkedin.com/in/ashwin-thomas-9a1393256/" 
        target="_blank" 
        rel="noopener noreferrer"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="social-icon linkedin"
        aria-label="LinkedIn Profile"
      >
        <FiLinkedin size={24} className="text-white" />
      </motion.a>
      
      {/* GitHub */}
      <motion.a 
        href="https://github.com/ashwinthomas03" 
        target="_blank" 
        rel="noopener noreferrer"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="social-icon github"
        aria-label="GitHub Profile"
      >
        <FiGithub size={24} className="text-white" />
      </motion.a>
      
      {/* Email */}
      <motion.a 
        href="mailto:ashwin.thomas2003@outlook.com"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="social-icon email"
        aria-label="Email Me"
      >
        <FiMail size={24} className="text-white" />
      </motion.a>
      
      {/* Resume - Now with background color */}
      <motion.a 
        href="https://raw.githubusercontent.com/ashwinthomas03/ashwin-portfolio/main/Ashwin_Thomas_Resume..pdf"
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="resume-button-styled"
        aria-label="View Resume"
      >
        <span className="pdf-icon">PDF</span>
        <span className="ml-2">My Resume</span>
      </motion.a>
    </motion.div>
  );
};

export default SocialButtons;