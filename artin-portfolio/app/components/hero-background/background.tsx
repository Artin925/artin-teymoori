import React from "react";
import { BackgroundLines } from "./background-lines";
import { FlipWords } from "./flip-words";
import Link from "next/link";

interface BackgroundProps {
    words: string[];
  }

export function Background({ words }: BackgroundProps) {
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center">
            <BackgroundLines className="absolute inset-0">
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
                    <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-sans py-2 sm:py-4 md:py-8 lg:py-10 font-bold tracking-tight">
                        Hello World, <br />I am <FlipWords words={words} />
                    </h2>
                    <p className="max-w-lg sm:max-w-xl mx-auto text-xs sm:text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center pb-2 sm:pb-4 md:pb-6">
                        Front-end Developer with expertise in building responsive web applications and modern user interfaces. Fluent in HTML, CSS, and turning &quot;it&apos;s just a small design change&quot; into 3 hours of figuring out which div is acting up.
                    </p>
                    <Link
                        href="https://drive.google.com/file/d/168MctrCGssDZa23epKSW-Uis0G2KcTfV/view?usp=drive_link"
                        target="_blank"
                        className="relative z-50 bg-black dark:bg-white rounded-full text-white dark:text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 mt-4 sm:mt-6 lg:mt-8"
                    >
                        Know Me
                    </Link>
                </div>
            </BackgroundLines>
        </div>
    );
}
