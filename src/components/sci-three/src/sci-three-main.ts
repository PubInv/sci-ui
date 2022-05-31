import * as THREE from 'three'
import { Mesh, Vector3 } from 'three';
import { CameraController } from './sci-three-camera';
import { CreateCube } from './sci-three-util';

export function SciThreeMain(targetCanvas: HTMLCanvasElement | THREE.OffscreenCanvas) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000066 );

    const camCon = new CameraController();
    const camera = camCon.GetCamera();
  
    const renderer = new THREE.WebGLRenderer({canvas: targetCanvas});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.render(scene, camera);

    ///////////////////////////////////////////////////////////////////
    const cube = CreateCube(new Vector3(0, 2, 0), true);
    scene.add(cube);

    const geometry = new THREE.PlaneGeometry( 10, 10 );
    const material = new THREE.MeshStandardMaterial( {color: 0x00aa00, side: THREE.DoubleSide, wireframe: false} );
    const plane = new THREE.Mesh( geometry, material );
    plane.receiveShadow = true;
    plane.rotateX(1.5708);
    scene.add( plane );

    // Ambient light
    const ambientLight = new THREE.AmbientLight('white', 0.7);
    scene.add(ambientLight);
    
    // Directional light
    const light = new THREE.DirectionalLight( 0xffffff, 0.8);
    light.position.set( 0, 5, 0 ); //default; light shining from top
    light.castShadow = true; // default false
    // Set up shadow properties for the light
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default
    scene.add( light );

    window.requestAnimationFrame(step);

    ///////////////////////////////////////////////////////////////////

    function update(time: number) {
      cube.rotation.x = time;
      cube.rotation.y = time;
    }

    // No need to change this function
    function step(time: number) {
      time *= 0.001;  // convert time to seconds

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      update(time);      
      renderer.render(scene, camera);
      window.requestAnimationFrame(step);
    }

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
}

