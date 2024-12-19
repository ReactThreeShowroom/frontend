import PartControl from './PartControl'

const PartControls = (props) => {
  const {
    state: { selection, parts, initialParts, colors, notes },
    setters: { setSelection, setParts, setInitialParts, setNotes }
  } = props
  const setColorShininess = (partInfo, name) => {
    const { partColor, shininess } = partInfo
    const newPart = { ...parts[name] }
    if (partColor === '--') {
      newPart.color = { ...initialParts[name].color }
    } else if (partColor) {
      const colorInfo = colors[partColor]
      const [r, g, b] = colorInfo.rgb.split(',')
      newPart.color = { name: partColor, r, g, b, isColor: true }
    }
    newPart.shininess = shininess ? shininess : newPart.shininess
    return newPart
  }

  // const partControlList = Object.keys(parts).map((partName) => {
  //   // console.log(parts[partName])
  //   return (
  //     <option key={'keyFor-' + partName} value={partName}>
  //       {partName.split('.').join(' ')}
  //     </option>
  //   )
  // })

  // console.log(parts)
  return (
    <div className={'flex flex-col flex-wrap justify-center items-center w-full'}>
      <label htmlFor="partSelection">
        Part Selection:{' '}
        <select
          name="partSelection"
          className={'font-normal border-[1px] rounded-md border-main-orange'}
          onChange={(e) => {
            setSelection({ ...selection, part: e.target.value })
          }}>
          <option value="">--</option>
          {Object.keys(parts).map((partName) => {
            // console.log(parts[partName])
            return (
              <option key={'keyFor-' + partName} value={partName}>
                {partName.split('.').join(' ')}
              </option>
            )
          })}
        </select>
      </label>
      {!!selection.part && <PartControl {...{ ...props, setColorShininess }} />}
    </div>
  )
}

export default PartControls
