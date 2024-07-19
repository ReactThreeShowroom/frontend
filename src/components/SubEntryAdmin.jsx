import { Form } from 'react-router-dom'

const SubEntryAdmin = ({ sub }) => {
  let date, isExpired
  if (sub.endDate) {
    date = sub.endDate.slice(0, 10).split('-')
    date = [date[1], date[2], date[0]].join('/')
    isExpired = Date.now() >= Date.parse(sub.endDate)
  }
  const isActive = sub.status === 'active'
  const message = isActive ? `${sub.status} until ${date}` : sub.status

  const formStyle = 'w-full self-start'
  const cancelButtonStyle = 'text-red-600 font-bold'
  const formProps = { method: 'POST', className: formStyle }
  const cancelButtonProps = {
    name: 'intent',
    value: 'cancel',
    className: cancelButtonStyle,
    type: 'submit'
  }

  return (
    <Form {...formProps}>
      <p>
        <input hidden readOnly name={'subId'} value={sub.id} />
        <input hidden readOnly name={'type'} value={sub.type} />
        {isActive && <button {...cancelButtonProps}>X&nbsp;</button>}
        {sub.id.slice(0, 7)}: {message}
      </p>
    </Form>
  )
}

export default SubEntryAdmin
