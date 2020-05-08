import React from 'react'

import { graphql } from 'gatsby'
import ProjectPageInner, { ProjectPageProps } from '../templates/projects'
import { MarkdownRemarkFragment } from '../shared/fragments'

export const query = graphql`
query{
  projects: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/content\/projects\//"}}
    sort: { order: [DESC, DESC], fields: [frontmatter___priority, frontmatter___startDate] }
    limit: 3,
  ) {
    ...MarkdownRemarkFields
  }
}
`

const ProjectPage: React.FC<ProjectPageProps> = ({ data }: ProjectPageProps) => {

  return (
    <ProjectPageInner data={data} />
  )
}


export default ProjectPage;