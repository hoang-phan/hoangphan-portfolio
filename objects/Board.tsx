import MenuTarget from './MenuTarget';
import * as THREE from 'three';

class Board extends MenuTarget {
  constructor(scene, position, rotation, wireframeMaterial, lookAtDirection, zoom) {
    super(
      scene,
      'board.glb',
      'board',
      position,
      new THREE.Vector3(1.4, 1.4, 1.4),
      rotation,
      wireframeMaterial,
      lookAtDirection,
      zoom,
    );
  }

  setCenterPoint(obj) {
    this.box = new THREE.Box3().setFromObject(obj);
    this.centerPoint = this.box.min.clone().add(this.box.max).divideScalar(2);
    this.centerPoint.y += 0.3;
  }
}

export default Board;
