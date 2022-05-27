import GltfObject from './GltfObject';
import * as THREE from 'three';

class Tree extends GltfObject {
  constructor(scene, position, rotation) {
    super(
      scene,
      'tree.glb',
      'tree',
      position,
      new THREE.Vector3(1, 1, 1),
      rotation,
      {}
    );
  }
}

export default Tree;
