import MenuTarget from './MenuTarget';
import * as THREE from 'three';

class Imac extends MenuTarget {
  constructor(scene, position, rotation, wireframeMaterial, lookAtDirection, zoom) {
    super(
      scene,
      'imac.glb',
      'imac',
      position,
      new THREE.Vector3(0.5, 0.5, 0.5),
      rotation,
      wireframeMaterial,
      lookAtDirection,
      zoom,
    );
  }
}

export default Imac;
