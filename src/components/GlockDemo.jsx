import { Center, OrbitControls, useHelper } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three'

const GlockDemo = () => {
  let mtlURL = `/models/1-Glock19.mtl`
  let objURL = `/models/1-Glock19.obj`

  //1-AR15
  //1-Glock19
  //1-Remington870

  const materials = useLoader(MTLLoader, mtlURL)
  console.log(materials.materials)
  // let roseGold = { r: `${240 / 255}`, g: `${179 / 255}`, b: `${178 / 255}` }
  // let armorBlack = { r: `${20 / 255}`, g: `${20 / 255}`, b: `${20 / 255}` }
  // Rose Gold: H-327 187,131,122
  // Armor Black: H-190 62,58,55
  let roseGold = new THREE.Color('#f7bbba')
  let armorBlack = new THREE.Color('#1e181a')

  for (const key in materials.materials) {
    materials.materials[key].toneMapped = false
    materials.materials[key].color = armorBlack
    materials.materials[key].shininess = 20
  }
  if (materials.materials.Grip) materials.materials.Grip.color = roseGold
  if (materials.materials.Receiver) materials.materials.Receiver.color = roseGold
  if (materials.materials.Slide) materials.materials.Slide.color = roseGold

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
      <ambientLight intensity={2.5} />
      <pointLight position={[0, 2.6, 2]} decay={0} intensity={2.2} />
      <Suspense>
        <Center>
          <primitive object={obj} scale={2.2} position={[0, 1, 1]} rotation={[0, 0.46, 0.57]} />
        </Center>
      </Suspense>
      <OrbitControls />
    </>
  )
}

export default GlockDemo
