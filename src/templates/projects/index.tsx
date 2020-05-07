import React from 'react'

import './index.scss'

import * as types from '../../shared/types'
import Footer from '../../shared/components/footer'
import { ProjectTransition } from './components/transition'

export interface ProjectPageProps {
  data: {
    projects: {
      edges: types.MarkdownRemarkEdge[]
    }
  }
}

const ProjectPageInner: React.FC<ProjectPageProps> = ({ data: { projects } }: ProjectPageProps) => {

  console.log(projects)

  return (
    <div className="project-page">
      <ProjectPageIntro />
      <ProjectTransition
        bottomColor={`hsla(${projects.edges[0].node.frontmatter.backgroundHue},100%,79%,1)`}
        leftTab={false}
      />
      {
        projects.edges.map((project, idx, array) => {
          console.log(!(idx % 2))
          return (
            <React.Fragment key={idx}>
              <div
                style={{ backgroundColor: `hsla(${project.node.frontmatter.backgroundHue},100%,79%,1)` }}
              >
                {project.node.frontmatter.title}
              </div>
              {idx !== array.length - 1 &&
                <ProjectTransition
                  topColor={`hsla(${project.node.frontmatter.backgroundHue},100%,79%,1)`}
                  bottomColor={`hsla(${array[idx + 1].node.frontmatter.backgroundHue},100%,79%,1)`}
                  leftTab={!(idx % 2)}
                />
              }
            </React.Fragment>
          )
        })
      }
      <Footer />
    </div>
  )
}

export const ProjectPageIntro: React.FC = () => {
  return (
    <>
      <div className="intro">
        <h1>My Projects</h1>
        <div className="caption">
          <hr className="mid-line" />
          <span className="overpass-light">And the stories behind them.</span>
          <hr className="mid-line" />
        </div>
      </div>
    </>
  )
}


export default ProjectPageInner;