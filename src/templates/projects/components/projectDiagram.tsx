import React, { useRef, useLayoutEffect, useState } from 'react'
import Image from 'gatsby-image'

import './projectDiagram.scss'

import * as types from '../../../shared/types'
// @ts-ignore
import IphoneFrame from '../../../../src/images/iphone_frame.svg'

interface ProjectDiagramProps {
  project: types.MarkdownRemark
}

const ProjectDiagram: React.FC<ProjectDiagramProps> = ({ project }: ProjectDiagramProps) => {

  const [sizes, setSizes] = useState({ height: 0, width: 0 })

  const ref = useRef(null)

  useLayoutEffect(() => {
    if (ref && ref.current)
      setSizes(ref.current.getBoundingClientRect())
  }, [ref])

  if (project.frontmatter.mobileImg) {
    return (
      <div className="mobile" style={{ width: sizes.width, height: sizes.height }}>
        <div className="transformer">
          <IphoneFrame className="frame" />
          <div className="screen" ref={ref}>
            <Image fluid={project.frontmatter.mobileImg.childImageSharp.fluid} />
          </div>
        </div>
      </div>
    )
  }

  if (project.frontmatter.previewImg) {
    return (
      <div className="preview">
        <Image fluid={project.frontmatter.previewImg.childImageSharp.fluid} />
      </div>
    )
  }

  return (
    <div />
  )

}

export default ProjectDiagram;