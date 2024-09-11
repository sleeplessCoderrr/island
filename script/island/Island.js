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
  }

  makeIsland = () => {
    this.#createUpperBox();
    this.#createLight();
    this.#createLowerBox();
  };

  //3D Object
  #createUpperBox = () => {
    const baseBoxMaterial = this.materialLoader.createPhongMaterial({
      color: new THREE.Color(0xfce0b1),
      wireframe: false,
      side: THREE.DoubleSide,
    });
    const box = this.geometry.createBox(30, 1, 30, baseBoxMaterial);
    this.geometry.setPosition(box, 0, -4, 0);
    this.objects.push(box);
  };

  #createLowerBox = () => {
    const loweBoxMaterial = this.materialLoader.createPhongMaterial({
      color: new THREE.Color(0x478997),
      wireframe: false,
      side: THREE.DoubleSide,
    });
    const box = this.geometry.createBox(30, 15, 30, loweBoxMaterial);
    this.geometry.setPosition(box, 0, -12, 0);
    this.objects.push(box);
  };

  //Lighting
  #createLight = () => {
    this.#createPointLight();
    this.#createAmbientLight();
  };

  #createPointLight = () => {
    const pointLight = this.lighting.createPointLight(0xffffff, 0.3, 1000);
    this.geometry.setPosition(pointLight, 0, 3, 0);
    this.objects.push(pointLight);
  };

  #createAmbientLight = () => {
    const ambientLight = this.lighting.createAmbientLight(0xffffff, 0.7);
    this.geometry.setPosition(ambientLight, 0, 0, 0);
    this.objects.push(ambientLight);
  };

  getObjects = () => {
    return this.objects;
  };
}

export { Island };
