import React from 'react'
import GatsbyImage from 'gatsby-image'
import { SharpImage } from '../types'

interface ImageProps {
  image: SharpImage
}

const Image: React.FC<ImageProps> = ({ image }: ImageProps) => {
  if (image.childImageSharp && image.childImageSharp.fluid) {
    return <GatsbyImage fluid={image.childImageSharp.fluid} />;
  }

  if (image.childImageSharp && image.childImageSharp.fixed) {
    return <GatsbyImage fixed={image.childImageSharp.fixed} />;
  }

  return <img src={image.publicURL} />;
};

export default Image;
