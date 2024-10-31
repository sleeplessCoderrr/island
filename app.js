import * as THREE from './threejs/build/three.module.js';
import { GLTFLoader } from './threejs/examples/jsm/loaders/GLTFLoader.js';
import { TextGeometry } from './threejs/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from './threejs/examples/jsm/loaders/FontLoader.js';
import { OrbitControls } from './threejs/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000022); // Night theme

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera1.aspect = window.innerWidth / window.innerHeight;
    camera2.aspect = window.innerWidth / window.innerHeight;
    camera1.updateProjectionMatrix();
    camera2.updateProjectionMatrix();
});

// Two Cameras
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera1.position.set(15, 15, 30);
camera2.position.set(-15, 15, 30);
let activeCamera = camera1;

const controls = new OrbitControls(camera1, renderer.domElement);
controls.enableDamping = true;

// Moonlight and ambient light for night effect
const ambientLight = new THREE.AmbientLight(0x222244, 0.7);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight(0xaaaaaa, 0.6);
moonLight.position.set(10, 20, -15);
moonLight.castShadow = true;
scene.add(moonLight);

// Sea
const seaGeometry = new THREE.PlaneGeometry(200, 200, 50, 50);
const seaMaterial = new THREE.MeshStandardMaterial({ color: 0x1e90ff, transparent: true, opacity: 0.5 });
const sea = new THREE.Mesh(seaGeometry, seaMaterial);
sea.rotation.x = -Math.PI / 2;
sea.position.y = 0.5;
sea.receiveShadow = true;
scene.add(sea);

function animateSea() {
    const positionAttribute = sea.geometry.attributes.position;
    const vertexCount = positionAttribute.count;
    for (let i = 0; i < vertexCount; i++) {
        const newZ = Math.sin(i + performance.now() * 0.002) * 0.5;
        positionAttribute.setZ(i, newZ);
    }
    positionAttribute.needsUpdate = true;
}

// Generate Multiple Islands
const islands = [];
function createIsland(x, z) {
    const islandGeometry = new THREE.ConeGeometry(5, 3, 8);
    const islandMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const island = new THREE.Mesh(islandGeometry, islandMaterial);
    island.position.set(x, 1.5, z);
    island.rotation.x = Math.PI;
    island.castShadow = true;
    island.receiveShadow = true;
    scene.add(island);
    islands.push(island);
}

// Create multiple islands at different positions
for (let i = 0; i < 5; i++) {
    const x = Math.random() * 40 - 20;
    const z = Math.random() * 40 - 20;
    createIsland(x, z);
}

// Detailed Lighthouse with moving light
const lighthouseGeometry = new THREE.CylinderGeometry(0.6, 0.9, 6, 16);
const lighthouseMaterial = new THREE.MeshStandardMaterial({ color: 0xffe4c4 });
const lighthouse = new THREE.Mesh(lighthouseGeometry, lighthouseMaterial);
lighthouse.position.set(2, 4, 2);
lighthouse.castShadow = true;
scene.add(lighthouse);

const lightConeGeometry = new THREE.ConeGeometry(1.5, 3, 8, 1, true);
const lightConeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff99, opacity: 0.5, transparent: true });
const lightCone = new THREE.Mesh(lightConeGeometry, lightConeMaterial);
lightCone.position.set(2, 6, 2);
lightCone.rotation.x = -Math.PI / 4;
scene.add(lightCone);

function rotateLighthouseLight() {
    lightCone.rotation.y += 0.02;
}

// Boat with random movement
const boatGeometry = new THREE.BoxGeometry(1.5, 0.5, 3);
const boatMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
const boat = new THREE.Mesh(boatGeometry, boatMaterial);
boat.position.set(-5, 0.6, -5);
boat.castShadow = true;
scene.add(boat);

function animateBoat() {
    const speed = 0.02;
    const directionX = Math.random() * speed - speed / 2;
    const directionZ = Math.random() * speed - speed / 2;
    boat.position.x += directionX;
    boat.position.z += directionZ;
    boat.position.y = 0.6 + Math.sin(performance.now() * 0.003) * 0.2;

    // Keep boat within certain bounds
    if (boat.position.x > 20 || boat.position.x < -20) boat.position.x *= -1;
    if (boat.position.z > 20 || boat.position.z < -20) boat.position.z *= -1;
}

// 3D Text (Island Name)
const fontLoader = new FontLoader();
fontLoader.load('path/to/font.json', (font) => {
    const textGeometry = new TextGeometry('Island Paradise', {
        font: font,
        size: 1.5,
        height: 0.2,
    });
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-10, 5, -10);
    textMesh.castShadow = true;
    scene.add(textMesh);
});

// Raycasting interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, activeCamera);
    const intersects = raycaster.intersectObjects([...islands, boat, lighthouse]);
    intersects.forEach((intersect) => {
        intersect.object.material.color.set(0xff4500);
    });
});

// Keyboard interaction to switch camera
window.addEventListener('keydown', (event) => {
    if (event.key === 'c') {
        activeCamera = activeCamera === camera1 ? camera2 : camera1;
    }
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    animateSea();
    animateBoat();
    rotateLighthouseLight();
    controls.update();
    renderer.render(scene, activeCamera);
}

animate();