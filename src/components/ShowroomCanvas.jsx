import { OrbitControls } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense, useCallback, useEffect } from 'react'
import { useLocation, useOutletContext, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'
import { getPathSearchHash } from '../utils/locationHelpers'
import ShowroomControls from './ShowroomControls'

const ShowroomCanvas = () => {
  let { itemId } = useParams()
  let q = useSearchParams()
  let location = useLocation()
  let [path, search, hash] = getPathSearchHash(location)
  const { state, setters } = useOutletContext()

  const { selection, parts, initialParts } = state
  const { setSelection, setParts, setInitialParts } = setters

  let mtlURL = `/1-${itemId}.mtl`
  let objURL = `/1-${itemId}.obj`

  const createPartList = useCallback((materials) => {
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
  })

  const loadColorsShininess = useCallback((part, materials) => {
    const {
      name,
      color: { r, g, b },
      shininess
    } = part

    materials.materials[name].color = {
      r: Number(r) / 255,
      g: Number(g) / 255,
      b: Number(b) / 255,
      isColor: true
    }
    materials.materials[name].shininess = shininess
  })

  const materials = useLoader(MTLLoader, mtlURL)
  // const [partList, setPartList] = useState(createPartList(materials.materials))

  const obj = useLoader(OBJLoader, objURL, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
    // console.log('in loader ' + objURL)
  })
  // loadColorsShininess(itemColor, shininess, materials)

  useEffect(() => {
    // console.log(selection.previousModels, newModels)
    setParts(createPartList(materials.materials))
    setInitialParts(
      !initialParts.name || initialParts.name !== itemId
        ? { ...createPartList(materials.materials), name: itemId }
        : initialParts
    )
    setSelection({ ...selection, previousModels: [...selection.previousModels, mtlURL, objURL] })
  }, [selection.item])

  useEffect(() => {
    for (const part in parts) {
      loadColorsShininess(parts[part], materials)
    }
  }, [parts])

  // console.log(path, search, hash)

  const changeScroll = () => {
    let style = document.body.style.overflow
    document.body.style.overflow = style === 'hidden' ? 'auto' : 'hidden'
  }
  return (
    <div className={'h-[400px]'} onMouseEnter={changeScroll} onMouseLeave={changeScroll}>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Suspense>
          <primitive object={obj} scale={1} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default ShowroomCanvas