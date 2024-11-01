import * as THREE from "../../threejs/build/three.module.js";
import { Lighting, Material, Geometry } from "../utils/component.js";
import { GLTFLoader } from "../../threejs/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "../../threejs/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "../../threejs/examples/jsm/geometries/TextGeometry.js";

export class Rain {
    constructor(){
        this.lighting = new Lighting();
        this.geometry = new Geometry();
        this.objects = [];
        this.materialLoader = new Material();
        this.textureLoader = new THREE.TextureLoader();
        this.rainParticles = this.geometry.createGeometry();
        this.rainMaterial = this.materialLoader.createPointMaterial({
            color: 0xaaaaaa,
            size: 0.1,
            transparent: true,
            opacity: 0.6,
        });
    }

    initialize = () => {
        this.#createRain();
        
    }

    #createRain = () => {
        for(let i=0; i<5000; i++){
            const rainDrop = this.geometry.createVector3(
                Math.random() * 100 - 50,  
                Math.random() * 50,       
                Math.random() * 100 - 50  
            );
            rainDrop.velocity = 0;
            this.rainParticles.vertices.push(this.rainDrop);
        }

        const rain = this.geometry.createPoint(
            this.rainParticles,
            this.rainMaterial
        );
        this.objects.push(rain);
    }

    getObjects = () => {
        return this.objects;
    };
}