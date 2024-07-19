import FirearmSelector from './FirearmSelector'
import PartControls from './PartControls'

const ShowroomControls = (props) => {
  const {
    state: { selection, parts, initialParts, colors, notes },
    setters: { setSelection, setParts, setInitialParts, setNotes }
  } = props

  // button onCLick
  return (
    <div className={'flex flex-col justify-center items-center'}>
      <h3 className={''}>Component List:&nbsp;</h3>
      <button>Save Color</button>
      {/* map for each part */}
      <PartControls {...props} />
    </div>
  )
}

export default ShowroomControls
