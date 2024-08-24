import * as THREE from "../../threejs/build/three.module.js ";

class Lighting {
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

class Material {
  constructor() {}

  createStandartMaterial = (
    color,
    roughness,
    metalness,
    isWireframe,
    isFog
  ) => {
    return new THREE.MeshStandardMaterial({
      color: color,
      roughness: roughness,
      metalness: metalness,
      wireframe: isWireframe,
      fog: isFog,
    });
  };

  createLambertMaterial = (color, isWireframe, isFog) => {
    return new THREE.MeshLambertMaterial({
      color: color,
      wireframe: isWireframe,
      fog: isFog,
    });
  };

  createPhongMaterial = (color, isWireframe, shininess) => {
    return new THREE.MeshPhongMaterial({
      color: color,
      wireframe: isWireframe,
      shininess: shininess,
    });
  };
}

class Geometry {
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

  setPosition = (geometry, x, y, z) => {
    geometry.position.set(x, y, z);
  };
}

export { Lighting, Material, Geometry };
