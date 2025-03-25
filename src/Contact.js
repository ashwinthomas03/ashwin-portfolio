import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiSend, FiMapPin } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import './index.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const form = useRef();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Replace these with your actual EmailJS service ID, template ID, and public key
    emailjs.sendForm(
      'service_p683g2m', 
      'template_c0j7b4q', 
      form.current, 
      'qiYXm_ZLUOptlu037'
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    })
    .catch((error) => {
      console.error('Error sending email:', error.text);
      setIsSubmitting(false);
      setSubmitStatus('error');
      
      // Reset error status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    });
  };

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

  const contactInfo = [
    {
      icon: <FiMail />,
      label: 'Email',
      value: 'ashwin.thomas2003@outlook.com',
      link: 'mailto:ashwin.thomas2003@outlook.com'
    },
    {
      icon: <FiPhone />,
      label: 'Phone',
      value: '+1 516-667-4078',
      link: 'tel:+15166674078'
    },
    {
      icon: <FiMapPin />,
      label: 'Location',
      value: 'Franklin Square, NY',
      link: null
    },
    {
      icon: <FiLinkedin />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/ashwin-thomas-9a1393256',
      link: 'https://linkedin.com/in/ashwin-thomas-9a1393256/'
    },
    {
      icon: <FiGithub />,
      label: 'GitHub',
      value: 'github.com/ashwinthomas03',
      link: 'https://github.com/ashwinthomas03'
    }
  ];

  return (
    <section id="contact" className="min-h-screen py-20 bg-gradient-to-t from-blue-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-medium mb-2">Get In Touch</p>
          <h2 className="section-title text-4xl font-bold text-gray-800">Contact Me</h2>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">Let's Connect</h3>
            <p className="text-gray-600 mb-6">
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800">{info.label}</h4>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        target={info.link.startsWith('http') ? "_blank" : "_self"}
                        rel={info.link.startsWith('http') ? "noopener noreferrer" : ""}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-600">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Me a Message</h3>
              
              <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your message"
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="custom-button w-full flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="inline-block animate-spin mr-2">⟳</span>
                  ) : (
                    <FiSend className="mr-2" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-center mt-4"
                  >
                    Message sent successfully!
                  </motion.p>
                )}

                {submitStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-center mt-4"
                  >
                    There was an error sending your message. Please try again.
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-20 py-6 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">© {new Date().getFullYear()} Ashwin Thomas. All rights reserved.</p>
          <p className="text-gray-600"> 
           <br></br>
          </p>
          <p className="text-gray-600">This website was designed using Figma and developed using React.js and TailwindCSS</p>
          <p className="text-gray-600">Thank you for visiting my portfolio!</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;