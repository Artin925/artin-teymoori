"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// Hilfsfunktion zum Generieren von CSS-Filtern für SVG-Einfärbung
const generateColorFilter = (hexColor: string): string => {
  // Für die häufigsten Farben verwenden wir vordefinierte Filter
  if (hexColor === "#10A37F") { // ChatGPT Grün
    return "invert(42%) sepia(93%) saturate(1352%) hue-rotate(142deg) brightness(92%) contrast(101%)";
  }
  if (hexColor === "#8A3FFC") { // Claude Lila
    return "invert(34%) sepia(93%) saturate(5987%) hue-rotate(257deg) brightness(95%) contrast(101%)";
  }
  
  // Fallback für andere Farben - einfacher Graustufenfilter mit Farbüberlagerung
  return "grayscale(100%) brightness(0) saturate(100%)";
};

// Modernere Tools Visualisierung mit 3D-Karten Layout
export default function AtomicToolsVisualizer() {
  // Tool data mit Labels, Icons und lustigen Beschreibungen
  const tools = [
    { 
      name: "Google", 
      icon: "fab fa-google", 
      color: "#4285F4", 
      link: "https://www.google.com",
      funnyText: "Wenn ich nicht weiß, wie man einen div zentriert, aber trotzdem Developer bin. Fake it till you Google it!",
    },
    { 
      name: "YouTube", 
      icon: "fab fa-youtube", 
      color: "#FF0000", 
      link: "https://www.youtube.com",
      funnyText: "Meine Universität! Hier studiere ich wichtige Seminare wie \"Katzen spielen Klavier\" und \"CSS-Tricks um 3 Uhr morgens\"."
    },
    { 
      name: "Stack Overflow", 
      icon: "fab fa-stack-overflow", 
      color: "#F48024", 
      link: "https://stackoverflow.com",
      funnyText: "Mein Therapieplatz, wo Code geweint und gefeiert wird. Motto: Kopieren, Einfügen, Beten, dass es funktioniert!"
    },
    { 
      name: "GitHub", 
      icon: "fab fa-github", 
      color: "#ffffff", 
      link: "https://github.com",
      funnyText: "Mein digitales Tagebuch - voller halb-fertiger Projekte und übermütiger Commits um 2 Uhr nachts."
    },
    { 
      name: "ChatGPT", 
      svgIcon: "/images/icons/openai.svg", 
      color: "#10A37F", 
      link: "https://chat.openai.com",
      funnyText: "Mein virtueller Kollege, der nie krank wird, aber manchmal halluziniert. Funktioniert am besten mit Kaffee (für mich, nicht für es)."
    },
    { 
      name: "Claude", 
      svgIcon: "/images/icons/claude.svg", 
      color: "#8A3FFC", 
      link: "https://claude.ai",
      funnyText: "Mein AI-Freund mit Philosophie-Abschluss. Kann komplexe Probleme lösen, scheitert aber an einfachen Matheaufgaben."
    },
  ];

  // States für Interaktivität
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visibleTools, setVisibleTools] = useState<number[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [randomJoke, setRandomJoke] = useState<string>("");
  const [currentCodeJoke, setCurrentCodeJoke] = useState<React.ReactNode | null>(null);
  
  // Static circle configurations instead of state
  const decorativeCircles = [
    { id: 1, size: 12, color: "#10B981", opacity: 0.6 },
    { id: 2, size: 9, color: "#6366F1", opacity: 0.65 },
    { id: 3, size: 14, color: "#4285F4", opacity: 0.55 },
    { id: 4, size: 10, color: "#F48024", opacity: 0.5 },
    { id: 5, size: 8, color: "#FF0000", opacity: 0.6 }
  ];
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const jokeBoxRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  // Erweiterte Liste mit Entwicklerwitzen für den Footer
  const devJokes = [
    "Warum programmieren Entwickler immer nachts? Weil dann die Bugs schlafen!",
    "Wie nennt man einen Entwickler, der nicht auf Stack Overflow nachschaut? Arbeitslos.",
    "Der ganze Code funktioniert auf meinem Rechner, deshalb schicke ich meinen Laptop zum Kunden!",
    "Warum verwenden Programmierer dunkle Themes? Weil Bugs Licht hassen!",
    "Ich brauche keinen Therapeuten, ich habe Console.log()",
    "Hat funktioniert? Nicht anfassen! Warum funktioniert's? Auch nicht anfassen!",
    "Wie viele Programmierer braucht man, um eine Glühbirne zu wechseln? Keinen, ist ein Hardware-Problem!",
    "Eine SQL-Abfrage geht in eine Bar, sieht zwei Tische und fragt: 'Kann ich mich JOIN?'",
    "Es gibt 10 Arten von Menschen: Die, die Binär verstehen, und die, die es nicht tun.",
    "Debugging ist wie ein Detektiv in einem Krimi sein, wo du auch der Mörder bist.",
    "Die zwei härtesten Dinge im Programmieren: Cache-Invalidierung, Benennung von Dingen und Off-by-one-Fehler.",
    "Programmieren ist wie Sex: Ein Fehler und du musst 18 Jahre lang dafür zahlen.",
    "Ein QA-Tester läuft in eine Bar. Läuft in eine Bar. Läuft in eine Bar. Läuft in eine Bar. Läuft in eine Bar...",
    "Was ist ein Algorithmus? Ein Wort, das Entwickler benutzen, wenn sie nicht erklären wollen, was sie tun.",
        "Warum sind Programmierer so schlecht in Small Talk? Sie erwarten immer eine Rückgabewert."

  ];
  
  // Neue Liste mit Code-Jokes mit Syntax-Highlighting
  const codeJokes = [
    <>
      <pre className="text-left text-xs md:text-sm overflow-x-auto whitespace-pre-wrap">
        <code>
          <span className="text-yellow-300">{"function"}</span> <span className="text-green-400">{"getRandomNumber"}</span>{"() {"}<br/>
          {"  "}<span className="text-gray-400">{"// garantiert zufällig"}</span><br/>
          {"  "}<span className="text-purple-400">{"return"}</span> <span className="text-blue-400">{"4"}</span>{"; "}<span className="text-gray-400">{"// ausgewählt durch Würfeln"}</span><br/>
          {"}"}
        </code>
      </pre>
    </>,
    <>
      <pre className="text-left text-xs md:text-sm overflow-x-auto whitespace-pre-wrap">
        <code>
          <span className="text-green-400">{"// Yo dawg, I heard you liked recursion..."}</span><br/><br/>
          <span className="text-blue-400">{"# To understand recursion, see the bottom of this file."}</span><br/>
          <span className="text-gray-500">{"..."}</span><br/>
          <span className="text-gray-500">{"..."}</span><br/>
          <span className="text-blue-400">{"# To understand recursion, see the top of this file."}</span>
        </code>
      </pre>
    </>,
    <>
      <pre className="text-left text-xs md:text-sm overflow-x-auto whitespace-pre-wrap">
        <code>
          <span className="text-pink-500">{"try"}</span> {"{"}<br/>
          {"  "}<span className="text-blue-400">{"coffee"}</span>{".drink();"}<br/>
          {"  "}<span className="text-blue-400">{"code"}</span>{".write();"}<br/>
          <span className="text-pink-500">{"}"}</span> <span className="text-pink-500">{"catch"}</span> {"(NoCoffeeError) {"}<br/>
          {"  "}<span className="text-blue-400">{"developer"}</span>{".scream();"}<br/>
          {"  "}<span className="text-blue-400">{"process"}</span>{".exit(1); "}<span className="text-gray-400">{"// Notfall"}</span><br/>
          {"}"}
        </code>
      </pre>
    </>,
    <>
      <pre className="text-left text-xs md:text-sm overflow-x-auto whitespace-pre-wrap">
        <code>
          <span className="text-red-400">{"if"}</span> {"(sad() === "}<span className="text-green-400">{"true"}</span>{") {"}<br/>
          {"  sad.stop();"}<br/>
          {"  beAwesome();"}<br/>
          {"}"}
        </code>
      </pre>
    </>,
    <>
      <pre className="text-left text-xs md:text-sm overflow-x-auto whitespace-pre-wrap">
        <code>
          <span className="text-purple-400">{"// Programmierer-Wörterbuch:"}</span><br/>
          <span className="text-green-500">{"'Es sollte funktionieren'"}</span> {"= "}<span className="text-yellow-300">{"'Ich hab's nicht getestet'"}</span><br/>
          <span className="text-green-500">{"'Kann nicht reproduziert werden'"}</span> {"= "}<span className="text-yellow-300">{"'Funktioniert auf meinem Rechner'"}</span><br/>
          <span className="text-green-500">{"'Kleiner Fix'"}</span> {"= "}<span className="text-yellow-300">{"'Ich habe 400 Zeilen neu geschrieben'"}</span>
        </code>
      </pre>
    </>,
    <>
      <pre className="text-left text-xs md:text-sm overflow-x-auto whitespace-pre-wrap">
        <code>
          <span className="text-orange-400">{"// TODO: Kommentar später entfernen (2014)"}</span><br/>
          <span className="text-teal-400">{"// FIXME (2018): Immer noch nicht behoben"}</span><br/>
          <span className="text-teal-400">{"// FIXME (2021): Ok, vielleicht später..."}</span><br/>
          <span className="text-teal-400">{"// FIXME (2023): Es ist jetzt ein Feature"}</span>
        </code>
      </pre>
    </>,
    <>
      <pre className="text-left text-xs md:text-sm overflow-x-auto whitespace-pre-wrap">
        <code>
          <span className="text-green-400">{"// Von github.com/your-crush kopiert"}</span><br/>
          <span className="text-pink-400">{"function"}</span> <span className="text-blue-400">{"whatIsLove"}</span>{"() {"}<br/>
          {"  "}<span className="text-purple-400">{"const"}</span> baby = <span className="text-yellow-300">{"\"Don't hurt me\""}</span>;<br/>
          {"  "}<span className="text-green-400">{"// Don't hurt me"}</span><br/>
          {"  "}<span className="text-purple-400">{"return"}</span> <span className="text-yellow-300">{"\"No more\""}</span>;<br/>
          {"}"}
        </code>
      </pre>
    </>,
    <>
      <pre className="text-left text-xs md:text-sm overflow-x-auto whitespace-pre-wrap">
        <code>
          <span className="text-pink-400">{"// 99 little bugs in the code"}</span><br/>
          <span className="text-pink-400">{"// 99 little bugs"}</span><br/>
          <span className="text-pink-400">{"// Take one down, patch it around"}</span><br/>
          <span className="text-pink-400">{"// 127 little bugs in the code"}</span>
        </code>
      </pre>
    </>
  ];

  // Mouse movement tracking für 3D-Effekt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Zeige Tools nacheinander an
  useEffect(() => {
    // Zeige die Tools nacheinander an
    tools.forEach((_, index) => {
      setTimeout(() => {
        setVisibleTools(prev => [...prev, index]);
      }, 200 * index);
    });

    // Zeige entweder einen Text-Witz oder einen Code-Witz
    const updateJoke = () => {
      // 70% Wahrscheinlichkeit für Code-Joke, 30% für normalen Witz
      if (Math.random() < 0.7) {
        const codeJokeIndex = Math.floor(Math.random() * codeJokes.length);
        setCurrentCodeJoke(codeJokes[codeJokeIndex]);
        setRandomJoke("");
      } else {
        const jokeIndex = Math.floor(Math.random() * devJokes.length);
        setRandomJoke(devJokes[jokeIndex]);
        setCurrentCodeJoke(null);
      }
    };

    // Initial joke
    updateJoke();

    // Aktualisiere den Witz alle 20 Sekunden
    const jokeInterval = setInterval(updateJoke, 20000);

    return () => {
      clearInterval(jokeInterval);
    };
  }, []);

  // Handle Tool Klick
  const handleToolClick = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div id="tools-visualizer" ref={sectionRef} className="w-full py-20 pb-32 mt-10 mb-0 bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
      {/* Verbesserte dekorative Hintergrundelemente */}
      <motion.div 
        className="absolute -right-20 top-20 w-80 h-80 rounded-full bg-blue-200 dark:bg-blue-900 opacity-15"
        animate={{
          x: [0, 30, 0],
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      <motion.div 
        className="absolute -left-20 bottom-40 w-96 h-96 rounded-full bg-purple-200 dark:bg-purple-900 opacity-15"
        animate={{
          y: [0, -40, 0],
          opacity: [0.1, 0.25, 0.1],
          scale: [1, 1.15, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      <motion.div 
        className="absolute right-1/3 bottom-20 w-64 h-64 rounded-full bg-green-200 dark:bg-green-900 opacity-10"
        animate={{
          y: [10, -20, 10],
          x: [5, -15, 5],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      
      {/* Glasmorphismus Overlay ohne Blur */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-gray-100/50 dark:via-gray-900/50 to-transparent opacity-30 pointer-events-none"></div>
      
      <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
        {/* Benutzerdefinierter Titel ohne Hintergrund-Box */}
        <motion.div 
          ref={titleRef}
          className="text-center mb-14 relative"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.7 }}
        >
          {/* Titel-Text ohne Hintergrund-Rechteck */}
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-1">
              <span className="text-gray-700 dark:text-gray-300">Meine </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-indigo-600">
                Geheimwaffen
              </span>
            </h2>
            
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto mt-3">
              Diese Tools machen mich produktiver - aber frag nicht wie viel Zeit ich mit ihnen verbringe!
            </p>
          </div>
        </motion.div>
        
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4"
        >
          {tools.map((tool, index) => {
            // 3D Transformationen basierend auf Mausposition
            const rotateY = hoveredCard === index ? mousePosition.x * 10 : 0;
            const rotateX = hoveredCard === index ? -mousePosition.y * 10 : 0;
            const translateZ = hoveredCard === index ? 20 : 0;
            
            return (
              <motion.div
                key={`tool-card-${index}`}
                className="relative rounded-xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: visibleTools.includes(index) ? 1 : 0, 
                  y: visibleTools.includes(index) ? 0 : 30 
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.23, 1, 0.32, 1]
                }}
                style={{
                  transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                  transition: 'transform 0.2s ease-out',
                  height: '240px'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleToolClick(tool.link)}
              >
                {/* Hintergrund mit Glasmorphismus - exakt wie im alten Code */}
                <div 
                  className="absolute inset-0 z-0" 
                  style={{
                    background: `linear-gradient(135deg, ${tool.color}30 0%, ${tool.color}10 100%)`,
                    boxShadow: hoveredCard === index 
                      ? `0 20px 40px rgba(0,0,0,0.3), inset 0 0 0 1px ${tool.color}40` 
                      : `0 10px 30px rgba(0,0,0,0.15), inset 0 0 0 1px ${tool.color}30`,
                    borderRadius: '16px',
                    border: `1px solid ${tool.color}20`,
                    transition: 'box-shadow 0.3s ease-out'
                  }}
                />
                
                {/* Glühender Hintergrund - exakt wie im alten Code */}
                <div 
                  className="absolute -right-20 -bottom-20 w-2/3 h-2/3 rounded-full z-0 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, ${tool.color}40 0%, transparent 70%)`,
                    opacity: hoveredCard === index ? 0.8 : 0.3,
                    transform: `scale(${hoveredCard === index ? 1.2 : 1})`,
                    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                  }}
                />
                
                {/* Inhalt */}
                <div className="relative z-10 flex flex-col h-full p-6">
                  {/* Icon Container - wie im alten Code */}
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ 
                      background: `linear-gradient(135deg, ${tool.color}40 0%, ${tool.color}20 100%)`,
                      boxShadow: `0 10px 20px ${tool.color}20, inset 0 0 0 1px ${tool.color}30`,
                      transform: `translateY(${hoveredCard === index ? -5 : 0}px)`,
                      transition: 'transform 0.3s ease-out'
                    }}
                  >
                    {tool.svgIcon ? (
                      <Image 
                        src={tool.svgIcon} 
                        width={32}
                        height={32}
                        alt={tool.name}
                        style={{ 
                          filter: `drop-shadow(0 0 5px ${tool.color}90) ${generateColorFilter(tool.color)}`
                        }}
                      />
                    ) : (
                      <i 
                        className={`${tool.icon} text-2xl`}
                        style={{ 
                          color: tool.color,
                          filter: `drop-shadow(0 0 5px ${tool.color}90)` 
                        }}
                      ></i>
                    )}
                  </div>
                  
                  {/* Text Inhalt - wie im alten Code */}
                  <h4 
                    className="text-xl font-bold mb-2 bg-clip-text text-transparent"
                    style={{ 
                      backgroundImage: `linear-gradient(135deg, ${tool.color} 0%, ${tool.color}AA 100%)`,
                      textShadow: `0 0 10px ${tool.color}30`
                    }}
                  >
                    {tool.name}
                  </h4>
                  
                  <p className="text-gray-200 text-sm leading-relaxed">{tool.funnyText}</p>
                  
                  {/* Deco Kreise - wie im alten Code */}
                  <div 
                    className="absolute top-6 right-6 w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: tool.color,
                      opacity: 0.3
                    }}
                  />
                  <div 
                    className="absolute top-12 right-10 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: tool.color,
                      opacity: 0.2
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dev-Jokes-Box im Stil der Karten - ohne Blur */}
        <motion.div 
          className="text-center mt-20 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          <motion.div 
            ref={jokeBoxRef}
            className="relative max-w-xl mx-auto py-6 px-8 rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(16, 185, 129, 0.6), 0 0 30px rgba(99, 102, 241, 0.5)",
              borderRadius: '20px',
              border: "1px solid rgba(99, 102, 241, 0.5)",
              backdropFilter: "blur(8px)",
              minHeight: "220px", // Ensure minimum height for circles
              position: "relative" // Explicitly set position for child positioning
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Removing the glowing background that was causing positioning issues */}
            
            <motion.div 
              className="absolute -top-4 -right-4 w-16 h-16 rounded-xl flex items-center justify-center"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "loop"
              }}
              style={{ 
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(99, 102, 241, 0.7) 100%)",
                boxShadow: "0 15px 30px rgba(16, 185, 129, 0.7), inset 0 0 0 1px rgba(16, 185, 129, 0.8), 0 0 30px rgba(99, 102, 241, 0.6)"
              }}
            >
              <i className="fas fa-lightbulb text-2xl text-white"></i>
            </motion.div>
            
            <div className="relative z-10">
              <h4 
                className="text-2xl font-bold mb-3 bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: "linear-gradient(135deg, #10B981 0%, #6366F1 100%)",
                  textShadow: "0 0 20px rgba(16, 185, 129, 0.7)"
                }}
              >
                Dev-Fakt des Tages
              </h4>
              
              {/* Entweder Code-Joke mit Syntax-Highlighting oder normalen Text-Joke anzeigen */}
              {currentCodeJoke ? (
                <div className="text-gray-200 leading-relaxed bg-gray-800 p-3 rounded-lg shadow-inner">
                  {currentCodeJoke}
                </div>
              ) : (
                <p className="text-gray-200 text-base italic font-medium leading-relaxed">
                  {randomJoke}
                </p>
              )}
              
              <div className="mt-6 flex justify-center">
                <motion.button
                  className="px-6 py-2 rounded-full flex items-center justify-center group relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Zeige entweder einen Text-Witz oder einen Code-Witz
                    if (Math.random() < 0.7) {
                      const codeJokeIndex = Math.floor(Math.random() * codeJokes.length);
                      setCurrentCodeJoke(codeJokes[codeJokeIndex]);
                      setRandomJoke("");
                    } else {
                      const jokeIndex = Math.floor(Math.random() * devJokes.length);
                      setRandomJoke(devJokes[jokeIndex]);
                      setCurrentCodeJoke(null);
                    }
                  }}
                  style={{ 
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(99, 102, 241, 0.7) 100%)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2), 0 0 15px rgba(99, 102, 241, 0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}
                >
                  {/* Animated background effect */}
                  <motion.div 
                    className="absolute inset-0 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      background: [
                        "linear-gradient(45deg, rgba(16, 185, 129, 0.7) 0%, rgba(99, 102, 241, 0.5) 100%)",
                        "linear-gradient(225deg, rgba(16, 185, 129, 0.7) 0%, rgba(99, 102, 241, 0.5) 100%)",
                        "linear-gradient(45deg, rgba(16, 185, 129, 0.7) 0%, rgba(99, 102, 241, 0.5) 100%)"
                      ],
                      opacity: 1
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                  <i className="fas fa-sync-alt mr-2 text-base group-hover:rotate-180 transition-transform duration-500"></i>
                  <span className="text-white font-medium">Neuer Fakt</span>
                </motion.button>
              </div>
            </div>
            
            {/* Animierte Deco Kreise mit Framer Motion - with enhanced styling and behind text */}
            {decorativeCircles.map((circle, index) => {
              // Keep the good positions
              const positions = [
                { top: "15%", left: "25%" },  // Top left
                { top: "20%", left: "65%" },  // Top right
                { top: "40%", left: "15%" },  // Middle left
                { top: "55%", left: "70%" },  // Bottom right
                { top: "70%", left: "35%" }   // Bottom center
              ];
              
              // Set circles to be behind content which has z-index 10
              const zIndex = 5;
              
              return (
                <motion.div 
                  key={`deco-circle-${circle.id}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${circle.size * 4}px`,
                    height: `${circle.size * 4}px`,
                    backgroundColor: circle.color,
                    opacity: circle.opacity * 0.8, // Further reduced opacity
                    boxShadow: `0 0 25px 12px ${circle.color}35`,
                    zIndex: zIndex, // Behind text/content
                    pointerEvents: "none",
                    position: "absolute",
                    top: positions[index].top,
                    left: positions[index].left,
                    transform: "none", // Remove any transform to prevent interference
                    margin: `-${circle.size * 2}px 0 0 -${circle.size * 2}px`,
                    filter: `blur(6px) brightness(1.3)`, // Increased blur effect
                    backdropFilter: "blur(3px)",
                    mixBlendMode: "soft-light" // Softer blend with background
                  }}
                  animate={{
                    top: [
                      positions[index].top,
                      `${parseInt(positions[index].top) + (index % 2 === 0 ? 25 : -25)}%`,
                      `${parseInt(positions[index].top) + (index % 2 === 0 ? -20 : 20)}%`,
                      `${parseInt(positions[index].top) + (index % 2 === 0 ? 15 : -15)}%`,
                      positions[index].top
                    ],
                    left: [
                      positions[index].left,
                      `${parseInt(positions[index].left) + (index % 2 === 0 ? -30 : 30)}%`,
                      `${parseInt(positions[index].left) + (index % 2 === 0 ? -15 : 15)}%`,
                      `${parseInt(positions[index].left) + (index % 2 === 0 ? 20 : -20)}%`,
                      positions[index].left
                    ],
                    scale: [
                      1,
                      index % 2 === 0 ? 1.2 : 0.9,
                      index % 2 === 0 ? 0.9 : 1.1,
                      index % 2 === 0 ? 1.1 : 0.95,
                      1
                    ], // Add subtle scaling animation
                    filter: [
                      `blur(6px) brightness(1.3)`,
                      `blur(${5 + index % 4}px) brightness(1.4)`,
                      `blur(${8 - index % 3}px) brightness(1.3)`,
                      `blur(${7 + index % 3}px) brightness(1.2)`,
                      `blur(6px) brightness(1.3)`
                    ] // Enhanced blur animation
                  }}
                  transition={{
                    duration: 20 + index * 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              );
            })}
          </motion.div>
          
          <motion.p 
            className="text-xs text-gray-500 dark:text-gray-500 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            * Keine Tools wurden bei der Erstellung dieser Website missbraucht
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}