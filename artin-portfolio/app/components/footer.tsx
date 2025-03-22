import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Artin Teymoori</h3>
            <p className="text-gray-400 mb-4">
              Frontend Developer & UI/UX Designer mit einer Leidenschaft für moderne 
              und benutzerfreundliche Webanwendungen.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Schnellzugriff</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#hero" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                  Über mich
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-400 hover:text-white transition-colors">
                  Projekte
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="#secret-tools" className="text-gray-400 hover:text-white transition-colors">
                  Secret Tools
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/Artin925" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Dev Humor</h3>
            <div className="bg-gray-800 p-3 rounded-lg shadow-inner overflow-hidden font-mono text-xs md:text-sm w-full md:w-full max-w-full">
              <pre className="text-gray-300 whitespace-pre-wrap">
                <code>
                  <span className="text-green-400">{"// Yo dawg, I heard you liked recursion..."}</span>{"\n"}
                  {"\n"}
                  <span className="text-blue-400">{"# To understand recursion, see the bottom of this file."}</span>{"\n"}
                  <span className="text-gray-500">{"..."}</span>{"\n"}
                  <span className="text-gray-500">{"..."}</span>{"\n"}
                  <span className="text-gray-500">{"..."}</span>{"\n"}
                  <span className="text-gray-500">{"..."}</span>{"\n"}
                  <span className="text-gray-500">{"..."}</span>{"\n"}
                  <span className="text-gray-500">{"..."}</span>{"\n"}

                  <span className="text-blue-400">{"# To understand recursion, see the top of this file."}</span>{"\n"}
                  {"\n"}
                  <span className="text-purple-400">{"/* Magic. Do not touch. */"}</span>{"\n"}
 
                </code>
              </pre>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Artin Teymoori. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Diese Website wurde mit Next.js, Tailwind CSS und einer Prise Humor gebaut. 
            <span className="inline-block shake-on-hover">😄</span>
          </p>
          <p className="text-gray-700 text-xs mt-1">
            <span className="text-[10px]">Keine Bugs wurden während der Erstellung dieser Website verletzt. Vielleicht.</span>
          </p>
        </div>
      </div>
    </footer>
  );
} 