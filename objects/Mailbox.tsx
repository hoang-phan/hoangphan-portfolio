import MenuTarget from './MenuTarget';
import * as THREE from 'three';

class Mailbox extends MenuTarget {
  constructor(scene, position, rotation, lookAtDirection, zoom) {
    super(
      scene,
      'mailbox.glb',
      'mailbox',
      position,
      new THREE.Vector3(0.5, 0.5, 0.5),
      rotation,
      lookAtDirection,
      zoom,
    );
  }
}

export default Mailbox;
