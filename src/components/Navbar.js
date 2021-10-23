import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <div style={{display:'flex'}}>
                <Link to="/" style={{textDecoration:'none'}}><h2 style={{marginLeft:'1rem',marginTop:'0.6rem'}}><strong>MoviesApp</strong></h2></Link>
                <Link to="/favourites" style={{textDecoration:'none'}}><h4 style={{marginLeft:'2rem',marginTop:'1.1rem'}}>Favourites</h4></Link>
                
                
            </div>
        )
    }
}
