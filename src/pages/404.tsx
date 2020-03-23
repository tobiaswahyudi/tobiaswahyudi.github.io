import React from "react"
import { Link } from "gatsby"
import SEO from '../components/seo'

const NotFoundPage = () => {
  return (
    <>
      <div
        style={{
          paddingTop: '30vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <SEO title="404: Not found" />
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist :( click <Link to="/">here</Link> to go to the homepage.</p>
      </div>
    </>
  )
}

export default NotFoundPage
