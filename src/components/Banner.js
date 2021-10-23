import React, { Component } from 'react'
//import {moives, movies} from './GetMovies';
import axios from 'axios'
import './Banner.css'
export default class Banner extends Component {
    constructor(){
        super();
        this.state={
            movies:[],
        }
    }
    async componentDidMount(){
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=a392af6de71c7a1ee6466af9ce7061a4`)
        let data = res.data;
        this.setState({
            movies:[...data.results]
        })
    }
    render() {
         let movie = {...this.state.movies[0]}
         console.log(movie)
        return (
            <>
            {
                movie.length === 1?
                <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
                :
                <div>
                    <div className="card banner-card">
                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top banner-img" alt={movie.title}/>
                    
                        <h2 className="card-title banner-title"><strong>{movie.title}</strong></h2>
                        <p className="card-text banner-text">{movie.overview}</p>
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    </div>
                </div>
    }
            </>
        )
    }
}
