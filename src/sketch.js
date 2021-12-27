import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";

class Sketch {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
    });
    this.renderer.domElement.id = "render-canvas";
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(55, 1, 0.01, 100);
    this.camera.position.set(0, 8, -16);

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

    // adds reflrections!?
    RectAreaLightUniformsLib.init();

    const rectLight1 = new THREE.RectAreaLight(0xff0000, 5, 4, 10);
    rectLight1.position.set(0, 5, 5);
    scene.add(rectLight1);

    scene.add(new RectAreaLightHelper(rectLight1));

    const geoFloor = new THREE.BoxGeometry(100, 0.1, 100);
    const matStdFloor = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.1,
      metalness: 0,
    });
    const meshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
    meshStdFloor.position.set(0, -0.1, 0); // drop down to not touch lights
    scene.add(meshStdFloor);

    this.scene = scene;
  }

  _update(time, deltaTime) {}

  render(time, deltaTime, state) {
    this._update(time, deltaTime);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

export default Sketch;
