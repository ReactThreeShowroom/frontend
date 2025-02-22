import { OrbitControls } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense, useCallback, useEffect } from 'react'
import { useLocation, useOutletContext, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'
import { getPathSearchHash } from '../utils/locationHelpers'
import ShowroomControls from './ShowroomControls'
import {useControls, folder, Leva} from 'leva';
import * as THREE from 'three';

const ShowroomCanvas = () => {
  
  //debug menu
  const {
    pointLightIntensity, 
    pointLightPosition, 
    ambientLightIntensity
  } = useControls("lighting", {
    pointLight: folder({
      pointLightIntensity: {
        // value: 2,
        value: Math.PI,
        min: 0,
        max: 10,
        label: 'Point Light Intensity',
        step: 0.1,
      },
      pointLightPosition: {
        value: {x: 10, y: 10, z: 10},
        // value: {x:-10, y:-10, z:-10},
        label: 'Point Light Position',
        min: -20,
        max: 20,
        step: 0.5,
      },

    }),
    ambientLightIntensity: { 
      value: 1.5, 
      // value: Math.PI / 2, 
      min: 0,
      max: 2, 
      label: 'Ambient Light Intensity', 
      step: 0.1,
    }, 
  }, {collapsed: true});

  const {toneMapping} = useControls({
    toneMapping: {
      value: 'ACESFilmicToneMapping',
      options: [
        'LinearToneMapping', 
        'ReinhardToneMapping',  
        "NoToneMapping", 
        "CineonToneMapping",
      ],
    },
  })

  const { color } = useControls({
    color: {
      value: '#ff0000',
      label: 'Color',
      format: 'color',
    },
  })

  let { modelPath } = useParams()
  let q = useSearchParams()
  let location = useLocation()
  let [path, search, hash] = getPathSearchHash(location)

  // incoming state from showroom outlet
  const outletState = useOutletContext()
  const { state, setters } = outletState
  const { selection, parts, initialParts } = state
  const { setSelection, setParts, setInitialParts } = setters
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
        color: { r, g, b },
        shininess
      } = part

      // materials.materials[name].color = {
      //   r: Number(r) / 255,
      //   g: Number(g) / 255,
      //   b: Number(b) / 255,
      //   isColor: true
      // }
      materials.materials[name].color = new THREE.Color(
        r / 255, 
        g / 255, 
        b / 255
      )
      console.log(name, materials.materials[name].color.getHexString());
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
  // loadColorsShininess(itemColor, shininess, materials)

  useEffect(() => {
    // console.log(selection.previousModels, newModels)
    setParts(createPartList(materials.materials))
    setInitialParts(
      !initialParts.name || initialParts.name !== modelPath
        ? { ...createPartList(materials.materials), name: modelPath }
        : initialParts
    )
    setSelection({ ...selection, previousModels: [...selection.previousModels, mtlURL, objURL] })
  }, [selection.item, modelPath])

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
    <div className={'min-h-[550px]'}>
      <div className={'h-[400px] md:h-[600px] flex flex-col justify-center py-2 px-4'}>
        <div
          className={'w-full md:w-3/4 h-full border-[2px] rounded-md border-main-orange'}
          onMouseEnter={changeScroll}
          onMouseLeave={changeScroll}>
          <Canvas gl={{toneMapping: THREE[toneMapping]}}>
            <ambientLight intensity={ambientLightIntensity} />
            <pointLight 
              position={[
                pointLightPosition.x, 
                pointLightPosition.y, 
                pointLightPosition.z
              ]} 
              decay={0} 
              intensity={pointLightIntensity} />
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
