"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

// --- Import Your Section Components ---
// Example: Assuming you create these or use existing ones
import Project from '../components/Project'; // Generic project component
import ScreeningGuidelines from '../components/ScreeningGuidelines';
import FHIRTransformer from '../components/FHIRTransformer';
import SDOH from '../components/SDOH';
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
  // const sections: string[] = ['Hello', 'project 1: a modern clinical decision support system', 'project 2: a flexible FHIR Transformer'];
  const sections: string[] = ['Hello', 'Clinical AI: A next generation clinical decision support system', 'A Social Determinants of Health AI Agent',
    'Healthcare Data Science Projects',
    
  ];
  const [activeSection, setActiveSection] = useState<string>('Hello');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // --- Components ---
  interface TypingTextProps {
    text: string;
    className?: string;
  }

  const TypingText = ({ text, className }: TypingTextProps) => {
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
    return <p className={`text-4xl whitespace-pre-line font-mono ${className || ''}`}>{displayed}</p>; // 3. Apply it
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
             <TypingText text={`Hi, thanks for coming!\n\nI work at the intersection of applied clinical AI (LLMs) \nwith healthcare (EHR) data.\n
              Whether it's building CDS systems, FHIR integration,
              or analyzing healthcare data, I'm ready to help.\n
              I am an MD with additional training in clinical informatics and public health. \n\nPlease explore the projects I have built that highlight
               my interests and skills.\n\n\n If you like what you see, please feel free to contact me!`} />
          </motion.div>
        );
        // Option 2: Use a dedicated IntroSection component
        // return <motion.div {...motionProps}><IntroSection /></motion.div>;

      case 'Clinical AI: A next generation clinical decision support system':
        // Option 1: Use specific component
        // return <motion.div {...motionProps}><Project1Details data={projectData[activeSection]} /></motion.div>;
        // Option 2: Use generic Project component if structure is the same
         return (
            <motion.div key={activeSection} {...motionProps}>
                <TypingText className="text-blue-500 text-center" text={`LLMs are the future of healthcare.  I am already there.`} />
                <div className="text-2xl mt-10">The Problem: Preventive screening for disease is still the most clinically and cost effective medical care we have.
                Health plans know this, so doctors are rewarded or penalized based on<br/> their medical screening practices. However, there are more than 97 different, frequently changing screening guidelines.
                It is unrealistic to expect doctors<br /> to remember all of them.  Rules-based reminder systems can not capture the full range of clinical possibilities.</div>

                <div className="text-2xl mt-10">
                Solution: I built a retrieval augmented generation (RAG) system that takes
                 a patient note and generates a personalized, ranked list of the most appropriate screening guidelines, automatically.<br />This makes for better doctors, healthier patients, and more efficient care. Everyone wins.
                 </div>
                
                 <div className="text-2xl mt-10" >
                  Tech stack: Langchain for the RAG, using Gemini 2.5 Flash. Frontend: React/Next.js. Backend: Python FastAPI</div>
              
                <ScreeningGuidelines />

             </motion.div>
         );

      case 'A Social Determinants of Health AI Agent':
        // Example with a different specific component (if needed)
        // return <motion.div {...motionProps}><Project2Details details={projectData[activeSection]} /></motion.div>;
         return (
          <motion.div key={activeSection} {...motionProps}>
          <TypingText className="text-blue-500 text-center" text={`I help fix the fundamental contradiction in healthcare: \nproviders practice paperwork more than patient care.`} />
          <div className="text-2xl mt-10">The Problem: &nbsp;Staying healthy involves more than just one's body. Between 50-80% of a person's health is determined by circumstances that are partially outside<br />
          of a person's control.    
          Social determinants of health (SDOH), such as unemployment, housing instability, food insecurity, etc., are now recognized to be <br />
          as integral to a person's health
          as their cholesterol. In simple terms, it's difficult to stay healthy when you have to ride 3 buses just to get to work, healthy food costs<br />
          too much, and you sleep poorly because you're afraid to turn on the heat at night. <br /> 
          <br />
          Physicians, social workers, and case managers know how crucial SDOH is, but they do not have enough time--even though 
          reimbursement and<br /> quality scores are now tied to addressing SDOH.

          </div>

          <div className="text-2xl mt-10">
          Solution: I built an automated SDOH risk factor identifier & intervention tool.  This is an AI agent that reads any clinical note and identifies<br />
          a patient's SDOH risk factors. The agent then maps 
          the risk factors to ICD-10 Z codes for reimbursement purposes, and then searches for local interventions.<br />
          All that's left is for the social worker or case manager to follow up.
          The result is less time pushing paper and more time helping people. 
           </div>
          
           <div className="text-2xl mt-10" >
          Tech stack: Langgraph for the agentic system; OpenAI 4.0 mini for the LLM. Frontend: React/Next.js. Backend: Python FastAPI</div>
        
          <SDOH />

       </motion.div>
         );

      case 'Healthcare Data Science Projects':
        // Example with a different specific component (if needed)
        // return <motion.div {...motionProps}><Project2Details details={projectData[activeSection]} /></motion.div>;
         return (
          <motion.div key={activeSection} {...motionProps}>
            <TypingText className="text-blue-500" text={`Data holds treasure.  I can help find it.`}/>

            <div className="text-xl mt-10 text-center italics">Please click on a dashboard to view it (sorry, it will take 60 seconds to load due to streamlit spinning down servers every few hours)</div>
            <div className="text-2xl mt-10 text-center"><a href="https://mipsdashboard.streamlit.app/">Merit-based Incentive Payment System (MIPS) Dashboard</a></div>
            <div className="text-2xl mt-4 text-center"><a href="https://opioidprescriptions.streamlit.app">Opioid Prescribing Patterns Dashboard</a></div>

          </motion.div>
         );

      // Add cases for project 3, 4, 5, using specific or generic components as needed
      case 'project 3':
        return (
          <motion.div key={activeSection} {...motionProps}>
            <TypingText text={`Reason 3: Data holds secrets.  I can make it speak.`} />

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
        <h1 className="text-2xl font-bold"><a href="mailto:richardlu@alum.mit.edu">Contact</a></h1>
        <a href="https://github.com/cubicle24">my Github</a>
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