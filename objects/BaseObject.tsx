class BaseObject {
  scene: any;
  name: any;
  position: any;
  scale: any;
  rotation: any;
  wireframeMaterial: any;
  originalScale: any;
  obj: any;

  constructor(scene, name, position, scale, rotation, wireframeMaterial) {
    this.scene = scene;
    this.name = name;
    this.position = position;
    this.scale = scale;
    this.rotation = rotation;
    this.wireframeMaterial = wireframeMaterial;
    this.originalScale = this.scale;
  }

  loadObjects(obj) {
    this.obj = this.loadObject(obj);
    if (this.wireframeMaterial) {
      this.buildWireframe();
    }
  }

  loadObject(obj) {
    obj.name = name;
    obj.position.set(this.position.x, this.position.y, this.position.z);
    obj.scale.set(this.scale.x, this.scale.y, this.scale.z);
    obj.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    obj.visible = false;

    this.scene.add(obj);
    return this.buildObject(obj);
  }

  transitionScale(currentFrame, totalFrame, direction) {
    const growFrame = totalFrame - 10;
    if (currentFrame <= growFrame) {
      this.obj.scale[direction] = this.originalScale[direction] * Math.pow(currentFrame, 2) / Math.pow(growFrame, 2) * 1.2;
    } else {
      this.obj.scale[direction] = this.originalScale[direction] * (1 + (totalFrame - currentFrame) / 100.0);
    }
  }

  buildAnimate(fromFrame, toFrame, frame) {
    if (frame > toFrame + this.childCount() || frame < fromFrame) {
      return;
    }

    if (frame == fromFrame) {
      this.obj.visible = true;
    }

    if (frame > toFrame) {
      this.showOriginalMaterial(frame - toFrame - 1);
      return;
    }

    this.buildFrameAnimate(fromFrame, toFrame, frame);
  }

  childCount() {
    return 1;
  }

  buildWireframe() {

  }

  buildObject(obj) {
    return obj;
  }

  showOriginalMaterial(index) {

  }

  buildFrameAnimate(fromFrame, toFrame, frame) {

  }
}

export default BaseObject;
