import * as THREE from "../../threejs/build/three.module.js";
import { Lighting, Material, Geometry } from "../utils/component.js";
import { GLTFLoader } from "../../threejs/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "../../threejs/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "../../threejs/examples/jsm/geometries/TextGeometry.js";

export class Light{
    constructor(){
        this.lighting = new Lighting();
        this.geometry = new Geometry();
        this.objects = [];
    }

    makeLighting = () => {
        this.#createAmbientLight();
        this.#createMoonLight();
    }

    #createMoonLight = () => {
        const moonLight = this.lighting.createDirectionalLight(0xaaaaaa, 0.6);
        this.geometry.setPosition(moonLight, 10, 20, -15);
        moonLight.castShadow = true;
        this.objects.push(moonLight);
    };

    #createAmbientLight = () => {
        const ambientLight = this.lighting.createAmbientLight(0x222244, 0.7);
        this.geometry.setPosition(ambientLight, 0, 0, 0);
        this.objects.push(ambientLight);
    };

    getObjects = () => {
        return this.objects;
    };
}