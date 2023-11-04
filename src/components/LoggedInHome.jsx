import AddClientForm from './AddClientForm'

const LoggedInHome = ({ user }) => {
  return (
    <article>
      <h3>Welcome back {user.name}!</h3>
      <p>Are you ready to model some coatings?</p>
      <p>Use the link in the nav bar to get started!</p>
      <AddClientForm />
    </article>
  )
}

export default LoggedInHome
