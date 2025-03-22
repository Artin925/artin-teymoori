"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Define types for the card content
interface CardProps {
  id: number | string;
  title: string;
  subtitle?: string;
  description?: string;
  bgColor: string;
  icon?: string;           // Font Awesome icon class
  svgIcon?: string;        // Path to SVG icon
  image?: string;          // Path to image
  tags?: string[];         // Optional tags array
  link?: string;           // Optional link
  onClick?: () => void;    // Optional click handler
  children?: React.ReactNode; // Optional children content
  height?: string;         // Optional height override
}

export default function ReusableCard({ 
  id, 
  title, 
  subtitle, 
  description, 
  bgColor, 
  icon, 
  svgIcon, 
  image,
  tags,
  link,
  onClick,
  children,
  height = '240px'  // Default height if not provided
}: CardProps) {
  // States for interactivity
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse movement tracking for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      setMousePosition({ x, y });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Handle Card Click
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      window.open(link, '_blank');
    }
  };

  // Calculate 3D transformations based on mouse position
  const rotateY = isHovered ? mousePosition.x * 10 : 0;
  const rotateX = isHovered ? -mousePosition.y * 10 : 0;
  const translateZ = isHovered ? 20 : 0;

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-xl overflow-hidden transition-all duration-500 cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
        transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        height: height === 'auto' ? 'auto' : height, // Unterstützung für 'auto'
        minHeight: height === 'auto' ? '380px' : undefined // Minimale Höhe bei 'auto'
      }}
      data-id={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background with glassmorphism */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: `linear-gradient(135deg, ${bgColor}30 0%, ${bgColor}10 100%)`,
          backdropFilter: 'blur(10px)',
          boxShadow: isHovered 
            ? `0 20px 40px rgba(0,0,0,0.3), inset 0 0 0 1px ${bgColor}40` 
            : `0 10px 30px rgba(0,0,0,0.15), inset 0 0 0 1px ${bgColor}30`,
          borderRadius: '16px',
        }}
      >
        {/* Noise texture for added depth - embedded as base64 to avoid external file dependency */}
        <div 
          className="absolute inset-0 rounded-xl"
          style={{
            opacity: 0.15,
            mixBlendMode: 'overlay',
            backgroundImage: "url('data:image/png;base64,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')"
          }}
        ></div>
      </div>
      
      {/* Glowing background */}
      <div 
        className="absolute -right-20 -bottom-20 w-2/3 h-2/3 rounded-full z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${bgColor}40 0%, transparent 70%)`,
          opacity: isHovered ? 0.8 : 0.3,
          filter: `blur(${isHovered ? 30 : 40}px)`,
          transform: `scale(${isHovered ? 1.2 : 1})`,
          transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 pb-12">
        {/* Icon/Image Container */}
        {(icon || svgIcon || image) && (
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ 
              background: `linear-gradient(135deg, ${bgColor}40 0%, ${bgColor}20 100%)`,
              boxShadow: `0 10px 20px ${bgColor}20, inset 0 0 0 1px ${bgColor}30`,
              transform: `translateY(${isHovered ? -5 : 0}px)`,
              transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          >
            {svgIcon ? (
              <Image 
                src={svgIcon} 
                width={32}
                height={32}
                alt={title}
                style={{ 
                  filter: `drop-shadow(0 0 5px ${bgColor}90)`
                }}
              />
            ) : icon ? (
              <i 
                className={`${icon} text-2xl`}
                style={{ 
                  color: bgColor,
                  filter: `drop-shadow(0 0 5px ${bgColor}90)` 
                }}
              ></i>
            ) : image ? (
              <Image 
                src={image} 
                width={32}
                height={32}
                alt={title}
                style={{ 
                  filter: `drop-shadow(0 0 5px ${bgColor}90)`
                }}
              />
            ) : null}
          </div>
        )}
        
        {/* Text Content */}
        <h4 
          className="text-xl font-bold mb-2"
          style={{ 
            color: bgColor,
            textShadow: `0 0 10px ${bgColor}30`
          }}
        >
          {title}
        </h4>
        
        {subtitle && (
          <h5 
            className="text-sm font-medium mb-2"
            style={{
              color: `${bgColor}DD`,
            }}
          >
            {subtitle}
          </h5>
        )}
        
        {description && (
          <p className="text-gray-200 text-sm leading-relaxed mb-3 line-clamp-2 min-h-[40px]">
            {description}
          </p>
        )}
        
        {/* Children content if provided */}
        {children && (
          <div className="text-gray-200">
            {children}
          </div>
        )}
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto mb-2">
            {tags.map((tag, index) => (
              <motion.span 
                key={index}
                className="px-2 py-1 rounded text-xs"
                style={{
                  backgroundColor: `${bgColor}20`,
                  color: bgColor,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0.8, 
                  scale: isHovered ? 1 : 0.9,
                  transition: { delay: index * 0.05 }
                }}
                whileHover={{ scale: 1.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}
        
        {/* Decorative elements */}
        <div 
          className="absolute top-6 right-6 w-3 h-3 rounded-full"
          style={{
            backgroundColor: bgColor,
            opacity: 0.3,
            filter: `blur(1px)`,
          }}
        />
        <div 
          className="absolute top-12 right-10 w-2 h-2 rounded-full"
          style={{
            backgroundColor: bgColor,
            opacity: 0.2,
            filter: `blur(1px)`,
          }}
        />
      </div>
    </motion.div>
  );
} 