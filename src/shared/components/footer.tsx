import React from 'react'
import './footer.scss'

import github from '../../images/github.svg'
import linkedin from '../../images/linkedin.svg'
import gmail from '../../images/gmail.svg'

const Footer: React.FC = () => {
  return (
    <div className="footer overpass-thin">
      <div id="made-in">
        <span>Made with 💛 in Toronto, Ontario</span>
      </div>
      <div id="links">
        <a href="https://github.com/tobiaswahyudi"><img src={github} /></a>
        <a href="https://www.linkedin.com/in/tobias-wahyudi/"><img src={linkedin} /></a>
        <a href="mailto:tobiaswahyudi@gmail.com"><img src={gmail} /></a>
      </div>
      <div id="copyright">
        <span>© 2020 Tobias Wahyudi</span>
      </div>
    </div>
  )
}

export default Footer;