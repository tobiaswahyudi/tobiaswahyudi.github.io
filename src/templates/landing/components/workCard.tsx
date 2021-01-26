import React from 'react'
import Image from '../../../shared/components/Image'
import { TagColors } from '../../../content/tagColors'

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

interface ChipProps {
  text: string
}

const Chip: React.FC<ChipProps> = ({ text }: ChipProps) => {

  const hue = TagColors.find(tagColor => tagColor.text.toLowerCase() === text.toLowerCase())?.hue ?? -1;

  return (
    <div className="chip"
      style={ hue == -1 ? {
        background: "linear-gradient(105.73deg, #C6FDC5 21.49%, #EEF2CF 52.5%, #FFD5AD 85.14%)",
        color: `hsl(0, 0%, 30%)`,
      } : {
        background: `linear-gradient(105.73deg, hsl(${hue}, 95%, 93%) 6.81%, hsl(${hue}, 100%, 84%) 85.14%)`,
        color: `hsl(${hue}, 50%, 30%)`,
      }}
    ><span>{text.toUpperCase()}</span></div>
  )
}

interface WorkCardProps {
  card: types.MarkdownRemark
}

const WorkCard: React.FC<WorkCardProps> = ({ card }: WorkCardProps) => {

  const background = card.frontmatter.cardImageBackground;

  return (
    <div className="work-card" style={
      background ?
        { background: background } :
        {}
    }>
      <div className="work-card-img" >
        <Image image={card.frontmatter.img} widthRem={background ? 7 : 5} />
      </div>
      <div className="work-card-content">
        <span className="work-card-title">{card.frontmatter.title}</span>
        {card.frontmatter.title &&
          <span className="work-card-company">{card.frontmatter.company}</span>
        }
        <div className="gray-line" />
        <div className="location-date">
          <span className="location">
            {card.frontmatter.location}
          </span>
          <span className="date">
            {formatDate(card.frontmatter.startDate, card.frontmatter.endDate, card.frontmatter.endDateString)}
          </span>
        </div>
        <div className="work-card-img-mobile" style={
          background ?
            { background: background } :
            {}
        }>
          {/*
            When the card has a background color, then we break through the margins.
            The result is a card image that can be 7 rem high.
          */}
          <Image image={card.frontmatter.img} heightRem={background ? 7 : 5} />
        </div>
        <ul className="work-card-description">
          {card.frontmatter.excerpt.map(desc => <li>{desc}</li>)}
        </ul>
        <div className="chips-container">
          {card.frontmatter.tags.map(tag => <Chip text={tag} />)}
        </div>
      </div>
    </div>
  );
}

// const WorkCard: React.FC<WorkCardProps> = ({ card }: WorkCardProps) => {
//   if (card.frontmatter.path) return (
//     <Link to={card ? card.frontmatter.path : '/'} className="work-card">
//       <WorkCardInner card={card} />
//     </Link>
//   )

//   return (
//     <div className="work-card">
//       <WorkCardInner card={card} />
//     </div>
//   )
// }

export default WorkCard;