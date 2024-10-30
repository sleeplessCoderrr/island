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
    this.sandMaterial = this.materialLoader.createPhongMaterial({
      color: new THREE.Color(0x478997),
      wireframe: false,
      side: THREE.DoubleSide,
    });
    this.waterMaterial = this.materialLoader.createPhongMaterial({
      color: new THREE.Color(0xfce0b1),
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
    // this.#createSandBox();
    // this.#createLowerBox();
    this.#createPolyHedron(2, this.defaultPolyhedronMaterial);
  };

  //Sand Controller

  //Water controller

  //For the sand
  #createSandBox = () => {
    const box = this.geometry.createBox(30, 15, 45, this.sandMaterial);
    this.geometry.setPosition(box,-20, -12, 0);
    this.objects.push(box);
  };

  //For the water
  #createPolyHedron = (scaleFactor, material) => {
    const verticesOfCube = this.#getVertices(scaleFactor);
    const indicesOfFaces = this.#getIndices();

    const polyhedron = this.geometry.createPolyHedron(verticesOfCube, indicesOfFaces, material);
    this.geometry.setPosition(polyhedron, 0, 0, 0); 
    this.objects.push(polyhedron);
  };

  #getVertices = (scaleFactor) => {
    return new Float32Array([
      0 * scaleFactor, 1 * scaleFactor, 0 * scaleFactor,
      -1 * scaleFactor, -1 * scaleFactor, 0 * scaleFactor, 
      1 * scaleFactor, -1 * scaleFactor, 0 * scaleFactor,

      0 * scaleFactor, 1 * scaleFactor, -2 * scaleFactor, 
      -1 * scaleFactor, -1 * scaleFactor, -2 * scaleFactor, 
      1 * scaleFactor, -1 * scaleFactor, -2 * scaleFactor, 
    ]);
  };

  #getIndices = () => {
    return [
      0, 1, 2,

      3, 5, 4,

      0, 2, 5, 
      0, 5, 3, 
      1, 4, 5, 
      1, 5, 2, 
    ];
  };
  

  #createLowerBox = () => {
    const box = this.geometry.createBox(30, 15, 45, this.waterMaterial);
    this.geometry.setPosition(box, 20, -12, 0);
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
