import React, { useState, useEffect } from 'react'
import './navbar.scss'
import { Link } from 'gatsby';
// @ts-ignore
import Burger from '../../images/burger.svg'
// @ts-ignore
import Collapse from '../../images/collapse.svg'


interface NavbarProps {
  showOnScroll?: boolean
  scrollTriggerVh?: number
}

const Navbar: React.FC<NavbarProps> = ({ showOnScroll = false, scrollTriggerVh = 0 }: NavbarProps) => {
  const [scrollNav, setScrollNav] = useState<boolean>(!showOnScroll)
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false)

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
    <>
      <nav className={scrollNav ? 'show' : 'hide'}>
        <div id="title">
        <Link to='/'><h2>Tobias Wahyudi</h2></Link>
        </div>
        <div className="nav-desktop">
          <Link to='/'>home</Link>
          <NavSeparator />
          <a href='/Resume.pdf'>resume</a>
          <NavSeparator />
          <Link to='/projects'>projects</Link>
          <NavSeparator />
          <Link to='/#contact'>contact</Link>
        </div>
        <button className='nav-mobile-button' onClick={() => setShowMobileNav(!showMobileNav)}>
          <Burger className={!showMobileNav ? 'show' : 'hide'}/>
          <Collapse className={showMobileNav ? 'show' : 'hide'}/>
        </button>
      </nav>
      <div className={`nav-mobile ${showMobileNav ? 'show' : 'hide'}`}>
        <ul>
          <li>
            <Link to='/'>home</Link>
          </li>
          <li>
            <a href='/Resume.pdf'>resume</a>
          </li>
          <li>
            <Link to='/projects'>projects</Link>
          </li>
          <li>
            <Link to='/#contact'>contact</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

const NavSeparator: React.FC = () => {
  return <div className="sep">|</div>
}

export default Navbar;