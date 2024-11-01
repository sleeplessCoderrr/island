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
        this.boatMaterial = this.materialLoader.createStandartMaterial({ 
            color: 0xffff99,
            opacity: 0.5,
            transparent: false 
        });
    }

    initialize = () => {
        this.#makeBoats(5);
        this.#animateBoats();
    }

    #makeBoats = (n_boat_total) => {
        for (let i = 0; i < n_boat_total; i++) {
            this.#createBoat();
        }
    }  

    #createBoat = () => {
        let position;
        let isValidPosition = false;

        while (!isValidPosition) {
            position = {
                x: Math.random() * 80 - 40,
                y: 20,
                z: Math.random() * 80 - 40
            };

            isValidPosition = this.objects.every(obj => {
                const distance = Math.sqrt(
                    Math.pow(obj.position.x - position.x, 2) +
                    Math.pow(obj.position.z - position.z, 2)
                );
                return distance > 5;
            });
        }

        const boatGeometry = this.geometry.createBox(
            1.5, 0.5, 3, 
            this.boatMaterial
        );
        this.geometry.setPosition(boatGeometry, position.x, position.y, position.z);
        this.geometry.setCastShadow(boatGeometry, true);
        this.objects.push(boatGeometry);        
    }

    #animateBoats = () => {
        const speed = 0.005;
        const time = performance.now() * 0.001;
    
        this.objects.forEach((boat) => {
            if (!boat.direction) {
                boat.direction = { x: Math.random() * 2 - 1, z: Math.random() * 2 - 1 };
            }

            boat.position.x += boat.direction.x * Math.sin(time + boat.id) * speed;
            boat.position.z += boat.direction.z * Math.cos(time + boat.id) * speed;
            boat.position.y = 0.6 + Math.sin((time + boat.id) * 2) * 0.2;
    
            if (boat.position.x > 20 || boat.position.x < -20) {
                boat.direction.x *= -1;
            }
            if (boat.position.z > 20 || boat.position.z < -20) {
                boat.direction.z *= -1;
            }
        });
    
        requestAnimationFrame(this.#animateBoats);
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