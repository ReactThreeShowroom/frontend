import { labelStyles, inputStyles } from '../Styles/formStyles'

const FormInputAndLabel = ({
  inputProps: {
    id,
    name,
    autoComplete,
    type,
    handler,
    form: [state, setter],
    value,
    placeholder,
    message,
    required
  }
}) =>
  autoComplete ? (
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
        onChange={(e) => handler(e, setter, state)}
        value={value}
        placeholder={placeholder}
        required={required}
      />
      {message}
    </div>
  ) : (
    <div className="mb-4">
      <label className={labelStyles} htmlFor={name}>
        {`${name[0].toUpperCase() + name.slice(1)}`}
      </label>
      <input
        className={inputStyles}
        id={id}
        name={name}
        type={type}
        onChange={(e) => handler(e, setter, state)}
        value={value}
        placeholder={placeholder}
        required={required}
      />
      {message}
    </div>
  )

export default FormInputAndLabel
