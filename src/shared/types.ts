import { FluidObject, FixedObject } from "gatsby-image";

export enum EndDate {
  None = "none",
  Current = "current",
  Show = ""
}

export interface SharpImage {
  publicURL: string
  childImageSharp: {
    fluid: FluidObject
    fixed: FixedObject
  }
}

export interface FrontMatter {
  date: string
  path?: string
  slug: string
  tags: string[]
  title: string
  company?: string
  location: string
  startDate: Date
  endDate: Date
  endDateString: EndDate
  excerpt: string[]
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