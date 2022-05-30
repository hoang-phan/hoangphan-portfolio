import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import Button from '@material-ui/core/Button';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import PetsIcon from '@material-ui/icons/Pets';
import FaceIcon from '@material-ui/icons/Face';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EmailIcon from '@material-ui/icons/Email';

import PageHeroScene from '../../scenes/PageHeroScene';
import BodyScene from '../../scenes/BodyScene';

import CurvedText from '../CurvedText';
import Education from '../Education';
import Employment from '../Employment';
import PetProjects from '../PetProjects';
import AboutMe from '../AboutMe';
import ContactMe from '../ContactMe';
import { Container, BodyModel, HeroModel, Menu, Hero, MainWrapper, MainContent } from './styles'

let req = null;
let frame = 0;
const caretSize = Math.min(window.innerWidth, window.innerHeight) * 0.15;
const caretFontSize = window.innerWidth > 640 ? "large" : "medium";
const caretLetterSize = caretSize * 0.4;;
const caretLetterOffset = caretSize * 0.15;
let pageHeroScene = null;
let bodyScene = null;

const MainScene: React.FC = () => {
  const refBody = useRef<HTMLDivElement>(null);
  const refHero = useRef<HTMLDivElement>(null);
  const titleRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false)
  const [scene] = useState(new THREE.Scene());
  const [object2DPositions, setObject2DPositions] = useState<any>({});
  const [bodySceneLoaded, setBodySceneLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [pageOpening, setPageOpening] = useState(null);
  const [pageBound, setPageBound] = useState([0, 0, 0, 0]);

  useEffect(() => {
    pageHeroScene = new PageHeroScene(refHero.current);
    bodyScene = new BodyScene(refBody.current);
    bodyScene.onLoad = () => {
      setBodySceneLoaded(true);
    }

    titleRef.current.addEventListener("mousemove", (e) => {
      titleRef.current.querySelector(".title-overlay").style.width = `${e.pageX - titleRef.current.getBoundingClientRect().left}px`;
    });

    titleRef.current.addEventListener("mouseleave", (e) => {
      titleRef.current.querySelector(".title-overlay").style.width = 0;
    });
  }, []);

  const animate = () => {
    if (frame < 315) {
      frame += 1;
    } else if (frame < 316) {
      frame += 1;
      setReady(true);
      moveMenu();
    }

    if (frame >= 70 && bodyScene) {
      bodyScene.render(frame - 70);
    }

    if (frame < 70 && pageHeroScene) {
      pageHeroScene.render();
    }

    req = requestAnimationFrame(animate);
  }

  const moveMenu = () => {
    setObject2DPositions(bodyScene.getMenuObject2DPositions());
  }

  const resetScene = () => {
    if (bodyScene) {
      bodyScene.reset();
      moveMenu();
    }
  }

  useEffect(() => {
    if (bodySceneLoaded && !pageOpening && !req) {
      req = requestAnimationFrame(animate);
    }

    if (pageOpening && req) {
      cancelAnimationFrame(req);
      req = null;
    }
  }, [bodySceneLoaded, pageOpening]);

  useEffect(() => {
    if (ready && bodyScene) {
      bodyScene.controls.addEventListener('end', () => {
        bodyScene.controls.update();
        moveMenu();
      });
    }
  }, [ready])

  const openPage = (objName, pageName) => {
    bodyScene.zoomInto(objName, ({pageBound}) => {
      setPageBound(pageBound);
      setPageOpening(pageName);
    });
  }

  const back = () => {
    setPageOpening(null);
    resetScene();
  }

  const menuItem = (objName, pageName, icon) => {
    const pos = object2DPositions[objName];

    if (!pos) {
      return <></>;
    }

    return (
      <div
        className={`caret ${pageOpening && 'hidden'}`}
        style={{top: pos.y - caretSize / 2, left: pos.x - caretSize / 2, width: caretSize, height: caretSize}}
        onClick={() => openPage(objName, pageName)}
      >
        <div className="menu-label">
          <CurvedText text={pageName} objectSize={caretLetterSize} offset={caretLetterOffset} />
        </div>
        <div className="menu-icon">
          {icon}
        </div>
      </div>
    )
  }

  return (
    <Container>
      <MainWrapper>
        <MainContent>
          <Menu>
            {menuItem('board', 'About Me', <FaceIcon fontSize={caretFontSize}/>)}
            {menuItem('shelf', 'Education', <SchoolIcon fontSize={caretFontSize}/>)}
            {menuItem('macbook', 'Pet Projects', <PetsIcon fontSize={caretFontSize}/>)}
            {menuItem('imac', 'Employment', <WorkIcon fontSize={caretFontSize}/>)}
            {
              pageOpening === "About Me" && (
                <AboutMe pageBound={pageBound} />
              )
            }
            {
              pageOpening === "Education" && (
                <Education />
              )
            }
            {
              pageOpening === "Employment" && (
                <Employment pageBound={pageBound} />
              )
            }
            {
              pageOpening === "Pet Projects" && (
                <PetProjects pageBound={pageBound} />
              )
            }
            {
              pageOpening === "Contact Me" && (
                <ContactMe />
              )
            }
          </Menu>
          <BodyModel ref={refBody}>
            {
              loading && <p>Loading...</p>
            }
          </BodyModel>
        </MainContent>
        <Hero>
          <Menu>
            <div className={`caret back ${pageOpening ? '' : 'hidden'}`} style={{width: caretSize, height: caretSize}} onClick={back}>
              <div className="menu-label">
                <CurvedText text="Back" objectSize={caretLetterSize} offset={caretLetterOffset} />
              </div>
              <div className="menu-icon">
                <ArrowBackIcon fontSize={caretFontSize}/>
              </div>
            </div>
          </Menu>
          {pageOpening != "Contact Me" && (
            <Button variant="contained" color="primary" startIcon={<EmailIcon />} onClick={() => setPageOpening("Contact Me")}>
              Contact Me
            </Button>
          )}
          <HeroModel ref={refHero}>
            {
              loading && <p>Loading...</p>
            }
          </HeroModel>
          <h1 className={bodySceneLoaded ? "ready" : ""} ref={titleRef}>
            <span className="title">{pageOpening ? pageOpening : "Web Developer"}</span>
            <span className="title-overlay">{pageOpening ? pageOpening : "Web Developer"}</span>
          </h1>
        </Hero>
      </MainWrapper>
    </Container>
  )
}

export default MainScene
