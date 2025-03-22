"use client";

import React from "react";
import { motion } from "framer-motion";

interface TitleSectionProps {
  title: string;
  highlightedText: string;
  description: string;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
  isInView: boolean;
}

export default function TitleSection({
  title,
  highlightedText,
  description,
  emoji,
  gradientFrom,
  gradientTo,
  isInView
}: TitleSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 relative">
        <span className="relative z-10 text-white">
          {title}{" "}
        </span>
        <span 
          className="relative z-10 bg-clip-text text-transparent" 
          style={{
            background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
            WebkitBackgroundClip: "text"
          }}
        >
          {highlightedText}
        </span>
        <span className="absolute inset-0 w-full h-full flex justify-center">
          <span 
            className="w-64 h-6 opacity-10 blur-xl rounded-full transform -translate-y-1/4"
            style={{ backgroundColor: gradientFrom }}
          ></span>
        </span>
        <motion.span 
          className="inline-block ml-2"
          animate={{ 
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.2, 1, 1.2, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          {emoji}
        </motion.span>
      </h2>
      
      <motion.p 
        className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto backdrop-blur-sm rounded-lg py-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}0A, ${gradientTo}0A)`,
          border: `1px solid ${gradientFrom}1A`,
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)"
        }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
} 