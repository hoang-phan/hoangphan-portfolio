import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import TWEEN from 'tween/tween';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Desk, Macbook, Imac, Shelf, Board, Tree, Chair, Wall, Floor } from '../objects';

export default class BodyScene {
  renderer: any;
  scene: any;
  loaded: boolean;
  objects: object;
  target: any;
  camera: any;
  controls: any;
  onLoad: any;

  constructor(renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;

    this.setupLight();
    this.setupObjects();
    this.setupCamera();
  }

  setupLight = () => {
    const light = new THREE.HemisphereLight( 0xFFFFFF , 0xAAAAAA, 0.8 );
    this.scene.add(light);
  }

  setupObjects = () => {
    const wallTexture = new THREE.TextureLoader().load('wall.jpeg');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(3, 1);

    const wallMaterial = new THREE.MeshBasicMaterial( {map: wallTexture} );
    const floorMaterial = new THREE.MeshBasicMaterial( {color: 0x111111} );

    this.loaded = false;
    let objectsLoaded = {};

    this.objects = {
      desk: new Desk(this.scene, new THREE.Vector3(-0.5,-1.59,0),new THREE.Vector3(0,-Math.PI/2,0)),
      macbook: new Macbook(this.scene, new THREE.Vector3(-1.4,0,0),new THREE.Vector3(0,1.1 * Math.PI,0), new THREE.Vector3(0.5, 0, 1.5), 8),
      imac: new Imac(this.scene, new THREE.Vector3(0.5,-0.035,-0.1),new THREE.Vector3(0,0,0), new THREE.Vector3(0, 0, 1.5), 4.3),
      shelf: new Shelf(this.scene, new THREE.Vector3(-2,-1.55,-2.45),new THREE.Vector3(0,0,0), new THREE.Vector3(0.1, 0.1, 1.5), 3.5),
      board: new Board(this.scene, new THREE.Vector3(2.9,-1.57,1),new THREE.Vector3(0,-Math.PI / 2,0), new THREE.Vector3(-1.5, 0, 0), 2.5),
      tree: new Tree(this.scene, new THREE.Vector3(1,-1.57,-2.16),new THREE.Vector3(0,Math.PI / 2,0)),
      chair: new Chair(this.scene, new THREE.Vector3(-0.5,-1.52,1.8),new THREE.Vector3(0,-2 * Math.PI / 3,0)),
      wall1: new Wall(this.scene, '1', 6, 4, new THREE.Vector3(0,0.46,-3), new THREE.Vector3(0,0,0), wallMaterial),
      wall2: new Wall(this.scene, '2', 6, 4, new THREE.Vector3(2.98,0.46,0), new THREE.Vector3(0,Math.PI / 2,0), wallMaterial),
      floor: new Floor(this.scene, '3', 6.05, 6.05, new THREE.Vector3(0,-1.64,0), new THREE.Vector3(-Math.PI / 2,0,0), floorMaterial),
    };

    Object.keys(this.objects).forEach((key) => {
      this.objects[key].load().then(() => {
        objectsLoaded[key] = true;
        if (!this.loaded && Object.keys(this.objects).every((k) => objectsLoaded[k])) {
          this.loaded = true;
          this.onLoad();
        }
      })
    });
  }

  setupCamera = () => {
    const scale = 3;

    let whRatio = Math.max(innerWidth * 0.75 / innerHeight, 1.2);
    whRatio = Math.min(whRatio, 1.4);

    if (innerWidth < innerHeight) {
      whRatio = 1.5;
    }

    console.log(whRatio);
    this.target = new THREE.Vector3(0, 0, 0);
    this.camera = new THREE.OrthographicCamera(2 / whRatio * scale, -2 / whRatio * scale, scale, -scale, 0.01, 50000);
    this.camera.position.set(-5, 4, 5);
    this.camera.lookAt(this.target);
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshBasicMaterial({color: "green"});

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target = this.target;
    this.controls.autoRotate = true;
  }

