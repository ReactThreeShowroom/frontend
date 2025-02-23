import { Center, OrbitControls, useHelper } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'
import { useControls } from "leva"
import * as THREE from 'three'


const GlockDemo = ({ modelPath }) => {
  let mtlURL = `/models/1-${modelPath}.mtl`
  let objURL = `/models/1-${modelPath}.obj`

  //1-AR15
  //1-Glock19
  //1-Remington870

  const pointLight = useRef();
  useHelper(pointLight, THREE.PointLightHelper, 1,'cyan');
  

  const {intensity, position} = useControls('Light', {
      intensity: {
        value: 2.2,
        min: 0,
        max: 10,
        label: 'Point Light Intensity',
        step: 0.1,
      },
      position: {
        label: 'Point Light Position',
        value: { x: 0.0, y: 2.6, z: 2 },
        min: -20,
        max: 20,
        step: 0.1,
      },
    })

    const {glockRotation} = useControls("glock", {
      glockRotation: {
        value: {x: 0, y: 0.46, z: 0.79},
        label: 'Glock Rotation',
        min: -Math.PI,
        max: Math.PI,
        step: Math.PI / 180,
      },
    })
  
  

  const materials = useLoader(MTLLoader, mtlURL)
  console.log(materials.materials)
  // let roseGold = { r: `${240 / 255}`, g: `${179 / 255}`, b: `${178 / 255}` }
  // let armorBlack = { r: `${20 / 255}`, g: `${20 / 255}`, b: `${20 / 255}` }
  let roseGold = new THREE.Color(0xf5c0bc)
  let armorBlack = new THREE.Color(0x1e181a)
  // console.log(roseGold.convertLinearToSRGB())
  for (const key in materials.materials) {
    // Rose Gold: H-327 187,131,122
    // Armor Black: H-190 62,58,55

    materials.materials[key].toneMapped = false
    materials.materials[key].color = armorBlack
    materials.materials[key].shininess = 20
  }
  if (materials.materials.Grip)
    materials.materials.Grip.color = roseGold
  if (materials.materials.Receiver)
    materials.materials.Receiver.color = roseGold
  if (materials.materials.Slide)
    materials.materials.Slide.color = roseGold

  const obj = useLoader(OBJLoader, objURL, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
    console.log(loader)
  })

  console.log(obj)

  return (
      <>
        {/* <color attach="background" args={['#0f0f0f']} /> */}
        <ambientLight intensity={2.5} />
        <pointLight 
          ref={pointLight} 
          position={[position.x, position.y, position.z]} 
          decay={0} 
          intensity={intensity} 
        />
        <Suspense>
          <Center>
            <primitive 
              object={obj} 
              scale={2.2} 
              position={[0, 1, 1]}
              rotation={[glockRotation.x, glockRotation.y, glockRotation.z]}
            />
          </Center>
        </Suspense>
        <OrbitControls />
      </>
  )
}

export default GlockDemo
