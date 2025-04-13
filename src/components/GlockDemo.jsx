import { Center, OrbitControls, PerspectiveCamera, useHelper } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three'

const GlockDemo = () => {
  let mtlURL = `/models/1-Glock19.mtl`
  let objURL = `/models/1-Glock19.obj`

  const materials = useLoader(MTLLoader, mtlURL)
  console.log(materials.materials)
  let bazookaPink = new THREE.Color('#f7bbba')
  let armorBlack = new THREE.Color('#1e181a')

  for (const key in materials.materials) {
    materials.materials[key].toneMapped = false
    materials.materials[key].color = armorBlack
    materials.materials[key].shininess = 20
  }
  if (materials.materials.Grip) materials.materials.Grip.color = bazookaPink
  if (materials.materials.Receiver) materials.materials.Receiver.color = bazookaPink
  if (materials.materials.Slide) materials.materials.Slide.color = bazookaPink

  const obj = useLoader(OBJLoader, objURL, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
    console.log(loader)
  })

  useEffect(() => {
    return () => {
      // Clear cache when component unmounts
      useLoader.clear(MTLLoader, mtlURL)
      useLoader.clear(OBJLoader, objURL)
    }
  }, [])

  return (
    <>
      <PerspectiveCamera makeDefault position={[1, 0, 5]} />
      <ambientLight intensity={2.5} />
      <pointLight position={[0, 2.6, 2]} decay={0} intensity={2.2} />
      <Suspense>
        <Center>
          <primitive object={obj} scale={1.8} position={[0, 1, 1]} rotation={[0, 0.46, 0.57]} />
        </Center>
      </Suspense>
      <OrbitControls />
    </>
  )
}

export default GlockDemo
