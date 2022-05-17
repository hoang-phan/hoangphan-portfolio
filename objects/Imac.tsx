import MenuTarget from './MenuTarget';
import * as THREE from 'three';

class Imac extends MenuTarget {
  constructor(scene, position, rotation, wireframeMaterial, lookAtDirection, zoom) {
    super(
      scene,
      'imac.glb',
      'imac',
      position,
      new THREE.Vector3(0.6, 0.5, 0.5),
      rotation,
      wireframeMaterial,
      lookAtDirection,
      zoom,
    );
  }

  // setCenterPoint(obj) {
  //   this.box = new THREE.Box3().setFromObject(obj);
  //   this.centerPoint = this.box.min.clone().add(this.box.max).divideScalar(2);
  //   const xmin = Math.min(this.box.min.x, this.box.max.x);
  //   const xmax = Math.max(this.box.min.x, this.box.max.x);
  //   const ymin = Math.min(this.box.min.y, this.box.max.y);
  //   const ymax = Math.max(this.box.min.y, this.box.max.y);
  //   const zmin = Math.min(this.box.min.z, this.box.max.z);
  //   const zmax = Math.max(this.box.min.z, this.box.max.z);
  //   const geometry = new THREE.BoxGeometry(xmax - xmin, ymax - ymin, zmax - zmin);
  //   const mesh = new THREE.Mesh(geometry, this.wireframeMaterial);
  //   mesh.position.x = this.centerPoint.x; 
  //   mesh.position.y = this.centerPoint.y;
  //   mesh.position.z = this.centerPoint.z;
  //   this.scene.add(mesh);
  // }
}

export default Imac;
