import { useState } from 'react'

const PartControl = (props) => {
  const {
    partName,
    setColorShininess,
    state: { selection, parts, initialParts, colors, notes },
    setters: { setSelection, setParts, setInitialParts, setNotes }
  } = props
  const part = parts[partName]
  // console.log(part)
  const { name, color, shininess, partColor } = part
  const [colorSeries, setColorSeries] = useState(null)
  // console.log(colors)
  const colorMapCB = (_color) => {
    const color = colors[_color]
    return (
      <option key={color.code} value={color.code}>
        {color.code}: {color.name}
      </option>
    )
  }
  const sortCB = (a, b) => colors[a].code - colors[b].code
  const sortedColors = colorSeries
    ? Object.keys(colors)
        .filter((color) => colors[color].code[0] === colorSeries)
        .sort(sortCB)
        .map(colorMapCB)
    : Object.keys(colors).sort(sortCB).map(colorMapCB)

  return (
    <div
      className={
        'flex flex-col justify-between items-center w-[325px] h-[275px] m-1 mt-2 p-1 border-2 border-main-orange rounded-md'
      }>
      <h3 className={'font-bold'}>{name.split('.').join(' ')}</h3>
      <legend htmlFor={'shininess' + name} className={'flex flex-col text-center'}>
        Gloss: %{Math.floor((shininess / 255) * 100)}
        <fieldset name="shininess' + name" className="flex flex-row mx-1">
          {/* low, recommended, high */}
          <label htmlFor={'lowShine' + name} className="flex flex-col mx-1 text-center">
            <span className={'mx-1'}>{'Low (Matte)'}</span>
            <input
              name={'lowShine' + name}
              type="radio"
              value={'0'}
              checked={part.shininess === '0'}
              className={'mx-1'}
              onChange={(e) => {
                setParts({
                  ...parts,
                  [partName]: setColorShininess({ shininess: '0' }, name)
                })
              }}
              // className={'w-[300px]'}
            />
          </label>
          <label htmlFor={'recShine' + name} className="flex flex-col mx-1 text-center">
            {'Recommended (Medium)'}
            <input
              name={'recShine' + name}
              type="radio"
              value={'127'}
              checked={part.shininess === '127'}
              className={'mx-1'}
              onChange={(e) => {
                setParts({
                  ...parts,
                  [partName]: setColorShininess({ shininess: '127' }, name)
                })
              }}
              // className={'w-[300px]'}
            />
          </label>
          <label htmlFor={'highShine' + name} className="flex flex-col mx-1 text-center">
            {'High (Glossy)'}
            <input
              name={'highShine' + name}
              type="radio"
              value={'255'}
              checked={part.shininess === '255'}
              className={'mx-1'}
              onChange={(e) => {
                setParts({
                  ...parts,
                  [partName]: setColorShininess({ shininess: '255' }, name)
                })
              }}
              // className={'w-[300px]'}
            />
          </label>
        </fieldset>
      </legend>
      {/* Cerakote Series */}
      <legend htmlFor="colorSeries" className="font-bold">
        Coat Series:{' '}
      </legend>
      <fieldset name="colorSeries" className="flex flex-row">
        <label className="mx-1" htmlFor="Elite">
          Elite:&nbsp;
          <input
            type="radio"
            name="Elite"
            value="E"
            checked={colorSeries === 'E'}
            onChange={(e) => {
              setColorSeries(e.target.value)
            }}
          />
        </label>
        <label className="mx-1" htmlFor="H">
          H:&nbsp;
          <input
            type="radio"
            name="H"
            value="H"
            checked={colorSeries === 'H'}
            onChange={(e) => {
              setColorSeries(e.target.value)
            }}
          />
        </label>
        <label className="mx-1" htmlFor="C">
          C:&nbsp;
          <input
            type="radio"
            name="C"
            value="C"
            checked={colorSeries === 'C'}
            onChange={(e) => {
              setColorSeries(e.target.value)
            }}
          />
        </label>
      </fieldset>
      <div>
        <label htmlFor="itemColor" className={'flex flex-col font-bold'}>
          Color Selection:{' '}
          <select
            name={'itemColor'}
            className={'font-normal border-[1px] rounded-md border-main-orange'}
            onChange={(e) => {
              setParts({
                ...parts,
                [partName]: setColorShininess({ partColor: e.target.value }, name)
              })
            }}>
            <option value="--">--</option>
            {colors && sortedColors}
          </select>
        </label>
      </div>
    </div>
  )
}

export default PartControl
