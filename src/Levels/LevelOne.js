import { useEffect, useState } from "react";
import Terrain from "../Objects/Floors/Terrain";
import UniversalCamera from "../Cameras/UniverseCamera";
import { CubeObject, CharacterOne } from "../Objects";

import CharacterOnePysics from "../Pysichs/CharacterOnePysics";
import TerrainPhysics from "../Pysichs/TerrainPhysics";

import Load from "../Helpers/Load";
import JoistycCharacterOne from "../Joistycs/CharacterOne";

const LevelOne = ({ THREE, World }) => {
  const [status, setStatus] = useState(false);
  const [wind, setWind] = useState(false);
  const [addSceneCall, setAddSceneCall] = useState(false);

  const [scene, setScene] = useState(new THREE.Scene());
  const [geometry, setGeometry] = useState(
    new THREE.BoxGeometry(0.2, 0.2, 0.2)
  );

  const [material, setMaterial] = useState(new THREE.MeshNormalMaterial());
  const [mesh, setMesh] = useState(new THREE.Mesh(geometry, material));
  const [renderer, setRenderer] = useState(
    new THREE.WebGLRenderer({ antialias: true })
  );

  const [CharacterOnes, setCharacterOnes] = useState(undefined);
  const [CharacterOnePysic, setCharacterOnePysic] = useState(undefined);
  const [Terrains, setTerrains] = useState(undefined);
  const clock = new THREE.Clock();

  // animate 30 fps
  const animation = () => {
    let mixer = CharacterOnes.GetMixer();

    if (mixer !== undefined) {
      mixer.update(clock.getDelta());
    }

    let object3d = CharacterOnes.GetObject();
    if (object3d) {
      object3d.position.copy(CharacterOnePysic.getPosition());
      object3d.quaternion.copy(CharacterOnePysic.getQuaternion());
      scene.add(object3d);
    }
    World.play();
    World.step();
    renderer.render(scene, UniversalCamera);
  };

  //init point to game
  const Init = () => {
    Terrain(THREE, scene);

    var placeHold = document.getElementById("placeHold");
    placeHold.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // llamamos a las funciones necesarias
    AddOnWord();

    const color = 0xffffff;
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // CharacterOnes.load()

    renderer.setAnimationLoop(animation);
  };

  // add at word
  const AddOnWord = () => {
    let addPhysicsCharacterOne = World.add(CharacterOnePysics);
    let TerrainPhysic = World.add(TerrainPhysics);
    setCharacterOnePysic(addPhysicsCharacterOne);
    setTerrains(TerrainPhysic);
  };

  const AddScene = () => {
    setCharacterOnes(new CharacterOne(scene));
  };

  // this is a resource load
  const ResourceLoad = () => {
    AddOnWord();
    var statused = false;
    if (!addSceneCall) {
      AddScene();
      setAddSceneCall(true);
    }
    if (
      CharacterOnes !== undefined &&
      CharacterOnePysic !== undefined &&
      Terrains !== undefined &&
      scene
    ) {
      JoistycCharacterOne(CharacterOnePysic);
      statused = true;
    }

    return statused;
  };

  useEffect(() => {
    if (!status || !wind) {
      let ResourceLoadStatus = ResourceLoad();
      setStatus(ResourceLoadStatus);

      if (document.getElementById("placeHold")) {
        Init();
        setWind(true);
      }
    }
  });

  return (
    <>
      {status && (
        <div id="placeHold" style={{ width: "100%", height: "100vh" }}></div>
      )}

      {!status && <Load></Load>}
    </>
  );
};

export default LevelOne;
