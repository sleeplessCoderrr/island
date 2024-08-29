import * as THREE from "../../threejs/build/three.module.js ";
import { Lighting, Material, Geometry } from "../utils/component.js";
import { GLTFLoader } from "../../threejs/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "../../threejs/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "../../threejs/examples/jsm/geometries/TextGeometry.js";

class SkyBox {
  constructor() {
    this.material = new Material();
    this.textureLoader = new THREE.TextureLoader();
    this.skyBox = [];
    this.skyList = [
      "./public/assets/Daylight Box_Pieces/Daylight Box_Right.bmp",
      "./public/assets/Daylight Box_Pieces/Daylight Box_Left.bmp",
      "./public/assets/Daylight Box_Pieces/Daylight Box_Top.bmp",
      "./public/assets/Daylight Box_Pieces/Daylight Box_Bottom.bmp",
      "./public/assets/Daylight Box_Pieces/Daylight Box_Front.bmp",
      "./public/assets/Daylight Box_Pieces/Daylight Box_Back.bmp",
    ];
    this.createSkyBox();
  }

  createSkyBox = () => {
    this.skyList.forEach((e) => {
      const material = this.material.createMeshBasicMaterial({
        color: 0xffffff,
        map: this.textureLoader.load(e),
        side: THREE.BackSide,
      });
      this.skyBox.push(material);
    });
  };

  getSkyBox = () => {
    return this.skyBox;
  };
}

export { SkyBox };
