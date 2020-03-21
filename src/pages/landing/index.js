import React from 'react'

import './index.scss'
import { Link } from 'gatsby'

const LandingPage = ({ work, projects }) => {
  return (
    <div className="landing-page">
      <LandingPageIntro />
    </div>
  )
}

export const LandingPageIntro = () => {
  return (
    <>
      <div className="intro">
        <div className="head">
          <div className="title">
            <div className="top">
              <span>Hello! I am</span>
              <hr className="midLine" />
            </div>
            <div className="mid">
              <span className="text-serif">Tobias Wahyudi</span>
            </div>
            <div className="bot">
              <hr className="midLine" />
              <span>Software Engineer Wizard-in-Training</span>
            </div>
          </div>
          <div className="nav">
            <div className="navInner">
              <Link>profile</Link>
              <Link>projects</Link>
              <Link>contact</Link>
            </div>
          </div>
        </div>
        <div className="paragraphIntro">
          <p>Exploring the arts of front-end, back-end, and machine learning. Collecting skills and stories, one adventure at a time.</p>
        </div>
        <div className="paragraphAbout">
          <p>I’m a second-year CS student at the University of Waterloo. I'm currently exploring front-end and back-end software development, centered around React, Django, and GraphQL.</p>
        </div>
        <div className="paragraphInterests">
          <p>While I am presently focused on software development, I intend to keep an open eye towards academic and research potentials. My long-term interests include machine learning and computational linguistics.</p>
        </div>
      </div>
    </>
  )
}

export default LandingPage;