"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import Project from '../components/Project'; // Removed .tsx extension

export default function Home() {

  const sections = ['intro', 'project 1', 'project 2', 'project 3', 'project 4', 'project 5'];
  const projectData = {
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
      lesson: 'Healthcare is fragmented, which means critical communication between doctors often does not happen.  Information is lost, tests are repeated, resulting in inefficient and less effective outcomes. ',
    },
    'project 5': {
      title: 'Antidepressant Choices',
      description: 'Description of Project 5.',
      lesson: 'Pulls up the 3 most similar patients for the current patient.',
    },
  };

  // Added type definition for props
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
  
    return <p className="typing-text">{displayed}</p>;
  };

  const [activeSection, setActiveSection] = useState('intro');
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div 
      className={`${theme}`} 
      style={{
        width: "100%",
        minWidth: "100%",
        maxWidth: "100%",
        margin: 0,
        padding: "2rem",
        minHeight: "100vh",
        backgroundColor: theme === 'light' ? "white" : "black",
        color: theme === 'light' ? "black" : "white",
        transition: "background-color 0.5s, color 0.5s",
        overflow: "hidden"
      }}
    >
      <header className="header">
        <h1 className="logo">home</h1>
        <button className="toggle-btn" onClick={toggleTheme}>
          {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </header>

      <nav className="menu">
        {sections.map(section => (
          <div key={section} className="menu-item" onClick={() => setActiveSection(section)}>
            <span className="menu-text">{section}</span>
            <AnimatePresence>
              {activeSection === section && (
                <motion.div
                  className="underline"
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 300, damping: 40 }}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      <main className="main">
        {activeSection === 'intro' && (
          <TypingText text={`Hi, thanks for coming.\n\nI'd like to give you\n\n5 reasons to hire me, using 5 projects`} />
        )}
        {sections.slice(1).includes(activeSection) && (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Render dynamic project content based on active section */}
            <Project 
              title={projectData[activeSection]?.title} 
              description={projectData[activeSection]?.description} 
              lesson={projectData[activeSection]?.lesson} 
            />
          </motion.div>
        )}
      </main>
    </div>
  );
}
