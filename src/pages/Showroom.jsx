import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams, useOutletContext, useLoaderData } from 'react-router'

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
