import React from 'react'
import { Canvas } from '@react-three/fiber'
import GlockDemo from './GlockDemo'
import AR15Demo from './AR15Demo'
import NintendoGlockDemo from './NintendoGlockDemo'

const changeScroll = () => {
    let style = document.body.style.overflow
    document.body.style.overflow = style === 'hidden' ? 'auto' : 'hidden'
  }

const DemoWindow = ({ 
  imgUrl="/images/PinkGlock.jpg", 
  modelPath="Glock19"
}) => {

  const pickModel = () => {
    switch(imgUrl) {
        case '/images/PinkGlock.jpg':
            return <GlockDemo modelPath={modelPath} />
        case '/images/AR15.jpg':
            return <AR15Demo modelPath={modelPath} />
        case '/images/NintendoGlock.jpg':
            return <NintendoGlockDemo modelPath={modelPath} />
        default:
            return <GlockDemo modelPath="Glock19" />
    }
  } 

  return (
    <section className={'flex flex-col items-center text-center'}>
    <div
      id={'exampleContainer'}
      className={'flex flex-col md:flex-row border-2 border-solid border-blue-500 w-1/2 '}>
      <img
        id={'exampleImage'}
        className={'h-[300px] w-1/2 border-red-500 border-solid border-2'}
        src={imgUrl}
      />
      <div
        id={'exampleCanvas'}
        className={'h-[300px] w-1/2 border-red-500 border-solid border-2 relative'}>
        {/* <span className="absolute w-[100%] top-1/3 text-center block">3D Canvas goes here</span> */}
        <div 
          className={'h-full w-full'} 
          onMouseEnter={changeScroll} 
          onMouseLeave={changeScroll}
        >
          <Canvas>
            {pickModel()}
          </Canvas>
        </div>
      </div>
    </div>
    <div
      id={'examplePartsList'}
      className={'flex flex-col h-[250px] w-1/2 border-green-500 border-solid border-2'}>
      parts list dropdown and info here
    </div>
  </section>
  )
}

export default DemoWindow
