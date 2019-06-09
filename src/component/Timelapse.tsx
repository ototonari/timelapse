import React, { Component, RefObject } from 'react';
import { ee } from "timelapse/src/lib/Events";

export interface ImageProps {
  src: string,
  alt: string
}

interface TimelapseProps {
  width: number,
  height: number,
  images: ImageProps[],
  preloadedCallback: () => void,
  timelapseHandle: boolean | null,
  fps: number
}

interface TimelapseStatus {
  loadStatusList: LoadStatus[],
  renderingIndex: number
}

enum LoadStatus {
  Loading = 0,
  Loaded = 1
}

enum EventEmittStatus {
  ALLREADYLOAD = "ALL_READY_LOAD",
  START = "TIMELAPSE_START",
  STOP = "TIMELAPSE_STOP"
}

class Timelapse extends Component<TimelapseProps, TimelapseStatus> {
  images: HTMLImageElement[] | null = null
  canvas: RefObject<HTMLCanvasElement> = React.createRef()
  intervalId: NodeJS.Timeout | null = null
  fpsForMilisecond: number;
  constructor(props: TimelapseProps) {
    super(props)
    this.state = {
      // 画像の読み込み状態を格納した配列
      loadStatusList: this.props.images.map(() => LoadStatus.Loading),
      // 描画する画像のインデックス
      renderingIndex: 0
    }
    // イメージのローディングが終わったら発火する
    ee.once(EventEmittStatus.ALLREADYLOAD, this.props.preloadedCallback)
    // タイムラプス始まる
    ee.on(EventEmittStatus.START, this.enableTimelapse)
    // タイムラプス終わる
    ee.on(EventEmittStatus.STOP, this.disableTimelapse)
    // fps を ミリセカンドに変換する(1000/fps だと体感が一致しないため調整で4000)
    this.fpsForMilisecond = 4000 / this.props.fps
  }

  componentDidMount() {
    // 画像のプリロードを始める
    const { images } = this.props
    const srcs = images.map((image: any) => image.src)
    this.images = this.imagePreLoader(srcs, (i: number) => {
      // 読み込みが終われば、ステートの読み込み状態を変更する
      this.setState(prevState => {
        const newLoadStatusList = prevState.loadStatusList.concat()
        newLoadStatusList[i] = LoadStatus.Loaded

        // イメージのローディングが終わったことを知らせるイベント
        const allReadyLoad = newLoadStatusList.every((loadStatus) => (loadStatus === LoadStatus.Loaded))
        if (allReadyLoad) {
          ee.emit(EventEmittStatus.ALLREADYLOAD, this.props.preloadedCallback)
        }

        return {
          loadStatusList: newLoadStatusList
        }
      })
    })
  }

  componentDidUpdate(prevProps: TimelapseProps) {
    // プロパティから再生、停止を受け取り、処理する
    const { timelapseHandle } = this.props
    if (timelapseHandle === prevProps.timelapseHandle) return
    switch (timelapseHandle) {
      case true:
        ee.emit(EventEmittStatus.START)
        console.log("start timelapse")
        break
      case false:
        ee.emit(EventEmittStatus.STOP)
        console.log("stop timelapse")
        break
      default:
        break
    }
  }

  // 画像のプリロードを担当する
  imagePreLoader = (srcs: string[], cb: any) => {
    const images = srcs.map((src, index) => {
      const img = new Image()
      // 画像のプリロードを始める
      img.src = src
      img.onload = cb(index)
      return img
    })
    return images
  }
  
  // タイムラプスを始める
  enableTimelapse = () => {
    this.intervalId = setInterval(() => {
      const { renderingIndex } = this.state
      this.drawCanvas(renderingIndex)
  
      this.setState(prevState => ({
        renderingIndex: (prevState.renderingIndex < prevState.loadStatusList.length - 1) ? prevState.renderingIndex + 1 : 0
      }))
    }, this.fpsForMilisecond)
  }

  // タイムラプスを停止する
  disableTimelapse = () => {
    if (this.intervalId) clearInterval(this.intervalId)
  }

  // canvas に描画する
  drawCanvas = (index: number) => {
    if (this.images === null) return
    // this.images から描画する image object を取り出す
    const img = this.images[index]
    if (img === null) return 
    const canvas = this.canvas.current
    if (canvas === null) return 
    const ctx = canvas.getContext("2d")
    if (ctx === null) return
    const { width, height } = this.props
    // canvas に描画する
    ctx.drawImage(img, 0, 0, width, height)
  }

  render() {
    const {  width, height } = this.props

    return(
      <>
        <div>
          <canvas ref={this.canvas} width={width} height={height} />
        </div>
      </>
    )
  }
}
export default Timelapse