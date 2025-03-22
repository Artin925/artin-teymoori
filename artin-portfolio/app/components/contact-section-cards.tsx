"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import ReusableCard from "./reusable-card";
import TitleSection from "./title-section";
// import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

export default function ContactSectionCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  
  // Initialize EmailJS
  useEffect(() => {
    const initEmailJS = async () => {
      try {
        const emailjsModule = await import('@emailjs/browser');
        emailjsModule.init(EMAILJS_CONFIG.publicKey);
      } catch (error) {
        console.error("Failed to initialize EmailJS:", error);
      }
    };
    
    initEmailJS();
  }, []);
  
  // Style to fix autofill background
  const emailInputStyle = `
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px rgba(16, 185, 129, 0.1) inset !important;
      -webkit-text-fill-color: white !important;
      transition: background-color 5000s ease-in-out 0s;
      background-color: transparent !important;
    }
  `;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const emailjsModule = await import('@emailjs/browser');
      
      // Send email using EmailJS
      const result = await emailjsModule.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current!,
        EMAILJS_CONFIG.publicKey
      );
      
      console.log('Email sent successfully:', result.text);
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setIsSubmitting(false);
      setError("Es gab ein Problem beim Senden der Nachricht. Bitte versuche es später erneut.");
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="min-h-screen py-20 bg-gray-100 dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <motion.div 
        className="absolute -right-20 top-20 w-64 h-64 rounded-full bg-green-200 dark:bg-green-900 opacity-10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      <motion.div 
        className="absolute -left-20 bottom-40 w-72 h-72 rounded-full bg-indigo-200 dark:bg-indigo-900 opacity-10 blur-3xl"
        animate={{
          y: [0, -40, 0],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <TitleSection
          title="Lass uns"
          highlightedText="reden!"
          description="Hast du Fragen oder möchtest du mit mir zusammenarbeiten? Ich antworte schneller als ein Compiler Fehler findet! ⚡"
          emoji=""
          gradientFrom="#10B981"
          gradientTo="#6366F1"
          isInView={isInView}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Kontaktformular Card */}
          <div className="lg:col-span-2">
            <ReusableCard
              id="contact-form"
              title="Schreib mir"
              description="Hinterlasse mir eine Nachricht und ich melde mich schnell zurück!"
              bgColor="#10B981" // Grün
              icon="fas fa-envelope"
              onClick={() => {}} // Leere Funktion, da die Karte nicht klickbar sein soll
              height="520px"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <span className="text-5xl mb-4">🎉</span>
                  <h3 className="text-xl font-bold mb-2 text-white">Nachricht gesendet!</h3>
                  <p className="text-gray-200">
                    Vielen Dank für deine Nachricht! Ich melde mich so schnell wie möglich bei dir.
                  </p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="mt-4">
                  <style>{emailInputStyle}</style>
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        name="user_name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-green-500 border-opacity-30 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white placeholder-gray-300 outline-none transition-all"
                        placeholder="Dein Name"
                      />
                      <span className="absolute right-3 top-2 text-xl">
                        {name ? <i className="fas fa-hand-paper"></i> : <i className="fas fa-user"></i>}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="email"
                        name="user_email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                          WebkitTextFillColor: 'white', 
                          WebkitBoxShadow: '0 0 0 30px rgba(16, 185, 129, 0.1) inset !important',
                          background: 'transparent !important'
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-green-500 border-opacity-30 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white placeholder-gray-300 outline-none transition-all"
                        placeholder="Deine E-Mail-Adresse"
                      />
                      <span className="absolute right-3 top-2 text-xl">
                        {email.includes("@") ? <i className="fas fa-check"></i> : <i className="fas fa-envelope"></i>}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="relative">
                      <textarea
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-green-500 border-opacity-30 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white placeholder-gray-300 outline-none transition-all"
                        placeholder="Was möchtest du mir mitteilen?"
                      />
                      <span className="absolute right-3 top-2 text-xl">
                        {message.length === 0 ? <i className="fas fa-pencil-alt"></i> :
                         message.length < 10 ? <i className="fas fa-question"></i> :
                         message.length < 50 ? <i className="fas fa-thumbs-up"></i> :
                         message.length < 100 ? <i className="fas fa-smile"></i> :
                         <i className="fas fa-star"></i>}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all shadow-lg ${
                      isSubmitting 
                        ? "bg-gray-400 bg-opacity-50 cursor-not-allowed" 
                        : "bg-white bg-opacity-10 border border-green-500 border-opacity-30 hover:bg-green-500 hover:bg-opacity-20"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Wird gesendet...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Nachricht senden <i className="fas fa-paper-plane ml-2"></i>
                      </span>
                    )}
                  </button>
                </form>
              )}
            </ReusableCard>
          </div>

          {/* Kontaktdaten Card */}
          <div>
            <ReusableCard
              id="contact-info"
              title="Kontaktdaten"
              description="schreib mir einfach eine Nachricht mit dem Kontaktformular links"
              bgColor="#6366F1" // Indigo
              icon="fas fa-address-card"
              onClick={() => {}} // Leere Funktion, da die Karte nicht klickbar sein soll
              height="auto" // Automatische Höhe basierend auf Inhalt
            >
              <ul className="mt-4 space-y-3">
                <li className="flex items-start text-white">
                  <span className="text-xl mr-3"><i className="fas fa-map-marker-alt"></i></span>
                  <div>
                    <p className="font-semibold">Standort</p>
                    <p className="text-gray-200 text-sm">Köln, Deutschland</p>
                  </div>
                </li>

              </ul>
            </ReusableCard>

            {/* Social Media Card */}
            <div className="mt-8">
              <ReusableCard
                id="social-media"
                title="Social Media"
                description="Lass uns verbinden!"
                bgColor="#8B5CF6" // Lila
                icon="fas fa-link"
                onClick={() => {}} // Leere Funktion, da die Karte nicht klickbar sein soll
                height="auto" // Automatische Höhe basierend auf Inhalt
              >
                <div className="flex flex-wrap gap-4 mt-4">
                  <a
                    href="https://www.linkedin.com/in/artin-teymoori-6b4977277"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform"
                  >
                    <i className="fab fa-linkedin-in text-lg"></i>
                  </a>
                  <a
                    href="https://github.com/Artin925"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full hover:scale-110 transition-transform"
                  >
                    <i className="fab fa-github text-lg"></i>
                  </a>
                  <span className="text-gray-200 text-sm ml-2">Gemeinsam können wir coole Projekte starten!</span>
                </div>
              </ReusableCard>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Übrigens, ich antworte auf Nachrichten schneller als ich Bugs fixen kann! <i className="fas fa-bug"></i>
          </p>
        </motion.div>
      </div>
    </section>
  );
} 