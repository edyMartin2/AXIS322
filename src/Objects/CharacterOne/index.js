import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Walker from "./CharacterOne.fbx";
import Crying from "./Crying.fbx";
import * as THREE from "three";

class CharacterOne {
  scene;

  constructor(scene) {
    this.scene = scene;
    this.loader = new FBXLoader();
    this.current = "Crying";
    this.Animations = undefined;

    this.Loader(Crying, "Crying");
    this.Loader(Walker, "Walk");
    this.Play();
    this.Controls()
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

  GetAnimations() {
    return this.Animations
  }

  Controls() {
    document.addEventListener('keydown', (event) => {
      const action = event.code
      console.log(action)
      switch (action) {
        case 'ArrowRight':
          console.log(this.Animations)
          this.scene.remove(this.Animations[this.current].Object3D)
          //this.current = 'Walk'
          break
      }
    })
  }
}

export default CharacterOne;
