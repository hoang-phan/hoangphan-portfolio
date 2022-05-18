import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import PetsIcon from '@material-ui/icons/Pets';
import FaceIcon from '@material-ui/icons/Face';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CurvedText from '../CurvedText';
import Education from '../Education';
import Employment from '../Employment';
import PetProjects from '../PetProjects';
import AboutMe from '../AboutMe';
import { Container, Header, BodyModel, Hero, Menu } from './styles'
import { Desk, Macbook, Imac, Shelf, Board, Tree, Chair, Wall, Floor } from '../../objects';
import TWEEN from 'tween/tween';
let req = null;
let frame = 0;
const caretSize = Math.min(window.innerWidth, window.innerHeight) * 0.15;
const caretFontSize = window.innerWidth > 640 ? "large" : "medium";
const caretLetterSize = caretSize * 0.4;;
const caretLetterOffset = caretSize * 0.15;;

const MainScene: React.FC = () => {
  const refBody = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const [renderer, setRenderer] = useState<any>()
  const [_camera, setCamera] = useState<any>()
  const [target] = useState(new THREE.Vector3(0, 0, 0));
  const [scene] = useState(new THREE.Scene());
  const [initialCameraPosition] = useState(
    new THREE.Vector3(-5, 4, 5)
  );
  const [_controls, setControls] = useState<any>();
  const [objects, setObjects] = useState<any>();
  const [object2DPositions, setObject2DPositions] = useState<any>({});
  const [ready, setReady] = useState(false);
  const [pageOpening, setPageOpening] = useState(null);
  const [pageBound, setPageBound] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const { current: container } = refBody;

    if (container && !renderer) {
      const scw = container.clientWidth;
      const sch = container.clientHeight;
      const size = Math.min(scw, sch);
      const width = scw > sch ? size * 2 : size * 1.4;
      const height = size * 1.4;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      const scale = 4;
      const camera = new THREE.OrthographicCamera(2 * scale, -2 * scale, scale, -scale, 0.01, 50000);

      camera.position.copy(initialCameraPosition);
      camera.lookAt(target);
      setCamera(camera);

      const light = new THREE.HemisphereLight( 0xFFFFFF , 0xAAAAAA, 0.8 );
      scene.add( light );

      // const axesHelper = new THREE.AxesHelper( 200 );
      // scene.add( axesHelper );

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.target = target;
      setControls(controls);

      const wallTexture = new THREE.TextureLoader().load('wall.jpeg');
      wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
      wallTexture.repeat.set( 3, 1 );
      const wallMaterial = new THREE.MeshBasicMaterial( {map: wallTexture} );
      const floorMaterial = new THREE.MeshBasicMaterial( {color: 0x111111} );
      const redMaterial = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
      const greenMaterial = new THREE.MeshBasicMaterial( {color: 0x00FF00} );
      const wireframeMaterial = new THREE.MeshLambertMaterial( {color: 0xdddddd} );

      let loaded = false;
      let objectsLoaded = {};

      const objects = {
        desk: new Desk(scene, new THREE.Vector3(-0.5,-1.59,0),new THREE.Vector3(0,-Math.PI/2,0), wireframeMaterial),
        macbook: new Macbook(scene, new THREE.Vector3(-1.4,0,0),new THREE.Vector3(0,1.1 * Math.PI,0), wireframeMaterial, new THREE.Vector3(0.5, 0, 1.5), 8),
        imac: new Imac(scene, new THREE.Vector3(0.5,-0.035,-0.1),new THREE.Vector3(0,0,0), wireframeMaterial, new THREE.Vector3(0, 0, 1.5), 4.3),
        shelf: new Shelf(scene, new THREE.Vector3(-2,-1.55,-2.45),new THREE.Vector3(0,0,0), wireframeMaterial, new THREE.Vector3(0.1, 0.1, 1.5), 3.5),
        board: new Board(scene, new THREE.Vector3(2.9,-1.57,1),new THREE.Vector3(0,-Math.PI / 2,0), wireframeMaterial, new THREE.Vector3(-1.5, 0, 0), 2.5),
        tree: new Tree(scene, new THREE.Vector3(1,-1.57,-2.16),new THREE.Vector3(0,Math.PI / 2,0), wireframeMaterial),
        chair: new Chair(scene, new THREE.Vector3(-0.5,-1.52,1.8),new THREE.Vector3(0,-2 * Math.PI / 3,0), wireframeMaterial),
        wall1: new Wall(scene, '1', 6, 4, new THREE.Vector3(0,0.46,-3), new THREE.Vector3(0,0,0), wallMaterial, wireframeMaterial),
        wall2: new Wall(scene, '2', 6, 4, new THREE.Vector3(2.98,0.46,0), new THREE.Vector3(0,Math.PI / 2,0), wallMaterial, wireframeMaterial),
        floor: new Floor(scene, '3', 6.05, 6.05, new THREE.Vector3(0,-1.64,0), new THREE.Vector3(-Math.PI / 2,0,0), floorMaterial, wireframeMaterial),
      };

      Object.keys(objects).forEach((key) => {
        objects[key].load().then(() => {
          objectsLoaded[key] = true;
          if (!loaded && Object.keys(objects).every((k) => objectsLoaded[k])) {
            loaded = true;
            setLoading(false);
            setObjects(objects);
          }
        })
      });
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

      objects['floor'].buildAnimate(10, 40, frame);
      objects['wall1'].buildAnimate(40, 80, frame);
      objects['wall2'].buildAnimate(80, 120, frame);
      objects['desk'].buildAnimate(160, 185, frame);
      objects['shelf'].buildAnimate(170, 200, frame);
      objects['tree'].buildAnimate(180, 195, frame);
      objects['chair'].buildAnimate(185, 200, frame);
      objects['imac'].buildAnimate(195, 220, frame);
      objects['macbook'].buildAnimate(210, 230, frame);
      objects['board'].buildAnimate(215, 235, frame);
    } else if (frame < 246) {
      frame += 1;
      setReady(true);
      moveMenu();
    } else {
      TWEEN.update();
    }
    renderer.render(scene, _camera);
    req = requestAnimationFrame(animate);
  }

  const moveMenu = () => {
    const screenPositions = {};
    ['imac', 'macbook', 'board', 'shelf'].forEach((key) => {
      screenPositions[key] = getPositionInScreen(objects[key].centerPoint, renderer.domElement);
    });
    setObject2DPositions(screenPositions);
  }

  const getPositionInScreen = (position, canvas) => {
    const vector = new THREE.Vector3();

    vector.set( position.x, position.y, position.z );

    vector.project(_camera);

    const offsetX = window.innerWidth > 640 ? -canvas.width * 0.15 / devicePixelRatio : 0;
    const offsetY = window.innerWidth > 640 ? 0 : 100 / devicePixelRatio;

    vector.x = Math.round( (   vector.x + 1 ) * canvas.width  / 2 / devicePixelRatio + canvas.getBoundingClientRect().left);
    vector.y = Math.round( ( - vector.y + 1 ) * canvas.height / 2 / devicePixelRatio + canvas.getBoundingClientRect().top);
    vector.z = 0;
    return vector;
  }

  const resetScene = () => {
    _controls.reset();
    _controls.enabled = true;
    _controls.update();
    Object.keys(objects).forEach((key) => {
      objects[key].obj.visible = true;
    });
    moveMenu();
  }

  useEffect(() => {
    if (objects && !pageOpening && !req) {
      req = requestAnimationFrame(animate);
    }

    if (pageOpening && req) {
      cancelAnimationFrame(req);
      req = null;
    }
  }, [objects, pageOpening]);

  useEffect(() => {
    if (ready) {
      _controls.addEventListener( 'end', () => {
        _controls.update();
        moveMenu();
      });
    }
  }, [ready])

  const openPage = (objName, pageName) => {
    const pos = objects[objName].centerPoint;
    const lookAtPos = objects[objName].lookAtPosition();
    const startPosition = _camera.position.clone();
    Object.keys(objects).forEach((key) => {
      if (key != objName) {
        objects[key].obj.visible = false;
      } else {
        objects[key].obj.visible = true;
      }
    });

    const distance = pos.clone().sub(target);
    let currentPos = _camera.position.clone().sub(objects[objName].lookAtDirection);
    const startQuaternion = _camera.quaternion.clone();
    _camera.lookAt(currentPos);
    const endQuaternion = _camera.quaternion.clone();
    _camera.quaternion.copy(startQuaternion);
    const startZoom = _camera.zoom;
    const endZoom =  objects[objName].zoom;
    const distanceZoom = endZoom - startZoom;
    _controls.enabled = false;

    new TWEEN.Tween(_camera.position)
      .to({
        x: lookAtPos.x,
        y: lookAtPos.y,
        z: lookAtPos.z,
      }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate((t) => {
        let newTarget = target.clone().add(distance.clone().multiplyScalar(Math.pow(t, 0.8)));
        _camera.lookAt(newTarget);
        let newZoom = startZoom + distanceZoom * t;
        _camera.zoom = newZoom;
        _camera.updateProjectionMatrix();
      })
      .onComplete(function() {
        const minBound = getPositionInScreen(objects[objName].box.min, renderer.domElement);
        const maxBound = getPositionInScreen(objects[objName].box.max, renderer.domElement);
        const top = Math.min(minBound.y, maxBound.y);
        const bottom = Math.max(minBound.y, maxBound.y);
        const left = Math.min(minBound.x, maxBound.x);
        const right = Math.max(minBound.x, maxBound.x);
        setPageBound([top, left, bottom - top, right - left]);
        setPageOpening(pageName);
      })
      .start();
  }

  const back = () => {
    setPageOpening(null);
    resetScene();
  }

  // const minBound = objects ? getPositionInScreen(objects["macbook"].box.min, renderer.domElement) : {x: 0, y: 0};
  // const maxBound = objects ? getPositionInScreen(objects["macbook"].box.max, renderer.domElement) : {x: 0, y: 0};

  return (
    <Container>
      <Header>
      </Header>
      <Menu>
        {/*<div style={{position: "absolute", zIndex: 999, top: minBound.y, left: minBound.x, width: 10, height: 10, background: "red"}} />
        <div style={{position: "absolute", zIndex: 999, top: maxBound.y, left: maxBound.x, width: 10, height: 10, background: "green"}} />*/}
        {
          object2DPositions.board && (
            <div className={`caret ${pageOpening && 'hidden'}`} style={{top: object2DPositions.board.y - caretSize / 2, left: object2DPositions.board.x - caretSize / 2, width: caretSize, height: caretSize}} onClick={() => openPage('board', 'About Me')}>
              <div className="menu-label">
                <CurvedText text="About Me" objectSize={caretLetterSize} offset={caretLetterOffset} />
              </div>
              <div className="menu-icon">
                <FaceIcon fontSize={caretFontSize}/>
              </div>
            </div>
          )
        }
        {
          object2DPositions.shelf && (
            <div className={`caret ${pageOpening && 'hidden'}`} style={{top: object2DPositions.shelf.y - caretSize / 2, left: object2DPositions.shelf.x - caretSize / 2, width: caretSize, height: caretSize}} onClick={() => openPage('shelf', 'Education')}>
              <div className="menu-label">
                <CurvedText text="Education" objectSize={caretLetterSize} offset={caretLetterOffset} />
              </div>
              <div className="menu-icon">
                <SchoolIcon fontSize={caretFontSize}/>
              </div>
            </div>
          )
        }
        {
          object2DPositions.macbook && (
            <div className={`caret ${pageOpening && 'hidden'}`} style={{top: object2DPositions.macbook.y - caretSize / 2, left: object2DPositions.macbook.x - caretSize / 2, width: caretSize, height: caretSize}} onClick={() => openPage('macbook', 'Pet Projects')}>
              <div className="menu-label">
                <CurvedText text="Pet Projects" objectSize={caretLetterSize} offset={caretLetterOffset} />
              </div>
              <div className="menu-icon">
                <PetsIcon fontSize={caretFontSize}/>
              </div>
            </div>
          )
        }
        {
          object2DPositions.imac && (
            <div className={`caret ${pageOpening && 'hidden'}`} style={{top: object2DPositions.imac.y - caretSize / 2, left: object2DPositions.imac.x - caretSize / 2, width: caretSize, height: caretSize}} onClick={() => openPage('imac', 'Employment')}>
              <div className="menu-label">
                <CurvedText text="Employment" objectSize={caretLetterSize} offset={caretLetterOffset} />
              </div>
              <div className="menu-icon">
                <WorkIcon fontSize={caretFontSize}/>
              </div>
            </div>
          )
        }
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
          pageOpening === "Employment" && (
            <Employment pageBound={pageBound} />
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
      <Hero>
        <div>
          <h1>Hoang Phan</h1>
          <h2>{pageOpening || 'Web Developer'}</h2>
        </div>
      </Hero>
    </Container>
  )
}

export default MainScene
