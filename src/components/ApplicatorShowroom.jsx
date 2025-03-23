import { Suspense, useState } from 'react'
import { Outlet, useParams, useLoaderData, useNavigate } from 'react-router'
// import ShowroomControls from '../components/ShowroomControls'
import FirearmSelector from '../components/FirearmSelector'
import { Form, useSearchParams } from 'react-router-dom'

const ApplicatorShowroom = (props) => {
  let { colors, client, models } = useLoaderData()
  // console.log('client info', client)
  // console.log('models', models)
  let { modelPath, clientId } = useParams()
  const [rawSearch, setRawSearch] = useSearchParams()
  const navigate = useNavigate()
  const search = decodeURI(rawSearch)
    .split('&')
    .reduce((terms, q) => {
      let [key, val] = q.split('=')
      return key.length ? ((terms[key] = val), terms) : terms
    }, {})

  const [selection, setSelection] = useState({
    model: modelPath,
    modelId: models[modelPath].id,
    part: '',
    favoriteId: search.f,
    favorite: client.favorites.find((fav) => fav.id === search.f),
    previousModels: []
  })
  const [favName, setFavName] = useState(selection.favorite.name)
  const [notes, setNotes] = useState(selection.favorite.notes)
  const [parts, setParts] = useState({})
  const [initialParts, setInitialParts] = useState({})

  // new outlet state for showroom
  const state = { selection, parts, initialParts, colors, notes, models }
  const setters = { setSelection, setParts, setInitialParts, setNotes }

  return (
    <Suspense>
      <div className="w-full flex flex-col justify-center content-center">
        <h2 className="m-1">Welcome to the Cerakote® Showroom!</h2>
        <select
          className="m-1"
          onChange={(e) => {
            console.log('selectedFav', e.target.value)
            const newFav = client.favorites.find((fav) => fav.id === e.target.value)
            console.log(newFav)
            setSelection({
              ...selection,
              favoriteId: e.target.value,
              favorite: newFav,
              modelId: models[newFav.model.path].id,
              model: newFav.model.path,
              part: ''
            })
            setNotes(newFav.notes)
            setFavName(newFav.name)
            navigate(`/showroom/c/${client.id}/m/${newFav.model.path}?f=${e.target.value}`)
          }}
          defaultValue={selection.favoriteId}>
          <option value={{ id: '', name: '' }}>--</option>
          {!!client.favorites.length &&
            client.favorites.map((fav) => {
              return (
                <option key={fav.id} value={fav.id}>
                  {fav.name}
                </option>
              )
            })}
        </select>
        <Form
          method="POST"
          onSubmit={(e) => {
            console.log(`Submitting ${favName}, ${selection.favoriteId}, ${modelPath}`)
          }}>
          <input value={favName} name="favName" onChange={(e) => setFavName(e.target.value)} />
          <input value={selection.favoriteId} hidden readOnly name="favId" />
          <input hidden readOnly name="modelPath" value={modelPath} />
          <button type="submit">Change Name</button>
        </Form>
        <FirearmSelector {...{ selection, setSelection, models }} />
        <label
          htmlFor="notes"
          className={
            'flex flex-col w-[calc(100%-8px)] min-h-[250px] m-1 py-1 rounded-md text-center font-bold border-main-orange border-[2px]'
          }>
          Notes:{' '}
          <textarea
            className={
              'min-h-[250px] min-w-[250px] max-w-[calc(100%-8px)] w-full border-[1px] p-1 m-1 rounded-md border-main-orange resize font-normal'
            }
            name="notes"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}></textarea>
        </label>
        <Outlet context={{ state, setters }} />
      </div>
    </Suspense>
  )
}

export default ApplicatorShowroom
