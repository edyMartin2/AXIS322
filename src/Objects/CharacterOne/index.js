import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Walker from "./CharacterOne.fbx";
import Crying from "./Crying.fbx";
import * as THREE from "three";

class CharacterOne {
  scene;

  constructor(scene) {
    console.log("LLamamos a character one", Date.now());
    this.scene = scene;
    this.loader = new FBXLoader();
    this.current = "Walk";
    /*
    this.mixer = undefined;
    this.mxPlay = undefined;
    this.animation = undefined;
    this.object3d = undefined;
    this.anim = 1;
    this.pysics = undefined;

    this.animStop = undefined;
    //cargamos las animaciones completas
    this.walker();
    document.addEventListener("keydown", () => {
      if (this.animStop !== undefined) {
        this.animate(this.animStop);
      }
    });
    */

    //this is for loader
    this.Animations = undefined;
    this.Loader(Walker, "Walk");
    this.Loader(Crying, "Crying");
    this.Play();
  }

  /**
   * { Actor } 3DObject [FBX]
   */
  Loader(Object3D, Name) {
    let _this = this;
    let Actor3D = undefined;

    this.loader.load(
      Object3D,

      (Actor) => {
        // console.log("le daremos este nombre ", x)
        Actor3D = Actor;
        Actor3D.scale.multiplyScalar(0.009);
        Actor3D.position.set(0, 0, 0);

        _this.Animations = {
          ..._this.Animations,
          [`${Name}`]: {
            Mixer: new THREE.AnimationMixer(Actor3D),
            Animations: Actor3D.animations,
            Object3D: Actor3D,
          },
        };
      }
    );

    return Actor3D;
  }

  Play() {
    let Checker = setInterval(() => {
      if (this.Animations !== undefined) {
        let x = this.scene.add(this.Animations[this.current].Object3D);
        if (x) {
          clearInterval(Checker);
          this.Animation();
        }
      } else {
        console.log("aun no se carga esperando");
      }
    }, 100);
  }

  GetMixer() {
    if (this.Animations !== undefined) {
      return this.Animations[this.current].Mixer;
    }
  }

  GetObject() {
    if (this.Animations !== undefined) {
      return this.Animations[this.current].Object3D;
    }
  }

  Animation() {
    if (this.Animations !== undefined) {
      let currentPerson = this.Animations[this.current];
      let currentMixer = currentPerson.Mixer;
      let animation = currentPerson.Animations[1];
      let clipAnimation = currentMixer.clipAction(animation);
      clipAnimation.play();
    }
  }

  // load() {
  //   let ctx = this;
  //   this.loader.load(
  //     stopping,
  //     function (object3d) {
  //       ctx.object3d = object3d;
  //       ctx.object3d.scale.multiplyScalar(0.009);
  //       ctx.object3d.position.set(0, 0, 0);

  //       console.log("Hola mundo objecto 3d -->", object3d);

  //       ctx.mixer = new THREE.AnimationMixer(ctx.object3d);
  //       ctx.animation = ctx.object3d.animations[ctx.anim];

  //       ctx.mxPlay = ctx.mixer.clipAction(ctx.animation);
  //       ctx.mxPlay.play();
  //       console.log(ctx.mxPlay);

  //       //this.scene.add(object3d);
  //     },
  //     function (load) {},
  //     function (e) {}
  //   );
  // }

  // walker() {
  //   let ctx = this;
  //   this.loader.load(
  //     walker,
  //     function (object3d) {
  //       ctx.animStop = object3d;
  //       ctx.animStop.scale.multiplyScalar(0.009);
  //     },
  //     function (load) {},
  //     function (e) {}
  //   );
  // }

  // animate(animation3D) {
  //   this.mixer = new THREE.AnimationMixer(animation3D);
  //   this.animation = animation3D.animations[1];

  //   this.mxPlay = this.mixer.clipAction(this.animation);
  //   this.mxPlay.play();
  // }

  // getMixer() {
  //   return this.mixer;
  // }

  // Object() {
  //   return this.object3d;
  // }

  // mPlay() {
  //   return this.mxPlay;
  // }
}

export default CharacterOne;
