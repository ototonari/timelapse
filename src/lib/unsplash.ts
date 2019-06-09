// ES Modules syntax
import Unsplash from 'unsplash-js';
import { Image } from "../component/Timelapse";

const unsplash = new Unsplash({
  applicationId: "09f95a007f06381b59c9396f8216ce3b2c2fb13cbea100ee2f1ecfa8c24d48f0",
  secret: "cb74f3a297bad16e485c306aa3e535f4d557141ffba1eab30d2078c9784b61b4"
});

interface PhotoData {
  id: string,
  created_at: Date,
  width: number,
  height: number,
  color: string,
  likes: number,
  user: {
    id: string
  },
  urls: {
    raw: string,
    full: string,
    regular: string,
    small: string,
    thumb: string
  },
  links: {
    self: string,
    html: string,
    download: string
  }
}

export const sampleImagesFromUnsplash = (theme: string) => {
  return unsplash.search.photos(theme, 1)
  .then((res) => res.json())
  .then((json) => {
    console.log(json)
    return json
  })
  .then((json) => {
    const { results } = json
    const images: Image[] = results.slice(0, 100).map((photoData: PhotoData, index: number) => {
      const image: Image = {
        src: photoData.urls.small,
        alt: photoData.user.id
      }
      return image
    })
    return images
  })
}
