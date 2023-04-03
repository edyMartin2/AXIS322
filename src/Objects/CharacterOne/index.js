import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Crying from "./Crying.fbx";

import Walk from "../../Actors/Scarlett/Standing.fbx"
import scarlettStanding from "../../Actors/Scarlett/Standing.fbx";
import * as THREE from "three";

class CharacterOne {
  scene;

  constructor(scene) {
    this.Scene = scene;
    this.FBXLoader = new FBXLoader();
    this.CurrentAnimation = "Standing";
    this.Mixer = undefined;
    this.Pincels = [];

    this.Loader(scarlettStanding, 'Standing');
    this.Loader(Crying, 'Crying')
	this.Loader(Walk, 'Walk')
    this.Actor3D = undefined;
  }

  Init() {
    const Init = setInterval(() => {
      if (this.Pincels.length !== 0) {
        let InitAnimation = this.Pincels[this.CurrentAnimation];
        InitAnimation.play();
        this.Controls();
        clearInterval(Init);
      }
    }, 100);
  }

  /**
   * { Actor } 3DObject [FBX]
   * { Name } Nombre de la animacion
   */
  Loader(Object3D, Name) {
    let _this = this;
    this.FBXLoader.load(Object3D, (Actor3D) => {
      Actor3D.position.set(0, 0, 0);
      Actor3D.scale.multiplyScalar(0.009);
      //agregamos el primer muñequito xd
      if (_this.Actor3D === undefined) {
        _this.Actor3D = Actor3D;
        console.log("se añade el primero", Date.now());
        _this.Mixer = new THREE.AnimationMixer(_this.Actor3D);
      }
      let animations = Actor3D.animations;

      _this.Pincels = {
        ...this.Pincels,
        [`${Name}`]: _this.Mixer.clipAction(animations[1]),
      };
    });
  }

  Controls() {
    document.addEventListener("keydown", (e) => {
      console.log(this.Pincels);
        // let InitAnimation = this.Pincels[this.CurrentAnimation];
        // InitAnimation.stop();

        // let next = this.Pincels['Crying'];
        // next.play();
    });
  }

  GetObject() {
    return this.Actor3D;
  }

  GetMixer() {
    return this.Mixer;
  }
}

export default CharacterOne;
