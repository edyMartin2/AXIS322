
const CubeObject = (THREE, scene, CubePhysics, world) => {
    var move = 0
    let pysics = CubePhysics
    var boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    var boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0034 });
    var word_add = world.add(pysics);
    let boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.set(0, 0, 0)
    //GamePad(boxMesh)
    scene.add(boxMesh);


    document.addEventListener('keydown', (event) => {
        var action = event.key;
        move += 10
        console.log(word_add)
        switch (action) {
            case 'ArrowRight':
                word_add.linearVelocity.set(2, 0, 0);
                break;
            case 'ArrowLeft':

                word_add.linearVelocity.set(- 2, 0, 0);
                break
            case 'ArrowUp':
                word_add.linearVelocity.set(0, 0, - 2);

                break
            case 'ArrowDown':
                word_add.linearVelocity.set(0, 0, 2);
                break

        }

        // camera.position.set(word_add.position.x,3,parseFloat(word_add.position.z)+2.5)
    })

    return {
        boxMesh: boxMesh,
        word_add: word_add
    }
}

export default CubeObject;
