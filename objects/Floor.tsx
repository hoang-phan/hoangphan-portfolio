import Wall from './Wall';

class Floor extends Wall {
  buildWireframe(obj) {
    obj.material = this.wireframeMaterial;
    obj.scale.z = 0;
    return obj;
  }

  buildFrameAnimate(fromFrame, toFrame, frame) {
    this.transitionScale(frame - fromFrame, toFrame - fromFrame, 'z');
  }
}

export default Floor;
