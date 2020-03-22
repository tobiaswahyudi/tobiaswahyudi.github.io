import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import LandingPage from "./landing"

const IndexPage = ({ data }) => {
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
    sort: { order: DESC, fields: [frontmatter___priority, frontmatter___date] }
    limit: 3,
    filter: {fileAbsolutePath: {regex: "/\/projects\//"}}
  ) {
    edges {
      node {
        ...allFields
      }
    }
  }
  work: allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___priority, frontmatter___date] }
    limit: 3,
    filter: {fileAbsolutePath: {regex: "/\/work\//"}}
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
  }
}
`

export default IndexPage
