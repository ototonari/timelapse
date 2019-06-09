import React, { FC, useState, useEffect, Component, RefObject } from 'react';

export interface Image {
  src: string,
  alt: string
}

interface TimelapseProps {
  images: Image[]
}

interface TimelapseState {
  showImageIndex: number,
  enable: boolean,
}

export const TimelapseFC: FC<TimelapseProps> = (props: TimelapseProps) => {
  const [hiddenIndex, setHiddenIndex] = useState(0)
  const [enable, setEnable] = useState(false)
  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      if (enable === false) return

      const { length } = props.images
      if (hiddenIndex < length - 1) {
        setHiddenIndex(hiddenIndex + 1)
      }
      else {
        setHiddenIndex(0)
      }
    }, 50)

    return () => clearInterval(intervalId)
  })
  const onClickHandler = () => setEnable(!enable)
  const images = props.images.map((image, index) => <img id="slideImage" className={(index >= hiddenIndex) ? "visibleImage" : "hiddenImage"} key={index} {...image} /> ).reverse()
  return (
    <>
      <div id="controllContainer" >
        { hiddenIndex }
        <button onClick={onClickHandler} type="button" >{(enable) ? "Stop" : "Start"}</button>
      </div>
      <div >
        {(enable) ? images : null }
      </div>
    </>
  )
}

export class Timelapse extends Component<TimelapseProps> {
  constructor(props: TimelapseProps) {
    super(props)
    const { images } = this.props
    const img = new Image()
    const drow = () => {
      const node = this.canvasRef.current;
      if (node) {
        
      }
    }
    img.addEventListener("load", drow, false);
    img.src = images[0].src
  }
  canvasRef: RefObject<HTMLCanvasElement> = React.createRef()
  render () {
    return (
      <canvas ref={this.canvasRef} />
    )
  }
}



// export class Timelapse extends Component<TimelapseProps, TimelapseState> {
//   constructor(props: TimelapseProps) {
//     super(props)
//     this.state = {
//       showImageIndex: 0,
//       enable: false,
//     }
//   }

//   intervalId: NodeJS.Timeout | null = null

//   rollIndex = () => {
//     this.setState(prevState => {
//       const newIndex = (prevState.showImageIndex < this.props.images.length - 1) ? prevState.showImageIndex + 1 : 0
//       return { showImageIndex: newIndex }
//     })
//   }

//   enableSwitch = ()  => {
//     this.setState(prevState => ({ enable: !prevState.enable}))
//   }
//   componentDidMount = () => {
//     this.intervalId = setInterval(() => {
//       if (this.state.enable) this.rollIndex()
//     }, 10)
//   }

//   componentWillUnmount = () => {
//     if (this.intervalId) clearInterval(this.intervalId)
//   }

//   render () {
//     const { showImageIndex, enable } = this.state
//     // const imgComponents = this.props.images.map((images, index) => <li style={{ position: 'absolute', top: 0, visibility: (showImageIndex < index) ? 'hidden' : 'visible'}} key={index}><img style={{ width: 600, height: 600 }} {...images} /></li> ).sort()
//     const changeStyle = (hiddenIndex: number) => {
//       return this.props.images.map((images, index) => 
//         <li style={{ visibility: (hiddenIndex >= index) ? 'visible' : 'hidden', position: 'absolute', top: 0, }} key={index}>
//           <img style={{  }} {...images} />
//         </li> ).sort()
//     }
//     const imageBox = () => (
//       <ul style={{ position: 'absolute' }}>
//         { changeStyle(showImageIndex) }
//       </ul>
//     )
//     return (
//       <div>
//         <button type="button" onClick={this.enableSwitch} >Start</button>
//         { (enable) ? imageBox() : null }
//       </div>
//     )
//   }
// }

