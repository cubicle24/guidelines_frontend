import React from 'react';

interface ProjectProps {
  title: string;
  description: string;
  lesson: string;
}

const Project = ({ title, description, lesson }: ProjectProps) => {
  return (
    <>
      {/* Add Tailwind classes based on App.css */}
      <h2 className="text-2xl font-bold mb-4">{title}</h2> {/* Assuming a title style */}
      <p className="text-xl">{description}</p> {/* Equivalent to .project-content */}
      <h3 className="text-lg mt-4 italic">{lesson}</h3> {/* Assuming a lesson style */}

    </>
  );
};

export default Project;