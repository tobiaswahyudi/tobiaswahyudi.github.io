import { FluidObject } from "gatsby-image";

export enum EndDate {
  None = "none",
  Current = "current",
  Show = ""
}

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
  startDate: Date
  endDate: Date
  endDateString: EndDate
  excerpt: string
  img: SharpImage

  previewImg?: SharpImage
  mobileImg?: SharpImage

  priority: Number
  cardImageBackground?: string
  backgroundHue?: string
}

export interface MarkdownRemark {
  id: string
  html: string
  frontmatter: FrontMatter
}

export interface MarkdownRemarkEdge {
  node: MarkdownRemark
}