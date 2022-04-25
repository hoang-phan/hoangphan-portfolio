class BaseObject {
  constructor(scene, name, position, scale, rotation, wireframeMaterial) {
    this.scene = scene;
    this.name = name;
    this.position = position;
    this.scale = scale;
    this.rotation = rotation;
    this.wireframeMaterial = wireframeMaterial;
  }

  loadObjects(obj) {
    this.obj = this.loadObject(obj);
    if (this.wireframeMaterial) {
      this.wireframeObj = this.loadWireframeObj();
      this.hideObjects();  
    }
  }

  loadObject(obj) {
    obj.name = name;
    obj.position.set(this.position.x, this.position.y, this.position.z);
    obj.scale.set(this.scale.x, this.scale.y, this.scale.z);
    obj.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);

    this.scene.add(obj);
    return this.buildObject(obj);
  }

  loadWireframeObj() {
    const wireframeObj = this.obj.clone(true);
    wireframeObj.name = `${name}wireframed`;
    this.scene.add(wireframeObj);

    return this.buildWireframe(wireframeObj);
  }

  hideObjects() {
    this.obj.visible = false;
    this.wireframeObj.visible = false;
  }

  transitionScale(currentFrame, totalFrame, direction) {
    this.wireframeObj.scale[direction] = this.obj.scale[direction] * currentFrame / totalFrame
  }

  buildAnimate(fromFrame, toFrame, frame) {
    if (frame > toFrame + 1 || frame < fromFrame) {
      return;
    }

    if (frame == fromFrame) {
      this.wireframeObj.visible = true;
    }

    if (frame > toFrame) {
      this.wireframeObj.visible = false;
      this.obj.visible = true;
      this.scene.remove(this.wireframeObj);
      return;
    }

    this.buildFrameAnimate(fromFrame, toFrame, frame);
  }
}

export default BaseObject;
