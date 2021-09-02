import React from 'react'

import '../index.scss'

import WorkCard from './workCard'
import ReadMore from './readMore'

import * as types from '../../../shared/types'

interface CardsProps {
  cards: types.MarkdownRemarkEdge[]
  title: string
  link?: string
  id?: string
}

export const Cards: React.FC<CardsProps> = ({ cards, title, link, id }: CardsProps) => {
  return (
    <>
      <div className="experience">
        <h2 id={id}>{title}</h2>
        <div className="cards">
          {
            cards.map(edge => <WorkCard card={edge.node} />)
          }
        </div>
        {/* {link && <ReadMore path={link} />} */}
      </div>
    </>
  )
}

export default Cards;