import { Canvas } from '@react-three/fiber'
import GlockDemo from './GlockDemo'
import AR15Demo from './AR15Demo'
import NintendoGlockDemo from './NintendoGlockDemo'

const DemoWindow = ({ imgUrl = '/images/PinkGlock.jpg' }) => {
  const pickModel = () => {
    switch (imgUrl) {
      case '/images/PinkGlock.jpg':
        return <GlockDemo />
      case '/images/AR15.jpg':
        return <AR15Demo />
      case '/images/NintendoGlock.jpg':
        return <NintendoGlockDemo />
      default:
        return <GlockDemo />
    }
  }
  const changeScroll = () => {
    let style = document.body.style.overflow
    document.body.style.overflow = style === 'hidden' ? 'auto' : 'hidden'
  }
  return (
    <section className={'flex flex-col items-center text-center'}>
      <div id={'exampleContainer'} className={'flex flex-col md:flex-row w-1/2 '}>
        <img id={'exampleImage'} className={'h-[300px] w-1/2 '} src={imgUrl} />
        <div id={'exampleCanvas'} className={'h-[300px] w-1/2 relative'}>
          {/* <span className="absolute w-[100%] top-1/3 text-center block">3D Canvas goes here</span> */}
          <div className={'h-full w-full'} onMouseEnter={changeScroll} onMouseLeave={changeScroll}>
            <Canvas>{pickModel()}</Canvas>
          </div>
        </div>
      </div>
      <div id={'examplePartsList'} className={'flex flex-col h-[250px] w-1/2 '}>
        parts list and color info here
      </div>
    </section>
  )
}

export default DemoWindow
