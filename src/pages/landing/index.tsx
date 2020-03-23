import React from 'react'
import { Link } from 'gatsby'

import './index.scss'

import ReadMore from './components/readMore'
import WorkCard from '../../templates/landing/workCard'
import * as types from '../../shared/types'

interface LandingPageProps {
  work: types.MarkdownRemarkEdge[]
  projects: types.MarkdownRemarkEdge[]
}

const LandingPage: React.FC<LandingPageProps> = ({ work, projects }: LandingPageProps) => {
  return (
    <div className="landing-page">
      <LandingPageIntro />
      <Cards cards={work} title="Work Experience" />
      <Cards cards={projects} title="Projects" />
    </div>
  )
}

export const LandingPageIntro: React.FC = () => {
  return (
    <>
      <div className="intro">
        <div className="head">
          <div className="content">
            <div className="title">
              <div className="top">
                <span className="overpass-light">Hello! I am</span>
                <hr className="mid-line" />
              </div>
              <div className="mid">
                <h1>Tobias Wahyudi</h1>
              </div>
              <div className="bot">
                <hr className="mid-line" />
                <span className="overpass-light">Software Engineer Wizard-in-Training</span>
              </div>
            </div>
            <div className="paragraph-intro">
              <p>Exploring the arts of front-end, back-end, and machine learning. Collecting skills and stories, one adventure at a time.</p>
            </div>
          </div>
          <div className="links">
            <div className="links-inner">
              <Link to='/'>profile</Link>
              <Link to='/'>projects</Link>
              <Link to='/'>contact</Link>
            </div>
          </div>
        </div>
        <div className="paragraph-about">
          <p>I’m a second-year CS student at the University of Waterloo. I'm currently exploring front-end and back-end software development, centered around React, Django, and GraphQL.</p>
        </div>
        <div className="paragraph-interests">
          <p>While I am presently focused on software development, I intend to keep an open eye towards academic and research potentials. My long-term interests include machine learning and computational linguistics.</p>
        </div>
        <ReadMore path='/' />
      </div>
    </>
  )
}

interface CardsProps {
  cards: types.MarkdownRemarkEdge[]
  title: string
}

export const Cards: React.FC<CardsProps> = ({ cards = [], title }: CardsProps) => {
  return (
    <>
      <div className="experience">
        <h2>{title}</h2>
        <div className="cards">
          {
            cards.map(edge => <WorkCard card={edge.node} />)
          }
        </div>
        <ReadMore path='/' />
      </div>
    </>
  )
}

export default LandingPage;