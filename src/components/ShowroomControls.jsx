// import FirearmSelector from './FirearmSelector'
import { Form } from 'react-router-dom'
import PartControls from './PartControls'

const ShowroomControls = (props) => {
  const {
    state: { selection, parts, initialParts, colors, notes, models },
    setters: { setSelection, setParts, setInitialParts, setNotes }
  } = props

  // console.log(parts)
  // console.log(selection)
  const partInputs = Object.entries(parts).reduce((parts, part) => {
    if (part[1].color.name)
      parts.push(
        <input
          key={part[1].color.name}
          hidden={true}
          readOnly
          name={`data-${part[0]}`}
          value={JSON.stringify(part[1])}
        />
      )
    return parts
  }, [])

  return (
    <div className={'flex flex-col justify-center items-center w-full my-2'}>
      <Form method="POST">
        {partInputs}
        <input hidden readOnly name="favId" value={selection.favoriteId} />
        <input hidden readOnly name="modelId" value={selection.modelId} />
        <input hidden readOnly name="notes" value={notes} />
        <button
          type="submit"
          className={
            'text-main-orange bg-transparent border-2 border-main-orange rounded-md p-1 m-1'
          }>
          Save Favorite
        </button>
      </Form>

      {/* map for each part */}
      <PartControls {...props} />
    </div>
  )
}

export default ShowroomControls
