import * as THREE from 'three'

export class CameraController {
  camera;

  constructor() {
    this.camera = new THREE.PerspectiveCamera
    (100, 1, 0.1, 100);
    this.camera.position.setY(6);
    this.camera.position.setZ(6);
    this.camera.lookAt( 0, 0, 0 );
  }

  GetCamera() {
    return this.camera;
  }
  
}