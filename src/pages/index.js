import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import LandingPage from "./landing"

const IndexPage = ({data}) => {
  console.log(data)
  return (
    <>
      <SEO title="Home" />
      <LandingPage />
    </>
  )
}

export const query = graphql`
query{
  allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___priority, frontmatter___date] }
    limit: 1000
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
          priority
          position
        }
      }
    }
  }
}
`

export default IndexPage
