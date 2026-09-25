import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const ref = useRef(null);
  
  // React Form State tracking
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    permission: false
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax translation for the big background text
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));

    // Clear specific field validation error as user types
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
    // Clear global error state when user modifies inputs
    if (status === 'error') {
      setStatus('idle');
      setStatusMessage('');
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty.';
    }
    if (!formData.permission) {
      newErrors.permission = 'Please accept the contact permission.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || serviceId === 'your_service_id_here') {
      setStatus('error');
      setStatusMessage(
        'Email service configuration is not set yet. Please add your EmailJS keys to the .env file.'
      );
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim(),
          reply_to: formData.email.trim(),
          message: formData.message.trim(),
          to_email: 'usaimkhan24@gmail.com'
        },
        publicKey
      );

      setStatus('success');
      setStatusMessage('Message sent successfully. I will get back to you shortly.');
      setFormData({ firstName: '', lastName: '', email: '', message: '', permission: false });
      setErrors({});
    } catch (error) {
      console.error('Email transmission error:', error);
      setStatus('error');
      setStatusMessage(
        error?.text || 'Failed to send message. Please try again or reach out directly at usaimkhan24@gmail.com.'
      );
    }
  };

  return (
    <section ref={ref} id="contact" className="bg-[#0b0b0b] w-full min-h-screen relative overflow-hidden flex items-end pt-20 md:pt-32 pb-0 border-t border-white/10 select-none">
      
      {/* Background Cinematic Cyan Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-full h-[600px] bg-[#f5b942]/15 rounded-full blur-[60px] md:blur-[160px] pointer-events-none z-0"></div>

      {/* Huge Background Parallax Watermark Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12 opacity-10"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black text-[#f5b942] uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          CONTACT
        </h1>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#141414]/95 backdrop-blur-md md:backdrop-blur-2xl border-t border-l border-white/15 w-full md:w-[90%] lg:w-[82%] p-5 sm:p-8 md:p-16 text-white flex flex-col justify-between rounded-tl-[2rem] sm:rounded-tl-[3rem] shadow-[0_-25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden"
        >
          {/* Subtle internal top cyan highlight glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#f5b942] to-transparent opacity-90"></div>

          <div className="flex flex-col gap-5 sm:gap-6 mb-8 md:mb-14">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded bg-[#f5b942]/10 border border-[#f5b942]/30 text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest text-[#f5b942]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f5b942] animate-ping"></span>
                <span>06 // GET IN TOUCH</span>
              </div>
              <span className="text-xs font-mono text-white/40 tracking-wider hidden md:block">
                // DIRECT SIGNALS AVAILABLE
              </span>
            </div>

            {/* Direct Contact Telemetry Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col gap-1 hover:border-[#f5b942]/40 transition-colors">
                <span className="text-[10px] font-mono text-[#f5b942] uppercase tracking-widest">EMAIL SIGNAL</span>
                <a href="mailto:usaimkhan24@gmail.com" className="text-xs sm:text-sm text-white hover:text-[#f5b942] font-mono truncate transition-colors">
                  usaimkhan24@gmail.com
                </a>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col gap-1 hover:border-[#f5b942]/40 transition-colors">
                <span className="text-[10px] font-mono text-[#f5b942] uppercase tracking-widest">DIRECT PHONE</span>
                <a href="tel:03242788466" className="text-xs sm:text-sm text-white hover:text-[#f5b942] font-mono transition-colors">
                  +92 324 2788466
                </a>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col gap-1 hover:border-[#f5b942]/40 transition-colors">
                <span className="text-[10px] font-mono text-[#f5b942] uppercase tracking-widest">BASE LOCATION</span>
                <span className="text-xs sm:text-sm text-white/80 font-mono truncate">
                  Karachi, Sindh, Pakistan
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8 md:gap-14 w-full">
            <div className="flex flex-col md:flex-row gap-8 md:gap-20 w-full">
              
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-6 sm:gap-8">
                <div className="relative pb-2">
                  <input 
                    type="text" 
                    id="firstName" 
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name" 
                    className={`w-full bg-transparent border-b pb-3 text-base sm:text-lg focus:outline-none transition-colors placeholder-white/40 font-medium rounded-none text-white ${
                      errors.firstName ? 'border-red-500/70 focus:border-red-400' : 'border-white/20 focus:border-[#f5b942]'
                    }`}
                  />
                  {errors.firstName && (
                    <span className="absolute bottom-[-10px] left-0 text-[10px] font-mono text-red-400">
                      {errors.firstName}
                    </span>
                  )}
                </div>

                <div className="relative pb-2">
                  <input 
                    type="text" 
                    id="lastName" 
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name" 
                    className={`w-full bg-transparent border-b pb-3 text-base sm:text-lg focus:outline-none transition-colors placeholder-white/40 font-medium rounded-none text-white ${
                      errors.lastName ? 'border-red-500/70 focus:border-red-400' : 'border-white/20 focus:border-[#f5b942]'
                    }`}
                  />
                  {errors.lastName && (
                    <span className="absolute bottom-[-10px] left-0 text-[10px] font-mono text-red-400">
                      {errors.lastName}
                    </span>
                  )}
                </div>

                <div className="relative pb-2">
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address" 
                    className={`w-full bg-transparent border-b pb-3 text-base sm:text-lg focus:outline-none transition-colors placeholder-white/40 font-medium rounded-none text-white ${
                      errors.email ? 'border-red-500/70 focus:border-red-400' : 'border-white/20 focus:border-[#f5b942]'
                    }`}
                  />
                  {errors.email && (
                    <span className="absolute bottom-[-10px] left-0 text-[10px] font-mono text-red-400">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col">
                <div className="relative h-full flex flex-col pb-2">
                  <textarea 
                    id="message" 
                    value={formData.message}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.stopPropagation();
                      }
                    }}
                    placeholder="Type your message here..." 
                    className={`w-full h-full min-h-[120px] sm:min-h-[140px] bg-transparent border-b pb-3 text-base sm:text-lg focus:outline-none transition-colors placeholder-white/40 font-medium resize-none rounded-none text-white ${
                      errors.message ? 'border-red-500/70 focus:border-red-400' : 'border-white/20 focus:border-[#f5b942]'
                    }`}
                  ></textarea>
                  {errors.message && (
                    <span className="absolute bottom-[-10px] left-0 text-[10px] font-mono text-red-400">
                      {errors.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Status Feedback Banner */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="p-4 rounded-xl bg-[#f5b942]/10 border border-[#f5b942]/40 text-[#f5b942] font-mono text-xs flex items-center gap-3 shadow-[0_0_20px_rgba(245,185,66,0.15)]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#f5b942] animate-ping shrink-0"></span>
                  <span>{statusMessage}</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 font-mono text-xs flex items-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-red-400 shrink-0"></span>
                  <span>{statusMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row gap-8 sm:gap-10 pt-6 border-t border-white/10">
              {/* Left text */}
              <div className="flex-1 flex flex-col gap-1 text-xs sm:text-sm font-light text-white/70">
                <div className="flex items-start gap-3 sm:gap-4">
                  <input 
                    type="checkbox" 
                    id="permission" 
                    checked={formData.permission}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded-sm border-white/30 bg-transparent text-[#f5b942] focus:ring-0 focus:ring-offset-0 cursor-pointer shrink-0" 
                    style={{ accentColor: "#f5b942" }}
                  />
                  <label htmlFor="permission" className="cursor-pointer max-w-full leading-snug">
                    I give permission to contact me at this email address.
                  </label>
                </div>
                {errors.permission && (
                  <span className="text-[10px] font-mono text-red-400 pl-7">
                    {errors.permission}
                  </span>
                )}
              </div>

              {/* Right text & button */}
              <div className="flex-1 flex flex-col gap-6 sm:gap-8 text-xs text-white/50 font-light">
                <p className="leading-relaxed max-w-[400px]">
                  This site is protected by security protocols and industry-standard privacy guidelines.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-5 sm:gap-6">
                  <p className="max-w-[250px] leading-relaxed">
                    Ready to start a project or collaboration? Send a direct signal.
                  </p>
                  
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className={`w-full sm:w-auto px-8 py-3.5 rounded bg-[#f5b942] text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(245,185,66,0.6)] whitespace-nowrap transition-all duration-300 ${
                      status === 'loading'
                        ? 'opacity-70 cursor-wait'
                        : 'hover:bg-[#ffd580] hover:scale-105 active:scale-95 cursor-pointer group'
                    }`}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                        Sending Signal...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;