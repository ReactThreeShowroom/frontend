import { Suspense, useEffect, useState } from 'react'
import { Outlet, useParams, useLoaderData } from 'react-router'
import ShowroomControls from '../components/ShowroomControls'
import FirearmSelector from '../components/FirearmSelector'
import { useSearchParams } from 'react-router-dom'

const ApplicatorShowroom = (props) => {
  const { colors, client } = useLoaderData()
  // console.log(client)
  const { modelId, clientId } = useParams()
  const [rawSearch, setRawSearch] = useSearchParams()
  const search = decodeURI(rawSearch)
    .split('&')
    .reduce((terms, q) => {
      let [key, val] = q.split('=')
      return key.length ? ((terms[key] = val), terms) : terms
    }, {})

  // console.log(search)
  const [selection, setSelection] = useState({
    model: modelId ? modelId : '',
    part: '',
    favorite: search.f ? search.f : '',
    previousModels: []
  })
  const [notes, setNotes] = useState('')
  const [parts, setParts] = useState({})
  const [initialParts, setInitialParts] = useState({})

  // new outlet state for showroom
  const state = { selection, parts, initialParts, colors, notes }
  const setters = { setSelection, setParts, setInitialParts, setNotes }
  return (
    <Suspense className="w-full mx-1 flex flex-col justify-center content-center">
      <h2>Welcome to the Cerakote® Showroom!</h2>
      <select
        onChange={(e) => {
          setSelection({ ...selection, favorite: e.target.value })
          console.log(e.target.value)
          setRawSearch({ f: e.target.value })
        }}
        defaultValue={selection.favorite}>
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
      <FirearmSelector {...{ selection, setSelection }} />
      <label
        htmlFor="notes"
        className={
          'flex flex-col w-[calc(100%-8px)] min-h-[250px] my-1 py-1 border-[2px] rounded-md border-main-orange text-center font-bold'
        }>
        Notes:{' '}
        <textarea
          className={
            'min-h-[250px] min-w-[250px] max-w-[calc(100%-8px)] w-full border-[1px] p-1 m-1 rounded-md border-main-orange resize font-normal'
          }
          name="notes"
          onChange={(e) => {
            setNotes(e.target.value)
          }}></textarea>
      </label>
      <Outlet context={{ state, setters }} />
      <ShowroomControls {...{ state, setters }} />
    </Suspense>
  )
}

export default ApplicatorShowroom
