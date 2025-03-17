import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import './index.css';

// Updated with real experience from resume
const experiences = [
  {
    company: 'Altice USA Inc.',
    position: 'Software Developer Intern',
    location: 'Bethpage, NY',
    duration: 'Jan 2025 - Present',
    responsibilities: [
      'Coding in Python to create automations, streamline processes, and improve overall system efficiency',
      'Contributing to the development and maintenance of software solutions for Optimum\'s Network Operations Center (NOC)',
      'Assisting in the identification of repetitive and long-running tasks to improve workflow efficiency'
    ],
    skills: ['Python', 'Automation', 'Software Development']
  },
  {
    company: 'New York Institute of Technology',
    position: 'Information Technology Support Student Technician II',
    location: 'Old Westbury, NY',
    duration: 'Aug 2022 - Present',
    responsibilities: [
      'Service phone, email, and web-based service requests, including password resets and software installations',
      'Assist the New York Tech community with UNIFLOW print account and troubleshooting',
      'Route tickets to the appropriate departments for efficient issue resolution'
    ],
    skills: ['IT Support', 'Technical Troubleshooting', 'Customer Service']
  },
  {
    company: 'Sub360 Inc.',
    position: 'Software Engineering Intern',
    location: 'Remote',
    duration: 'Jun 2024 - Sep 2024',
    responsibilities: [
      'Develop reusable React components to enhance application performance',
      'Implement responsive design in React components, ensuring compatibility across various devices',
      'Utilize Storybook for building, testing, and documenting React components'
    ],
    skills: ['React', 'Responsive Design', 'Component Development', 'Storybook']
  },
  {
    company: 'The National Urban Technology Center Inc.',
    position: 'Computer Science Intern',
    location: 'New York, NY',
    duration: 'Feb 2023 - Jun 2023',
    responsibilities: [
      'Developed website and webpages using CSS, JavaScript, and HTML',
      'Managed Google ads to enhance online presence',
      'Collaborated with the social media team to design effective social media posts'
    ],
    skills: ['Web Development', 'HTML/CSS', 'JavaScript', 'Digital Marketing']
  },
  {
    company: 'Consolidated Shipping Line Private Ltd.',
    position: 'Computer Assistant',
    location: 'Kerala, India',
    duration: 'Jul 2019 - Aug 2019',
    responsibilities: [
      'Created Management Information System (MIS) reports using MySQL',
      'Designed creatives for departmental meetings'
    ],
    skills: ['MySQL', 'MIS Reporting', 'Graphic Design']
  }
];

const Experience = () => {
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

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  // For fade-in effect on scroll
  const scrollRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    return () => {
      fadeElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      id="experience"
      ref={scrollRef}
      className="min-h-screen py-32 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-medium mb-2">My Professional Journey</p>
          <h2 className="section-title text-4xl font-bold text-gray-800">Work Experience</h2>
        </div>
        
        <div className="relative">
          {/* Timeline vertical line - centered now */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-blue-500 transform md:translate-x-[-0.5px] z-10 hidden md:block"></div>
          
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="space-y-16"
          >
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                className="relative"
                variants={itemVariants}
              >
                {/* Circle indicator on the timeline */}
                <div className="absolute left-[-8px] md:left-1/2 top-6 w-4 h-4 rounded-full bg-blue-500 transform md:translate-x-[-8px] z-20 hidden md:block"></div>
                
                {/* Experience card with full width */}
                <div className={`fade-in w-full md:w-[calc(50%-20px)] ${
                  index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                } bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative`}>
                  {/* Date tag - positioned at top corner */}
                  <div className="absolute top-4 right-4">
                    <span className="timeline-date flex items-center">
                      <FiCalendar className="mr-1 text-blue-500" /> {exp.duration}
                    </span>
                  </div>
                  
                  <div className="mb-8 pt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{exp.company}</h3>
                    <p className="text-blue-600 font-medium flex items-center mb-1">
                      <FiBriefcase className="mr-2" /> {exp.position}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <FiMapPin className="mr-2" /> {exp.location}
                    </p>
                  </div>
                  
                  <ul className="text-gray-600 space-y-2 mb-4">
                    {exp.responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-3 mt-4">
                    {exp.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;