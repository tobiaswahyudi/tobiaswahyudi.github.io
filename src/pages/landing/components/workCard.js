import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'

import './workCard.scss'

const formatDate = (date) => {
  console.log(date)
  if (date < 0) return 'Present'
  return new Date(date).toLocaleString('en-us', { month: 'short', year: 'numeric' })
}

const WorkCard = ({ card }) => {

  console.log(card)

  return (
    <Link className="work-card">
      <div className="container">
        <div className="img-container">
          {card.frontmatter.img && <Image fluid={card.frontmatter.img.childImageSharp.fluid} />}
        </div>
        <div className="card-info">
          <div className="title">
            <span className="overpass-semibold">
              {`${card.frontmatter.position}, ${card.frontmatter.title}`}
            </span>
          </div>
          <hr />
          <div className="time-place">
            <span className="place overpass-regular-italic">
              {card.frontmatter.location}
            </span>
            <span className="time overpass-light">
              {`${formatDate(card.frontmatter.startDate)} - ${formatDate(card.frontmatter.endDate)}`}
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