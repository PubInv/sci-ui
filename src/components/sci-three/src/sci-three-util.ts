import * as THREE from 'three'
import { Vector3 } from 'three';

export function CreateCube(position: Vector3, castShadow: boolean) {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial();

  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(position.x, position.y, position.z);
  cube.castShadow = castShadow;
  
  return cube;
}