import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import edy from "./Walking.fbx";
import * as THREE from "three";

class CharacterOne {
  scene;

  constructor(scene) {
    this.scene = scene;
    this.loader = new FBXLoader();
    this.mixer = undefined;
    this.mxPlay = undefined;
    this.animation = undefined;
    this.object3d = undefined;
    this.anim = 0;
  }

  load() {
    let ctx = this;
    this.loader.load(
      edy,
      function (object3d) {
        ctx.object3d = object3d;
        ctx.object3d.scale.multiplyScalar(0.009);
        ctx.object3d.position.set(1, 2, 0);

        console.log("Hola mundo",object3d);

        ctx.mixer = new THREE.AnimationMixer(ctx.object3d);
        ctx.animation = ctx.object3d.animations[ctx.anim];

        ctx.mxPlay = ctx.mixer.clipAction(ctx.animation);
        ctx.mxPlay.repetitions = false
        ctx.mxPlay.play();
        console.log(ctx.mxPlay)

        //this.scene.add(object3d);
        ctx.controls();
      },
      function (load) {
        console.log("OnLoadObject", load);
      },
      function (e) {
        console.log("OnErrorLoad", e);
      }
    );
  }

  getMixer() {
    return this.mixer;
  }

  controls() {
    document.addEventListener("keydown", (event) => {
      var action = event.key;
      switch (action) {
        case " ":
          this.mxPlay.stop();
          break;
        case "p":
          this.mxPlay.play()
          console.log("Hola");
          break;
        default:
          break;
      }
    });
  }

  Object() {
    return this.object3d;
  }
}

/*
const CharacterOne = async(scene, THREE) => {
  let loader = new FBXLoader();
  var mixer ;

  await loader.load(
    edy,
    function (object3d) {
      console.log("loded", object3d);
      object3d.scale.multiplyScalar(0.01);
      object3d.position.set(1, 2, 0);

      mixer = new THREE.AnimationMixer(object3d);
      var animation = object3d.animations[1];

      var mxPlay = mixer.clipAction(animation);
      mxPlay.play();
      
      //

      object3d.traverse((child) => {
        child.castShadow = true;
      });
      scene.add(object3d);
    },
    function (load) {
      console.log("OnLoadObject", load);
    },
    function (e) {
      console.log("OnErrorLoad", e);
    }
  );

  return {
    mixer
  }
};
*/

export default CharacterOne;
