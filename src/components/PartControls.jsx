import { useCallback } from 'react'
import PartControl from './PartControl'

const PartControls = (props) => {
  const {
    state: { selection, parts, initialParts, colors, notes },
    setters: { setSelection, setParts, setInitialParts, setNotes }
  } = props

  const setColorShininess = useCallback((partInfo, name) => {
    const { partColor, shininess } = partInfo
    const newPart = { ...parts[name] }
    if (partColor) {
      const colorInfo = colors[partColor]
      const [r, g, b] = colorInfo.rgb.split(',')
      newPart.color = { r, g, b, isColor: true }
    } else {
      newPart.color = { ...initialParts[name].color }
    }
    newPart.shininess = shininess ? shininess : newPart.shininess
    return newPart
  })

  const partControlList = Object.keys(parts).map((partName) => (
    <PartControl key={'keyFor-' + partName} {...{ ...props, partName, setColorShininess }} />
  ))
  return (
    <div className={'flex flex-row flex-wrap justify-center items-center w-full'}>
      {partControlList}
    </div>
  )
}

export default PartControls
