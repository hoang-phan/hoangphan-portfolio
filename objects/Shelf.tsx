import MenuTarget from './MenuTarget';
import * as THREE from 'three';

class Shelf extends MenuTarget {
  constructor(scene, position, rotation, lookAtDirection, zoom) {
    super(
      scene,
      'shelf.glb',
      'shelf',
      position,
      new THREE.Vector3(0.5, 0.5, 0.5),
      rotation,
      lookAtDirection,
      zoom,
    );
  }
}

export default Shelf;
