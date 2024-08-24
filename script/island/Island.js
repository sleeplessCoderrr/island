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
  }

  makeIsland() {
    this.createBox();
  }

  createBox() {
    const material1 = this.materialLoader.createPhongMaterial(
      0x00000,
      false,
      100
    );
    const box = this.geometry.createBox(1, 1, 1, material1);
    this.geometry.setPosition(box, 0, 0, 0);
    this.objects.push(box);
  }

  getObjects() {
    return this.objects;
  }
}

export { Island };
