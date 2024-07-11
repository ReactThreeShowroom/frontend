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
  return (
    <Form method="POST" className="w-full self-start">
      <p>
        {isActive && (
          <button className={'text-red-600 font-bold'} type="submit">
            X
          </button>
        )}{' '}
        {sub.id.slice(0, 7)}: {message}
      </p>
    </Form>
  )
}

export default SubEntryAdmin
