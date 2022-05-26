import Wall from './Wall';

class Floor extends Wall {
  buildWireframe() {
    this.obj.material.wireframe = true;
    this.obj.scale.z = 0;
  }

  buildFrameAnimate(fromFrame, toFrame, frame) {
    this.transitionScale(frame - fromFrame, toFrame - fromFrame, 'z');
  }
}

export default Floor;
