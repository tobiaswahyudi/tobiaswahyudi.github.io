import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import LandingPage from "../templates/landing/index"
import * as types from "../shared/types"

interface LandingQueryType {
  projects: {
    edges: types.MarkdownRemarkEdge[]
  }
  work: {
    edges: types.MarkdownRemarkEdge[]
  }
}

interface IndexPageProps {
  data: LandingQueryType
}

const IndexPage: React.FC<IndexPageProps> = ({ data }: IndexPageProps) => {
  return (
    <>
      <SEO title="Home" />
      <LandingPage work={data.work.edges} projects={data.projects.edges} />
    </>
  )
}

export const query = graphql`
query{
  projects: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/content\/projects\//"}}
    sort: { order: [DESC, DESC], fields: [frontmatter___priority, frontmatter___startDate] }
    limit: 3,
  ) {
    edges {
      node {
        ...allFields
      }
    }
  }
  work: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/content\/work\//"}}
    sort: { order: [DESC, DESC], fields: [frontmatter___priority, frontmatter___startDate] }
    limit: 3,
  ) {
    edges {
      node {
        ...allFields
      }
    }
  }
}

fragment allFields on MarkdownRemark {
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
  }
}
`

export default IndexPage
