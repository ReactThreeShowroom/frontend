import { useLoader } from '@react-three/fiber'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js'

const FirearmSelector = ({ selection, setSelection }) => {
  const { previousModels } = selection
  const navigate = useNavigate()

  const clearModels = useCallback((models) => {
    models.forEach((model) => {
      model.slice(model.length - 3) === 'mtl'
        ? useLoader.clear(MTLLoader, model)
        : useLoader.clear(OBJLoader, model)
    })
  })

  return (
    <div className={'flex flex-col justify-center items-center'}>
      <legend htmlFor="firearmType">Firearm Type: </legend>
      <fieldset name="fireArmType" className="flex flex-row">
        <label className="mx-1" htmlFor="Rifle">
          AR-15:&nbsp;
          <input
            type="radio"
            name="Rifle"
            value="AR15"
            checked={selection.item === 'AR15'}
            onChange={(e) => {
              clearModels(previousModels)
              setSelection({ ...selection, item: e.target.value, previousModels: [] })
              navigate('./item/AR15')
            }}
          />
        </label>
        <label className="mx-1" htmlFor="Shotgun">
          Remington 870:&nbsp;
          <input
            type="radio"
            name="Shotgun"
            value="Remington870"
            checked={selection.item === 'Remington870'}
            onChange={(e) => {
              clearModels(previousModels)
              setSelection({ ...selection, item: e.target.value, previousModels: [] })
              navigate('./item/Remington870')
            }}
          />
        </label>
        <label className="mx-1" htmlFor="Pistol">
          Glock 19:&nbsp;
          <input
            type="radio"
            name="Pistol"
            value="Glock19"
            checked={selection.item === 'Glock19'}
            onChange={(e) => {
              clearModels(previousModels)
              setSelection({ ...selection, item: e.target.value, previousModels: [] })
              navigate('./item/Glock19')
            }}
          />
        </label>
      </fieldset>
    </div>
  )
}

export default FirearmSelector
