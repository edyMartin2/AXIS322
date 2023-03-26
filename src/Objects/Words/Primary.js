import * as OIMO from 'oimo'

const Primary = ()=>{
    return new OIMO.World({
        timestep: 1 / 100,
        iterations: 8,
        broadphase: 2,
        worldscale: 1,
        random: true,
        info: false
    })
}

export default Primary