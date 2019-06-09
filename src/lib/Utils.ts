interface ImageProps {
  src: string,
  alt: string
}

export const sampleImageCreator = (maxIndex: number) => {
  const assetsPath = 'assets/sample/'
  const extension = '.jpg'
  function zeroPadding(num: number, length: number){
    return ('0000000000' + num).slice(-length);
  }
  const size = new Array(maxIndex).fill(0)
  const images: ImageProps[] = size.map((n, index) => {
    const No = zeroPadding(index + 1, 4)
    const image: ImageProps = {
      src: assetsPath + 'img' + No + extension,
      alt: 'sample'
    }
    return image
  })
  console.log(images)
  return images
}
