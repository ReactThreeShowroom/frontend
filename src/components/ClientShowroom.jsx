import { OrbitControls } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
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

  const materials = useLoader(MTLLoader, mtlURL)

  const obj = useLoader(OBJLoader, objURL, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

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

  return (
    <Suspense className="w-full mx-1 flex flex-col justify-center content-center">
      <h2>Welcome to the KoteMaster Showroom!</h2>
      <div className={'h-[400px] md:h-[600px] flex justify-center content-center'}>
        <p>Choose Your Favorite</p>
        <select
          onChange={(e) => {
            navigate(`/showroom/f/${e.target.value}`)
          }}
          defaultValue={favId}>
          {favList}
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
