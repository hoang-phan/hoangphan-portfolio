import MenuTarget from './MenuTarget';
import * as THREE from 'three';

class Macbook extends MenuTarget {
  constructor(scene, position, rotation, wireframeMaterial, lookAtDirection, zoom) {
    super(
      scene,
      'macbook.glb',
      'macbook',
      position,
      new THREE.Vector3(0.8, 0.8, 0.8),
      rotation,
      wireframeMaterial,
      lookAtDirection,
      zoom,
    );
  }
}

export default Macbook;
