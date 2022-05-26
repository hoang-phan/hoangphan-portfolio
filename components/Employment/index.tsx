import React, { useState, useEffect, useContext } from 'react';
import { Container, Scene } from './styles';
import API from '../../services/api';
import { AppContext } from '../../contexts/AppProvider';

interface IEmploymentProps {
  pageBound?: number[];
}

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

  const width = pageBound[3] * 0.94;
  const height = pageBound[2] * 0.69;
  const top = pageBound[0] + height * 0.019;
  const left = pageBound[1] + width * 0.009;
  const characterWidth = width * 0.15;
  const characterHeight = characterWidth * 1.25;

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

  const handleProjectChange = (index) => {
    if (index === 0 && gameState.activeProjectIndex > 0) {
      updateGameState({vy: 20});
    } else if (index > 0 && gameState.activeProjectIndex == 0) {
      updateGameState({activeProjectIndex: index, y: 70});
      setChangingProjectTransition();
    } else {
      updateGameState({activeProjectIndex: index});
      setChangingProjectTransition();
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
      {activeProject &&
        <div className={`project-description current ${changingProject ? "transitioning" : ""}`}>
          <h3>{activeCompany.name}</h3>
          <h4>{activeProject.name} ({activeProject.from_year} - {activeProject.to_year})</h4>
          <h4 className="section-title">Summary</h4>
          <p>{activeProject.summary}</p>
          <h4 className="section-title">Challenge</h4>
          <p>{activeProject.challenge}</p>
          <h4 className="section-title">Resolution</h4>
          <p>{activeProject.resolution}</p>
        </div>
      }

      <div className="milestones">
        <div className="company" style={{width: 5 + width * 0.1, height: 5 + width * 0.1}}>
          {activeCompany &&
            <img src={`build/${activeCompany.logo}`} />
          }
        </div>
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
      <Scene>
        <div className="scroller" />
      </Scene>
      <div style={{display: "none"}}>
        {
          Array.from(Array(10).keys()).map((i) => <img src={`/Idle__00${i}.png`} key={i} />)
        }
        {
          Array.from(Array(10).keys()).map((i) => <img src={`/Run__00${i}.png`} key={i} />)
        }
        {
          Array.from(Array(10).keys()).map((i) => <img src={`/Jump__00${i}.png`} key={i} />)
        }
      </div>
    </Container>
  );
}

export default Employment;
