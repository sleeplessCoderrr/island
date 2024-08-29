import * as THREE from "../../threejs/build/three.module.js ";
import { Material } from "../utils/component.js";

class SkyBox {
  constructor(height, width, depth) {
    this.boxGeometry = new THREE.BoxGeometry(height, width, depth);

    this.material = new Material();
    this.textureLoader = new THREE.TextureLoader();
    this.skyBoxMaterials = [];
    this.skyList = [
      "../../public/assets/Daylight Box_Pieces/Daylight Box_Right.bmp",
      "../../public/assets/Daylight Box_Pieces/Daylight Box_Left.bmp",
      "../../public/assets/Daylight Box_Pieces/Daylight Box_Top.bmp",
      "../../public/assets/Daylight Box_Pieces/Daylight Box_Bottom.bmp",
      "../../public/assets/Daylight Box_Pieces/Daylight Box_Front.bmp",
      "../../public/assets/Daylight Box_Pieces/Daylight Box_Back.bmp",
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
      this.skyBoxMaterials.push(material);
    });
  };

  getBoxGeometry = () => {
    return this.boxGeometry;
  };

  getSkyBox = () => {
    return this.skyBoxMaterials;
  };
}

export { SkyBox };
