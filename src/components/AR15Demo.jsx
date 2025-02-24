import { Center, OrbitControls, useHelper } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'
// import { useControls } from "leva"
import * as THREE from 'three'

const AR15Demo = ({modelPath}) => {
  const mtlURL = `/models/1-${modelPath}.mtl`
  const objURL = `/models/1-${modelPath}.obj`

  const materials = useLoader(MTLLoader, mtlURL)
  // primary color: 
  // secondary color: 11, 11, 11

  const armorBlack = new THREE.Color("#0b0b0b")

  for (const key in materials.materials) {

    materials.materials[key].toneMapped = false
    materials.materials[key].color = armorBlack
    materials.materials[key].shininess = 20
  }
  console.log(materials.materials)
//   if(materials.materials.)

  const obj = useLoader(OBJLoader, objURL, (loader) => {
    materials.preload();
    loader.setMaterials(materials)
  })

  

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={2.5} />
      <pointLight position={[0, 2.6, 2]} decay={0} intensity={2.2} />
      <Suspense fallback={null}>
        <Center>
          <primitive 
            object={obj} 
            scale={0.75}
          />
        </Center>
      </Suspense>
      
    </>
  )
}

export default AR15Demo
