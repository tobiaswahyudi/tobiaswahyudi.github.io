import React from 'react'

import { graphql } from 'gatsby'
import ProjectPageInner, { ProjectPageProps } from '../templates/projects'

export const query = graphql`
query{
  projects: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/content\/projects\//"}}
    sort: { order: [DESC, DESC], fields: [frontmatter___priority, frontmatter___startDate] }
    limit: 3,
  ) {
    edges {
      node {
        html
        id
        frontmatter {
          date
          path
          tags
          
          title
          position
          location
          startDate
          endDate
          endDateString

          excerpt
          img {
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

          priority

          cardImageBackground
          backgroundHue
        }
      }
    }
  }
}
`

const ProjectPage: React.FC<ProjectPageProps> = ({ data }: ProjectPageProps) => {

  return (
    <ProjectPageInner data={data} />
  )
}


export default ProjectPage;