import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import * as CANNON from 'cannon';

export default class PageHeroScene {
  renderer: any;
  scene: any;
  world: any;
  objects: any;
  camera: any;
  avatarMesh: any;
  avatarBody: any;
  bounds: any;

  constructor(renderer, scene, bounds) {
    this.renderer = renderer;
    this.scene = scene;
    this.bounds = bounds;
    this.objects = {}

    this.setupLight();
    this.setupPhysics();
    this.setupShadowPlane();
    this.setupObjects();
    this.setupCamera();
  }

  setupLight = () => {
    const spotLight = new THREE.SpotLight( 0xffffff, 1 );
    spotLight.position.set( 100, 102, 100 );
    spotLight.target.position.set( 101, 100, 100 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 100;
    spotLight.shadow.mapSize.height = 100;

    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 2000;
    spotLight.shadow.camera.fov = 10;
    this.scene.add(spotLight);
    this.scene.add(spotLight.target);
  }

  setupPhysics = () => {
    this.worker = new Worker(new URL('../workers/physics.js', import.meta.url));
    this.worker.onmessage = ({data}) => {
      Object.keys(data || {}).forEach((id) => {
        this.objects[id].position.copy(data[id].position);
        this.objects[id].quaternion.copy(data[id].quaternion);
      });
    };
    this.worker.postMessage({type: "setup"});
  }

  setupShadowPlane = () => {
    const width = 50;
    const height = 0.1;
    const depth = 50;
    const id = "plane";

    const planeGeometry = new THREE.BoxGeometry(width, height, depth);
    const planeMaterial = new THREE.ShadowMaterial();
    planeMaterial.opacity = 0.5;
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.receiveShadow = true;
    planeMesh.position.set(101, 100, 100);
    this.scene.add(planeMesh);
    this.objects[id] = planeMesh;

    const { x, y, z } = planeMesh.position;
    this.worker.postMessage({
      type: "create-object",
      obj: {
        id,
        x, y, z, width, height, depth,
        mass: 0,
      }
    });
  }

  setupObjects = () => {
    const name = "hoang.phan";
    const loader = new FontLoader();
    const textMaterial = new THREE.MeshPhongMaterial({ color: "#444" });

    loader.load("fonts/helvetiker_regular.typeface.json", (font) => {
      name.split("").forEach((letter, index) => {
        const textId = `letter-${index}`;
        const textGeometry = new TextGeometry(letter, {
          font: font,
          size: 40,
          bevelEnabled: true,
          bevelThickness: 5,
          bevelSize: 1,
          bevelOffset: 0,
          bevelSegments: 5
        });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(100 + index * 0.32 + (index == 5 ? 0.03 : 0), 102 + index % 4, 100);
        textMesh.scale.set(0.008, 0.0035, 0.002);
        textMesh.rotation.y = 0.5;
        textMesh.castShadow = true;
        this.scene.add(textMesh);
        this.objects[textId] = textMesh;

        const box = new THREE.Box3().setFromObject(textMesh);
        const bound = box.max.clone().sub(box.min);
        const { x, y, z } = textMesh.position;
        this.worker.postMessage({
          type: "create-object",
          obj: {
            id: textId,
            x, y, z, width: bound.x, height: bound.y, depth: bound.z,
            quaternionX: 0.03 * (index % 5),
            mass: 5,
          }
        });
      });
    });

    const avatarId = "avatar";
    const avatarGeometry = new THREE.BoxGeometry(0.4, 0.2, 0.2);
    const avatarTexture = new THREE.TextureLoader().load('hoang.jpg');
    const avatarMaterial = [
      new THREE.MeshBasicMaterial({ color: "#444" }),
      new THREE.MeshBasicMaterial({ color: "#555" }),
      new THREE.MeshBasicMaterial({ color: "#666" }),
      new THREE.MeshBasicMaterial({ color: "#777" }),
      new THREE.MeshBasicMaterial({ color: "#888" }),
      new THREE.MeshBasicMaterial({ map: avatarTexture }),
    ];
    this.avatarMesh = new THREE.Mesh(avatarGeometry, avatarMaterial);
    this.avatarMesh.position.set(103.4, 110, 100);
    this.avatarMesh.scale.y = -1;
    this.scene.add(this.avatarMesh);

    const {x, y, z} = this.avatarMesh.position;
    this.worker.postMessage({
      type: "create-object",
      obj: {
        id: avatarId,
        x, y, z, width: 0.4, height: 0.2, depth: 0.2,
        mass: 5,
        quaternionX: 0.25, quarternionY: 0.15,
      }
    });
    this.objects[avatarId] = this.avatarMesh;
  }

  setupCamera = () => {
    this.camera = new THREE.OrthographicCamera(2, -2, 1, -1, 0.01, 500);
    this.camera.position.set(102.5, 100.2, 95);
    this.camera.lookAt(new THREE.Vector3(101.8, 100, 100));
  }

  render = () => {
    this.renderer.setViewport(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    this.renderer.setScissor(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
    this.renderer.setScissorTest(true);
    this.renderer.render(this.scene, this.camera);
    this.worker.postMessage({type: "update"});
  }
}
