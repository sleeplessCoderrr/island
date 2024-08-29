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
    this.fontLoader = new FontLoader();

    this.baseBoxMaterial = this.materialLoader.createPhongMaterial(
      new THREE.Color(0x7cfcda),
      false,
      100
    );
    this.coneMaterial = this.materialLoader.createStandartMaterial({
      color: new THREE.Color(0x95fce1),
      wireframe: false,
      side: THREE.DoubleSide,
    });
  }

  makeIsland = () => {
    this.createBaseCone();
    this.createLight();
  };

  createLight = () => {
    this.createPointLight();
    this.createAmbientLight();
  };

  createBaseBox = () => {
    const box = this.geometry.createBox(40, 0.2, 40, this.baseBoxMaterial);
    this.geometry.setPosition(box, 0, -4, 0);
    this.objects.push(box);
  };

  createBaseCone = () => {
    const cone = this.geometry.createCone(4, 5, 16, this.coneMaterial);
    this.geometry.setPosition(cone, 0, -1, 0);
    this.geometry.setRotation(cone, Math.PI);
    this.objects.push(cone);
  };

  createPointLight = () => {
    const pointLight = this.lighting.createPointLight(0xffffff, 0.3, 1000);
    this.geometry.setPosition(pointLight, 0, 3, 0);
    this.objects.push(pointLight);
  };

  createAmbientLight = () => {
    const ambientLight = this.lighting.createAmbientLight(0xffffff, 0.4);
    this.geometry.setPosition(ambientLight, 0, 0, 0);
    this.objects.push(ambientLight);
  };

  getObjects = () => {
    return this.objects;
  };
}

export { Island };
