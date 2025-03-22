"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Add onLoadingComplete callback prop
interface PreloaderProps {
  onLoadingComplete?: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");
  const [isVisible, setIsVisible] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const particlesRef = useRef<Array<{ x: number; y: number; duration: number; delay: number }>>([]);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const textIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef(0);
  const startTimeRef = useRef(Date.now());
  const hasCalledCompletionRef = useRef(false);
  
  // Minimum display time in milliseconds (1 second)
  const MIN_DISPLAY_TIME = 1000;
  
  const loadingPhrases = [
    "Initializing...",
    "Loading creative assets...",
    "Almost there...",
    "Welcome!"
  ];

  // Initialize particles once
  useEffect(() => {
    // Set start time
    startTimeRef.current = Date.now();
    
    // Create random positions for particles
    particlesRef.current = Array.from({ length: 10 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2
    }));

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (textIntervalRef.current) clearInterval(textIntervalRef.current);
    };
  }, []);

  // Handle time-based check to hide preloader only when both conditions are met
  useEffect(() => {
    let hideTimeout: NodeJS.Timeout | null = null;
    
    // If loading is complete and minimum time has passed
    if (loadingComplete) {
      const elapsedTime = Date.now() - startTimeRef.current;
      
      if (elapsedTime >= MIN_DISPLAY_TIME) {
        // Both conditions met, hide after a short delay
        hideTimeout = setTimeout(() => {
          setIsVisible(false);
          // Call the callback when completely done and visible is false
          if (onLoadingComplete && !hasCalledCompletionRef.current) {
            hasCalledCompletionRef.current = true;
            onLoadingComplete();
          }
        }, 100); // Shorter delay before hiding
      } else {
        // Loading complete but minimum time not yet passed
        const remainingTime = MIN_DISPLAY_TIME - elapsedTime;
        hideTimeout = setTimeout(() => {
          setIsVisible(false);
          // Call the callback when completely done and visible is false
          if (onLoadingComplete && !hasCalledCompletionRef.current) {
            hasCalledCompletionRef.current = true;
            onLoadingComplete();
          }
        }, remainingTime);
      }
    }
    
    return () => {
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [loadingComplete, onLoadingComplete]);

  // Handle progress increment extremely quickly
  useEffect(() => {
    const incrementProgress = () => {
      // Super fast progress increment (3.0 to 5.0 per interval)
      const increment = 3.0 + (Math.random() * 2.0);
      progressRef.current = Math.min(progressRef.current + increment, 100);
      
      // Only update state when there's a visible change (rounded to nearest integer)
      const roundedProgress = Math.round(progressRef.current);
      if (roundedProgress > Math.round(progress)) {
        setProgress(progressRef.current);
        
        // Update text directly based on progress thresholds
        let textIndex = 0;
        if (progressRef.current >= 85) textIndex = 3;
        else if (progressRef.current >= 50) textIndex = 2;
        else if (progressRef.current >= 15) textIndex = 1;
        
        setLoadingText(loadingPhrases[textIndex]);
      }
      
      // Check if we've reached 100%
      if (progressRef.current >= 100) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        
        // Mark loading as complete
        setLoadingComplete(true);
      }
    };

    // Very fast interval for progress updates (80ms between updates)
    progressIntervalRef.current = setInterval(incrementProgress, 80);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [progress, loadingPhrases]);

  const backgroundVariants = {
    initial: {
      background: "linear-gradient(135deg, #000000, #0f0f0f)"
    },
    animate: {
      background: [
        "linear-gradient(135deg, #000000, #0f0f0f)",
        "linear-gradient(135deg, #0c0c1d, #1a1a2e)",
        "linear-gradient(135deg, #10101e, #2a2a4a)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const logoParts = "ARTIN".split("");

  if (!isVisible) return null;

  return (
    <motion.div 
      className="absolute inset-0 z-50 flex flex-col justify-center items-center overflow-hidden w-full h-screen"
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Animated background - simple particles instead of heavy MetaBalls */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black to-gray-900 overflow-hidden">
        {/* Simple animated particles */}
        {particlesRef.current.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`
            }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: particle.duration,
              delay: particle.delay
            }}
          />
        ))}
      </div>

      {/* Logo animation */}
      <div className="relative z-10 mb-12">
        <div className="flex items-center justify-center">
          {logoParts.map((letter, index) => (
            <motion.div
              key={index}
              className="text-white text-5xl md:text-7xl font-bold mx-1"
              initial={{ y: -100, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: { 
                  delay: index * 0.1,
                  duration: 0.7,
                  type: "spring",
                  stiffness: 100
                }
              }}
              whileHover={{ 
                scale: 1.2, 
                rotate: [0, 5, -5, 0],
                color: ["#ffffff", "#3b82f6", "#8b5cf6", "#ffffff"],
                transition: { duration: 0.5 }
              }}
            >
              {letter}
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="text-white text-lg md:text-xl opacity-70 mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Portfolio
        </motion.div>
      </div>

      {/* Loading bar */}
      <div className="relative z-10 w-64 md:w-80 mb-4">
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Loading text */}
      <motion.div 
        className="text-white text-sm md:text-base relative z-10"
        key={loadingText}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {loadingText}
      </motion.div>

      {/* Background stars effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="stars-1"></div>
        <div className="stars-2"></div>
        <div className="stars-3"></div>
      </div>
    </motion.div>
  );
};

export default Preloader;
