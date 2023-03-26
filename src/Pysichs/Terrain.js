const TerrainPhysics = {
    type: "box",
    size: [10, 0.5, 10], 
    pos: [0, 1, 0], // Colocar el piso justo debajo del origen (0, 0, 0)
    move: false, // El piso no se mueve, por lo que no necesita moverse en la simulación de física
    density: 1000,
    friction: 0.2,
    restitution: 0.2
}


export default TerrainPhysics