import React from 'react'

import './index.scss'

import * as types from '../../shared/types'
import Footer from '../../shared/components/footer'
import LandingPageIntro from './components/intro'
import Cards from './components/cards'
import ContactForm from './components/contactForm'
import Navbar from '../../shared/components/navbar'

interface LandingPageProps {
  work: types.MarkdownRemarkEdge[]
  projects: types.MarkdownRemarkEdge[]
}

const LandingPage: React.FC<LandingPageProps> = ({ work, projects }: LandingPageProps) => {
  return (
    <>
      <Navbar showOnScroll={true} scrollTriggerVh={40} />
      <div className="landing-page">
        <LandingPageIntro />
        <Cards cards={work} title="Work Experience" />
        <Cards cards={projects} title="Projects" link="/projects" />
        <ContactForm />
        <Footer />
      </div>
    </>
  )
}

export default LandingPage;