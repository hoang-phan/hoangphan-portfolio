import React, { useContext, useState } from 'react';
import { Container, ProjectCardWrapper, ProjectDetails } from './styles';

import PetProject from './PetProject';
import { AppContext } from '../../contexts/AppProvider';
interface IPetProjectsProps {
  pageBound?: number[];
}

const PetProjects: React.FC<IPetProjectsProps> = ({pageBound}: IPetProjectsProps) => {
  const context: any = useContext(AppContext);
  const projects: any = context.petProjects;
  const [activeProject, setActiveProject] = useState(null);

  const projectDetailsClasses = () => {
    let classes = [];
    if (activeProject) {
      classes.push("active");
    }
    if (activeProject === projects[0]) {
      classes.push("right-details");
    } else {
      classes.push("left-details");
    }
    return classes.join(" ");
  }

  const width = pageBound[3] * 1.24;
  const height = pageBound[2] * 0.91;
  const top = pageBound[0] + height * 0.01;
  const left = pageBound[1] - width * 0.1;

  return (
    <Container style={{top, left, width, height}}>
      <PetProject
        project={projects[0]}
        hero={true}
        active={activeProject === projects[0]}
        setActive={setActiveProject}
      />
      <ProjectCardWrapper>
        {projects.slice(1).map(project => (
          <PetProject
            key={project.id}
            project={project}
            hero={false}
            active={activeProject == project}
            setActive={setActiveProject}
          />
        ))}
      </ProjectCardWrapper>
      <ProjectDetails className={projectDetailsClasses()}>
        {activeProject && (
          <div className="details-container">
            <h4>Summary</h4>
            <p>{activeProject.summary}</p>
            <h4>Challenge</h4>
            <p>{activeProject.challenge}</p>
            <h4>Resolution</h4>
            <p>{activeProject.resolution}</p>
          </div>
        )}
      </ProjectDetails>
    </Container>
  )
}

export default PetProjects;
