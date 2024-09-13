// import FirearmSelector from './FirearmSelector'
import PartControls from './PartControls'

const ShowroomControls = (props) => {
  const {
    state: { selection, parts, initialParts, colors, notes },
    setters: { setSelection, setParts, setInitialParts, setNotes }
  } = props

  // button onCLick sets favorite
  // save all rgb and shininess of parts (rgb: "r,g,b", shininess: "0"-"255")
  // save notes to favorite record directly
  // color and shininess goes on pieceFavorite record

  // use parts, notes, selection.model, selection.favorite for data

  // navigate on save to "refresh" page? setSearchParams?
  return (
    <div className={'flex flex-col justify-center items-center'}>
      <button
        className={
          'text-main-orange bg-transparent border-2 border-main-orange rounded-md p-1 m-1'
        }>
        Save Favorite
      </button>
      {/* map for each part */}
      <PartControls {...props} />
    </div>
  )
}

export default ShowroomControls
