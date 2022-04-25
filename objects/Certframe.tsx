import MenuTarget from './MenuTarget';
import * as THREE from 'three';

class Certframe extends MenuTarget {
  constructor(scene, position, rotation, wireframeMaterial, lookAtDirection, zoom) {
    super(
      scene,
      'picframe.glb',
      'certframe',
      position,
      new THREE.Vector3(0.3, 0.25, 0.3),
      rotation,
      wireframeMaterial,
      lookAtDirection,
      zoom,
    );
  }
}

export default Certframe;
