import React, { Component } from "react";
// import { movies } from "./GetMovies"
import "./Movies.css";
import axios from "axios";
export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hoverCard: "",
      parr:[1],
      currPage:1,
      movies:[],
      favourites :[]
    };
  }
  async componentDidMount(){
      const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=a392af6de71c7a1ee6466af9ce7061a4&language=en-US&page=${this.state.currPage}`)
      let data = res.data
      this.setState({
        movies: [...data.results],
      })       
  }
  loadMovies=async()=>{
    const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=a392af6de71c7a1ee6466af9ce7061a4&language=en-US&page=${this.state.currPage}`)
    let data = res.data
    this.setState({
      movies: [...data.results],
    }) 
  }
  handleRight=()=>{
      let tempParr = [];
      for(let i=1;i<=this.state.parr.length+1;i++)
      {
          tempParr.push(i);
      }
      this.setState({
          parr:[...tempParr],
          currPage:this.state.currPage+1
      },this.loadMovies)
      
  }

  handleLeft=()=>{
    if(this.state.currPage!=1){
        let tempParr = [];
        for(let i=1;i<this.state.currPage;i++)
        {
            tempParr.push(i);
        }
        this.setState({
            currPage:this.state.currPage-1,
            parr : [...tempParr]
        },this.loadMovies)
    } 
}
handleClick=(value)=>{
    let tempParr = [];
      for(let i=1;i<=value;i++)
      {
          tempParr.push(i);
      }
    if(value!=this.state.currPage){
        // console.log("i am called")
        this.setState({
            parr:[...tempParr],
            currPage:value
        },this.loadMovies)
    }
}
handleFavourites=(movieObj)=>{
    let oldData = JSON.parse(localStorage.getItem("movies") || '[]')
    if(this.state.favourites.includes(movieObj.id)){
        oldData = oldData.filter((m)=>(
            m.id != movieObj.id
        ))
    }else{
        oldData.push(movieObj)
    }
    localStorage.setItem("movies",JSON.stringify(oldData))
    console.log(oldData);
    this.handleFavouritesState();
}
handleFavouritesState=()=>{
    let oldData = JSON.parse(localStorage.getItem("movies") || '[]')
    let temp = oldData.map((movie)=>movie.id)
    this.setState({
        favourites:[...temp]
    })
}
  render() {
    return (
      <>
        {this.state.movies.length == 0 ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h1 className="text-center">
              <strong>Trending Movies</strong>
            </h1>

            <div className="movie-list">
              {this.state.movies.map((movieObj) => (
                <div className="card movie-card" onMouseEnter={() => this.setState({ hoverCard: movieObj.id })} onMouseLeave={() => this.setState({ hoverCard: "" })}>
                  <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-img" alt={movieObj.title || movieObj.name } />
    
                    <h5 className="card-title movie-title"><strong>{ movieObj.title || movieObj.name }</strong> </h5>
                  
                  <div className="button-wrapper "
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.hoverCard == movieObj.id && (
                      <a className="btn btn-primary movie-button" onClick={()=>this.handleFavourites(movieObj)}>
                        {this.state.favourites.includes(movieObj.id)?"Delete From Favourites":"Add To Favourites"}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <nav aria-label="Page navigation example" style={{display:'flex',justifyContent:'center'}}>
        <ul className="pagination" style={{cursor:'pointer'}}>
            <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
            {
                this.state.parr.map((value)=>(
                    this.state.currPage == value ? <li className="page-item active" ><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                    : <li className="page-item" ><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                ))
            }
            <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
        </ul>
        </nav>
      </>
    );
  }
}
