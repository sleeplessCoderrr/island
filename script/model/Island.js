import * as THREE from "../../threejs/build/three.module.js ";
import { Lighting, Material, Geometry } from "../utils/component.js";
import { GLTFLoader } from "../../threejs/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "../../threejs/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "../../threejs/examples/jsm/geometries/TextGeometry.js";

export class Island {
  constructor() {
    this.lighting = new Lighting();
    this.geometry = new Geometry();
    this.objects = [];
    this.materialLoader = new Material();
    this.textureLoader = new THREE.TextureLoader();
    this.fontLoader = new FontLoader();
    this.sandMaterial = this.materialLoader.createPhongMaterial({
      color: new THREE.Color(0x478997),
      wireframe: false,
      side: THREE.DoubleSide,
    });
    this.defaultPolyhedronMaterial = this.materialLoader.createPhongMaterial({
      color: new THREE.Color(0xfce0b1),
      wireframe: false,
      side: THREE.DoubleSide,
      flatShading: true
    });
  }  

  makeIsland = () => {
    this.#createLight();
  };  

  #createLight = () => {
    this.#createHouseLight();
  };

  #createHouseLight = () => {
    const pointLight = this.lighting.createPointLight(0xffffff, 0.3, 1000);
    this.geometry.setPosition(pointLight, 0, 3, 0);
    this.objects.push(pointLight);
  };

  getObjects = () => {
    return this.objects;
  };
}

