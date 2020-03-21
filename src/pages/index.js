import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({data}) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
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
