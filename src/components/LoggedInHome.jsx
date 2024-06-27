import { useEffect, useState } from 'react'
import AddClientForm from './AddClientForm'
import { BASE_URL } from '../utils/fetches'
import { Link } from 'react-router-dom'

/**
 * User - user data
 * id:         text
 * name:       text
 * email:      text
 * phone:      text
 * isAdmin:    bool
 * subStart:   DateTime (ms?)
 * subEnd:     DateTime (ms?)
 */

const LoggedInHome = ({ user, token }) => {
  // convert subEnd to a timestamp if not already in ms
  // compare with Date.now()
  // display days left, if <1 day, display hours

  // const [clients, setClients] = useState([
  //   { id: 1, name: 'bob', email: 'none', phone: '1234567890' },
  //   { id: 2, name: 'jane', email: 'none', phone: '1234567890' }
  // ])
  const [clients, setClients] = useState([])

  const getClients = async () => {
    const response = await fetch(`${BASE_URL}/client?u=${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const newClients = await response.json()
    if (newClients.length) {
      setClients(newClients)
    }
  }

  useEffect(() => {
    try {
      getClients()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const buttonStyle =
    'w-1/4 p-1 m-1 bg-transparent text-main-orange hover:bg-main-orange hover:text-white border-2 disabled:border-slate-300 disabled:text-slate-300 disabled:hover:bg-transparent border-main-orange rounded-md text-center'

  const inputStyle =
    'w-full p-1 m-1 shadow-sm border-2 border-main-orange rounded-md text-grey-darker outline-none'

  return (
    <article className="flex flex-col justify-center items-center">
      <h3>Welcome back {user.name}!</h3>
      {/*`Your subscription ends on <this_date> and has <this_much> time left`*/}
      <p>Are you ready to model some coatings?</p>
      <p>Use the link in the nav bar to get started!</p>
      <form className={'flex flex-row w-full md:max-w-[66%] md:min-w-96 justify-center shrink-0'}>
        <input
          type="text"
          placeholder="Enter Name"
          className={
            'w-1/2 p-1 m-1 h-11 shadow-sm border-2 border-main-orange rounded-md text-grey-darker outline-none'
          }></input>
        <button
          type="submit"
          className={
            'w-1/4 p-1 m-1 h-11 bg-transparent text-main-orange hover:bg-main-orange hover:text-white border-2 disabled:border-slate-300 disabled:text-slate-300 disabled:hover:bg-transparent border-main-orange rounded-md text-center'
          }>
          Search
        </button>
      </form>
      <div
        className={`flex flex-col items-center justify-center${
          clients.length ? ' md:flex-row' : ''
        } w-full px-4`}>
        <AddClientForm userId={user.id} token={token} getClients={getClients} />
        {!!clients.length && (
          <div className="w-full m-4 p-1 min-h-[500px] flex flex-col justify-start items-center rounded-lg border-4 border-double border-main-orange">
            <div
              className={
                'flex flex-row py-1 justify-between items-center w-full border-b-2 border-main-orange'
              }>
              <span className={'w-1/3 font-bold text-main-orange text-center'}>Client Name</span>
              <span className={'w-1/3 font-bold text-main-orange text-center'}>Client Email</span>
              <span className={'w-1/3 font-bold text-main-orange text-center'}>Client Phone</span>
            </div>
            {clients.map((client) => (
              <Link
                to={`/client/${client.id}`}
                key={client.id}
                className={'flex flex-row justify-between items-center w-full'}>
                <span className={'w-1/3 text-center'}>{client.name}</span>
                <span className={'w-1/3 text-center'}>{client.email}</span>
                <span className={'w-1/3 text-center'}>{client.phone}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default LoggedInHome
