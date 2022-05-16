import React from 'react';
import { ProjectCard } from './styles';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import CodeIcon from '@material-ui/icons/Code';

const PetProject: React.FC = ({project, hero, active, setActive}) => {
  return (
    <ProjectCard className={`${hero ? "hero" : ""}${active ? " active" : ""}`} style={{backgroundImage: `url(${project.image_url})`}}>
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
            <span>{active ? "Less" : "More"}</span>
          </Button>
          <a target="_blank" href={project.live_url || ""}>
            <Button variant="contained">
              <VisibilityIcon />
              <span>Demo</span>
            </Button>
          </a>
          <a target="_blank" href={project.code_url || ""}>
            <Button variant="contained">
              <CodeIcon />
              <span>Code</span>
            </Button>
          </a>
        </div>
      </div>
    </ProjectCard>
  )
}

export default PetProject;
