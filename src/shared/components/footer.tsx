import React from 'react'
import './footer.scss'
// @ts-ignore
import Github from '../../images/github.svg'
// @ts-ignore
import Linkedin from '../../images/linkedin.svg'
// @ts-ignore
import Gmail from '../../images/gmail.svg'

// @ts-ignore
import GatsbyUrl from '../../images/gatsby.png'
// @ts-ignore
import GraphqlUrl from '../../images/graphql.png'
// @ts-ignore
import Remark from '../../images/remark.svg'

const Footer: React.FC = () => {

  return (
    <div className="footer overpass-thin">
      <div id="made-in">
        {/* <span>Powered by </span>
        <img src={GatsbyUrl} alt="Gatsby" id="gatsby"/>
        <span> and </span>
        <Remark alt="remarkjs"/>
        <span>.</span> */}
      </div>
      <div id="links">
        <a href="https://github.com/tobiaswahyudi"><Github/></a>
        <a href="https://www.linkedin.com/in/tobias-wahyudi/"><Linkedin/></a>
        <a href="mailto:tobiaswahyudi@gmail.com"><Gmail/></a>
      </div>
      <div id="copyright">
        <span>© 2021 Tobias Wahyudi</span>
      </div>
    </div>
  )
}

export default Footer;