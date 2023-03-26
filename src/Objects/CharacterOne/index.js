import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import edy from './edy.fbx'
const CharacterOne = (scene) => {
    let loader = new FBXLoader()
    console.log(scene, './Breathing.fbx', loader.load, edy)


    try {
        loader.load(edy,
            function (object3d) {
                console.log(object3d)
                object3d.scale.multiplyScalar(0.1); 
                scene.add(object3d)
            },
            function (load) {
                console.log('HOLA', load)
            },
            function (e) {
                console.log('HOLA', e)
            }

        );

    } catch (e) {
        console.log('Hola', e)
    }

}

export default CharacterOne