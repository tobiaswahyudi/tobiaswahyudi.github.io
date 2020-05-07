import React from 'react'

import '../index.scss'

import WorkCard from './workCard'
import ReadMore from './readMore'

import * as types from '../../../shared/types'

interface CardsProps {
  cards: types.MarkdownRemarkEdge[]
  title: string
}

export const Cards: React.FC<CardsProps> = ({ cards = [], title }: CardsProps) => {
  return (
    <>
      <div className="experience">
        <h2>{title}</h2>
        <div className="cards">
          {
            cards.map(edge => <WorkCard card={edge.node} />)
          }
        </div>
        <ReadMore path='/' />
      </div>
    </>
  )
}

export default Cards;