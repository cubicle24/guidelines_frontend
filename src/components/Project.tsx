import React from 'react';
import { motion } from 'framer-motion';

interface ProjectProps {
  title: string;
  description: string;
  lesson: string;
}

const Project = ({ title, description, lesson }: ProjectProps) => {
  return (
    <>
      <h2 className="project-title">{title}</h2>
      <p className="project-content">{description}</p>
      <h3 className="project-lesson">{lesson}</h3>
    </>
  );
};

export default Project;