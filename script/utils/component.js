import * as THREE from "../../threejs/build/three.module.js ";

export class Lighting {
  constructor() {}

  createAmbientLight = (color, intensity) => {
    return new THREE.AmbientLight(color, intensity);
  };

  createDirectionalLight = (color, intensity) => {
    return new THREE.DirectionalLight(color, intensity);
  };

  createSpotLight = (color, intensity, distance, angle) => {
    return new THREE.SpotLight(color, intensity, distance, angle);
  };

  createPointLight = (color, intensity, distance) => {
    return new THREE.PointLight(color, intensity, distance);
  };
}

export class Material {
  constructor() {}

  createMeshBasicMaterial = (settings) => {
    return new THREE.MeshBasicMaterial(settings);
  };

  createStandartMaterial = (settings) => {
    return new THREE.MeshStandardMaterial(settings);
  };

  createLambertMaterial = (settings) => {
    return new THREE.MeshLambertMaterial(settings);
  };

  createPhongMaterial = (settings) => {
    return new THREE.MeshPhongMaterial(settings);
  };
}

export class Geometry {
  constructor() {}

  createBox = (width, height, depth, material) => {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    return new THREE.Mesh(geometry, material);
  };

  createCone = (radius, height, radialSegments, material) => {
    const geometry = new THREE.ConeGeometry(radius, height, radialSegments);
    return new THREE.Mesh(geometry, material);
  };

  createSphere = (radius, material) => {
    const geometry = new THREE.SphereGeometry(radius);
    return new THREE.Mesh(geometry, material);
  };

  createCylinder = (radiusTop, radiusBottom, height, material) => {
    const geometry = new THREE.CylinderGeometry(
      radiusTop,
      radiusBottom,
      height
    );
    return new THREE.Mesh(geometry, material);
  };

  createPolyHedron = (verticesOfCube, indicesOfFaces, material) => {
    const geometry = new THREE.PolyhedronGeometry(verticesOfCube, indicesOfFaces, 6, 2);
    return new THREE.Mesh(geometry, material);
  };
  
  setPosition = (instance, x, y, z) => {
    instance.position.set(x, y, z);
  };

  setRotation = (instance, rotation) => {
    instance.rotation.x = rotation;
  };
}

