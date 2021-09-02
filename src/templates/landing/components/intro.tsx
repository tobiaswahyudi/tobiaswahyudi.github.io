import React from 'react'
import { Link } from 'gatsby'

import '../index.scss'

import ReadMore from './readMore'

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
                <span className="overpass-light">Developer, Designer, Learner</span>
              </div>
            </div>
            <div className="paragraph-intro">
              <p>Learning new things, collecting skills, and making friends - one story at a time.</p>
            </div>
          </div>
          <div className="links">
            <div className="links-inner">
              {/* <Link to='/projects'>projects</Link> */}
              <Link to='/#work'>work</Link>
              <Link to='/#projects'>projects</Link>
              <Link to='/#contact'>contact</Link>
              <a href='/TobiasWahyudi_Resume_Jan2021_Both.pdf' className="resume">resume</a>
            </div>
          </div>
        </div>
        <div className="paragraph-about">
          <p>I’m Toby, a third-year CS student at the University of Waterloo. I'm currently focused on full-stack web development and design, while exploring whatever else catches my eye. I enjoy building things with Javascript, particularly React and GraphQL.</p>
        </div>
        <div className="paragraph-interests">
          <p>While I am presently centered on web and software development, I intend to keep an open eye towards academic and research potentials. My long-term interests include graphics, computational linguistics, and visual storytelling.</p>
        </div>
        {/* <ReadMore path='/' /> */}
      </div>
    </>
  )
}

export default LandingPageIntro;