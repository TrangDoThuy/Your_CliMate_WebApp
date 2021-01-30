import React from 'react'
import {Link} from 'react-router-dom'

export const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          
          <h1 className="x-large">Your CliMate</h1>
          <p className="lead">
          Connect with people and get the latest climate change news
          </p>
          <div className="buttons">
            <Link to ="/register" className="btn btn-primary">Sign Up</Link>
            <Link to ="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
