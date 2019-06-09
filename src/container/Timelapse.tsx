import React, { FC, useState, useEffect } from 'react';
import { TimelapseFC, Image } from "../component/Timelapse";
import ImagePreloader from "../component/ImagePreloader";
import { sampleImagesFromUnsplash } from "../lib/unsplash";

enum LoadState {
  None = 0,
  Loading = 1,
  Loaded = 2
}

export const sampleImageCreator = (maxIndex: number) => {
  const assetsPath = 'assets/sample/'
  const extension = '.jpg'
  function zeroPadding(num: number, length: number){
    return ('0000000000' + num).slice(-length);
  }
  const size = new Array(maxIndex).fill(0)
  const images: Image[] = size.map((n, index) => {
    const No = zeroPadding(index + 1, 4)
    const image: Image = {
      src: assetsPath + 'img' + No + extension,
      alt: 'sample'
    }
    return image
  })
  console.log(images)
  return images
}

export const TimelapseApp: FC = (props) => {
  const [loadState, setLoadState] = useState<LoadState>(LoadState.None)
  const [images, setImages] = useState<null | Image[]>(null)
  useEffect(() => {
    switch (loadState) {
      case LoadState.None:
        // sampleImagesFromUnsplash("nature").then((images) => {
        //   setLoadState(LoadState.Loading)
        //   setImages(images)
        // })
        setLoadState(LoadState.Loading)
        setImages(sampleImageCreator(100))
        break
      case LoadState.Loading:
        setTimeout(() => setLoadState(LoadState.Loaded), 3000)
        break
      default:
        break
      }
  })

  const component = (loadState: LoadState) => {
    switch(loadState) {
      case LoadState.None:
        return "Loading Images"
      case LoadState.Loading:
        if (images === null) return null
        return (
          <>
            <ImagePreloader images={images} />
            Loading Images...
          </>
        )
      case LoadState.Loaded:
        if (images === null) return "images is null"
        return (
          <div className="App">
            <TimelapseFC images={images} />
          </div>    
        )
    }
  }
  return (
    <>
      { component(loadState) }
    </>
  )
}