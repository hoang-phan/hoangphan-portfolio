import React from 'react';
import { ProjectCard } from './styles';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import CodeIcon from '@material-ui/icons/Code';

interface IPetProjectProps {
  project?: any;
  hero?: boolean;
  active?: boolean;
  setActive?: any;
}

const PetProject: React.FC<IPetProjectProps> = ({project, hero, active, setActive}: IPetProjectProps) => {
  return (
    <ProjectCard className={`${hero ? "hero" : ""}${active ? " active" : ""}`} style={{backgroundImage: `url("build/${project.image}")`}}>
      <div className="backdrop" />
      <div className="content">
        <div className="project-name">{project.name}</div>
        <div className="tags">
          {project.tag_list.map(tag => (
            <div className="tag" key={tag}>{tag.toUpperCase()}</div>
          ))}
        </div>
        <div className="actions">
          <Button variant="contained" onClick={() => setActive(active ? null : project)}>
            <MoreIcon />
            <span className="button-text">{active ? "Less" : "More"}</span>
          </Button>
          <a target="_blank" rel="noreferrer" href={project.live_url || ""}>
            <Button variant="contained">
              <VisibilityIcon />
              <span className="button-text">Demo</span>
            </Button>
          </a>
          <a target="_blank" rel="noreferrer" href={project.code_url || ""}>
            <Button variant="contained">
              <CodeIcon />
              <span className="button-text">Code</span>
            </Button>
          </a>
        </div>
      </div>
    </ProjectCard>
  )
}

export default PetProject;
