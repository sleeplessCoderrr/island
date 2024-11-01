import * as THREE from "../../threejs/build/three.module.js";
import { GLTFLoader } from "../../threejs/examples/jsm/loaders/GLTFLoader.js";

export class GLTFAssetLoader {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.objects = [];
    }

    loadAsset(path, options = {}) {
        const { position = { x: 0, y: 0, z: 0 }, scale = { x: 1, y: 1, z: 1 }, rotation = { x: 0, y: 0, z: 0 }, onLoad = null, onError = null } = options;

        this.loader.load(
            path,
            (gltf) => {
                const model = gltf.scene;

                // Set position
                model.position.set(position.x, position.y, position.z);

                // Set scale
                model.scale.set(scale.x, scale.y, scale.z);

                // Set rotation
                model.rotation.set(rotation.x, rotation.y, rotation.z);

                // Add the model to the scene and store it
                this.scene.add(model);
                this.objects.push(model);

                // Call the onLoad callback if provided
                if (onLoad) onLoad(model);
            },
            undefined,
            (error) => {
                console.error(`Error loading GLTF asset from ${path}`, error);
                if (onError) onError(error);
            }
        );
    }

    getObjects() {
        return this.objects;
    }
}