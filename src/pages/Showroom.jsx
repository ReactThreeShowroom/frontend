import { Suspense, useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router'
import ShowroomControls from '../components/ShowroomControls'
import FirearmSelector from '../components/FirearmSelector'

const Showroom = (props) => {
  // const { colors } = useLoaderData()
  const colors = {
    'C-189': { code: 'C-189', name: 'Blue Titanium', rgb: '61,88,105', hex: '3d5869' }
  }
  const { itemId } = useParams()
  const [selection, setSelection] = useState({
    item: itemId ? itemId : '',
    previousModels: []
  })
  const [notes, setNotes] = useState('')
  const [parts, setParts] = useState({})
  const [initialParts, setInitialParts] = useState({})
  let navigate = useNavigate()

  useEffect(() => {
    console.log(initialParts)
  }, [initialParts])

  const state = { selection, parts, initialParts, colors, notes }
  const setters = { setSelection, setParts, setInitialParts, setNotes }

  return (
    <section className={'w-full'}>
      <h2>Welcome to the Cerakote® Showroom!</h2>
      <Suspense>
        <FirearmSelector {...{ selection, setSelection }} />
        <div className={'min-w-[300px] min-h-[250px] mx-2 px-2'}>
          <label htmlFor="notes" className={'flex flex-col min-h-[250px]'}>
            Notes:{' '}
            <textarea
              className={'min-h-[250px]'}
              name="notes"
              onChange={(e) => {
                setNotes(e.target.value)
              }}></textarea>
          </label>
        </div>
        <Outlet context={{ state, setters }} />
        <ShowroomControls {...{ state, setters }} />
      </Suspense>
    </section>
  )
}
export default Showroom
