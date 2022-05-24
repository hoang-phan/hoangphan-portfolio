import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import PetsIcon from '@material-ui/icons/Pets';
import FaceIcon from '@material-ui/icons/Face';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import PageHeroScene from '../../scenes/PageHeroScene';
import BodyScene from '../../scenes/BodyScene';

import CurvedText from '../CurvedText';
import Education from '../Education';
import Employment from '../Employment';
import PetProjects from '../PetProjects';
import AboutMe from '../AboutMe';
import { Container, BodyModel, Menu } from './styles'

let req = null;
let frame = 0;
const caretSize = Math.min(window.innerWidth, window.innerHeight) * 0.15;
const caretFontSize = window.innerWidth > 640 ? "large" : "medium";
const caretLetterSize = caretSize * 0.4;;
const caretLetterOffset = caretSize * 0.15;
// let pageHeroScene = null;
let bodyScene = null;

const MainScene: React.FC = () => {
  const refBody = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const [renderer, setRenderer] = useState<any>()
  const [scene] = useState(new THREE.Scene());
  const [object2DPositions, setObject2DPositions] = useState<any>({});
  const [bodySceneLoaded, setBodySceneLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [pageOpening, setPageOpening] = useState(null);
  const [pageBound, setPageBound] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const { current: container } = refBody;

    if (container && !renderer) {
      const scw = container.clientWidth;
      const sch = container.clientHeight;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(scw, sch);
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.shadowMap.enabled = true;

      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      // pageHeroScene = new PageHeroScene(renderer, scene);
      bodyScene = new BodyScene(renderer, scene);
      bodyScene.onLoad = () => {
        setBodySceneLoaded(true);
      }
    }

    return () => {
      if (req) {
        cancelAnimationFrame(req);
      }
      if (renderer) {
        renderer.dispose();
      }
    }
  }, []);

  const animate = () => {
    if (frame < 245) {
      frame += 1;
    } else if (frame < 246) {
      frame += 1;
      setReady(true);
      moveMenu();
    }

    if (bodyScene) {
      bodyScene.render(frame);
    }

    // if (pageHeroScene) {
    //   pageHeroScene.render();
    // }

    req = requestAnimationFrame(animate);
  }

  const moveMenu = () => {
    setObject2DPositions(bodyScene.getMenuObject2DPositions());
  }

  const resetScene = () => {
    bodyScene.reset();
    moveMenu();
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
    if (ready) {
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
      <Menu>
        {menuItem('board', 'About Me', <FaceIcon fontSize={caretFontSize}/>)}
        {menuItem('shelf', 'Education', <SchoolIcon fontSize={caretFontSize}/>)}
        {menuItem('macbook', 'Pet Projects', <PetsIcon fontSize={caretFontSize}/>)}
        {menuItem('imac', 'Employment', <WorkIcon fontSize={caretFontSize}/>)}
        {
          <div className={`caret ${!pageOpening && 'hidden'}`} style={{width: caretSize, height: caretSize}} onClick={back}>
            <div className="menu-label">
              <CurvedText text="Back" objectSize={caretLetterSize} offset={caretLetterOffset} />
            </div>
            <div className="menu-icon">
              <ArrowBackIcon fontSize={caretFontSize}/>
            </div>
          </div>
        }
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
          pageOpening === "Pet Projects" && (
            <PetProjects pageBound={pageBound} />
          )
        }
      </Menu>
      <BodyModel ref={refBody}>
        {
          loading && <p>Loading...</p>
        }
      </BodyModel>
    </Container>
  )
}

export default MainScene
