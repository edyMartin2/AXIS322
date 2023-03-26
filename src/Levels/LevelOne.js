import { useEffect, useState } from "react";
import Terrain from "../Objects/Floors/Terrain";
import UniversalCamera from "../Cameras/UniverseCamera";
import TerrainPhysics from "../Pysichs/Terrain";
import { CubeObject, CharacterOne} from "../Objects";
import CubePhysics from "../Pysichs/Cube";


const LevelOne = ({ THREE, World }) => {


    //const [camera, setCamera] = useState(new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10))
    const [scene, setScene] = useState(new THREE.Scene())
    const [geometry, setGeometry] = useState(new THREE.BoxGeometry(0.2, 0.2, 0.2))
    const [material, setMaterial] = useState(new THREE.MeshNormalMaterial())
    const [mesh, setMesh] = useState(new THREE.Mesh(geometry, material))
    const [renderer, setRenderer] = useState(new THREE.WebGLRenderer({ antialias: true }))
    const [world, setWorld] = useState(World())

    const [cubeController] = useState(CubeObject(THREE, scene, CubePhysics, world))

    const animation = () => {
        if (cubeController !== undefined) {
            cubeController.boxMesh.position.copy(cubeController.word_add.getPosition());
            cubeController.boxMesh.quaternion.copy(cubeController.word_add.getQuaternion());
            UniversalCamera.position.set(parseFloat(cubeController.word_add.position.x),4,parseFloat(cubeController.word_add.position.z)+2)
        }
        renderer.render(scene, UniversalCamera);
        world.play()
        world.step();


    }

    const Init = () => {
        Terrain(THREE, scene)

        var placeHold = document.getElementById('placeHold')
        placeHold.appendChild(renderer.domElement)
        renderer.setSize(window.innerWidth, window.innerHeight);
        world.add(TerrainPhysics)
        //var { boxMeshx, word_addx } = CubeObject(THREE, scene, CubePhysics, world)
        CharacterOne(scene)
        renderer.setAnimationLoop(animation);
    }


    useEffect(() => {
        //
        if (document.getElementById('placeHold')) {
            Init()
        }
        //console.log("holass", cubeController)
    })


    //{'display: block; width: 1920px; height: 929px;'}
    return (<div id="placeHold" style={{ width: "100%", height: "100vh" }}></div>)
}

export default LevelOne