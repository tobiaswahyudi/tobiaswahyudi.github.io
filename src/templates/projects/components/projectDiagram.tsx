import React from 'react'
import Image from '../../../shared/components/Image'

import './projectDiagram.scss'

import * as types from '../../../shared/types'
// @ts-ignore
import IphoneFrame from '../../../../src/images/iphone_frame.svg'

interface ProjectDiagramProps {
  project: types.MarkdownRemark
}

const ProjectDiagram: React.FC<ProjectDiagramProps> = ({ project }: ProjectDiagramProps) => {

  if (project.frontmatter.mobileImg) {
    return (
      <div className="mobile">
        <div className="transformer">
          <IphoneFrame className="frame" />
          <div className="screen">
            <Image image={project.frontmatter.mobileImg} />
          </div>
        </div>
      </div>
    )
  }

  if (project.frontmatter.previewImg) {
    return (
      <div className="preview">
        <Image image={project.frontmatter.previewImg} />
      </div>
    )
  }

  return (
    <div />
  )

}

export default ProjectDiagram;