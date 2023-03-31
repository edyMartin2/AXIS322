const CharacterOnePysics = {
    type: 'box',
    size: [1, 1, 1],
    pos: [-2, 5, -2], // Colocar el objeto 10 unidades por encima del piso
    move: true, // El objeto debe moverse en la simulación de física
    density: 1,
    friction: 0.2,
    restitution: 0.2
}

export default CharacterOnePysics