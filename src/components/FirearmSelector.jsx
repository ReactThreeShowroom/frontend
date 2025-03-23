import { useLoader } from '@react-three/fiber'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'

const FirearmSelector = ({ selection, setSelection, models }) => {
  const { previousModels } = selection
  const navigate = useNavigate()

  const clearModels = useCallback((models) => {
    models.forEach((model) => {
      model.slice(model.length - 3) === 'mtl'
        ? useLoader.clear(MTLLoader, model)
        : useLoader.clear(OBJLoader, model)
    })
  })

  const [rawSearch, setRawSearch] = useSearchParams()

  const search = decodeURI(rawSearch)
    .split('&')
    .reduce((terms, q) => {
      let [key, val] = q.split('=')
      return key.length ? ((terms[key] = val), terms) : terms
    }, {})
  let favoritePath = search.f ? '?f=' + encodeURI(search.f) : ''

  const handleChangeFirearm = useCallback((e) => {
    clearModels(previousModels)
    setSelection({
      ...selection,
      part: '',
      model: e.target.value,
      modelId: models[e.target.value].id,
      previousModels: []
    })
    navigate(`./m/${models[e.target.value].path}${favoritePath}`)
  })

  return (
    <div
      className={
        'flex flex-col justify-center w-[calc(100%-8px)] items-center m-1 rounded-md'
      }>
      <legend htmlFor="firearmType" className="font-bold">
        Firearm Type:{' '}
      </legend>
      <fieldset name="fireArmType" className="flex flex-row">
        <label className="mx-1" htmlFor="Rifle">
          AR-15:&nbsp;
          <input
            type="radio"
            name="Rifle"
            value="AR15"
            checked={selection.model === 'AR15'}
            onChange={handleChangeFirearm}
          />
        </label>
        <label className="mx-1" htmlFor="Shotgun">
          Remington 870:&nbsp;
          <input
            type="radio"
            name="Shotgun"
            value="Remington870"
            checked={selection.model === 'Remington870'}
            onChange={handleChangeFirearm}
          />
        </label>
        <label className="mx-1" htmlFor="Pistol">
          Glock 19:&nbsp;
          <input
            type="radio"
            name="Pistol"
            value="Glock19"
            checked={selection.model === 'Glock19'}
            onChange={handleChangeFirearm}
          />
        </label>
      </fieldset>
    </div>
  )
}

export default FirearmSelector
