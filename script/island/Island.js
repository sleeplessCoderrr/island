import * as THREE from "../../threejs/build/three.module.js ";
import { Lighting, Material, Geometry } from "../utils/component.js";
import { GLTFLoader } from "../../threejs/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "../../threejs/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "../../threejs/examples/jsm/geometries/TextGeometry.js";

class Island {
  constructor() {
    this.lighting = new Lighting();
    this.geometry = new Geometry();
    this.objects = [];
    this.materialLoader = new Material();
    this.textureLoader = new THREE.TextureLoader();
    this.gltfLoader = new GLTFLoader();
    this.fontLoader = new FontLoader();
    this.phongMaterial = this.materialLoader.createPhongMaterial(
      new THREE.Color(0x7cfcda),
      false,
      100
    );
    this.standartMaterial = this.materialLoader.createStandartMaterial({
      color: new THREE.Color(0x35edf0),
      wireframe: false,
      side: THREE.DoubleSide,
    });
  }

  makeIsland() {
    this.createBaseBox();
    this.createBaseCone();
    this.createLight();
  }

  createBaseBox() {
    const box = this.geometry.createBox(100, 0.2, 100, this.phongMaterial);
    this.geometry.setPosition(box, 0, -4, 0);
    this.objects.push(box);
  }

  createBaseCone = () => {
    const cone = this.geometry.createCone(4, 5, 100, this.standartMaterial);
    this.geometry.setPosition(cone, 0, -1, 0);
    this.geometry.setRotation(cone, Math.PI);
    this.objects.push(cone);
  };

  createLight = () => {
    const pointLight = this.lighting.createPointLight(0xffffff, 0.8, 1000);
    this.geometry.setPosition(pointLight, 0, 3, 0);
    this.objects.push(pointLight);
  };

  getObjects() {
    return this.objects;
  }
}

export { Island };
