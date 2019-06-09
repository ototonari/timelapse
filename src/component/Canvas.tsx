import React, { FC, useState, useEffect, Component, RefObject } from 'react';

interface ImageProps {
  src: string,
  alt: string
}

interface CanvasProps {
  width: number,
  height: number,
  images: ImageProps[],
  preloadedCallback: () => {}
}

interface CanvasStatus {
  loadStatusList: LoadStatus[],
  renderingIndex: number
}

enum LoadStatus {
  Loading = 0,
  Loaded = 1
}


class Canvas extends Component<CanvasProps, CanvasStatus> {
  images: HTMLImageElement[] | null = null
  canvas: RefObject<HTMLCanvasElement> = React.createRef()
  intervalId: NodeJS.Timeout | null = null
  constructor(props: CanvasProps) {
    super(props)
    this.state = {
      loadStatusList: this.props.images.map(() => LoadStatus.Loading),
      renderingIndex: 0
    }
  }

  componentDidMount() {
    const { images } = this.props
    const srcs = images.map((image: any) => image.src)
    this.images = this.imagePreLoader(srcs, (i: number) => {
      this.setState(prevState => {
        const newLoadStatusList = prevState.loadStatusList.concat()
        newLoadStatusList[i] = LoadStatus.Loaded

        // callback
        const allReadyLoad = newLoadStatusList.every((loadStatus) => (loadStatus === LoadStatus.Loaded))
        if (allReadyLoad) this.props.preloadedCallback()

        return {
          loadStatusList: newLoadStatusList
        }
      })
    })
  }

  imagePreLoader = (srcs: string[], cb: any) => {
    const images = srcs.map((src, index) => {
      const img = new Image()
      img.src = src
      img.onload = cb(index)
      return img
    })
    return images
  }
  
  enableTimeout = () => {
    this.intervalId = setInterval(() => {
      this.setState(prevState => ({
        renderingIndex: (prevState.renderingIndex < prevState.loadStatusList.length - 1) ? prevState.renderingIndex + 1 : 0
      }))
    }, 60)
  }

  disableTimeout = () => {
    if (this.intervalId) clearInterval(this.intervalId)
  }

  startHandler = () => {
    const { loadStatusList } = this.state
    const allReadyLoad = loadStatusList.every((loadStatus) => (loadStatus === LoadStatus.Loaded))
    if (allReadyLoad) {
      setInterval(() => {
        this.setState(prevState => ({
          renderingIndex: (prevState.renderingIndex < prevState.loadStatusList.length - 1) ? prevState.renderingIndex + 1 : 0
        }))
      }, 60)
    }
  }

  drawCanvas = (index: number) => {
    if (this.images === null) return
    const img = this.images[index]
    if (img === null) return 
    const canvas = this.canvas.current
    if (canvas === null) return 
    const ctx = canvas.getContext("2d")
    if (ctx === null) return
    const { width, height } = this.props
    ctx.drawImage(img, 0, 0, width, height)
  }

  render() {
    const { renderingIndex } = this.state
    const {  width, height } = this.props
    this.drawCanvas(renderingIndex)
    return(
      <>
        <div>
          <canvas ref={this.canvas} width={width} height={height} />
        </div>
      </>
    )
  }
}
export default Canvas