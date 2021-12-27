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
    this.camera.position.set(0, 32, 0);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 1;
    this.controls.maxDistance = 100;
    this.controls.enabled = true;
  }

  resize({ width, height, dpr }) {
    this.size = [width, height];
    this.renderer.setPixelRatio = dpr;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  _createRectLight(color, intensity, width, height, position) {
    const rectLight = new THREE.RectAreaLight(color, intensity, width, height);
    rectLight.position.set(position.x, position.y, position.z);
    return rectLight;
  }

  _createLights(scene) {
    const LIGHT_COUNT = 9;
    const RADIUS = 12;
    const step = 1.0 / LIGHT_COUNT;
    for (let i = 0; i < 1; i += step) {
      let theta = i * 2.0 * Math.PI;
      const rectLight = this._createRectLight(
        new THREE.Color().setHSL(i, 0.8, 0.5),
        5,
        4,
        10,
        new THREE.Vector3(RADIUS * Math.cos(theta), 5, RADIUS * Math.sin(theta))
      );
      rectLight.lookAt(0, 5, 0);
      scene.add(rectLight);
      scene.add(new RectAreaLightHelper(rectLight));
    }
  }

  _createMesh(scene) {
    // TODO: make generative
    const geoKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 16);
    const matKnot = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0,
      metalness: 0,
    });
    const meshKnot = new THREE.Mesh(geoKnot, matKnot);
    meshKnot.name = "hero";
    meshKnot.position.set(0, 5, 0);
    scene.add(meshKnot);
  }

  updateState({ backgroundColor, cubeSize }) {
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    // adds reflrections!?
    RectAreaLightUniformsLib.init();

    // generative lights
    this._createLights(scene);

    // generative mesh
    this._createMesh(scene);

    // floor
    const geoFloor = new THREE.BoxGeometry(300, 0.1, 300);
    const matStdFloor = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.1,
      metalness: 0,
    });
    const meshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
    meshStdFloor.position.set(0, -0.1, 0); // drop down to not touch lights
    scene.add(meshStdFloor);

    // fill light
    const fillLight = this._createRectLight(
      new THREE.Color().setHSL(0, 0, 1),
      2,
      20,
      20,
      new THREE.Vector3(0, 30, 0)
    );
    fillLight.lookAt(0, 0, 0);
    scene.add(fillLight);
    scene.add(new RectAreaLightHelper(fillLight));

    this.scene = scene;
  }

  _update(time, deltaTime, { animateCamera }) {
    // animate mesh
    const mesh = this.scene.getObjectByName("hero");
    time /= 2.0;
    mesh.rotation.y = 1.0 * Math.PI * Math.sin(time);
    mesh.rotation.x = 1.0 * Math.PI * Math.cos(time);

    // animate camera
    if (animateCamera) {
      this.camera.position.x = 8 * Math.cos(time);
      this.camera.position.y = 20 + 8 * Math.sin(time);
      this.camera.position.z = 8 * Math.sin(time);
      this.camera.lookAt(mesh.position);
    } else {
      this.controls.update();
    }
  }

  render(time, deltaTime, state) {
    this._update(time, deltaTime, state);
    this.renderer.render(this.scene, this.camera);
  }
}

export default Sketch;
