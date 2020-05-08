import React from "react"
import { graphql } from "gatsby"

export const ImageSharpFragment = graphql`
fragment ImageSharpFields on File {
  publicURL
  childImageSharp {
    fluid {  
      aspectRatio
      base64
      originalImg
      originalName
      presentationHeight
      presentationWidth
      sizes
      src
      srcSet
      srcSetWebp
      srcWebp
      tracedSVG
    }
  }
}
`

export const MarkdownRemarkFragment = graphql`
fragment MarkdownRemarkFields on MarkdownRemarkConnection {
  edges {
    node {
      html
      id
      frontmatter {
        date
        path
        slug
        tags
        
        title
        position
        location
        startDate
        endDate
        endDateString

        excerpt
        img {
          ...ImageSharpFields
        }

        mobileImg {
          ...ImageSharpFields
        }
        previewImg {
          ...ImageSharpFields
        }

        priority

        cardImageBackground
        backgroundHue
      }
    }
  }
}
`