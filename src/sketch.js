import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Sketch {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
    });
    this.renderer.domElement.id = "render-canvas";
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(55, 1, 0.01, 100);
    this.camera.position.set(2, 3, 5);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 0.5;
    this.controls.maxDistance = 20;
    this.controls.enabled = true;
  }

  resize({ width, height, dpr }) {
    this.size = [width, height];
    this.renderer.setPixelRatio = dpr;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  updateState({ backgroundColor, cubeSize }) {
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      // wireframe: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    this.cube = cube;

    this.scene = scene;
  }

  _update(time, deltaTime) {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  }

  render(time, deltaTime, state) {
    this._update(time, deltaTime);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

export default Sketch;