  getPositionInScreen = (position) => {
    const canvas = this.renderer.domElement;
    const vector = new THREE.Vector3();

    vector.set( position.x, position.y, position.z );
    vector.project(this.camera);

    const width = window.innerWidth >= window.innerHeight ? canvas.width * 0.7 : canvas.width;
    const height = window.innerWidth >= window.innerHeight ? canvas.height : canvas.height * 0.8;
    const offsetWidth = 0;
    const offsetHeight = window.innerWidth >= window.innerHeight ? 0 : canvas.height * 0.2;

    vector.x = Math.round( (   vector.x + 1 ) * width / 2 / devicePixelRatio + offsetWidth / devicePixelRatio);
    vector.y = Math.round( ( - vector.y + 1 ) * height / 2 / devicePixelRatio + offsetHeight / devicePixelRatio);
    vector.z = 0;
    return vector;
  }

  zoomInto = (objName, onComplete) => {
    const pos = this.objects[objName].centerPoint;
    const lookAtPos = this.objects[objName].lookAtPosition();
    Object.keys(this.objects).forEach((key) => {
      if (key != objName) {
        this.objects[key].obj.visible = false;
      } else {
        this.objects[key].obj.visible = true;
      }
    });

    const distance = pos.clone().sub(this.target);
    let currentPos = this.camera.position.clone().sub(this.objects[objName].lookAtDirection);
    this.camera.lookAt(currentPos);
    const startZoom = this.camera.zoom;
    const endZoom =  this.objects[objName].zoom;
    const distanceZoom = endZoom - startZoom;
    this.controls.enabled = false;

    const that = this;

    new TWEEN.Tween(this.camera.position)
      .to({
        x: lookAtPos.x,
        y: lookAtPos.y,
        z: lookAtPos.z,
      }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate((t) => {
        let newTarget = that.target.clone().add(distance.clone().multiplyScalar(Math.pow(t, 2)));
        that.camera.lookAt(newTarget);
        let newZoom = startZoom + distanceZoom * t;
        that.camera.zoom = newZoom;
        that.camera.updateProjectionMatrix();
      })
      .onComplete(function() {
        const minBound = that.getPositionInScreen(that.objects[objName].box.min);
        const maxBound = that.getPositionInScreen(that.objects[objName].box.max);
        const top = Math.min(minBound.y, maxBound.y);
        const bottom = Math.max(minBound.y, maxBound.y);
        const left = Math.min(minBound.x, maxBound.x);
        const right = Math.max(minBound.x, maxBound.x);
        that.camera.updateProjectionMatrix();
        onComplete({
          pageBound: [top, left, bottom - top, right - left]
        })
      })
      .start();
  }

  getMenuObject2DPositions = () => {
    const screenPositions = {};
    ['imac', 'macbook', 'board', 'shelf'].forEach((key) => {
      screenPositions[key] = this.getPositionInScreen(this.objects[key].centerPoint);
    });
    return screenPositions;
  }

  reset = () => {
    this.controls.reset();
    this.controls.enabled = true;
    this.controls.update();
    Object.keys(this.objects).forEach((key) => {
      this.objects[key].obj.visible = true;
    });
  }

  render = (frame) => {
    if (frame < 245) {
      this.objects['floor'].buildAnimate(10, 40, frame);
      this.objects['wall1'].buildAnimate(40, 80, frame);
      this.objects['wall2'].buildAnimate(80, 120, frame);
      this.objects['desk'].buildAnimate(160, 185, frame);
      this.objects['shelf'].buildAnimate(170, 200, frame);
      this.objects['tree'].buildAnimate(180, 195, frame);
      this.objects['chair'].buildAnimate(185, 200, frame);
      this.objects['imac'].buildAnimate(195, 220, frame);
      this.objects['macbook'].buildAnimate(210, 230, frame);
      this.objects['board'].buildAnimate(215, 235, frame);
    } else if (frame < 246) {
    } else {
      TWEEN.update();
    }

    if (window.innerWidth >= window.innerHeight) {
      this.renderer.setViewport(0, 0, window.innerWidth * 0.7, window.innerHeight);
      this.renderer.setScissor(0, 0, window.innerWidth * 0.7, window.innerHeight);
    } else {
      this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight * 0.8);
      this.renderer.setScissor(0, 0, window.innerWidth, window.innerHeight * 0.8);
    }
    this.renderer.setScissorTest(true);
    this.renderer.render(this.scene, this.camera);
  }
}
