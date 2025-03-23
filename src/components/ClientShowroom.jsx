import { OrbitControls } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three'

const ClientShowroom = () => {
  const { favorite, colors, client } = useLoaderData()
  const { favId } = useParams()
  const navigate = useNavigate()
  const [modelParts, setModelParts] = useState([])
  let { model, pieceFavorite: favParts, patternFavorite: favPatterns } = favorite
  console.log('colors', colors ? colors : null)
  console.log('client', client ? client : null)
  console.log('model', model ? model : null)
  console.log('favParts', favParts.length ? favParts : null)
  console.log('favPatterns', favPatterns.length ? favPatterns : null)

  const changeScroll = () => {
    let style = document.body.style.overflow
    document.body.style.overflow = style === 'hidden' ? 'auto' : 'hidden'
  }
  // used in <select> dropdown
  const favList =
    !!client.favorites.length &&
    client.favorites.map((fav) => {
      return (
        <option key={fav.id} value={fav.id}>
          {fav.name}
        </option>
      )
    })
  let mtlURL = `/models/1-${favorite.model.path}.mtl`
  let objURL = `/models/1-${favorite.model.path}.obj`

  const materials = useLoader(MTLLoader, mtlURL)

  const obj = useLoader(OBJLoader, objURL, (loader) => {
    materials.preload()
    // console.log('materials', materials)
    loader.setMaterials(materials)
  })

  useEffect(() => {
    // for (const piece of favParts) {
    //   let { name, color, shininess } = piece
    //   const partName = name.split('_')[1]

    //   materials.materials[partName].color = new THREE.Color(`#${color.hex}`)
    //   materials.materials[partName].shininess = shininess
    // }
    let newModelParts = []
    for (const partName in materials.materials) {
      // console.log('materials', partName)
      newModelParts.push({
        code: 'default',
        colorName: 'default',
        gloss: 'default',
        partName: materials.materials[partName].name.split('.').join(' ')
      })
    }
    for (const piece of favParts) {
      let { name, color, shininess } = piece
      const partName = name.split('_')[1]

      materials.materials[partName].color = new THREE.Color(`#${color.hex}`)
      materials.materials[partName].shininess = shininess
      newModelParts = newModelParts.map((part) => {
        if (partName.split('.').join(' ') === part.partName) {
          part.code = color.code
          part.colorName = color.name
          part.gloss =
            shininess === '0'
              ? 'Low Gloss'
              : shininess === '127'
              ? 'Recommended Gloss'
              : shininess === '255'
              ? 'High Gloss'
              : 'default'
        }
        return part
      })
    }
    setModelParts(newModelParts)

    return () => {
      // Clear cache when component unmounts
      useLoader.clear(MTLLoader, mtlURL)
      useLoader.clear(OBJLoader, objURL)
    }
  }, [favId])

  useEffect(() => {
    let newModelParts = []
    for (const partName in materials.materials) {
      // console.log('materials', partName)
      newModelParts.push({
        code: 'default',
        colorName: 'default',
        gloss: 'default',
        partName: materials.materials[partName].name.split('.').join(' ')
      })
    }
    for (const piece of favParts) {
      let { name, color, shininess } = piece
      const partName = name.split('_')[1]

      materials.materials[partName].color = new THREE.Color(`#${color.hex}`)
      materials.materials[partName].shininess = shininess
      newModelParts = newModelParts.map((part) => {
        if (partName.split('.').join(' ') === part.partName) {
          part.code = color.code
          part.colorName = color.name
          part.gloss =
            shininess === '0'
              ? 'Low Gloss'
              : shininess === '127'
              ? 'Recommended Gloss'
              : shininess === '255'
              ? 'High Gloss'
              : 'default'
        }
        return part
      })
    }
    setModelParts(newModelParts)
  }, [])

  const spanSemiBold = 'text-main-orange font-semibold'
  return (
    <Suspense>
      <div className="w-full mx-1 flex flex-col justify-center content-center">
        <h2 className="text-main-orange text-lg font-bold text-center">
          Welcome to the KoteMaster Showroom!
        </h2>
        <div className={'flex justify-center content-center flex-col text-main-orange text-center'}>
          Choose Your Favorite
          <select
            className="self-center w-1/4 font-normal border-[1px] rounded-md border-main-orange my-1"
            onChange={(e) => {
              navigate(`/showroom/f/${e.target.value}`)
            }}
            defaultValue={favId}>
            {favList}
          </select>
          <div
            className={
              'w-3/4 md:h-[600px] h-[400px] flex justify-center border-[2px] rounded-md border-main-orange self-center'
            }
            onMouseEnter={changeScroll}
            onMouseLeave={changeScroll}>
            <Canvas gl={{ toneMapping: THREE.NoToneMapping }}>
              <ambientLight intensity={2} />
              <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
              <Suspense>
                <primitive object={obj} scale={1} />
              </Suspense>
              <OrbitControls />
            </Canvas>
          </div>
          <div className="w-3/4 flex flex-wrap flex-row justify-center my-2 self-center">
            {!!modelParts.length &&
              modelParts.map((part) => {
                console.log('in map', part)
                return (
                  <div className="w-[250px] border-[1px] rounded-md border-main-orange m-1">
                    <h2 className="text-main-orange text-lg font-bold border-b-2 border-main-orange">
                      {part.partName}
                    </h2>
                    <p>
                      <span className={spanSemiBold}>Code:</span> {part.code}
                    </p>
                    <p>
                      <span className={spanSemiBold}>Color Name:</span> {part.colorName}
                    </p>
                    <p>
                      <span className={spanSemiBold}>Gloss:</span> {part.gloss}
                    </p>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default ClientShowroom
