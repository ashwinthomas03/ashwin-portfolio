import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiCode, FiDatabase, FiServer } from 'react-icons/fi';
import profileImg from './pic.jpg'; // Ensure this path is correct

const About = () => {
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  // Skills data
  const skills = [
    { name: 'Frontend', icon: <FiCode />, items: ['React', 'React Native', 'JavaScript', 'HTML/CSS', 'TypeScript'] },
    { name: 'Backend', icon: <FiServer />, items: ['Java', 'Python', 'Node.js'] },
    { name: 'Database', icon: <FiDatabase />, items: ['MySQL', 'DynamoDB'] },
  ];

  // Education data
  const education = {
    degree: 'Bachelor of Science in Computer Science, Minor in Mathematics',
    school: 'New York Institute of Technology',
    location: 'Old Westbury, NY',
    graduation: 'May 2025',
    gpa: '3.94',
    achievements: ['Presidential Honors List x4']
  };

  return (
    <section id="about" className="min-h-screen py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-medium mb-2">Get To Know More</p>
          <h2 className="section-title text-4xl font-bold text-gray-800">About Me</h2>
        </div>
        
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center"
        >
          {/* Profile Image */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-3xl transform rotate-6"></div>
              <div className="relative overflow-hidden rounded-3xl shadow-lg">
                <img 
                  src={profileImg} 
                  alt="Ashwin Thomas" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div variants={itemVariants} className="md:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-6 rounded-2xl shadow-md text-center card-hover">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <FiAward size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Experience</h3>
                <p className="text-lg font-medium mb-1">4+ Years</p>
                <p className="text-gray-600">Combined Experience</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md text-center card-hover">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <FiCode size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p className="text-lg font-medium mb-1">GPA: {education.gpa}</p>
                <p className="text-gray-600">{education.school}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md card-hover">
              <h3 className="text-xl font-semibold mb-4">My Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center text-blue-600 mb-2">
                      <span className="mr-2">{skillGroup.icon}</span>
                      <h4 className="font-medium">{skillGroup.name}</h4>
                    </div>
                    <ul>
                      {skillGroup.items.map((skill, idx) => (
                        <li key={idx} className="flex items-center text-gray-600 mb-1">
                          <span className="text-blue-500 mr-2">•</span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed bg-white p-6 rounded-2xl shadow-md">
              Hi there! I'm Ashwin Thomas, a senior Computer Science major with a Mathematics minor at the New York Institute of Technology, paving my way to obtain the Accelerated Masters degree in Data Science. As an aspiring programmer, I'm always looking for opportunities to apply my skills and learn more about the industry.
              <br /><br />
              I'm particularly interested in combining finance, data, and technology, and have worked on several projects in these areas. My goal is to leverage my analytical and technical skills to drive data-driven decisions and solutions in a software engineering or data science role.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;