const PartControl = (props) => {
  const {
    partName,
    setColorShininess,
    state: { selection, parts, initialParts, colors, notes },
    setters: { setSelection, setParts, setInitialParts, setNotes }
  } = props
  const part = parts[partName]
  const { name, color, shininess, partColor } = part

  return (
    <div
      className={
        'flex flex-col justify-between items-center max-w-[300px] border-2 border-main-orange rounded-md'
      }>
      <h3>{name.split('.').join(' ')}</h3>
      <legend htmlFor={'shininess' + name} className={'flex flex-col'}>
        Gloss: %{Math.floor((shininess / 255) * 100)}
        <fieldset name="shininess' + name" className="flex flex-row mx-1">
          {/* low, recommended, high */}
          <label htmlFor={'lowShine' + name} className="flex flex-col mx-1">
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
          <label htmlFor={'recShine' + name} className="flex flex-col mx-1">
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
          <label htmlFor={'highShine' + name} className="flex flex-col mx-1">
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
      <legend htmlFor="colorSeries">Coat Series: </legend>
      <fieldset name="colorSeries" className="flex flex-row">
        <label className="mx-1" htmlFor="Elite">
          Elite:&nbsp;
          <input
            type="radio"
            name="Elite"
            value="E"
            checked={part.colorSeries === 'E'}
            onChange={(e) => {
              setParts({
                ...parts,
                [partName]: { ...parts[partName], partColor: e.target.value }
              })
            }}
          />
        </label>
        <label className="mx-1" htmlFor="H">
          H:&nbsp;
          <input
            type="radio"
            name="H"
            value="H"
            checked={part.partColor === 'H'}
            onChange={(e) => {
              setParts({
                ...parts,
                [partName]: { ...parts[partName], partColor: e.target.value }
              })
            }}
          />
        </label>
        <label className="mx-1" htmlFor="C">
          C:&nbsp;
          <input
            type="radio"
            name="C"
            value="C"
            checked={part.partColor === 'C'}
            onChange={(e) => {
              setParts({
                ...parts,
                [partName]: { ...parts[partName], partColor: e.target.value }
              })
            }}
          />
        </label>
      </fieldset>
      <div>
        <label htmlFor="itemColor" className={'flex flex-col'}>
          Color Selection:{' '}
          <select
            name={'itemColor'}
            onChange={(e) => {
              setParts({
                ...parts,
                [partName]: setColorShininess({ partColor: e.target.value }, name)
              })
            }}>
            <option value=""> -- </option>
            {Object.keys(colors).map((_color) => {
              const color = colors[_color]
              return (
                <option key={color.code} value={color.code}>
                  {color.code}: {color.name}
                </option>
              )
            })}
          </select>
        </label>
      </div>
    </div>
  )
}

export default PartControl