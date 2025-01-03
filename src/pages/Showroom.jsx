import { Outlet, useOutletContext } from 'react-router'

const Showroom = (props) => {
  const outletState = useOutletContext()
  // console.log(outletState.state.user)
  return (
    <section className={''}>
      <Outlet context={outletState} />
    </section>
  )
}
export default Showroom
