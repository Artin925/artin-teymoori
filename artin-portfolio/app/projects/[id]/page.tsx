"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

// Importiere den gleichen Projektkatalog wie in der Hauptseite
import { Project, projects } from "../../data/projects";

export default function ProjectDetailPage() {
  const pathname = usePathname();
  const router = useRouter();
  const projectId = parseInt(pathname.split("/").pop() || "1");
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    // Seite nicht vollständig neu laden bei bekanntem Projekt
    setLoading(true);
    const foundProject = projects.find((p: Project) => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);
      setCurrentImageIndex(0);
    }
    
    // Kurze Verzögerung für Animationseffekt
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [projectId]);
  
  // Navigation durch Bilder
  const nextImage = () => {
    if (!project) return;
    const allImages = project.additionalImages 
      ? [project.image, ...project.additionalImages] 
      : [project.image];
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    if (!project) return;
    const allImages = project.additionalImages 
      ? [project.image, ...project.additionalImages] 
      : [project.image];
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Navigation zu anderem Projekt
  const navigateToProject = (id: number) => {
    router.push(`/projects/${id}`, { scroll: false });
  };

  // Finde vorherige und nächste Projekte
  const projectIndex = projects.findIndex(p => p.id === projectId);
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  // Loading-Animation
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <motion.div 
          className="w-16 h-16 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 opacity-75"></div>
          <div className="absolute inset-0 rounded-full border-r-2 border-indigo-500 opacity-50" style={{ transform: "rotate(45deg)" }}></div>
          <div className="absolute inset-0 rounded-full border-b-2 border-blue-500 opacity-25" style={{ transform: "rotate(90deg)" }}></div>
        </motion.div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
        <h1 className="text-3xl font-bold mb-4 text-white">Projekt nicht gefunden</h1>
        <p className="text-gray-400 mb-8">Das gesuchte Projekt existiert leider nicht.</p>
        <Link href="/#projects" scroll={false}>
          <div className="flex items-center text-purple-400 hover:text-purple-300">
            <ArrowLeft className="mr-2" size={20} />
            <span>Zurück zur Projektübersicht</span>
          </div>
        </Link>
      </div>
    );
  }

  const allImages = project.additionalImages 
    ? [project.image, ...project.additionalImages] 
    : [project.image];

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={`project-${projectId}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full min-h-screen py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      >
        {/* Flowing background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full opacity-20 bg-gradient-to-br from-purple-600 to-blue-400 blur-3xl"></div>
          <div className="absolute top-[60%] -left-[5%] w-[50%] h-[60%] rounded-full opacity-20 bg-gradient-to-br from-blue-500 to-indigo-600 blur-3xl"></div>
          {project.tags.includes("UI/UX") && (
            <div className="absolute top-[20%] left-[60%] w-[30%] h-[40%] rounded-full opacity-20 bg-gradient-to-br from-purple-400 to-pink-500 blur-3xl"></div>
          )}
          {project.tags.includes("App") && (
            <div className="absolute top-[10%] left-[20%] w-[20%] h-[30%] rounded-full opacity-20 bg-gradient-to-br from-pink-500 to-rose-500 blur-3xl"></div>
          )}
          {project.tags.includes("Web") && (
            <div className="absolute top-[40%] right-[10%] w-[25%] h-[25%] rounded-full opacity-20 bg-gradient-to-br from-indigo-500 to-blue-600 blur-3xl"></div>
          )}
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Zurück-Button und Header */}
          <div className="mb-8 relative">
            <div className="flex justify-between items-center mb-6">
              <Link 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  sessionStorage.setItem('scrollToProjects', 'true');
                  router.push('/');
                }}
              >
                <motion.div 
                  className="inline-flex items-center text-gray-300 hover:text-purple-400"
                  whileHover={{ x: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowLeft className="mr-2" size={20} />
                  <span>Zurück zur Übersicht</span>
                </motion.div>
              </Link>
              
              {/* Projekt-Navigation */}
              <div className="flex items-center space-x-4">
                {prevProject && (
                  <motion.button
                    onClick={() => navigateToProject(prevProject.id)}
                    className="text-gray-300 hover:text-purple-400 flex items-center"
                    whileHover={{ x: -3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ChevronLeft size={18} className="mr-1" />
                    <span className="hidden sm:inline">Vorheriges</span>
                  </motion.button>
                )}
                
                {nextProject && (
                  <motion.button
                    onClick={() => navigateToProject(nextProject.id)}
                    className="text-gray-300 hover:text-purple-400 flex items-center"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="hidden sm:inline">Nächstes</span>
                    <ChevronRight size={18} className="ml-1" />
                  </motion.button>
                )}
              </div>
            </div>

            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative">
                {project.title}
                <motion.span 
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </motion.h1>

            <motion.div 
              className="flex flex-wrap gap-2 mb-8 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {project.tags.map((tag: string) => {
                // Tag-spezifische Farben bestimmen
                const tagColor = tag === "Web" ? "#6366F1" : // Indigo für Web
                            tag === "App" ? "#EC4899" : // Pink für App
                            tag === "UI/UX" ? "#8B5CF6" : // Purple für UI/UX
                            tag === "Vue" ? "#10B981" : // Grün für Vue
                            tag === "Design" ? "#F59E0B" : // Amber für Design
                            tag === "Coding Challenge" ? "#3B82F6" : // Blue für Coding Challenge
                            tag === "Professional" ? "#C026D3" : // Fuchsia für Professional
                            tag === "Kotlin" ? "#FF5722" : // Deep Orange für Kotlin
                            "#6366F1"; // Default indigo
                
                return (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md shadow-sm relative overflow-hidden"
                    style={{ 
                      background: `${tagColor}30`,
                      border: `1px solid ${tagColor}70`,
                      boxShadow: `0 0 12px ${tagColor}40`
                    }}
                  >
                    <span className="relative z-10 text-white">{tag}</span>
                  </span>
                );
              })}
            </motion.div>
          </div>

          {/* Hauptinhalt mit Bild-Galerie und Beschreibung */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Galerie-Bereich - 3/5 der Breite auf großen Bildschirmen */}
            <motion.div 
              className="lg:col-span-3 backdrop-blur-md bg-white/5 rounded-2xl overflow-hidden shadow-lg border border-white/10"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/30">
                <Image
                  src={allImages[currentImageIndex]}
                  alt={`${project.title} - Bild ${currentImageIndex + 1}`}
                  fill
                  style={{ objectFit: 'contain', maxHeight: '100%', padding: '12px' }}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                  className="transition-opacity duration-300"
                />

                {/* Bild-Navigation */}
                {allImages.length > 1 && (
                  <>
                    {/* Bildnummern Anzeige */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {allImages.length}
                    </div>

                    {/* Pfeile */}
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-3 rounded-full transition-all"
                      aria-label="Vorheriges Bild"
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-3 rounded-full transition-all"
                      aria-label="Nächstes Bild"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto bg-black/10 backdrop-blur-sm">
                  {allImages.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      className={`flex-shrink-0 w-20 h-16 relative rounded-lg overflow-hidden transition-all ${
                        idx === currentImageIndex 
                          ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                      onClick={() => setCurrentImageIndex(idx)}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        sizes="80px"
                        style={{ objectFit: 'cover' }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Beschreibungs-Bereich - 2/5 der Breite auf großen Bildschirmen */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="backdrop-blur-md bg-white/5 p-6 rounded-2xl shadow-lg h-full border border-white/10">
                <h2 className="text-2xl font-semibold mb-4 text-white">Projektbeschreibung</h2>
                
                <div className="prose prose-lg prose-invert max-w-none mb-8">
                  <p className="text-gray-300 leading-relaxed">
                    {project.detailDescription || project.description}
                  </p>
                </div>

                {/* Technische Details */}
                {project.tags.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3 text-white">Technologien</h3>
                    <ul className="list-disc list-inside text-gray-300">
                      {project.tags.map((tag: string) => (
                        <li key={tag} className="mb-1">{tag}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Call to Action */}
                <div className="mt-auto space-y-4">
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center text-white px-6 py-3 rounded-lg transition-all hover:scale-105 relative overflow-hidden group"
                      style={{
                        backgroundColor: 'rgba(123, 74, 226, 0.4)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 16px rgba(123, 74, 226, 0.3)'
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10 flex items-center">
                        Projekt ansehen
                        <ExternalLink className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                      </span>
                    </a>
                  )}
                  
                  <Link 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      sessionStorage.setItem('scrollToProjects', 'true');
                      router.push('/');
                    }}
                  >
                    <div 
                      className="flex items-center justify-center w-full px-6 py-3 rounded-lg transition-all hover:scale-105 relative overflow-hidden group"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-gray-700/40 to-gray-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10 text-gray-200 group-hover:text-white transition-colors duration-300">
                        Weitere Projekte entdecken
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 