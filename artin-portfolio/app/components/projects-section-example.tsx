"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, LayoutGroup } from "framer-motion";
import ReusableCard from "./reusable-card";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";

// Projekte aus der gemeinsamen Datenquelle importieren
import { projects as allProjects } from "../data/projects";

export default function ProjectsSectionWithCards() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const filteredProjects = activeFilter === "all"
    ? allProjects
    : allProjects.filter(project => project.tags.includes(activeFilter));
  
  const filters = ["all", "Web", "App", "UI/UX", "Vue", "Professional", "Design", "Coding Challenge"];
  
  // Project card colors based on categories
  const getProjectColor = (tags: string[]): string => {
    if (tags.includes("Web")) return "#6366F1"; // Indigo
    if (tags.includes("App")) return "#EC4899"; // Pink
    if (tags.includes("UI/UX")) return "#8B5CF6"; // Purple
    if (tags.includes("Vue")) return "#10B981"; // Green
    if (tags.includes("Design")) return "#F59E0B"; // Amber
    if (tags.includes("Coding Challenge")) return "#3B82F6"; // Blue
    return "#6366F1"; // Default indigo
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const filterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        type: "spring",
        stiffness: 200
      }
    })
  };
  
  return (
    <section 
      id="projects" 
      ref={(el) => {
        sectionRef.current = el;
        if (el) {
          // Custom event auslösen, dass die Projektesektion bereit ist
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('projectsectionready'));
          }
        }
      }}
      className="min-h-screen py-20 bg-white dark:bg-black relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <motion.div 
        className="absolute -right-20 top-20 w-64 h-64 rounded-full bg-purple-200 dark:bg-purple-900 opacity-10 blur-3xl"
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
        className="absolute -left-20 bottom-40 w-72 h-72 rounded-full bg-blue-200 dark:bg-blue-900 opacity-10 blur-3xl"
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
        {/* Custom title matching "Meine Geheimwaffen" style */}
        <motion.div 
          className="text-center mb-14 relative"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-1">
              <span className="text-gray-700 dark:text-gray-300">Meine </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#EC4899]">
                Projekte
              </span>
            </h2>
            
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto mt-3">
              Eine Sammlung meiner Arbeiten - von Webseiten über Apps bis zu UI/UX-Designs. Jedes Projekt ist ein neues Abenteuer! 🧙‍♂️
            </p>
          </div>
        </motion.div>
        
        <LayoutGroup>
          {/* Filter buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            layout
          >
            {filters.map((filter, index) => {
              // Farbe für jeden Filter basierend auf Kategorie
              const filterColor = filter === "all" ? "#8B5CF6" : // Lila für "Alle"
                                  filter === "Web" ? "#6366F1" : // Indigo für Web
                                  filter === "App" ? "#EC4899" : // Pink für App
                                  filter === "UI/UX" ? "#8B5CF6" : // Purple für UI/UX
                                  filter === "Vue" ? "#10B981" : // Grün für Vue
                                  filter === "Design" ? "#F59E0B" : // Amber für Design
                                  filter === "Coding Challenge" ? "#3B82F6" : // Blue für Coding Challenge
                                                    "#6366F1"; // Default indigo
              
              return (
                <motion.button
                  key={filter}
                  custom={index}
                  variants={filterVariants}
                  className={`px-4 py-2 rounded-full text-sm font-medium relative overflow-hidden transition-all backdrop-blur-md`}
                  onClick={() => setActiveFilter(filter)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  layout
                  style={{
                    backgroundColor: filter === activeFilter 
                      ? `${filterColor}90` 
                      : "rgba(255, 255, 255, 0.05)",
                    color: filter === activeFilter 
                      ? "white" 
                      : filterColor,
                    border: `1px solid ${filter === activeFilter ? 'rgba(255, 255, 255, 0.2)' : `${filterColor}30`}`,
                    boxShadow: filter === activeFilter 
                      ? `0 5px 15px ${filterColor}40` 
                      : "none"
                  }}
                >
                  {/* Glasmorphism Hintergrund */}
                  {filter === activeFilter && (
                    <span className="absolute inset-0 z-0" 
                      style={{
                        background: `linear-gradient(135deg, ${filterColor} 0%, ${filterColor}70 100%)`,
                        backdropFilter: "blur(8px)",
                      }}
                    />
                  )}
                  
                  {/* Text */}
                  <span className="relative z-10">
                    {filter === "all" ? "Alle" : filter}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
          
          {/* Projects grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            layout
          >
            {filteredProjects.map((project) => {
              const projectColor = getProjectColor(project.tags);
              
              return (
                <div key={project.id} className="group relative">
                  <Link href={`/projects/${project.id}`} scroll={false}>
                    <ReusableCard
                      id={project.id}
                      title={project.title}
                      description={project.description}
                      bgColor={projectColor}
                      height="380px"
                    >
                      {/* Einheitlicher Bild-Container für alle Karten */}
                      <div className="relative w-full h-52 mt-1 mb-3 overflow-hidden rounded-lg bg-black/20">
                        <div className="w-full h-full relative">
                          <Image 
                            src={project.image} 
                            alt={project.title}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ 
                              objectPosition: 'center top',
                              objectFit: project.image.includes("screencapture") || project.image.includes("Screenshot") ? 'contain' : 'cover'
                            }}
                          />
                        </div>
                        
                        {/* Overlay mit Projekt-Kategorien - NUR auf dem Bild */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map(tag => {
                              // Tag-spezifische Farben bestimmen
                              const tagColor = tag === "Web" ? "#6366F1" : // Indigo für Web
                                           tag === "App" ? "#EC4899" : // Pink für App
                                           tag === "UI/UX" ? "#8B5CF6" : // Purple für UI/UX
                                           tag === "Vue" ? "#10B981" : // Grün für Vue
                                           tag === "Design" ? "#F59E0B" : // Amber für Design
                                           tag === "Coding Challenge" ? "#3B82F6" : // Blue für Coding Challenge
                                           tag === "Professional" ? "#C026D3" : // Fuchsia für Professional
                                           "#6366F1"; // Default indigo
                              
                              return (
                                <span 
                                  key={tag} 
                                  className="px-2 py-1 rounded-full text-xs font-medium text-white backdrop-blur-md shadow-sm relative overflow-hidden" 
                                  style={{ 
                                    background: `${tagColor}40`,
                                    border: `1px solid ${tagColor}70`,
                                    boxShadow: `0 0 8px ${tagColor}50`
                                  }}
                                >
                                  <span className="relative z-10">{tag}</span>
                                </span>
                              );
                            })}
                            {project.tags.length > 3 && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium text-white backdrop-blur-md bg-white/10 border border-white/20 shadow-sm">
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* "Details ansehen" Button */}
                      <div className="flex items-center justify-between mt-auto pt-3">
                        <div className="flex items-center text-sm font-medium" style={{ color: projectColor }}>
                          Details ansehen
                          <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
                        </div>
                      </div>
                    </ReusableCard>
                  </Link>
                  
                  {/* Externer Link außerhalb des Projektlinks */}
                  {project.link && (
                    <div className="absolute bottom-3 right-6 z-10">
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-gray-500 hover:text-white hover:underline flex items-center bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full transition-all border border-white/10 hover:bg-black/40"
                      >
                        <ExternalLink size={12} className="mr-1" />
                        Link
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </LayoutGroup>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Neugierig auf mehr? Schau dir meine anderen Projekte auf GitHub an!
          </p>
          <motion.a 
            href="https://github.com/Artin925" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#7C3AED", // purple-700
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Mein GitHub 
            <motion.span 
              className="ml-2 inline-block"
              animate={{ 
                rotate: [0, 20, 0, -20, 0],
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            >
              👨‍💻
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 