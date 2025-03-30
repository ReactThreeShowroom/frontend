import { Link } from 'react-router-dom'
import DemoWindow from './DemoWindow'
import { useState } from 'react'

const LoggedOutHome = () => {
  const demoPaths = {
    GlockDemo1: '/images/PinkGlock.png',
    AR15Demo: '/images/AR15.png',
    GlockDemo2: '/images/GreyRedGlock.png'
  }

  const [imgUrl, setImgUrl] = useState('/images/PinkGlock.png')

  const handleImgChange = (e) => {
    setImgUrl(demoPaths[e.target.value])
  }

  return (
    <article className={'flex flex-col justify-center items-center w-full'}>
      <section className="flex flex-col md:flex-row justify-center items-center w-full">
        <div className={'sm:hidden md:visible w-1/4'}></div>
        <div className="flex flex-col items-center lg:w-1/2">
          <p className="font-bold text-main-orange text-2xl text-center">
            Having A Hard Time Explaining Turning This —
          </p>
          <img
            src={'/images/before.png'}
            className="h-[250px] w-auto rounded-l-[250px] rounded-r-2xl my-2"
          />
          <p className="font-bold text-main-orange text-2xl">Into This?</p>
          <img
            src={'/images/after.png'}
            className="h-[250px] w-auto rounded-l-[250px] rounded-r-2xl my-2"
          />
        </div>
        <div className={'sm:hidden md:visible w-1/4'}></div>
        <div className="flex flex-row justify-between items-center w-full md:hidden lg:hidden"></div>
      </section>
      <section className={'flex flex-col items-center text-center'}>
        <div className="w-1/2 my-4 border-b-2 border-main-orange"></div>
        <div className={'flex flex-col md:w-1/2 m-2 md:m-0'}>
          <p className="my-1 font-bold">
            Want to know what your clients' firearms will look like with Cerakote® products{' '}
            <span className="text-main-orange">BEFORE</span> you apply them?
          </p>
          <p className="my-1 font-bold">
            Looking to boost sales by showing off what your client's firearms could look like if
            they choose <span className="text-main-orange">YOU</span> as their Cerakote® applicator?
          </p>
          <p className="my-1 text-main-orange font-bold text-2xl">Look no further.</p>
          <p>
            Below is a finished product side-by-side with an example 3D model. Use the dropdown to
            see what Cerakote® product applies to each part of the firearm.
          </p>
        </div>
        <div className="w-1/2 my-4 border-b-2 border-main-orange"></div>
      </section>
      <section className={'flex flex-col justify-center items-center text-center'}>
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
        <p>
          <Link className={'text-main-orange font-bold'} to={'/signin'}>
            Log in
          </Link>{' '}
          or{' '}
          <Link className={'text-main-orange font-bold'} to={'/signup'}>
            sign up
          </Link>{' '}
          to access the Cerakote® Showroom!
        </p>
      </section>
    </article>
  )
}

export default LoggedOutHome
