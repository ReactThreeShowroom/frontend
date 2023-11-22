import { labelStyles, inputStyles } from '../Styles/formStyles'

const FormInputAndLabel = ({
  inputProps: { id, name, autoComplete, type, handler, value, placeholder, message }
}) => (
  <div className="mb-4">
    <label className={labelStyles} htmlFor={name}>
      {`${name[0].toUpperCase() + name.slice(1)}`}
    </label>
    <input
      className={inputStyles}
      id={id}
      name={name}
      autoComplete={autoComplete}
      type={type}
      onChange={handler}
      value={value}
      placeholder={placeholder}
    />
    {message}
  </div>
)

export default FormInputAndLabel
