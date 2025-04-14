"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import Project from '../components/Project'; // Make sure Project.tsx also uses Tailwind classes

// Define project data structure if needed
interface ProjectData {
  title: string;
  description: string;
  lesson: string;
}

interface ProjectCollection {
  [key: string]: ProjectData;
}


export default function Home() {
  // --- State and Data ---
  const sections: string[] = ['intro', 'project 1', 'project 2', 'project 3', 'project 4', 'project 5'];
  const projectData: ProjectCollection = {
    'project 1': {
      title: 'Preventive Screening Tests RAG Recommendation System',
      description: 'I built a retrieval augmented generation system (RAG) for automated asthma treatment recommendations',
      lesson: 'Why this is valuable: Clinical guidelines exist but are rarely followed. Accurate, relevant, automated clinical decision support systems are needed.',
    },
    'project 2': {
      title: 'Visual Patient Summaries',
      description: 'I take their lab results and plot them automatically.',
      lesson: 'Lesson: LLMs are potent tools, but you still need to know how to use them.',
    },
    'project 3': {
      title: 'Hypertension Medication Management System',
      description: 'Description of Project 3.',
      lesson: 'Lesson from Project 3: Data Science basics.',
    },
    'project 4': {
      title: 'FHIR interoperability',
      description: 'Takes all the clinical notes of a patient and outputs it into FHIR compatible format. This makes transferring a patient chart seamless between doctors',
      lesson: 'Healthcare is fragmented, which means critical communication between doctors often does not happen. Information is lost, tests are repeated, resulting in inefficient and less effective outcomes.',
    },
    'project 5': {
      title: 'Antidepressant Choices',
      description: 'Description of Project 5.',
      lesson: 'Pulls up the 3 most similar patients for the current patient.',
    },
  };

  const [activeSection, setActiveSection] = useState<string>('intro');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // --- Components ---
  interface TypingTextProps {
    text: string;
  }

  const TypingText = ({ text }: TypingTextProps) => {
    const [displayed, setDisplayed] = useState('');
    useEffect(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i === text.length) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }, [text]);

    // Styles from .typing-text
    // text-4xl (~2.25rem) or text-[2.5rem] for exact match
    return <p className="text-4xl whitespace-pre-line font-mono">{displayed}</p>;
  };

  // --- Event Handlers ---
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // --- Render ---
  return (
    // Styles from .container, .container.light, .container.dark
    // Using p-8 (2rem) instead of p-6 (1.5rem) for standard Tailwind spacing
    <div className={`min-h-screen w-full p-8 transition-colors duration-500 ${
      theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
    }`}>
      {/* Styles from .header */}
      <header className="flex justify-between items-center mb-12">
        {/* Styles from .logo */}
        <h1 className="text-2xl font-bold">home</h1>
        {/* Styles from .toggle-btn */}
        <button
          className="py-2 px-4 cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </header>

      {/* Styles from .menu */}
      {/* Tailwind uses system fonts by default. Use font-sans. */}
      <nav className="flex justify-between w-full mb-8 font-sans font-light">
        {sections.map(section => (
          // Styles from .menu-item
          <div
            key={section}
            className="relative cursor-pointer flex-1 text-center group" // group enables group-hover: styles
            onClick={() => setActiveSection(section)}
          >
            {/* Styles from .menu-text and hover state */}
            {/* text-sm is 0.875rem. tracking-wider is ~0.05em, close to 0.5px */}
            {/* Using custom color defined in tailwind.config.js or inline */}
            <span className="capitalize text-sm font-light tracking-wider transition-all duration-300 ease-in-out group-hover:opacity-80 group-hover:scale-105 group-hover:text-apple-blue">
              {section}
            </span>
            <AnimatePresence>
              {activeSection === section && (
                // Styles from .underline
                // h-0.5 is 2px. -bottom-1 is -0.25rem (~ -4px)
                <motion.div
                  className="absolute left-0 right-0 -bottom-1 h-0.5 bg-current"
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 300, damping: 40 }}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Styles from .main */}
      {/* max-w-2xl is 42rem (close to 40rem). mt-52 is 13rem (close to 200px) */}
      <main className="text-center max-w-2xl mx-auto flex flex-col justify-center items-center mt-52">
        {activeSection === 'intro' && (
          <TypingText text={`Hi, thanks for coming.\n\nI'd like to give you\n\n5 reasons to hire me, using 5 projects`} />
        )}
        {/* Render project details */}
        {sections.slice(1).map(section => (
          activeSection === section && (
            <motion.div
              key={section} // Use section name as key
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Pass data to Project component */}
              <Project
                title={projectData[section]?.title || ''}
                description={projectData[section]?.description || ''}
                lesson={projectData[section]?.lesson || ''}
              />
            </motion.div>
          )
        ))}
      </main>
    </div>
  );
}