import React, { useState, useEffect, useContext } from 'react';
import { Container, Scene } from './styles';
import API from '../../services/api';
import { AppContext } from '../../contexts/AppProvider';

const Employment: React.FC = () => {
  const [gameState, setGameState] = useState({
    x: 0, y: 0, vx: 6, vy: 0,
    direction: "right", frame: 0,
    activeProjectIndex: -1, prevIndex: -1,
  })
  const context = useContext(AppContext);
  const projects = context.projects;
  const [changingProject, setChangingProject] = useState(false);
  const g = -1.9;
  const { activeProjectIndex, prevIndex } = gameState;
  const activeProject = projects[activeProjectIndex];
  const prevProject = projects[prevIndex];
  const activeCompany = activeProject && activeProject.company;
  const prevCompany = prevProject && prevProject.company;

  const updateGameState = (newData) => setGameState(gameState =>  ({...gameState, ...newData}));

  useEffect(() => {
    const nextCycle = setTimeout(() => {
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
      return gameState.y + 130;
    }
    return gameState.y + 60;
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
    <Container>
      {gameState.activeProjectIndex < 1 &&
        <div className="scene1">
          <div className="scene1 lyr1-1" style={{backgroundPositionX: Math.min(30 - gameState.x / 5, 0)}}/>
          <div className="scene1 lyr1-2" />
          <div className="scene1 lyr1-3" style={{backgroundPositionX: Math.min(150 - gameState.x, 0)}} />
          <div className="scene1 lyr1-4" style={{backgroundPositionX: Math.min(150 - gameState.x, 0)}}/>
        </div>
      }
      {gameState.activeProjectIndex >= 1 &&
        <div className="scene1">
          <div className="scene1 lyr2-1" />
          <div className="scene1 lyr2-2" style={{backgroundPositionX: Math.min(30 - gameState.x / 5, 0)}} />
          <div className="scene1 lyr2-3" style={{backgroundPositionX: Math.min(50 - gameState.x / 3, 0)}} />
          <div className="scene1 lyr2-4" style={{backgroundPositionX: Math.min(150 - gameState.x, 0)}}/>
        </div>
      }
      <div className="character" style={{bottom: getCharacterBottom(), left: Math.min(gameState.x, 150)}}>
        <img className={gameState.direction} src={`/${getCharacterState()}__00${gameState.frame}.png`}/>
      </div>
      {activeProject &&
        <div className={`project-description current ${changingProject ? "transitioning" : ""}`}>
          <h3>{activeCompany.name} ({activeCompany.from_year} - {activeCompany.to_year})</h3>
          <h4>{activeProject.name} ({activeProject.from_year} - {activeProject.to_year})</h4>
          <h4>Summary</h4>
          <p>{activeProject.summary}</p>
          <h4>Challenge</h4>
          <p>{activeProject.challenge}</p>
          <h4>Resolution</h4>
          <p>{activeProject.resolution}</p>
        </div>
      }

      <div className="milestones">
        <div className="company">
          {activeCompany &&
            <img src={activeCompany.logo_url} />
          }
          
        </div>
        {
          projects.map((project, index) => (
            <div className={`project ${activeProjectIndex === index ? "active" : ""}`} key={project.id} onClick={() => handleProjectChange(index)} />
          ))
        }
      </div>
      <Scene autoFocus>
        <div className="scroller" />
      </Scene>
      <div style={{display: "none"}}>
        {
          [...Array(10).keys()].map((i) => <img src={`/Idle__00${i}.png`} key={i} />)
        }
        {
          [...Array(10).keys()].map((i) => <img src={`/Run__00${i}.png`} key={i} />)
        }
        {
          [...Array(10).keys()].map((i) => <img src={`/Jump__00${i}.png`} key={i} />)
        }
        {
          [...Array(10).keys()].map((i) => <img src={`/Slide__00${i}.png`} key={i} />)
        }

      </div>
    </Container>
  );
}

export default Employment;
