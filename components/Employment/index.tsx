import React, { useState, useEffect, useContext, useRef, createRef } from 'react';
import { Container, TextPanel, ScrollWrapper } from './styles';
import API from '../../services/api';
import { AppContext } from '../../contexts/AppProvider';

interface IEmploymentProps {
  pageBound?: number[];
}

let scrollWrapperTop;

const Employment: React.FC<IEmploymentProps> = ({pageBound}: IEmploymentProps) => {
  const [gameState, setGameState] = useState({
    x: 0, y: 0, vx: 6, vy: 0,
    direction: "right", frame: 0,
    activeProjectIndex: -1, prevIndex: -1,
  })
  const context: any = useContext(AppContext);
  const projects: any = context.projects;
  const [changingProject, setChangingProject] = useState(false);
  const g = -1.9;
  const { activeProjectIndex, prevIndex } = gameState;
  const activeProject = projects[activeProjectIndex];
  const prevProject = projects[prevIndex];
  const activeCompany = activeProject && activeProject.company;
  const prevCompany = prevProject && prevProject.company;
  const refScroller = useRef(null);
  const refScrollWrapper = useRef(null);
  const refProjects = useRef(projects.map(createRef));

  const width = pageBound[3] * 0.94;
  const height = pageBound[2] * 0.69;
  const top = pageBound[0] + height * 0.019;
  const left = pageBound[1] + width * 0.009;
  const characterWidth = width * 0.15;
  const characterHeight = characterWidth * 1.25;
  const logoSize = 5 + width * 0.1;

  const updateGameState = (newData) => setGameState(gameState =>  ({...gameState, ...newData}));

  useEffect(() => {
    let nextCycle = setTimeout(() => {
      setGameState(({x, y, vx, vy, direction, frame, activeProjectIndex, prevIndex}) => {
        if (activeProjectIndex < 0) {
          vx = Math.max(vx - 0.4, 0);
        } else {
          vx = 10;
        }

        x += vx;
        y += vy;
        vy += g;

        if (y < 0) {
          y = 0;
          vy = 0;
        }

        if (y <= 0) {
          frame = (frame + 1) % 10;
        } else {
          if (vy > 0) {
            frame = Math.min(frame + 1, 4);
          } else {
            frame = Math.min(frame + 1, 9);
          }
        }

        return {x, y, vx, vy, direction, frame, activeProjectIndex, prevIndex};
      });
    }, 50);

    return () => {
      if (nextCycle) {
        clearTimeout(nextCycle);
        nextCycle = null;
      }
    }
  }, [gameState]);

  useEffect(() => {
    scrollWrapperTop = refScrollWrapper.current.getBoundingClientRect().top;
  }, [])

  const handleScrollChanged = () => {
    const nextIndex = refProjects.current.findIndex((block) => {
      const blockTop = block.current.getBoundingClientRect().top;
      return blockTop > scrollWrapperTop + 10;
    });
    const newIndex = nextIndex > -1 ? nextIndex - 1 : refProjects.current.length - 1;
    if (newIndex != activeProjectIndex && !changingProject) {
      if (!changingProject) {
        handleProjectChange(newIndex, true);
      } else {
        updateGameState({activeProjectIndex: newIndex});
      }
    }
  }

  const getCharacterState = () => {
    if (gameState.y > 0) {
      return 'Jump';
    }
    if (gameState.vx === 0) {
      return 'Idle';
    }

    return 'Run';
  }

  const getCharacterBottom = () => {
    if (gameState.activeProjectIndex < 1) {
      return gameState.y + height * 0.25;
    }
    return gameState.y + height * 0.1;
  }

  const handleProjectChange = (index, scroll) => {
    if (index === 0 && gameState.activeProjectIndex > 0) {
      setChangingProject(true);
      updateGameState({vy: 20});
    } else if (index > 0 && gameState.activeProjectIndex == 0) {
      updateGameState({activeProjectIndex: index, y: 70});
      setChangingProjectTransition();
    } else {
      updateGameState({activeProjectIndex: index});
      setChangingProjectTransition();
    }

    if (!scroll) {
      refProjects.current[index].current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    setTimeout(() => {
      if (index === 0 && gameState.activeProjectIndex > 0) {
        updateGameState({activeProjectIndex: index, y: 10});
        setChangingProjectTransition();
      }
    }, 1000);
  }

  const setChangingProjectTransition = () => {
    setChangingProject(true);
    setTimeout(() => {
      setChangingProject(false);
    }, 1100);
  }

  return (
    <Container style={{top, left, width, height}}>
      {gameState.activeProjectIndex < 1 &&
        <div className="scene1">
          <div className="scene1 lyr1-1" style={{backgroundPositionX: Math.min(30 - gameState.x / 5, 0)}}/>
          <div className="scene1 lyr1-2" />
          <div className="scene1 lyr1-3" style={{backgroundPositionX: Math.min(width * 0.15 - gameState.x, 0)}} />
          <div className="scene1 lyr1-4" style={{backgroundPositionX: Math.min(width * 0.15 - gameState.x, 0)}}/>
        </div>
      }
      {gameState.activeProjectIndex >= 1 &&
        <div className="scene1">
          <div className="scene1 lyr2-1" />
          <div className="scene1 lyr2-2" style={{backgroundPositionX: Math.min(30 - gameState.x / 5, 0)}} />
          <div className="scene1 lyr2-3" style={{backgroundPositionX: Math.min(50 - gameState.x / 3, 0)}} />
          <div className="scene1 lyr2-4" style={{backgroundPositionX: Math.min(width * 0.15 - gameState.x, 0)}}/>
        </div>
      }
      <div className="character" style={{bottom: getCharacterBottom(), left: Math.min(gameState.x, width * 0.15), width: characterWidth, height: characterHeight}}>
        <img className={gameState.direction} src={`/${getCharacterState()}__00${gameState.frame}.png`}/>
      </div>

      <TextPanel>
        <div className="company">
          <div className="company-description" style={{height: logoSize / 2}}>
            {activeCompany && activeCompany.name.toUpperCase()}
          </div>
          <div className="company-logo" style={{width: logoSize, height: logoSize}}>
            {activeCompany &&
              <img src={`build/${activeCompany.logo}`} />
            }
          </div>
        </div>
        <div className="content-panel" style={{marginTop: -logoSize / 2}}>
          <ScrollWrapper onScroll={handleScrollChanged} ref={refScrollWrapper}>
            <div className="projects-description current">
              {projects.map((project, index) => (
                <div key={project.id} className="project-description" ref={refProjects.current[index]}>
                  {project.image && <img className="project-image" src={`build/${project.image}`}/>}
                  <h3>{project.name.toUpperCase()} ({project.from_year} - {project.to_year})</h3>
                  <h4 className="section-title">Summary</h4>
                  <p>{project.summary}</p>
                  <h4 className="section-title">Challenge</h4>
                  <p>{project.challenge}</p>
                  <h4 className="section-title">Resolution</h4>
                  <p>{project.resolution}</p>
                </div>
              ))}
            </div>
          </ScrollWrapper>
          <div className="right-panel" style={{width: logoSize, paddingTop: logoSize / 2}}>
            {
              projects.map((project, index) => (
                <div
                  className={`project ${activeProjectIndex === index ? "active" : ""}`}
                  key={project.id}
                  onClick={() => handleProjectChange(index)}
                  style={{width: 5 + width * 0.06, height: 5 + width * 0.06}}
                />
              ))
            }
          </div>
        </div>
      </TextPanel>
    </Container>
  );
}

export default Employment;
