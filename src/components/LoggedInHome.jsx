import AddClientForm from './AddClientForm'

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

const LoggedInHome = ({ user }) => {
  // convert subEnd to a timestamp if not already in ms
  // compare with Date.now()
  // display days left, if <1 day, display hours

  return (
    <article>
      <h3>Welcome back {user.name}!</h3>
      {/*`Your subscription ends on <this_date> and has <this_much> time left`*/}
      <p>Are you ready to model some coatings?</p>
      <p>Use the link in the nav bar to get started!</p>
      <AddClientForm />
    </article>
  )
}

export default LoggedInHome
