import { OrbitControls, Center } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three'


const NintendoGlockDemo = ({modelPath}) => {
  let mtlURL = `/models/1-${modelPath}.mtl`
  let objURL = `/models/1-${modelPath}.obj`
  const materials = useLoader(MTLLoader, mtlURL)
  // primary color: rgb 170, 167, 158
  // secondary color: rgb 219, 219, 207
  // tertiary color: rgb 224, 88, 61

  let primaryColor = new THREE.Color("#aaa79e")
  let secondaryColor = new THREE.Color("#dbdbcf")
  let tertiaryColor = new THREE.Color("#e0583d")

  console.log(materials.materials)
  for (const key in materials.materials) {
    materials.materials[key].toneMapped = false
    materials.materials[key].color = primaryColor
    materials.materials[key].shininess = 20
  }

  if(materials.materials.Trigger)
    materials.materials.Trigger.color = tertiaryColor
  if(materials.materials.Barrel)
    materials.materials.Barrel.color = tertiaryColor
  if(materials.materials['Trigger.Detail'])
    materials.materials['Trigger.Detail'].color = tertiaryColor
  if(materials.materials['Detail.Trigger'])
    materials.materials['Detail.Trigger'].color = tertiaryColor
  if(materials.materials['Slide.Lock'])
    materials.materials['Slide.Lock'].color = tertiaryColor
  if(materials.materials['Slide.Stop.Lever'])
    materials.materials['Slide.Stop.Lever'].color = tertiaryColor
  if(materials.materials['Receiver.Detail2'])
    materials.materials['Receiver.Detail2'].color = tertiaryColor
  if(materials.materials['Mag.Catch'])
    materials.materials['Mag.Catch'].color = tertiaryColor
  if(materials.materials['Recoil.Spring'])
    materials.materials['Recoil.Spring'].color = tertiaryColor
  if(materials.materials.Slide)
    materials.materials.Slide.color = secondaryColor

  const obj = useLoader(OBJLoader, objURL, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  // console.log(obj)
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={2.5} />
      <pointLight 
        position={[0, 5, 2]}
        decay={0}
        intensity={2.2}
      />
      <Suspense>
        <Center>
          <primitive 
            object={obj}
            scale={2.2}
            position={[0, 1, 1]}
            rotation={[0, 0.46, 0.57]}
          />
        </Center>
      </Suspense>
    </>
  )
}

export default NintendoGlockDemo
