import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import BaseObject from './BaseObject';
import * as THREE from 'three';

class GltfObject extends BaseObject {
  constructor(scene, glbPath, name, position, scale, rotation, wireframeMaterial, options) {
    super(scene, name, position, scale, rotation, wireframeMaterial);
    this.glbPath = glbPath;
    this.options = options;
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

    obj.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = castShadow;
        child.receiveShadow = receiveShadow;
      }
    });

    const box = new THREE.Box3().setFromObject(obj);
    this.centerPoint = box.min.clone().add(box.max).divideScalar(2);
    return obj;
  }

  buildWireframe(obj) {
    const that = this;
    obj.scale.y = 0;
    obj.traverse(function (child) {
      if (child.material) {
        child.material = that.wireframeMaterial;
      }
    });
    return obj;
  }

  buildFrameAnimate(fromFrame, toFrame, frame) {
    this.transitionScale(frame - fromFrame, toFrame - fromFrame, 'y');
  }
}

export default GltfObject;
