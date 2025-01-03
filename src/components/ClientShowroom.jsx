import { Suspense, useCallback } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'

const ClientShowroom = () => {
  const { favorite, colors, client } = useLoaderData()
  const { favId } = useParams()
  const navigate = useNavigate()
  let { model, pieceFavorite: favParts, patternFavorite: favPatterns } = favorite
  console.log('model', model ? model : null)
  console.log('favParts', favParts.length ? favParts : null)
  console.log('favPatterns', favPatterns.length ? favPatterns : null)

  const changeScroll = () => {
    let style = document.body.style.overflow
    document.body.style.overflow = style === 'hidden' ? 'auto' : 'hidden'
  }

  let mtlURL = `/models/1-${favorite.model.path}.mtl`
  let objURL = `/models/1-${favorite.model.path}.obj`

  // const createPartList = useCallback((materials) => {
  //   const newList = {}
  //   for (const key in materials) {
  //     let { name, color, shininess } = materials[key]
  //     color = {
  //       r: String(Math.floor(color.r * 255)),
  //       g: String(Math.floor(color.g * 255)),
  //       b: String(Math.floor(color.b * 255)),
  //       isColor: true
  //     }
  //     newList[key] = { name, color, shininess }
  //   }
  //   return newList
  // })

  const materials = useLoader(MTLLoader, mtlURL)

  // const loadColorsShininess = useCallback(
  //   (part, materials) => {
  //     // let r, g, b
  //     let {
  //       name,
  //       color: { r, g, b },
  //       shininess
  //     } = part
  //     // if (part.rgb) [r, g, b] = part.rgb.split(',')
  //     // else [r, g, b] = [part.color.r, part.color.g, part.color.b]

  //     materials.materials[name].color = {
  //       r: Number(r) / 255,
  //       g: Number(g) / 255,
  //       b: Number(b) / 255,
  //       isColor: true
  //     }
  //     materials.materials[name].shininess = shininess
  //   },
  //   [selection]
  // )

  // let currentParts = createPartList(materials.materials)
  // for (const part in currentParts) {
  //   for (const _part of favParts) {
  //     const { piece } = _part
  //     if (part.name === piece.name) {
  //       console.log('part match', part.name, piece.name)
  //       break
  //     }
  //   }
  // }

  const obj = useLoader(OBJLoader, objURL, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
    // console.log('in loader ' + objURL)
  })
  return (
    <Suspense className="w-full mx-1 flex flex-col justify-center content-center">
      <h2>Welcome to the Cerakote® Showroom!</h2>
      <div className={'h-[400px] md:h-[600px] flex justify-center content-center'}>
        <p>Choose Your Favorite</p>
        <select
          onChange={(e) => {
            navigate(`/showroom/f/${e.target.value}`)
          }}
          defaultValue={favId}>
          {!!client.favorites.length &&
            client.favorites.map((fav) => {
              return (
                <option key={fav.id} value={fav.id}>
                  {fav.name}
                </option>
              )
            })}
        </select>
        <div
          className={'w-3/4 flex justify-center border-[2px] rounded-md border-main-orange'}
          onMouseEnter={changeScroll}
          onMouseLeave={changeScroll}>
          <Canvas>
            <ambientLight intensity={Math.PI / 2} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <Suspense>
              <primitive object={obj} scale={1} />
            </Suspense>
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </Suspense>
  )
}

export default ClientShowroom
