import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense, useCallback, useEffect, useRef } from 'react'
import { useLoaderData, useLocation, useOutletContext, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'
import { getPathSearchHash } from '../utils/locationHelpers'
import ShowroomControls from './ShowroomControls'
import * as THREE from 'three'

const ShowroomCanvas = () => {
  let { modelPath } = useParams()
  let q = useSearchParams()
  let location = useLocation()
  let [path, search, hash] = getPathSearchHash(location)
  // incoming state from showroom outlet
  const outletState = useOutletContext()
  const { state, setters } = outletState
  const { selection, parts, initialParts } = state
  const { setSelection, setParts, setInitialParts } = setters
  const defaultMaterial = useRef(null)
  // console.log('showroomCanvas', outletState)

  let mtlURL = `/models/1-${modelPath}.mtl`
  let objURL = `/models/1-${modelPath}.obj`

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
      materials[key].toneMapped = false
      newList[key] = { name, color, shininess }
    }
    return newList
  })

  const loadColorsShininess = useCallback(
    (part, materials) => {
      const {
        name,
        color: { r, g, b, hex },
        shininess
      } = part

      if (hex) {
        materials.materials[name].color = new THREE.Color(`#${hex}`)
      } else {
        materials.materials[name].color.setRGB(r / 255, g / 255, b / 255)
      }
      materials.materials[name].toneMapped = false
      materials.materials[name].shininess = shininess
    },
    [selection]
  )

  const materials = useLoader(MTLLoader, mtlURL)
  // const [partList, setPartList] = useState(createPartList(materials.materials))

  const obj = useLoader(OBJLoader, objURL, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
    // console.log('in loader ' + objURL)
  })

  useEffect(() => {
    if (!defaultMaterial.current) {
      defaultMaterial.current = {}
      defaultMaterial.current.name = selection.favorite.name
      defaultMaterial.current.model = modelPath
      for (const key in materials.materials) {
        const material = materials.materials[key]
        defaultMaterial.current[key] = {
          shininess: material.shininess,
          color: material.color.clone()
        }
      }
    }

    if (selection.favorite.pieceFavorite.length && selection.favorite.model.path === modelPath) {
      for (const piece of selection.favorite.pieceFavorite) {
        const { name, color, shininess } = piece
        const partName = name.split('_')[1]
        materials.materials[partName].color = new THREE.Color(`#${color.hex}`)
        materials.materials[partName].shininess = shininess
      }

      setParts(createPartList(materials.materials))
    } else {
      setParts(createPartList(materials.materials))
    }

    // setParts(createPartList(materials.materials))
    setInitialParts(
      !initialParts.name || initialParts.name !== modelPath
        ? { ...createPartList(materials.materials), name: modelPath }
        : initialParts
    )
    setSelection({
      ...selection,
      previousModels: [...selection.previousModels, mtlURL, objURL]
    })

    return () => {
      if (defaultMaterial.current && defaultMaterial.current.model === modelPath) {
        for (const key in materials.materials) {
          materials.materials[key].color = defaultMaterial.current[key].color.clone()
          materials.materials[key].shininess = defaultMaterial.current[key].shininess
        }
      }
    }
  }, [selection.item, modelPath, selection.favorite.pieceFavorite])

  useEffect(() => {
    for (const partName in parts) {
      loadColorsShininess(parts[partName], materials)
    }
  }, [parts])

  useEffect(() => {
    return () => {
      useLoader.clear(MTLLoader, mtlURL)
      useLoader.clear(OBJLoader, objURL)
    }
  }, [])

  // console.log(path, search, hash)
  const changeScroll = () => {
    let style = document.body.style.overflow
    document.body.style.overflow = style === 'hidden' ? 'auto' : 'hidden'
  }

  return (
    <div className={'min-h-[550px]'}>
      <div className={'h-[400px] md:h-[600px] flex flex-col justify-center py-2 px-4'}>
        <div
          className={'w-full md:w-3/4 h-full rounded-md'}
          onMouseEnter={changeScroll}
          onMouseLeave={changeScroll}>
          <Canvas gl={{ toneMapping: THREE.NoToneMapping }}>
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />
            <Suspense>
              <primitive object={obj} scale={1} />
            </Suspense>
            <OrbitControls />
          </Canvas>
        </div>
      </div>
      <ShowroomControls {...{ state, setters }} />
    </div>
  )
}

export default ShowroomCanvas
