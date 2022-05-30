import * as THREE from 'three';

class BaseScene {
  renderer: any;
  scene: any;
  camera: any;
  container: any;

  constructor(container) {
    const scw = container.clientWidth;
    const sch = container.clientHeight;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setSize(scw, sch);
    this.scene = new THREE.Scene();
  }
}

export default BaseScene;