import { useActionData, useLoaderData } from 'react-router'
import { Form } from 'react-router-dom'

const SingleSubAdmin = () => {
  let sub = useLoaderData()
  let { user } = sub
  let newSub = useActionData()

  const buttonStyle =
    'w-1/2 p-1 m-1 h-11 bg-transparent text-main-orange hover:bg-main-orange hover:text-white border-2 disabled:border-slate-300 disabled:text-slate-300 disabled:hover:bg-transparent border-main-orange rounded-md text-center'

  return sub.id ? (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Admin: {`${user.admin}`}</p>
      <p>Active: {`${user.active}`}</p>
      <p>Sub Length: {sub.type}</p>
      <p>Sub Status: {`${sub.status}`}</p>
      {!!sub.startDate && <p>Start Date: {sub.startDate}</p>}
      {!!sub.endDate && <p>End Date: {sub.endDate}</p>}
      <Form method="POST">
        <input hidden readOnly name={'subId'} value={sub.id} />
        <input hidden readOnly name={'type'} value={sub.type} />
        <button type="submit" name={'intent'} value={'cancelSub'} className={buttonStyle}>
          Cancel Sub
        </button>
        <button type="submit" name={'intent'} value={'activateSub'} className={buttonStyle}>
          Activate Sub
        </button>
      </Form>
    </div>
  ) : (
    <div>
      <p>No User or Sub Selected</p>
      {newSub && (
        <p>
          Submitted Sub Successfully
          {newSub.status === 'active'
            ? ' Activated'
            : newSub.status === 'cancelled'
            ? ' Cancelled'
            : ' Reactivated'}
        </p>
      )}
    </div>
  )
}

export default SingleSubAdmin
