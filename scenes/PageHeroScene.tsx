import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export default class PageHeroScene {
  constructor(renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;

    this.setupLight();
    this.setupShadowPlane();
    this.setupLetters("hoangphan");
    this.setupCamera();
  }

  setupLight = () => {
    const spotLight = new THREE.SpotLight( 0xffffff, 1 );
    spotLight.position.set( 101, 104, 100 );
    spotLight.target.position.set( 101, 100, 100 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 100;
    spotLight.shadow.mapSize.height = 100;

    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 1000;
    spotLight.shadow.camera.fov = 30;
    this.scene.add(spotLight);
    this.scene.add(spotLight.target);
  }

  setupShadowPlane = () => {
    const planeGeometry = new THREE.BoxGeometry(5, 0.2, 4);
    const planeMaterial = new THREE.ShadowMaterial();
    planeMaterial.opacity = 0.5;
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.receiveShadow = true;
    planeMesh.position.set(101, 100, 100);
    this.scene.add(planeMesh);
  }

  setupLetters = (name) => {
    const loader = new FontLoader();
    loader.load("fonts/helvetiker_regular.typeface.json", (font) => {
      name.split("").forEach((letter, index) => {
        const textGeometry = new TextGeometry(letter, {
          font: font,
          size: 40,
          bevelEnabled: true,
          bevelThickness: 5,
          bevelSize: 1,
          bevelOffset: 0,
          bevelSegments: 5
        });
        const textMaterial = new THREE.MeshLambertMaterial({ color: "#333" });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(100 + index * 0.4, 100, 100);
        textMesh.scale.set(0.01, 0.0035, 0.002);
        textMesh.rotation.y = 0.5;
        textMesh.castShadow = true;
        this.scene.add(textMesh);
      });
    });
  }

  setupCamera = () => {
    this.camera = new THREE.OrthographicCamera(2, -2, 1, -1, 0.01, 500);
    this.camera.position.set(107, 102, 79);
    this.camera.lookAt(new THREE.Vector3(101.8, 100, 100));
  }

  render = () => {
    // this.renderer.setViewport(window.innerWidth * 0.7, 0, window.innerWidth * 0.3, window.innerHeight);
    // this.renderer.setScissor(window.innerWidth * 0.7, 0, window.innerWidth * 0.3, window.innerHeight);
    // this.renderer.setScissorTest(true);
    // this.renderer.render(this.scene, this.camera);
  }
}
