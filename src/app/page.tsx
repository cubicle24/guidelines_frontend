"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

// --- Import Your Section Components ---
// Example: Assuming you create these or use existing ones
import Project from '../components/Project'; // Generic project component
import ScreeningGuidelines from '../components/ScreeningGuidelines';
import FHIRTransformer from '../components/FHIRTransformer';
// import IntroSection from '../components/IntroSection'; // Optional specific intro component
// import Project1Details from '../components/Project1Details'; // Specific component for Project 1
// import Project2Details from '../components/Project2Details'; // Specific component for Project 2
// ... etc.

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
  // const sections: string[] = ['intro', 'project 1', 'project 2', 'project 3', 'project 4', 'project 5'];
  const sections: string[] = ['Hello', 'project 1: a modern clinical decision support system', 'project 2: a flexible FHIR Transformer'];
  const projectData: ProjectCollection = {
    'project 1': {
      title: 'Preventive Screening Tests RAG Recommendation System',
      description: 'I built a retrieval augmented generation system (RAG) for automated asthma treatment recommendations',
      lesson: 'Why this is valuable: Clinical guidelines exist but are rarely followed. Accurate, relevant, automated clinical decision support systems are needed.',
    },
    'project 2': {
      title: 'Visual Patient Summaries',
      description: 'I take their lab results and plot them automatically.',
      lesson: 'Lesson: LLMs are the future in healthcare.  I am already there.',
    },
    // 'project 3': {
    //   title: 'Automated Differential Diagnosis Clinical Decision Support System',
    //   description: 'this project looks at a patient subjective and objective data and produces a ranked list of possible diagnoses.',
    //   lesson: 'The most crucial step in good medical care is to make the right diagnosis.',
    // },
    // 'project 4': {
    //   title: 'FHIR interoperability',
    //   description: 'Takes all the clinical notes of a patient and outputs it into FHIR compatible format. This makes transferring a patient chart seamless between doctors',
    //   lesson: 'Healthcare is fragmented, which means critical communication between doctors often does not happen. Information is lost, tests are repeated, resulting in inefficient and less effective outcomes.',
    // },
    // 'project 5': {
    //   title: 'Antidepressant Choices',
    //   description: 'Description of Project 5.',
    //   lesson: 'Pulls up the 3 most similar patients for the current patient.',
    // },
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
      }, 33);
      return () => clearInterval(interval);
    }, [text]);
    return <p className="text-4xl whitespace-pre-line font-mono">{displayed}</p>;
  };

  // --- Event Handlers ---
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // --- Helper Function to Render Active Section ---
  const renderActiveSection = () => {
    const motionProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3 },
    };

    switch (activeSection) {
      case 'Hello':
        // Option 1: Inline TypingText
        return (
          <motion.div key={activeSection} {...motionProps}>
             <TypingText text={`Hi, thanks for coming.\n\nI'd like to give you\n\nthe top 2 reasons to hire me, \n\nusing 2 projects.`} />
          </motion.div>
        );
        // Option 2: Use a dedicated IntroSection component
        // return <motion.div {...motionProps}><IntroSection /></motion.div>;

      case 'project 1: a modern clinical decision support system':
        // Option 1: Use specific component
        // return <motion.div {...motionProps}><Project1Details data={projectData[activeSection]} /></motion.div>;
        // Option 2: Use generic Project component if structure is the same
         return (
            <motion.div key={activeSection} {...motionProps}>
                <TypingText text={`Reason 1: LLMs are the future of healthcare.  I am already there.\n\n 
                Problem: Preventive screening for disease is still the most clinically \nand cost effective medical care we have.
                Health plans know this, so doctors are rewarded or penalized based on\n their medical screening practices. However, there are more than\n 97 different and ever-changing screening guidelines. 
                It is unrealistic to expect doctors to remember all of them.  Rules-based\n reminder systems can not capture the entire range of clinical possibilities.\n\n
                Solution: I built a retrieval augmented generation (RAG) system that takes
                 a patient note and generates a personalized, ranked list of the most appropriate\n screening guidelines, automatically.  This improves a doctor's\n performance, routes appropriate care to the patient, and saves\n the health system money. Everyone wins.\n\n
                  Tech stack: Langchain for the RAG, using Gemini 2.5 Flash. \nFrontend: React/Next.js. Backend: Python FastAPI\n`} />
              
                <ScreeningGuidelines />

             </motion.div>
         );

      case 'project 2: a flexible FHIR Transformer':
        // Example with a different specific component (if needed)
        // return <motion.div {...motionProps}><Project2Details details={projectData[activeSection]} /></motion.div>;
         return (
          <motion.div key={activeSection} {...motionProps}>
            <TypingText text={`Reason 2: Data is the currency of healthcare.  I can make it flow.`} />
             <FHIRTransformer />

          </motion.div>
         );

      // Add cases for project 3, 4, 5, using specific or generic components as needed
      case 'project 3':
        return (
          <motion.div key={activeSection} {...motionProps}>
            <TypingText text={`Reason 3: Data holds silent secrets.  I can make it speak.`} />
             <FHIRTransformer />

          </motion.div>
        );
      case 'project 4':
        return (
          <motion.div key={activeSection} {...motionProps}>
             <FHIRTransformer />

          </motion.div>
        );
      case 'project 5':
         return (
          <motion.div key={activeSection} {...motionProps}>
                 <Project
                     title={projectData[activeSection]?.title || ''}
                     description={projectData[activeSection]?.description || ''}
                     lesson={projectData[activeSection]?.lesson || ''}
                 />
             </motion.div>
         );

      default:
        return null; // Or a default component/message
    }
  };

  // --- Render ---
  return (
    <div className={`min-h-screen w-full p-8 transition-colors duration-500 ${
      theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
    }`}>
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold">home</h1>
        <button
          className="py-2 px-4 cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </header>

      <nav className="flex justify-between w-full mb-8 font-sans font-light">
        {sections.map(section => (
          <div
            key={section}
            className="relative cursor-pointer flex-1 text-center group"
            onClick={() => setActiveSection(section)}
          >
            <span className="capitalize text-lg font-light tracking-wider transition-all duration-300 ease-in-out group-hover:opacity-80 group-hover:scale-105 group-hover:text-apple-blue">
              {section}
            </span>
            <AnimatePresence>
              {activeSection === section && (
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

      <main className="w-full flex flex-col justify-center items-center mt-52">
         {/* Use AnimatePresence around the dynamic content area */}
         <AnimatePresence mode="wait">
              {renderActiveSection()}
         </AnimatePresence>
      </main>
    </div>
  );
}