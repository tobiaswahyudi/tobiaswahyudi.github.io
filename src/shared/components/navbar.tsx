import React, { useState, useEffect } from 'react'
import './navbar.scss'
import { Link } from 'gatsby';


interface NavbarProps {
  showOnScroll?: boolean
  scrollTriggerVh?: number
}

const Navbar: React.FC<NavbarProps> = ({ showOnScroll = false, scrollTriggerVh = 0 }: NavbarProps) => {
  const [scrollNav, setScrollNav] = useState<boolean>(!showOnScroll)

  const onScroll = (event: Event) => {
    if (window.scrollY > (window.innerHeight * scrollTriggerVh / 100)) {
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  }

  useEffect(() => {
    if (showOnScroll)
      document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  })

  return (
    <nav className={scrollNav ? 'show' : 'hide'}>
      <div id="title">
        <Link to='/' className="regular-title"><h2>Tobias Wahyudi</h2></Link>
        <Link to='/' className="small-title"><h2>TW</h2></Link>
      </div>
      <div className="nav-links">
        <Link to='/'>home</Link>
        <NavSeparator />
        {/* <Link to='/projects'>projects</Link>
        <NavSeparator /> */}
        <Link to='/#work'>work</Link>
        <NavSeparator />
        <Link to='/#projects'>projects</Link>
        <NavSeparator />
        <Link to='/#contact'>contact</Link>
        <a href='/TobiasWahyudi_Resume_Jan2021_Both.pdf' className="resume">resume</a>
      </div>
    </nav>
  )
}

const NavSeparator: React.FC = () => {
  return <span className="sep">|</span>
}

export default Navbar;