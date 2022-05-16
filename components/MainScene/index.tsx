import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import PetsIcon from '@material-ui/icons/Pets';
import StarsIcon from '@material-ui/icons/Stars';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CurvedText from '../CurvedText';
import Education from '../Education';
import Employment from '../Employment';
import PetProjects from '../PetProjects';
import { Container, Header, BodyModel, Hero, Menu } from './styles'
import { Desk, Macbook, Imac, Shelf, Certframe, Tree, Chair, Wall, Floor } from '../../objects';
import TWEEN from 'tween/tween';
let req = null;
let frame = 0;

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
  const [object2DPositions, setObject2DPositions] = useState({});
  const [ready, setReady] = useState(false);
  const [pageOpening, setPageOpening] = useState(null);

  const handleWindowResize = useCallback(() => {
    const { current: container } = refBody;
    if (container && renderer) {
      const scw = container.clientWidth;
      const sch = container.clientHeight;

      renderer.setSize(scw, sch);
    }
  }, [renderer]);

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
      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      const scale = 3;
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
        macbook: new Macbook(scene, new THREE.Vector3(-1.4,0,0),new THREE.Vector3(0,1.1 * Math.PI,0), wireframeMaterial, new THREE.Vector3(0.5, 0, 1.5), 7),
        imac: new Imac(scene, new THREE.Vector3(0.5,-0.035,-0.1),new THREE.Vector3(0,0,0), wireframeMaterial, new THREE.Vector3(0, 0, 1.5), 4.5),
        shelf: new Shelf(scene, new THREE.Vector3(-2,-1.55,-2.45),new THREE.Vector3(0,0,0), wireframeMaterial, new THREE.Vector3(0.1, 0.1, 1.5), 3.5),
        certframe: new Certframe(scene, new THREE.Vector3(2.88,1,1),new THREE.Vector3(0,-Math.PI / 2,0), wireframeMaterial, new THREE.Vector3(-1.5, 0, 0), 6.5),
        tree: new Tree(scene, new THREE.Vector3(2.4,-1.47,-2.3),new THREE.Vector3(0,-Math.PI / 2,0), wireframeMaterial),
        chair: new Chair(scene, new THREE.Vector3(0.5,-1.52,1.8),new THREE.Vector3(0,-2 * Math.PI / 3,0), wireframeMaterial),
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
      objects['certframe'].buildAnimate(215, 235, frame);
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
    ['imac', 'macbook', 'certframe', 'shelf'].forEach((key) => {
      screenPositions[key] = getPositionInScreen(objects[key].centerPoint, renderer.domElement);
    });
    setObject2DPositions(screenPositions);
  }

  const getPositionInScreen = (position, canvas) => {
    const vector = new THREE.Vector3();

    vector.set( position.x, position.y, position.z );

    vector.project(_camera);

    vector.x = Math.round( (   vector.x + 1 ) * canvas.width  / 2 / devicePixelRatio ) - canvas.width / devicePixelRatio * 15 / 100;
    vector.y = Math.round( ( - vector.y + 1 ) * canvas.height / 2 / devicePixelRatio );
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
        setPageOpening(pageName);
      })
      .start();
  }

  const back = () => {
    setPageOpening(null);
    resetScene();
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false);

    return () => {
      window.removeEventListener('resize', handleWindowResize, false);
    };
  }, [renderer, handleWindowResize])

  return (
    <Container>
      <Header>
      </Header>
      <Menu>
        {
          object2DPositions.certframe && (
            <div className={`caret ${pageOpening && 'hidden'}`} style={{top: object2DPositions.certframe.y - 62, left: object2DPositions.certframe.x - 62}} onClick={() => openPage('certframe', 'testimonials')}>
              <div className="menu-label">
                <CurvedText text="Testimonials" objectSize={40}/>
              </div>
              <div className="menu-icon">
                <StarsIcon fontSize="large"/>
              </div>
            </div>
          )
        }
        {
          object2DPositions.shelf && (
            <div className={`caret ${pageOpening && 'hidden'}`} style={{top: object2DPositions.shelf.y - 62, left: object2DPositions.shelf.x - 62}} onClick={() => openPage('shelf', 'education')}>
              <div className="menu-label">
                <CurvedText text="Education" objectSize={40}/>
              </div>
              <div className="menu-icon">
                <SchoolIcon fontSize="large"/>
              </div>
            </div>
          )
        }
        {
          object2DPositions.macbook && (
            <div className={`caret ${pageOpening && 'hidden'}`} style={{top: object2DPositions.macbook.y - 62, left: object2DPositions.macbook.x - 62}} onClick={() => openPage('macbook', 'pet-projects')}>
              <div className="menu-label">
                <CurvedText text="Pet Projects" objectSize={40}/>
              </div>
              <div className="menu-icon">
                <PetsIcon fontSize="large"/>
              </div>
            </div>
          )
        }
        {
          object2DPositions.imac && (
            <div className={`caret ${pageOpening && 'hidden'}`} style={{top: object2DPositions.imac.y - 62, left: object2DPositions.imac.x - 62}} onClick={() => openPage('imac', 'employment')}>
              <div className="menu-label">
                <CurvedText text="Employment" objectSize={40}/>
              </div>
              <div className="menu-icon">
                <WorkIcon fontSize="large"/>
              </div>
            </div>
          )
        }
        {
          <div className={`caret ${!pageOpening && 'hidden'}`} onClick={back}>
            <div className="menu-label">
              <CurvedText text="Back" objectSize={40}/>
            </div>
            <div className="menu-icon">
              <ArrowBackIcon fontSize="large"/>
            </div>
          </div>
        }
        {
          pageOpening === "education" && (
            <Education />
          )
        }
        {
          pageOpening === "employment" && (
            <Employment />
          )
        }
        {
          pageOpening === "pet-projects" && (
            <PetProjects />
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
          <h2>Web Developer</h2>
        </div>
      </Hero>
    </Container>
  )
}

export default MainScene
