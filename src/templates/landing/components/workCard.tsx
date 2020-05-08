import React from 'react'
import { Link } from 'gatsby'
import Image from '../../../shared/components/Image'

import './workCard.scss'
import * as types from '../../../shared/types'

const formatDate: (startDate: Date, endDate: Date, endDateString: types.EndDate) => string =
  (startDate: Date, endDate: Date, endDateString: types.EndDate) => {
    const startFormatted = new Date(startDate).toLocaleString('en-us', { month: 'short', year: 'numeric' })

    let returnString = startFormatted

    if (endDateString === types.EndDate.Current) {
      returnString += " - Present"
    }
    if (endDateString === types.EndDate.Show) {
      returnString += " - "
      returnString += new Date(endDate).toLocaleString('en-us', { month: 'short', year: 'numeric' })
    }

    return returnString
  }

interface WorkCardProps {
  card: types.MarkdownRemark
}

const WorkCard: React.FC<WorkCardProps> = ({ card }: WorkCardProps) => {
  return (
    <Link to={card ? card.frontmatter.path : '/'} className="work-card">
      <div className="container" style={
        card.frontmatter.cardImageBackground ?
          { backgroundColor: card.frontmatter.cardImageBackground } :
          {}
      }>
        <div className="img-container">
        <Image image={card.frontmatter.img} />
      </div>
      <div className="card-info">
        <div className="title">
          <span className="overpass-semibold">
            {`${card.frontmatter.position ? `${card.frontmatter.position}, ` : ''}${card.frontmatter.title}`}
          </span>
        </div>
        <hr />
        <div className="time-place">
          <span className="place overpass-regular-italic">
            {card.frontmatter.location}
          </span>
          <span className="time overpass-light">
            {formatDate(card.frontmatter.startDate, card.frontmatter.endDate, card.frontmatter.endDateString)}
          </span>
        </div>
        <div className="excerpt">
          <p className="overpass-thin">
            {card.frontmatter.excerpt}
          </p>
        </div>
      </div>
      </div>
    </Link >
  )
}

export default WorkCard;