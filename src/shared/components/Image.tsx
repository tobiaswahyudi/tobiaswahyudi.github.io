import React from 'react'
import GatsbyImage from 'gatsby-image'
import { SharpImage } from '../types'

interface ImageProps {
  image: SharpImage,
  heightRem?: number,
  widthRem?: number
}

const Image: React.FC<ImageProps> = ({ image, heightRem, widthRem }: ImageProps) => {
  if (image.childImageSharp && image.childImageSharp.fluid) {

    const aspectRatio = image.childImageSharp.fluid.aspectRatio;

    return <GatsbyImage fluid={image.childImageSharp.fluid}
      style={{
        ...(heightRem &&
          { maxWidth: (aspectRatio * heightRem) + 'rem' }
        ),
        ...(widthRem &&
          { width: widthRem + 'rem', height: (widthRem / aspectRatio) + 'rem' }
        )
      }}
      imgStyle={{
        ...(widthRem &&
          { width: widthRem + 'rem', height: (widthRem / aspectRatio) + 'rem' }
        )
      }}
    />;
  }

  if (image.childImageSharp && image.childImageSharp.fixed) {
    return <GatsbyImage fixed={image.childImageSharp.fixed} />;
  }

  return <img src={image.publicURL} style={{
    ...(heightRem &&
      { height: heightRem + 'rem' }
    ),
    ...(widthRem &&
      { width: widthRem + 'rem' }
    )
  }}/>;
};

export default Image;
