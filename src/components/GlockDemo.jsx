import { OrbitControls } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'

const GlockDemo = ({ modelPath }) => {
  let mtlURL = `/models/1-${modelPath}.mtl`
  let objURL = `/models/1-${modelPath}.obj`

  //1-AR15
  //1-Glock19
  //1-Remington870

  const materials = useLoader(MTLLoader, mtlURL)
  for (const key in materials) {
    // 187
    // 131
    // 122
    let r = String(187 / 255)
    let g = String(131 / 255)
    let b = String(122 / 255)
  }
  console.log(materials)

  const createPartList = (materials) => {
    const newList = {}
    for (const key in materials) {
      let { name, color, shininess } = materials[key]
      color = {
        r: String(Math.floor(color.r * 255)),
        g: String(Math.floor(color.g * 255)),
        b: String(Math.floor(color.b * 255)),
        isColor: true
      }
      newList[key] = { name, color, shininess }
    }
    return newList
  }

  const parts = createPartList(materials.materials)

  const obj = useLoader(OBJLoader, objURL, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
    console.log(loader)
  })

  console.log(obj)

  const changeScroll = () => {
    let style = document.body.style.overflow
    document.body.style.overflow = style === 'hidden' ? 'auto' : 'hidden'
  }

  return (
    <div className={'h-full w-full'} onMouseEnter={changeScroll} onMouseLeave={changeScroll}>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Suspense>
          <primitive object={obj} scale={1.5} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default GlockDemo
