import { Suspense, useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams, useOutletContext, useLoaderData } from 'react-router'
import ShowroomControls from '../components/ShowroomControls'
import FirearmSelector from '../components/FirearmSelector'

const Showroom = (props) => {
  const { colors } = useLoaderData()
  // const colors = {
  //   'C-189': { code: 'C-189', name: 'Blue Titanium', rgb: '61,88,105', hex: '3d5869' }
  // }

  // console.log(colors)
  const { itemId } = useParams()
  const [selection, setSelection] = useState({
    item: itemId ? itemId : '',
    previousModels: []
  })
  const [notes, setNotes] = useState('')
  const [parts, setParts] = useState({})
  const [initialParts, setInitialParts] = useState({})
  let navigate = useNavigate()

  // parent outlet state
  const outletState = useOutletContext()
  // console.log('showroom', outletState)

  // useEffect(() => {
  //   console.log(initialParts)
  // }, [initialParts])

  // new outlet state for showroom
  const state = { selection, parts, initialParts, colors, notes }
  const setters = { setSelection, setParts, setInitialParts, setNotes }

  return (
    <section className={'w-full p'}>
      <h2>Welcome to the Cerakote® Showroom!</h2>
      <Suspense>
        <FirearmSelector {...{ selection, setSelection }} />
        <label
          htmlFor="notes"
          className={
            'flex flex-col min-w-full min-h-[250px] my-1 border-[1px] rounded-md border-main-orange text-center font-bold'
          }>
          Notes:{' '}
          <textarea
            className={
              'min-h-[250px] min-w-[250px] max-w-[calc(100%-1px)] w-full border-[1px] rounded-md border-main-orange resize'
            }
            name="notes"
            onChange={(e) => {
              setNotes(e.target.value)
            }}></textarea>
        </label>

        <Outlet context={{ state, setters }} />
        <ShowroomControls {...{ state, setters }} />
      </Suspense>
    </section>
  )
}
export default Showroom
