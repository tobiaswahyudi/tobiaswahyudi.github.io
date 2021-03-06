import React from 'react'

import { graphql } from 'gatsby'
import ProjectPageInner, { ProjectPageProps } from '../templates/projects'
import { MarkdownRemarkFragment } from '../shared/fragments'
import SEO from '../components/seo'

export const query = graphql`
query{
  projects: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/content\/projects\//"}}
    sort: { order: [DESC, DESC], fields: [frontmatter___priority, frontmatter___startDate] }
  ) {
    ...MarkdownRemarkFields
  }
}
`

const ProjectPage: React.FC<ProjectPageProps> = ({ data }: ProjectPageProps) => {

  return (
    <>
      <SEO title="Projects" />
      <ProjectPageInner data={data} />
    </>
  )
}


export default ProjectPage;