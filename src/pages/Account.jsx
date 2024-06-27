import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { handleAddSub } from '../utils/fetches'
import SubEntry from '../components/SubEntry'

const Account = () => {
  const {
    state: { user, token },
    setters: { setUser, setToken }
  } = useOutletContext()
  const navigate = useNavigate()

  const buttonStyle =
    'w-1/2 p-1 m-1 h-11 bg-transparent text-main-orange hover:bg-main-orange hover:text-white border-2 disabled:border-slate-300 disabled:text-slate-300 disabled:hover:bg-transparent border-main-orange rounded-md text-center'

  const [subType, setSubType] = useState('year')

  useEffect(() => {
    let timeoutId
    if (user.noUser) {
      timeoutId = setTimeout(() => {
        navigate('/')
      }, 5000)
    }
    return () => clearTimeout(timeoutId)
  }, [])

  if (user.noUser)
    return (
      <div>
        <h2>Not logged In!</h2>
        <p>Redirecting in 5 seconds...</p>
      </div>
    )

  const handleRadioChange = (e) => setSubType(e.target.value)
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const newUser = await handleAddSub({ token, userId: user.id, type: subType })
      if (newUser) {
        setUser(newUser)
      } else throw 'Something went wrong with creating Sub'
    } catch (error) {
      console.log(error)
    }
  }

  const radioButtonProps = (compare, label, onChange) => ({
    type: 'radio',
    id: label,
    name: label,
    value: label,
    checked: compare === label,
    onChange: onChange,
    className: 'mx-1'
  })

  const subsList = user.subs.length ? (
    user.subs.map((sub, i) => {
      return <SubEntry sub={sub} key={sub.id} />
    })
  ) : (
    <h2>No Subscriptions</h2>
  )

  return (
    <div>
      <p>Hello {user.name}!</p>
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit" className={buttonStyle}>
            Request New Sub
          </button>
          <fieldset className={'flex flex-row w-1/2 mx-4 justify-between'}>
            <div>
              <label htmlFor="one" className="mx-1">
                One
              </label>
              <input {...radioButtonProps(subType, 'one', handleRadioChange)} />
            </div>
            <div>
              <label htmlFor="six" className="mx-1">
                Six
              </label>
              <input {...radioButtonProps(subType, 'six', handleRadioChange)} />
            </div>
            <div>
              <label htmlFor="year" className="mx-1">
                Year
              </label>
              <input {...radioButtonProps(subType, 'year', handleRadioChange)} />
            </div>
          </fieldset>
        </form>
        <section>{subsList}</section>
      </div>
    </div>
  )
}

export default Account
