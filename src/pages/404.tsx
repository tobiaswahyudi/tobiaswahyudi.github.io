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
        <h1>Page Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist :( click <Link to="/" style={{color: '#0a50ff'}} className="overpass-semibold">here</Link> to go to the homepage.</p>
      </div>
    </>
  )
}

export default NotFoundPage
