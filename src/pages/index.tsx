import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import LandingPage from "../templates/landing/index"
import * as types from "../shared/types"
import { MarkdownRemarkFragment } from '../shared/fragments'

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
  ) {
    ...MarkdownRemarkFields
  }
  work: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/content\/work\//"}}
    sort: { order: [DESC, DESC], fields: [frontmatter___priority, frontmatter___startDate] }
  ) {
    ...MarkdownRemarkFields
  }
}
`

export default IndexPage
