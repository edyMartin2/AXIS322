import { useEffect , useState} from "react";


const LevelOne = ({ THREE }) => {
    

    const [camera, setCamera] = useState(new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10))
    const [scene , setScene] = useState(new THREE.Scene())
    const [geometry, setGeometry] = useState(new THREE.BoxGeometry(0.2, 0.2, 0.2))
    const [material, setMaterial] = useState(new THREE.MeshNormalMaterial())
    const [mesh, setMesh] = useState(new THREE.Mesh(geometry, material))
    const [renderer, setRenderer] = useState(new THREE.WebGLRenderer({ antialias: true }))
    
    function animation(time) {

            mesh.rotation.x = time / 2000;
            mesh.rotation.y = time / 1000;


            renderer.render(scene, camera);
            // console.log("HOla}")
    }


    useEffect(() => {
        
        if(document.getElementById('x')){


            camera.position.z = 1;

            
            scene.add(mesh);
            var x = document.getElementById('x')
            // const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize( window.innerWidth, window.innerHeight  );
            renderer.setAnimationLoop(animation);
            
            // document.body.appendChild();
            // console.log(document.body)


            
            x.appendChild(renderer.domElement)
            console.log(renderer.domElement)
        }
    })

    
    //{'display: block; width: 1920px; height: 929px;'}
    return (<div id="x" style={{width: "100%", height:"100vh"}}></div>)
}

export default LevelOne;