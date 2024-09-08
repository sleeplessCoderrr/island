import { Builder } from "./script/utils/builder.js";
import { Island } from "./script/island/Island.js";
import { SkyBox } from "./script/skybox/SkyBox.js";
import { Geometry } from "./script/utils/component.js";
import { GLTFLoader } from "./threejs/examples/jsm/loaders/GLTFLoader.js";

class IsVDland {
  constructor() {
    //Object
    this.builder = new Builder();
    this.island = new Island();
    this.skybox = new SkyBox(100, 100, 100);
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
    this.controls.autoRotate = true;
  }

  setupCamera = () => {
    this.builder.setCameraPosition(this.cameraOrbit, 0, 35, 35);
    this.builder.setCameraLook(this.cameraOrbit, 0, 0, 0);
  };

  fill = () => {
    document.body.appendChild(this.renderer.domElement);
    this.island.makeIsland();
    this.objects = this.island.getObjects();

    const skyboxGeometry = this.skybox.getBoxGeometry();
    const skybox = this.skybox.getSkyBox();
    // this.builder.addScene(this.scene, skyboxGeometry, skybox);

    // this.load("./public/assets/Model/scene.gltf", 40, 40, 40);
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
    this.renderer.setClearColor(0xece8dd);
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

const main = new IsVDland();
window.onload = () => {
  main.setupCamera();
  main.fill();
  main.render();
};

window.onresize = () => {
  main.updateAllCamera();
  main.setRenderer(window.innerWidth, window.innerHeight);
};
