import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import BaseObject from './BaseObject';
import * as THREE from 'three';

class GltfObject extends BaseObject {
  box: any;
  centerPoint: any;
  glbPath: any;
  options: any;
  materialMap: any;
  children: any;
  lookAtDirection: any;
  zoom: number;

  constructor(scene, glbPath, name, position, scale, rotation, options) {
    super(scene, name, position, scale, rotation);
    this.glbPath = glbPath;
    this.options = options;
    this.materialMap = {};
    this.children = [];
  }

  load() {
    return new Promise((resolve, reject) => {
      new GLTFLoader().load(
        this.glbPath,
        (gltf) => {
          const obj = gltf.scene;
          this.loadObjects(obj);
          resolve(obj);
        },
        undefined,
        (error) => reject(error),
      );
    });
  }

  buildObject(obj) {
    const { receiveShadow, castShadow } = this.options;
    obj.receiveShadow = receiveShadow;
    obj.castShadow = castShadow;

    obj.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = castShadow;
        child.receiveShadow = receiveShadow;
      }
    });

    this.setCenterPoint(obj);
    return obj;
  }

  setCenterPoint(obj) {
    this.box = new THREE.Box3().setFromObject(obj);
    this.centerPoint = this.box.min.clone().add(this.box.max).divideScalar(2);
  }

  buildWireframe() {
    const that = this;
    this.obj.scale.y = 0;
    this.obj.traverse((child) => {
      if (child.material) {
        this.children.push(child);
        child.material.wireframe = true;
      }
    });
  }

  showOriginalMaterial(childIndex) {
    const child = this.children[childIndex];
    child.material.wireframe = false;
  }

  buildFrameAnimate(fromFrame, toFrame, frame) {
    this.transitionScale(frame - fromFrame, toFrame - fromFrame, 'y');
  }

  childCount() {
    return this.children.length;
  }
}

export default GltfObject;
