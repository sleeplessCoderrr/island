import { Builder } from "./script/utils/builder.js";
import { Island } from "./script/island/Island.js";

class IsVDland {
  constructor() {
    this.builder = new Builder();
    this.island = new Island();

    this.objects = [];
    this.scene = this.builder.createScene();

    this.cameras = [];
    this.Camera1 = this.builder.createCamera(75, 1000);
    this.renderer = this.builder.createRenderer();
    this.cameras.push(this.Camera1);

    this.controls = this.builder.createOrbitControls(
      this.Camera1,
      this.renderer.domElement
    );
    // this.controls.autoRotate = true;
  }

  setupCamera = () => {
    this.builder.setCameraPosition(this.Camera1, 0, 5, 5);
    this.builder.setCameraLook(this.Camera1, 0, 0, 0);
  };

  fill = () => {
    document.body.appendChild(this.renderer.domElement);
    this.island.makeIsland();
    this.objects = this.island.getObjects();
    this.objects.forEach((object) => {
      this.scene.add(object);
    });
  };

  render = () => {
    requestAnimationFrame(this.render);
    this.controls.update();
    this.renderer.setClearColor(0xffffff);
    this.renderer.render(this.scene, this.Camera1);
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
