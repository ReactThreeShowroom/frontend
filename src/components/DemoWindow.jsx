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
        const bazookaPink = "#f7bbba"
        const armorBlack = "#1e181a"
        return [
          {text: "Grip: Bazooka Pink", color: bazookaPink},
          {text: "Slide: Bazooka Pink", color: bazookaPink},
          {text: "Receiver: Bazooka Pink", color: bazookaPink},
          {text: "Trigger: Armor Black", color: armorBlack},
          {text: "Barrel: Armor Black", color: armorBlack},
        ]
      case '/images/AR15.png':
        return [
          {text: "Forward Assist: Desert Verde", color: "#dbd5ba"},
          {text: "Lower Receiver: Desert Verde", color: "#dbd5ba"},
          {text: "Barrel Handguard: Desert Verde", color: "#dbd5ba"},
          {text: "Upper Rail: Desert Verde", color: "#dbd5ba"},

        ]
      case '/images/GreyRedGlock.png':
        return [
          {text: "Grip: Elite Storm", color: "#9c9d91"},
          {text: "Trigger: Blood Orange", color: "#dd4128"},
          {text: "Barrel: Blood Orange", color: "#dd4128"},
          {text: "Trigger Detail: Blood Orange", color: "#dd4128"},
          {text: "Detail Trigger: Blood Orange", color: "#dd4128"},
          {text: "Slide Lock: Blood Orange", color: "#dd4128"},
          {text: "Slide Stop Lever: Blood Orange", color: "#dd4128"},
          {text: "Receiver Detail: Blood Orange", color: "#dd4128"},
          {text: "Mag Catch: Blood Orange", color: "#dd4128"},
          {text: "Recoil Spring: Blood Orange", color: "#dd4128"},
        ]
      default:
        return ['pinkGlock Part Text']
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
          'flex flex-col h-[250px] w-[400px] lg:w-[calc(1000px+1em)] m-2 border-main-orange border-[1px] rounded-md whitespace-pre-line'
        }>
        {pickParts().map(({text, color}, idx) => {
          return (
            <div className='flex self-center items-end text-end gap-2' key={idx}>
              {text} 
              <div className={`h-3 w-3 mb-1 bg-${color} border-black border-[1px]`}/>
            </div>)
          })
        }
      </div>
    </section>
  )
}

export default DemoWindow
