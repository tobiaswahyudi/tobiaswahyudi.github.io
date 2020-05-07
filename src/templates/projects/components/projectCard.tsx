import React from 'react'

import './projectCard.scss'

import * as types from '../../../shared/types'
import { formatDate } from './utils'
import { hueToTopColor } from '..'

export interface ProjectCardProps {
  project: types.MarkdownRemark
  leftTab: boolean
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  leftTab
}: ProjectCardProps) => {
  return (
    <div
      className="project-card"
      style={{ backgroundColor: hueToTopColor(project.frontmatter.backgroundHue) }}
    >
      <div className={`header overpass-extrabold ${leftTab ? "left" : ""}`}>
        <span className="title">
          {project.frontmatter.title}
        </span>
        <span className="date">
          {formatDate(project.frontmatter.startDate)}
        </span>
      </div>
      <div className={`content ${leftTab ? "left" : ""}`}>
        <div className="text" dangerouslySetInnerHTML={{ __html: project.html }} />
        <div className="figure">
          <div className="img">
            fig
          </div>
        </div>
      </div>
    </div>
  )
}


export default ProjectCard;