import { useEffect } from 'react'
import { Image } from 'react-bootstrap'

export const PreviewImage = ({ image, ...rest }) => {
  image.preview = URL.createObjectURL(image)
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image.preview)
    }
  }, [image])

  return <Image src={image.preview} {...rest} />
}
