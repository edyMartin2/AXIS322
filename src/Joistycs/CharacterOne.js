const JoistycCharacterOne =(objectPysics)=>{
    document.addEventListener('keydown', (event) => {
        const action = event.code
        console.log(action)
        switch(action){
            case 'ArrowRight':
                objectPysics.linearVelocity.set(1, 0, 0);
            break
            case 'ArrowLeft':
                objectPysics.linearVelocity.set(-1, 0, 0);
            break
            case 'ArrowUp':
                objectPysics.linearVelocity.set(0, 0, 1);
            break
            case 'ArrowDown':
                objectPysics.linearVelocity.set(0, 0, -1);
            break
            case 'Space':
                objectPysics.linearVelocity.set(0, 2, 0);
                break
        }
    })
}

export default JoistycCharacterOne;