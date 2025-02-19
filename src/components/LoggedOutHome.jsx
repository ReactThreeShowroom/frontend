import { Link } from 'react-router-dom'
import GlockDemo from './GlockDemo'

const LoggedOutHome = () => {
  return (
    <article className={'w-full'}>
      <section className="relative">
        <img className="w-full h-[calc(100vh-28px)] border-teal-500 border-2">
          {/*
        hero image here
      */}
        </img>
        <span className="absolute w-[100%] top-1/2 text-center">Hero Image here</span>
      </section>
      <section className={'flex flex-col items-center text-center'}>
        <p>
          <Link className={'text-main-orange'} to={'/signin'}>
            Log in
          </Link>{' '}
          or{' '}
          <Link className={'text-main-orange'} to={'/signup'}>
            sign up
          </Link>{' '}
          to access the Cerakote® Showroom!
        </p>
        <div className="w-1/2 my-4 border-b-2 border-main-orange"></div>
      </section>
      <section className={'flex flex-col items-center text-center'}>
        {/* <p>
          Are you a registered Applicator's client?{' '}
          <Link className={'text-main-orange'} to={'/showroom'}>
            click here
          </Link>{' '}
          to access your saved color choices!
        </p> */}
        <div className={'flex flex-col w-1/2 my-2 text-center'}>
          <p>
            Want to know what your firearms will look like with Cerakote® products before your local
            Applicator applies them?
          </p>
          <p>
            Are you an Applicator and want to boost sales by showing off what your client's firearms
            will look like?
          </p>
          <p>Look no further.</p>
          <p>
            Below is a finished product side-by-side with an example 3D model. Use the dropdown to
            see what Cerakote® product applies to each part of the firearm.
          </p>
        </div>
        <div className="w-1/2 my-4 border-b-2 border-main-orange"></div>
      </section>
      <section className={'flex flex-col items-center text-center'}>
        <div
          id={'exampleContainer'}
          className={'flex flex-col md:flex-row border-2 border-solid border-blue-500 w-1/2'}>
          <div
            id={'exampleImage'}
            className={'h-[300px] w-1/2 border-red-500 border-solid border-2'}>
            Image goes here
          </div>
          <div
            id={'exampleCanvas'}
            className={'h-[300px] w-1/2 border-red-500 border-solid border-2 relative'}>
            {/* <span className="absolute w-[100%] top-1/3 text-center block">3D Canvas goes here</span> */}
            <GlockDemo modelPath="Glock19" />
          </div>
        </div>
        <div
          id={'examplePartsList'}
          className={'flex flex-col h-[250px] w-1/2 border-green-500 border-solid border-2'}>
          parts list dropdown and info here
        </div>
      </section>
    </article>
  )
}

export default LoggedOutHome
