"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  
  // Einfache Parallax-Animation für das Bild
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  
  // Animation for image - making animations more pronounced
  
  // Animation für den Perspektiven-Ursprung - verbessert den 3D-Effekt
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.3 + i * 0.1 }
    })
  };
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-200 dark:bg-blue-800 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-purple-200 dark:bg-purple-800 opacity-20 blur-3xl"></div>
        <div className="absolute top-60 right-40 w-32 h-32 rounded-full bg-yellow-200 dark:bg-yellow-800 opacity-10 blur-2xl"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Custom title matching "Meine Projekte" style */}
        <motion.div 
          className="text-center mb-14 relative"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-1">
              <span className="text-gray-700 dark:text-gray-300">About </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]">
                Me
              </span>
            </h2>
            
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto mt-3">
              Frontend Developer mit Leidenschaft für moderne Webtechnologien und Benutzerfreundlichkeit
            </p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            ref={imageRef}
            className="relative"
          >
            <motion.div 
              className="relative w-full h-80 md:h-96 overflow-hidden rounded-lg shadow-xl"
              style={{ y: imageY }}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                duration: 1,
                bounce: 0.3
              }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80 rounded-lg"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="relative w-full h-full"
                >
                  <Image 
                    src="/images/about/Picsart_25-03-22_10-47-07-259.jpg"
                    alt="Artin Portrait"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    style={{ objectFit: 'cover', opacity: 0.85 }}
                    className="rounded-lg"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            ref={contentRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-700 dark:text-gray-300">Hallo! Ich bin <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]">Artin</span></h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 backdrop-blur-sm rounded-lg py-2 px-3"
                style={{
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)",
                  border: "1px solid rgba(59, 130, 246, 0.1)",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)"
                }}
              >
                Front-End Developer mit einer Leidenschaft für Benutzerfreundlichkeit und moderne Webtechnologien. Als Medieninformatik-Student an der Technischen Hochschule Köln kombiniere ich technisches Know-how mit einer kreativen Herangehensweise.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-6">
              <h4 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Bildungsweg</h4>
              <ul className="list-disc pl-5 mb-6 text-gray-600 dark:text-gray-400">
                <li>Bachelor of Science in Medieninformatik, TH Köln (erwartet 2026)</li>
                <li>Bachelor of Science in Medizintechnik, Maziar University, Iran (2017-2021)</li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-6">
              <h4 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Was mich <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]">antreibt</span></h4>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 backdrop-blur-sm rounded-lg py-2 px-3"
                style={{
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)",
                  border: "1px solid rgba(59, 130, 246, 0.1)",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)"
                }}
              >
                Ich bin begeistert davon, technische Herausforderungen zu lösen und gleichzeitig ästhetisch ansprechende Benutzeroberflächen zu gestalten. Mein Ziel ist es, digitale Erfahrungen zu schaffen, die sowohl funktional als auch unterhaltsam sind.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
              {[
                { name: "JavaScript", color: "#F7DF1E" }, 
                { name: "HTML/CSS", color: "#E34F26" },
                { name: "UI/UX", color: "#8B5CF6" },
                { name: "Vue.js", color: "#10B981" },
                { name: "Figma", color: "#F24E1E" },
                { name: "Humor", color: "#3B82F6" }
              ].map((skill, index) => (
                <motion.span 
                  key={skill.name}
                  custom={index}
                  variants={skillVariants}
                  className="px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md shadow-sm relative overflow-hidden"
                  style={{ 
                    background: `${skill.color}30`,
                    border: `1px solid ${skill.color}70`,
                    boxShadow: `0 0 12px ${skill.color}40`
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="relative z-10 text-white">{skill.name}</span>
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          id="secret-tools"
          className="mt-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
        </motion.div>
      </div>
    </section>
  );
} 