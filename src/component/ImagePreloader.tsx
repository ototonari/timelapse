import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Image } from "./Timelapse";

interface ImagePreloaderProps {
  images: Image[]
}

const ImagePreloader: React.FunctionComponent<ImagePreloaderProps> = ({ images }) => (
  <Helmet>
    {images
      .filter(item => item)
      .map((image, index) => (
        <link key={index} rel="preload" href={image.src} as="image" />
      ))}
  </Helmet>
)

export default ImagePreloader