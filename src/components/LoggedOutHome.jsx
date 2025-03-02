import { Link } from 'react-router-dom'
import DemoWindow from './DemoWindow'
import { useState } from 'react'

const LoggedOutHome = () => {
  const demoPaths = {
    GlockDemo1: '/images/PinkGlock.jpg',
    AR15Demo: '/images/AR15.jpg',
    GlockDemo2: '/images/NintendoGlock.jpg'
  }
  const modelPaths = {
    GlockDemo1: '',
    AR15Demo: '',
    GlockDemo2: ''
  }

  const [imgUrl, setImgUrl] = useState('/images/PinkGlock.jpg')

  const handleImgChange = (e) => {
    setImgUrl(demoPaths[e.target.value])
  }

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
        <select
          className={'font-normal border-[1px] rounded-md border-main-orange m-2'}
          onChange={handleImgChange}>
          <option value="GlockDemo1">Glock Demo 1</option>
          <option value="GlockDemo2">Glock Demo 2</option>
          <option value="AR15Demo">AR15 Demo</option>
        </select>
      </section>
      <DemoWindow imgUrl={imgUrl} />
      <section className={'flex flex-col items-center text-center'}>
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
    </article>
  )
}

export default LoggedOutHome
