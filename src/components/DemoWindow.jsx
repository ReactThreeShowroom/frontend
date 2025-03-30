import { Canvas } from '@react-three/fiber'
import GlockDemo from './GlockDemo'
import AR15Demo from './AR15Demo'
import GreyRedGlockDemo from './GreyRedGlockDemo'
import * as THREE from 'three'

const DemoWindow = ({ imgUrl = '/images/PinkGlock.png' }) => {
  const pickModel = () => {
    switch (imgUrl) {
      case '/images/PinkGlock.png':
        return <GlockDemo />
      case '/images/AR15.png':
        return <AR15Demo />
      case '/images/GreyRedGlock.png':
        return <GreyRedGlockDemo />
      default:
        return <GlockDemo />
    }
  }
  // replace text with a custom component or something later
  const pickParts = () => {
    switch (imgUrl) {
      case '/images/PinkGlock.png':
        return 'pinkGlock Part Text'
      case '/images/AR15.png':
        return 'AR15 Part Text'
      case '/images/GreyRedGlock.png':
        return 'GreyRedGlock Part Text'
      default:
        return 'pinkGlock Part Text'
    }
  }
  const changeScroll = () => {
    let style = document.body.style.overflow
    document.body.style.overflow = style === 'hidden' ? 'auto' : 'hidden'
  }
  return (
    <section className={'flex flex-col justify-center items-center text-center w-full'}>
      <div
        id={'exampleContainer'}
        className={'flex flex-col justify-center items-center lg:flex-row w-full'}>
        <img
          id={'exampleImage'}
          className={
            'h-[300px] lg:h-[375px] w-[400px] lg:w-[500px] mx-0 my-2 md:mx-2 md:my-2 lg:my-0 rounded-md'
          }
          src={imgUrl}
        />
        <div
          id={'exampleCanvas'}
          className={
            'h-[300px] lg:h-[375px] w-[400px] lg:w-[500px] mx-0 my-2 md:mx-2 md:my-2 lg:my-0 rounded-md border-main-orange border-[1px]'
          }
          onMouseEnter={changeScroll}
          onMouseLeave={changeScroll}>
          <Canvas gl={{ toneMapping: THREE.NoToneMapping }}>{pickModel()}</Canvas>
        </div>
      </div>
      <div
        id={'examplePartsList'}
        className={
          'flex flex-col h-[250px] w-[400px] lg:w-[calc(1000px+1em)] m-2 border-main-orange border-[1px] rounded-md'
        }>
        {pickParts()}
      </div>
    </section>
  )
}

export default DemoWindow
