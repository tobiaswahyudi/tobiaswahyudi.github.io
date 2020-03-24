import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'

import './workCard.scss'
import * as types from '../../shared/types'

const formatDate: (date: types.DateTime) => string = (date: types.DateTime) => {
  if (date === types.ConstantDate.present) return 'Present'
  if (date === types.ConstantDate.none) return ''
  return new Date(date).toLocaleString('en-us', { month: 'short', year: 'numeric' })
}

interface WorkCardProps {
  card: types.MarkdownRemark
}

const WorkCard: React.FC<WorkCardProps> = ({ card }: WorkCardProps) => {

  const dateString = `${formatDate(card.frontmatter.startDate)}${
    card.frontmatter.endDate === types.ConstantDate.none ? '' :
    ` - ${formatDate(card.frontmatter.endDate)}`
  }`

  return (
    <Link to={card ?card.frontmatter.path: '/'} className="work-card">
      <div className="container">
        <div className="img-container">
          <Image fluid={card.frontmatter.img.childImageSharp.fluid} />
        </div>
        <div className="card-info">
          <div className="title">
            <span className="overpass-semibold">
              {`${card.frontmatter.position? `${card.frontmatter.position}, `: ''}${card.frontmatter.title}`}
            </span>
          </div>
          <hr />
          <div className="time-place">
            <span className="place overpass-regular-italic">
              {card.frontmatter.location}
            </span>
            <span className="time overpass-light">
              {dateString}
            </span>
          </div>
          <div className="excerpt">
            <p className="overpass-thin">
              {card.frontmatter.excerpt}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default WorkCard;