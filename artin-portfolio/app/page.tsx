"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Background } from "./components/hero-background/background";
import Preloader from "./components/pre-loader";
import AboutSection from "./components/about-section";
import ProjectsSectionWithCards from "./components/projects-section-example";
import ContactSectionCards from "./components/contact-section-cards";
import AtomicToolsVisualizer from "./components/atomic-tools-visualizer";
import Footer from "./components/footer";

// Fluid Metaballs-ähnlicher Cursor
const FramerCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Refs für die Cursor-Elemente
  const trailElements = 5; // Anzahl der Blob-Elemente
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const requestRef = useRef<number | null>(null);
  
  // Einfache Positions-Historie für Trail-Effekt
  const positionHistory = useRef<Array<{x: number, y: number}>>([]);
  const maxHistoryLength = 20; // Begrenzte Historienlänge für Speichereffizienz
  
  // Simplifiziertes Tracking mit minimaler Berechnung
  const updateCursorPosition = useCallback(() => {
    // Füge aktuelle Position am Anfang der Historie hinzu
    positionHistory.current.unshift({ x: mousePosition.x, y: mousePosition.y });
    
    // Historie auf fixe Länge begrenzen
    if (positionHistory.current.length > maxHistoryLength) {
      positionHistory.current.length = maxHistoryLength;
    }
    
    // Einfaches direkt-mapping für jedes Trail-Element
    trailRefs.current.forEach((element, index) => {
      if (!element) return;
      
      // Verbesserte historische Position für schnellere Reaktion
      // Bei schnelleren Bewegungen überspringen wir mehr Zwischenpositionen
      const movementSpeed = index === 0 ? 1 : 
                           Math.min(
                             3, 
                             Math.max(
                               1,
                               // Berechne relativen Abstand zwischen Punkten als Indikator für Geschwindigkeit
                               positionHistory.current.length > 1 ? 
                                 Math.sqrt(
                                   Math.pow(positionHistory.current[0].x - positionHistory.current[1].x, 2) + 
                                   Math.pow(positionHistory.current[0].y - positionHistory.current[1].y, 2)
                                 ) / 10 : 1
                             )
                           );
      
      // Positionsindex basierend auf Geschwindigkeit anpassen
      const historyIndex = Math.min(Math.floor(index * movementSpeed), positionHistory.current.length - 1);
      const pos = positionHistory.current[historyIndex] || positionHistory.current[positionHistory.current.length - 1];
      
      // Direkte DOM-Manipulation für maximale Effizienz
      element.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${1 - index * 0.15})`;
    });
    
    requestRef.current = requestAnimationFrame(updateCursorPosition);
  }, [mousePosition]);
  
  // Initialisiere den Animation Loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateCursorPosition);
    
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [updateCursorPosition]);
  
  // Initialisiere Referenzen nur einmal
  useEffect(() => {
    trailRefs.current = Array(trailElements).fill(null);
    // Initialisiere mit der gleichen Position für sanften Start
    const initialPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    positionHistory.current = Array(maxHistoryLength).fill(initialPos);
  }, []);
  
  // Direktes Event-Handling ohne Throttling für maximale Reaktivität
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Direkte Aktualisierung ohne Verzögerung
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Direkte Hover-Prüfung bei jeder Mausbewegung für schnellere Reaktion
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, [role="button"], input, textarea, select, [tabindex]');
      setIsHovering(!!isHoverable);
    };
    
    // Diese Event-Handler werden jetzt nur als Backup verwendet
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, [tabindex]')) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, [tabindex]')) {
        setIsHovering(false);
      }
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Hide standard cursor
    document.documentElement.classList.add('metaball-cursor');
    
    // Direkte Event-Listener für schnellste Reaktivität
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    
    return () => {
      document.documentElement.classList.remove('metaball-cursor');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  // Optimiertes Rendering mit minimalen Inline-Styles
  return (
    <div className="meta-cursor-container">
      {Array.from({ length: trailElements }).map((_, index) => (
        <div
          key={index}
          ref={(el) => { trailRefs.current[index] = el; }}
          className={`meta-blob blob-${index} ${isHovering ? 'is-hover' : ''} ${isClicking ? 'is-click' : ''}`}
          style={{ 
            opacity: 1 - index * 0.15,
            transitionDelay: `${index * 0.03}s`,
            zIndex: 10000 - index
          }}
        ></div>
      ))}
    </div>
  );
};

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollAttemptsRef = useRef(0);
  const maxScrollAttempts = 10;
  const initialLoadDone = useRef(false);

  // Scroll zum Projektbereich
  const scrollToProjects = useCallback(() => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
      return true;
    } else {
      scrollAttemptsRef.current += 1;
      
      if (scrollAttemptsRef.current < maxScrollAttempts) {
        setTimeout(scrollToProjects, 200);
      } else {
        window.addEventListener('projectsectionready', () => {
          const projectsSection = document.getElementById('projects');
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, { once: true });
      }
      return false;
    }
  }, []);

  useEffect(() => {
    // URL-Parameter auswerten
    const urlParams = new URLSearchParams(window.location.search);
    const hasScrollToProjects = urlParams.get('scrollTo') === 'projects';
    const hasScrollToProjectsFlag = typeof window !== 'undefined' && sessionStorage.getItem('scrollToProjects') === 'true';
    
    // Initialisierung beim ersten Laden
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      
      // Preloader überspringen, wenn von Projektdetailseite zurückkehrend
      if (hasScrollToProjects || hasScrollToProjectsFlag) {
        setIsLoading(false);
        
        if (hasScrollToProjectsFlag) {
          setTimeout(() => {
            sessionStorage.removeItem('scrollToProjects');
          }, 500);
        }
      }
    }
    
    // URL-Parameter bereinigen
    if (hasScrollToProjects || window.location.hash) {
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Zu Projekten scrollen, wenn von Projektdetailseite zurückkehrend
    if (hasScrollToProjects || hasScrollToProjectsFlag) {
      setTimeout(() => {
        scrollToProjects();
      }, 300);
    } 
    // Normales Laden mit Preloader - REMOVE the auto-timeout
    // The preloader will handle its own timing and call onLoadingComplete
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isLoading, scrollToProjects]);

  // Handle preloader completion
  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    
    // Hash-Navigation verarbeiten
    if (window.location.hash) {
      setTimeout(() => {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  return (
    <>
      {/* Metaball-ähnlicher Cursor - show during preloader too */}
      {<FramerCursor />}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onLoadingComplete={handlePreloaderComplete} />
        ) : (
          <motion.main 
            key="main-content"
            className="overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <div id="hero" className="min-h-screen relative">
              <Background 
                words={[
                  "Artin Teymoori", 
                  "Frontend Developer", 
                  "UI/UX Designer", 
                  "Code Enthusiast", 
                  "CSS Master"
                ]} 
              />
            </div>

            <AboutSection />
            <ProjectsSectionWithCards />
            <AtomicToolsVisualizer />
            <ContactSectionCards />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
