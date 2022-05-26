import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import * as CANNON from 'cannon';

export default class PageHeroScene {
  constructor(renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;

    this.setupLight();
    this.setupPhysics();
    this.setupShadowPlane();
    this.setupLetters("hoang.phan");
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
    this.world = new CANNON.World();
    this.world.gravity = new CANNON.Vec3(0, -5, 0);
  }

  setupShadowPlane = () => {
    const width = 50;
    const height = 0.1;
    const depth = 50;

    const planeGeometry = new THREE.BoxGeometry(width, height, depth);
    const planeMaterial = new THREE.ShadowMaterial();
    planeMaterial.opacity = 0.5;
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.receiveShadow = true;
    planeMesh.position.set(101, 100, 100);
    this.scene.add(planeMesh);

    const shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2));
    const body = new CANNON.Body({ mass: 0, shape });
    body.position.copy(planeMesh.position);
    this.world.add(body);
  }

  setupLetters = (name) => {
    const loader = new FontLoader();
    this.letters = [];

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
        const textMaterial = new THREE.MeshPhongMaterial({ color: "#444" });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(99.8 + index * 0.32 + (index == 5 ? 0.03 : 0), 102 + index % 4, 100);
        textMesh.scale.set(0.008, 0.0035, 0.002);
        textMesh.rotation.y = 0.5;
        textMesh.castShadow = true;
        this.scene.add(textMesh);

        const box = new THREE.Box3().setFromObject(textMesh);
        const bound = box.max.clone().sub(box.min);
        const shape = new CANNON.Box(new CANNON.Vec3(bound.x / 2, bound.y / 2, bound.z / 2));
        const body = new CANNON.Body({ mass: 5, shape });
        body.position.copy(textMesh.position.clone().add(bound.clone().divideScalar(2)));
        body.quaternion.x = 0.03 * (index % 5);
        this.world.add(body);

        this.letters.push({ mesh: textMesh, bound, body });
      });
    });

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
    this.avatarMesh.position.set(103.5, 110, 100);
    this.avatarMesh.scale.y = -1;
    this.scene.add(this.avatarMesh);

    const avatarShape = new CANNON.Box(new CANNON.Vec3(0.2, 0.1, 0.1));
    this.avatarBody = new CANNON.Body({ mass: 5, shape: avatarShape });
    this.avatarBody.position.copy(this.avatarMesh.position);
    this.avatarBody.quaternion.x = 0.25;
    this.avatarBody.quaternion.y = 0.15;
    this.world.add(this.avatarBody);
  }

  setupCamera = () => {
    this.camera = new THREE.OrthographicCamera(2, -2, 1, -1, 0.01, 500);
    this.camera.position.set(102.5, 100.2, 95);
    this.camera.lookAt(new THREE.Vector3(101.8, 100, 100));
  }

  render = () => {
    if (innerWidth >= innerHeight) {
      this.renderer.setViewport(innerWidth * 0.7, 0, innerWidth * 0.3, innerHeight);
      this.renderer.setScissor(innerWidth * 0.7, 0, innerWidth * 0.3, innerHeight);
    } else {
      const width = Math.min(innerHeight * 0.3, innerWidth);
      this.renderer.setViewport((innerWidth - width) / 2, innerHeight * 0.8, width, innerHeight * 0.2);
      this.renderer.setScissor((innerWidth - width) / 2, innerHeight * 0.8, width, innerHeight * 0.2);
    }
    this.renderer.setScissorTest(true);
    this.renderer.render(this.scene, this.camera);
    this.updatePhysics();
  }

  updatePhysics = () => {
    this.world.step(1 / 60);
    this.letters.forEach((letter) => {
      const bodyPos = letter.body.position;
      letter.mesh.position.set(bodyPos.x - letter.bound.x / 2, bodyPos.y - letter.bound.y / 2, bodyPos.z - letter.bound.z / 2);
      letter.mesh.quaternion.copy(letter.body.quaternion);
    });
    this.avatarMesh.position.copy(this.avatarBody.position);
    this.avatarMesh.quaternion.copy(this.avatarBody.quaternion);
  }
}
