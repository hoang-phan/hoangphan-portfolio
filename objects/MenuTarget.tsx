import GltfObject from './GltfObject';

class MenuTarget extends GltfObject {
  constructor(scene, glbPath, name, position, scale, rotation, lookAtDirection, zoom) {
    super(scene, glbPath, name, position, scale, rotation, {});
    this.lookAtDirection = lookAtDirection;
    this.zoom = zoom;
  }

  lookAtPosition() {
    return this.centerPoint.clone().add(this.lookAtDirection);
  }
}

export default MenuTarget;
