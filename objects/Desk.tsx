import GltfObject from './GltfObject';
import * as THREE from 'three';

class Desk extends GltfObject {
  constructor(scene, position, rotation) {
    super(
      scene,
      'desk.glb',
      'desk',
      position,
      new THREE.Vector3(0.4, 0.4, 0.35),
      rotation,
      {},
    );
  }
}

export default Desk;
