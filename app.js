import { Builder } from "./script/utils/builder.js";
import { Island } from "./script/model/Island.js";
import { SkyBox } from "./script/skybox/SkyBox.js";
import { Geometry } from "./script/utils/component.js";
import { GLTFLoader } from "./threejs/examples/jsm/loaders/GLTFLoader.js";
import { SeaWaves } from "./script/model/SeaWave.js";
import { Light } from "./script/model/Light.js";

class IsVDland {
  constructor() {
    //Model
    this.island = new Island();
    this.wave = new SeaWaves();
    this.lighting = new Light();
    this.skybox = new SkyBox(100, 100, 100);

    //Helper
    this.builder = new Builder();
    this.geometry = new Geometry();

    //All object in Canvas
    this.objects = [];
    this.scene = this.builder.createScene();
 
    //Camera things
    this.cameras = [];
    this.cameraOrbit = this.builder.createCamera(75, 1000);
    this.cameras.push(this.cameraOrbit);

    this.renderer = this.builder.createRenderer();
    this.controls = this.builder.createOrbitControls(
      this.cameraOrbit,
      this.renderer.domElement
    );
    this.controls.autoRotate = false;
  }

  setupCamera = () => {
    this.builder.setCameraPosition(this.cameraOrbit, 0, 2, 60);
    this.builder.setCameraLook(this.cameraOrbit, 0, 0, 0);
  };

  fill = () => {
    document.body.appendChild(this.renderer.domElement);

    this.island.makeIsland();
    this.wave.makeWaves();
    this.lighting.makeLighting();

    this.objects = this.objects.concat(this.island.getObjects());
    this.objects = this.objects.concat(this.wave.getObjects());
    this.objects = this.objects.concat(this.lighting.getObjects());

    const skyboxGeometry = this.skybox.getBoxGeometry();
    const skybox = this.skybox.getSkyBox();

    this.objects.forEach((object) => {
      this.scene.add(object);
    });
  };

  load = (path, height, width, depth) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(path, (gltf) => {
      const model = gltf.scene;
      model.scale.set(height, width, depth);
      this.scene.add(model);
    });
  };

  render = () => {
    requestAnimationFrame(this.render);
    this.controls.update();
    this.renderer.setClearColor(0x000022);
    this.renderer.render(this.scene, this.cameraOrbit);
  };

  updateAllCamera = () => {
    this.cameras.forEach((camera) => {
      this.setCamera(camera, window.innerWidth, window.innerHeight);
    });
  };

  setCamera = (camera, width, height) => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  setRenderer = (width, height) => {
    this.renderer.setSize(width, height);
  };
}

const app = new IsVDland();
window.onload = () => {
  app.setupCamera();
  app.fill();
  app.render();
};

window.onresize = () => {
  app.updateAllCamera();
  app.setRenderer(window.innerWidth, window.innerHeight);
};
