import { FluidObject } from "gatsby-image";

export enum ConstantDate {
  none = 0,
  present = -1
}

export type DateTime = string | ConstantDate.none | ConstantDate.present

export interface SharpImage {
  childImageSharp: {
    fluid: FluidObject
  }
}

export interface FrontMatter {
  date: string
  path: string
  tags: string[]
  title: string
  position: string
  location: string
  startDate: DateTime
  endDate: DateTime
  excerpt: string
  img: SharpImage
  priority: Number
}

export interface MarkdownRemark {
  id: string
  html: string
  frontmatter: FrontMatter
}

export interface MarkdownRemarkEdge {
  node: MarkdownRemark
}