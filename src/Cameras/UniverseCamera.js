import * as THREE from 'three'


const UniversalCamera = () => {
    const Camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
    Camera.position.set(1, 4, 1);
    Camera.rotation.set(-0.5, 0, 0)
    return Camera
}

export default UniversalCamera();