import GltfObject from './GltfObject';
import * as THREE from 'three';

class Chair extends GltfObject {
  constructor(scene, position, rotation) {
    super(
      scene,
      'chair.glb',
      'chair',
      position,
      new THREE.Vector3(0.7, 0.7, 0.7),
      rotation,
      {}
    );
  }
}

export default Chair;
