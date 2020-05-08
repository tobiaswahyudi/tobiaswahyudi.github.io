import React from 'react'

import './index.scss'

import * as types from '../../shared/types'
import Footer from '../../shared/components/footer'
import { ProjectTransition } from './components/transition'
import ProjectCard from './components/projectCard'
import Navbar from '../../shared/components/navbar'

export interface ProjectPageProps {
  data: {
    projects: {
      edges: types.MarkdownRemarkEdge[]
    }
  }
}

export const hueToTopColor = (hue: string): string => `hsla(${hue},100%,79%,1)`
export const hueToBottomColor = (hue: string): string => `hsla(${hue},57%,64%,1)`

const ProjectPageInner: React.FC<ProjectPageProps> = ({ data: { projects } }: ProjectPageProps) => {
  return (
    <>
      <Navbar />
      <div className="project-page">
        <ProjectPageIntro />
        <ProjectTransition
          bottomColor={hueToTopColor(projects.edges[0].node.frontmatter.backgroundHue)}
          leftTab={false}
        />
        {
          projects.edges.map(({ node: project }, idx, array) => {
            return (
              <React.Fragment key={idx}>
                <ProjectCard
                  project={project}
                  leftTab={!!(idx % 2)}
                />
                {idx !== array.length - 1 &&
                  <ProjectTransition
                    topColor={hueToBottomColor(project.frontmatter.backgroundHue)}
                    bottomColor={hueToTopColor(array[idx + 1].node.frontmatter.backgroundHue)}
                    leftTab={!(idx % 2)}
                  />
                }
              </React.Fragment>
            )
          })
        }
        <Footer />
      </div>
    </>
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