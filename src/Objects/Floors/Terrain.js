import textureFloor from './textures/stone_tiles_02_diff_1k.jpg'
export default (THREE, scene) => {
    // Crear un objeto Three.js para el piso
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(textureFloor);
    //texture.repeat.set(20,20)
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5); // Repetir
    console.log(texture)
    var floorGeometry = new THREE.BoxGeometry(10, 0.5, 10);
    var floorMaterial = new THREE.MeshBasicMaterial({
        map: texture
    });
    var floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.position.set(0, 1, 0);
    scene.add(floorMesh);
} 