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
  console.log(materials.materials)
  let roseGold = { r: `${187 / 255}`, g: `${131 / 255}`, b: `${122 / 255}` }
  let armorBlack = { r: `${20 / 255}`, g: `${20 / 255}`, b: `${20 / 255}` }
  for (const key in materials.materials) {
    // Rose Gold: H-327 187,131,122
    // Armor Black: H-190 62,58,55

    materials.materials[key].toneMapped = false
    materials.materials[key].color = { ...materials.materials[key].color, ...armorBlack }
    materials.materials[key].shininess = 20
  }
  if (materials.materials.Grip)
    materials.materials.Grip.color = { ...materials.materials.Grip.color, ...roseGold }
  if (materials.materials.Receiver)
    materials.materials.Receiver.color = { ...materials.materials.Receiver.color, ...roseGold }
  if (materials.materials.Slide)
    materials.materials.Slide.color = { ...materials.materials.Slide.color, ...roseGold }

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
        <ambientLight intensity={3} />
        <pointLight position={[10, 10, 10]} decay={0} intensity={2} />
        <Suspense>
          <primitive object={obj} scale={2} position={[0, 0, 0]} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default GlockDemo
