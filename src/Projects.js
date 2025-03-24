import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiGithub, FiCode } from 'react-icons/fi';
import './index.css';

// Updated with real projects from resume
const projects = [
  {
    title: 'Travel AI Scheduler',
    description: 'An intelligent travel scheduler app that uses AI to generate custom itineraries based on user choices and responses.',
    image: `${process.env.PUBLIC_URL}/images/Travel.jpg`,
    technologies: ['React', 'TypeScript', 'SCSS', 'DynamoDB'],
    github: 'https://github.com/ashwinthomas03/TravelAI.git',
    live: '' // Leave empty if no live link
  },
  {
    title: 'Fitness App',
    description: 'A comprehensive fitness application offering tailored workout plans for specific muscle groups, calorie tracking, water intake monitoring, and a workout log.',
    image: `${process.env.PUBLIC_URL}/images/fitnessapp.png`, // Using your existing logo192.png 
    technologies: ['React Native', 'MySQL', 'JavaScript', 'CSS'],
    github: 'https://github.com/ashwinthomas03/Fitness-App.git',
    live: '' // Leave empty if no live link
  },
  {
    title: 'Instant Messenger',
    description: 'A real-time messaging application with a server that allows multiple clients to communicate over a TCP connection.',
    image: `${process.env.PUBLIC_URL}/images/messenger.png`, // Reusing Travel.jpg for now
    technologies: ['Java', 'Sockets'],
    github: 'https://github.com/ashwinthomas03/InstantMessenger.git',
    live: '' // Leave empty if no live link
  },
  {
    title: 'Bank Program',
    description: 'A secure banking application featuring authentication, deposit, withdraw, account dashboard, profile update, and support for multiple accounts.',
    image: `${process.env.PUBLIC_URL}/images/bank.png`, // Reusing Travel.jpg for now
    technologies: ['Java', 'MySQL'],
    github: 'https://github.com/ashwinthomas03/Bank.git',
    live: '' // Leave empty if no live link
  },
  {
    title: 'Inventory Management System',
    description: 'A comprehensive warehouse inventory system with item management and a tkinter frontend featuring login, signup, and a dashboard.',
    image: `${process.env.PUBLIC_URL}/images/inventory.png`, // Reusing Travel.jpg for now
    technologies: ['Python', 'Tkinter'],
    github: 'https://github.com/ashwinthomas03/inventory-system',
    live: '' // Leave empty if no live link test
  }
];

const Projects = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  // Debug function to check image loading
  const handleImageLoad = (title) => {
    console.log(`Image for ${title} loaded successfully`);
  };

  // Debug function to check image errors
  const handleImageError = (title, imagePath) => {
    console.error(`Image for ${title} failed to load from path: ${imagePath}`);
  };

  return (
    <section
      id="projects"
      className="min-h-screen py-20 bg-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-medium mb-2">My Recent Work</p>
          <h2 className="section-title text-4xl font-bold text-gray-800">Projects</h2>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="project-card bg-white p-6 rounded-lg shadow-md"
              whileHover={{ y: -10 }}
            >
              {/* Project image/preview with fallback */}
              <div className="relative h-48 mb-6 overflow-hidden rounded-lg bg-blue-100 flex items-center justify-center">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={`${project.title} preview`} 
                    className="object-cover w-full h-full"
                    onLoad={() => handleImageLoad(project.title)}
                    onError={(e) => {
                      handleImageError(project.title, project.image);
                      // Show fallback icon
                      e.target.style.display = 'none';
                      e.target.parentNode.querySelector('.fallback-icon').style.display = 'block';
                    }}
                  />
                ) : (
                  <FiCode className="text-blue-500" size={48} />
                )}
                <div className="fallback-icon" style={{ display: 'none' }}>
                  <FiCode className="text-blue-500" size={48} />
                </div>
                
                {/* Overlay with links */}
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-lg">
                  <div className="flex space-x-4">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white bg-blue-700 hover:bg-blue-800 rounded-full p-2"
                      >
                        <FiGithub size={20} />
                      </a>
                    )}
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white bg-blue-700 hover:bg-blue-800 rounded-full p-2"
                      >
                        <FiExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project info */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;