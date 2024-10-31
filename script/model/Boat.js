import * as THREE from "../../threejs/build/three.module.js ";
import { Lighting, Material, Geometry } from "../utils/component.js";
import { GLTFLoader } from "../../threejs/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "../../threejs/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "../../threejs/examples/jsm/geometries/TextGeometry.js";

export class Boat{
    constructor(){
        this.lighting = new Lighting();
        this.geometry = new Geometry();
        this.objects = [];
        this.materialLoader = new Material();
        this.textureLoader = new THREE.TextureLoader();
    }

    initialize = () => {
        
    }

    #makeBoats = () => {

    }

    #createHouseLight = () => {
        const pointLight = this.lighting.createPointLight(0xffffff, 0.3, 1000);
        this.geometry.setPosition(pointLight, 0, 3, 0);
        this.objects.push(pointLight);
    };

    getObjects = () => {
        return this.objects;
    };
}