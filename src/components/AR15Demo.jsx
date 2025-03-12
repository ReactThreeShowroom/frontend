import { Center, OrbitControls } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three'

const AR15Demo = () => {
  const mtlURL = `/models/1-AR15.mtl`
  const objURL = `/models/1-AR15.obj`

  const materials = useLoader(MTLLoader, mtlURL)
  // primary color: rgb(219, 213, 186)
  // secondary color: rgb(37, 31, 29)

  const armorBlack = new THREE.Color('#251f1d')
  const khaki = new THREE.Color('#dbd5ba')

  for (const key in materials.materials) {
    materials.materials[key].toneMapped = false
    materials.materials[key].color = armorBlack
    materials.materials[key].shininess = 20
  }

  console.log(materials.materials)
  if (materials.materials['Forward.Assist']) materials.materials['Forward.Assist'].color = khaki
  if (materials.materials['Lower.Receiver']) materials.materials['Lower.Receiver'].color = khaki
  if (materials.materials['Barrel.Handguard']) materials.materials['Barrel.Handguard'].color = khaki
  if (materials.materials['Upper.Rail']) materials.materials['Upper.Rail'].color = khaki
  //   if(materials.materials.Buttstock)
  // materials.materials.Buttstock.color = khaki

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
      <OrbitControls />
      <ambientLight intensity={2.5} />
      <pointLight
        color={new THREE.Color('#FFFFED')}
        position={[0, 2.3, 2]}
        decay={0}
        intensity={2.2}
      />
      <Suspense fallback={null}>
        <Center>
          <primitive object={obj} scale={0.75} rotation-z={-0.09} />
        </Center>
      </Suspense>
    </>
  )
}

export default AR15Demo
