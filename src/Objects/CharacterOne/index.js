import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Crying from "./Crying.fbx";

import Walk from "../../Actors/Scarlett/Walking.fbx"
import scarlettStanding from "../../Actors/Scarlett/Standing.fbx";
import Jump from "../../Actors/Scarlett/Jumping.fbx";
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
    this.Loader(Jump, 'Jumping')

    this.Actor3D = undefined;
  }

  Init() {
    const Init = setInterval(() => {
      if (this.Pincels.length !== 0) {
        let InitAnimation = this.Pincels[this.CurrentAnimation];
        try {
          InitAnimation.play();
        } catch (e) {
          window.location.reload()
        }
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
      console.log(Name, Actor3D)
      let animations = Actor3D.animations;
      animations.map((i, k) => {
        if (i.duration > 0) {
          _this.Pincels = {
            ...this.Pincels,
            [`${Name}`]: _this.Mixer.clipAction(animations[k]),
          };
        }
      })

    });
  }

  Controls() {
    document.addEventListener("keydown", (e) => {
      let key = e.key
      let InitAnimation = this.Pincels[this.CurrentAnimation];
      switch (key) {
        case 'ArrowUp':
          let walk = this.Pincels['Walk'];
          InitAnimation.stop();
          walk.play()
          break
        case ' ':

          let Jumping = this.Pincels['Jumping'];

          InitAnimation.stop();
          Jumping.play()
          break
      }
    });

    document.addEventListener('keyup', (e) => {
      let key = e.key
      let InitAnimation = this.Pincels[this.CurrentAnimation];
      switch (key) {
        case 'ArrowUp':
          let walk = this.Pincels['Walk'];
          walk.stop()
          InitAnimation.play();
          break
        case ' ':
          let Jumping = this.Pincels['Jumping'];
          Jumping.stop()
          InitAnimation.play();
          break
      }
      console.log(e)
    })
  }

  GetObject() {
    return this.Actor3D;
  }

  GetMixer() {
    return this.Mixer;
  }
}

export default CharacterOne;
