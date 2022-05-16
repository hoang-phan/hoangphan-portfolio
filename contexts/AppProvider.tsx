import { useState, createContext, useMemo } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children, initialProjects, initialPetProjects }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [petProjects, setPetProjects] = useState(initialPetProjects);

  const projectsValue = useMemo(() => ({ projects, setProjects }), [projects]);
  const petProjectsValue = useMemo(() => ({ petProjects, setPetProjects }), [petProjects]);

  return <AppContext.Provider value={{...projectsValue, ...petProjectsValue}}>{children}</AppContext.Provider>;
};