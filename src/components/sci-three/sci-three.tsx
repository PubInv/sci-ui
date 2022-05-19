import { Element, Component, h } from '@stencil/core';
import * as THREE from 'three'

@Component({
  tag: 'sci-three',
  styleUrl: 'sci-three.css',
  shadow: true,
})
export class SciThree {
  @Element() element: HTMLElement;
  canvas;

  componentDidLoad() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    this.canvas = this.element.shadowRoot.querySelector('.mycanvas');
    const renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setSize(500, 500);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    renderer.render(scene, camera)

    function render(time) {
      time *= 0.001;  // convert time to seconds
     
      cube.rotation.x = time;
      cube.rotation.y = time;
     
      renderer.render(scene, camera);
     
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  render() {
    return (
      // <Host>
      <canvas class="mycanvas"></canvas>
      // </Host>
    );
  }

}
