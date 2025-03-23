import { OrbitControls, Center, PerspectiveCamera } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three'

const NintendoGlockDemo = () => {
  const mtlURL = `/models/1-Glock19.mtl`
  const objURL = `/models/1-Glock19.obj`
  const materials = useLoader(MTLLoader, mtlURL)
  // primary color: rgb 156, 152, 143
  // secondary color: rgb 219, 219, 207
  // tertiary color: rgb 224, 88, 61

  let primaryColor = new THREE.Color('#9c988f')
  let secondaryColor = new THREE.Color('#dbdbcf')
  let tertiaryColor = new THREE.Color('#e0583d')

  for (const key in materials.materials) {
    materials.materials[key].toneMapped = false
    materials.materials[key].color = primaryColor
    materials.materials[key].shininess = 20
  }

  if (materials.materials.Trigger) materials.materials.Trigger.color = tertiaryColor
  if (materials.materials.Barrel) materials.materials.Barrel.color = tertiaryColor
  if (materials.materials['Trigger.Detail'])
    materials.materials['Trigger.Detail'].color = tertiaryColor
  if (materials.materials['Detail.Trigger'])
    materials.materials['Detail.Trigger'].color = tertiaryColor
  if (materials.materials['Slide.Lock']) materials.materials['Slide.Lock'].color = tertiaryColor
  if (materials.materials['Slide.Stop.Lever'])
    materials.materials['Slide.Stop.Lever'].color = tertiaryColor
  if (materials.materials['Receiver.Detail2'])
    materials.materials['Receiver.Detail2'].color = tertiaryColor
  if (materials.materials['Mag.Catch']) materials.materials['Mag.Catch'].color = tertiaryColor
  if (materials.materials['Recoil.Spring'])
    materials.materials['Recoil.Spring'].color = tertiaryColor

  if (materials.materials.Slide) materials.materials.Slide.color = secondaryColor

  const obj = useLoader(OBJLoader, objURL, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
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
      <PerspectiveCamera makeDefault position={[0, 0, 6]}/>
      <OrbitControls />
      <ambientLight intensity={2.5} />
      <pointLight position={[5, 7.5, -0.75]} decay={0} intensity={2.2} />
      <Suspense>
        <Center>
          <primitive object={obj} scale={2.2} position={[0, 1, 1]} rotation={[-0.45, 0.75, 1]} />
        </Center>
      </Suspense>
    </>
  )
}

export default NintendoGlockDemo
