import * as THREE from 'three';
import BaseObject from './BaseObject';

class Wall extends BaseObject {
  constructor(scene, id, width, height, position, rotation, wallMaterial, wireframeMaterial) {
    super(scene, `wall${id}`, position, new THREE.Vector3(1, 1, 1), rotation, wireframeMaterial);
    this.width = width;
    this.height = height;
    this.wallMaterial = wallMaterial;
  }

  load() {
    return new Promise(resolve => {
      const geometry = new THREE.BoxGeometry(this.width, this.height, 0.1);
      this.loadObjects(new THREE.Mesh(geometry, this.wallMaterial));
      resolve(this.obj);
    });
  }

  buildObject(obj) {
    return obj;
  }

  buildWireframe() {
    this.obj.material = this.wireframeMaterial;
    this.obj.scale.x = 0;
  }

  showOriginalMaterial() {
    this.obj.material = this.wallMaterial;
  }

  buildFrameAnimate(fromFrame, toFrame, frame) {
    this.transitionScale(frame - fromFrame, toFrame - fromFrame, 'x');
  }
}

export default Wall;
