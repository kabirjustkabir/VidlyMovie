import React, { Component } from 'react'
import { isEmpty } from 'lodash';
import './Favorites.css'
import { movies } from './GetMovies'

export default class Favourites extends Component {
    constructor(){
        super();
        this.state = {
            genres:[],
            currGenre:'All Genres',
            movies:[],
            currText:'',
            limit:5,
            currPage:1
        }
    }
    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let temp = [];
        let data = JSON.parse(localStorage.getItem("movies") || "[]")
        data.forEach((movie)=>{
            if(!temp.includes(genreids[movie.genre_ids[0]])){
                //console.log("i am called")
                temp.push(genreids[movie.genre_ids[0]])
            }
        })
        temp.unshift("All Genres")
        this.setState({
            genres:[...temp],
            movies:[...data]
        })
    }
    handleGenres=(handleGen)=>{
        if(handleGen!="All Genres"){
            this.setState({
                currGenre:handleGen
            })
        }else{
            this.setState({
                currGenre:"All Genres"
            })
        }
    }
    sortPopularityUp=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objB.popularity - objA.popularity
        })
        this.setState({
            movies : [...temp]
        })
    }
    sortPopularityDown=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objA.popularity - objB.popularity
        })
        this.setState({
            movies : [...temp]
        })
    }
    sortRatingDesc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objB.vote_average-objA.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingAsc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objA.vote_average-objB.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePageChange=(page)=>{
        this.setState({
            currPage:page
        })
    }
    handleDelete=(id)=>{
        let newarr = [];
        newarr = this.state.movies.filter((movieObj)=>movieObj.id!=id)
        this.setState({
            movies:[...newarr]
        })
        localStorage.setItem("movies",JSON.stringify(newarr))
    }
    render() {
        //let movie = movies.results
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',10759:'Thriller',10765:'War',37:'Western'};
        let filterArr = [...this.state.movies];

        console.log(filterArr.length)

        if(this.state.currText == ''){
            filterArr= [...this.state.movies]
        }else{
            filterArr= filterArr.filter((movieObj)=>{
                let title = !isEmpty(movieObj) && !isEmpty(movieObj.original_title) && movieObj.original_title || movieObj.name || movieObj.original_name;
                title = title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase())
            })
        }


        if(this.state.currGenre != 'All Genres'){
            filterArr = filterArr.filter((movieObj)=>genreids[movieObj.genre_ids[0]] == this.state.currGenre)
        }

        let pages = Math.ceil(filterArr.length/this.state.limit);
        let pagesarr = [];
        for(let i=1;i<=pages;i++){
            pagesarr.push(i);
        }
        let si = (this.state.currPage-1)*this.state.limit;
        let ei = si+this.state.limit;
        filterArr = filterArr.slice(si,ei);

        return (
            <>
                <div className="main">
                    <div className="row">
                        <div className="col-lg-3 col-sm-12">
                            <ul className="list-group favourites-genres">
                                {
                                    this.state.genres.map((genreName)=>(
                                        this.state.currGenre == genreName ? <li className="list-group-item" style={{background:'purple',color:'white',fontWeight:'bold'}}>{genreName}</li> :
                                        <li className="list-group-item" style={{background:'white',color:'purple',fontWeight:'bold'}} onClick={()=>this.handleGenres(genreName)}>{genreName}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-lg-9 fav-table col-sm-12">
                            <div className="row" style={{paddingTop:'3rem'}}>    
                                <input style={{margin:'0.5rem'}} type="text" className="input-group-text col" placeholder="Search" value={this.state.currText} onChange={(e)=>this.setState({currText: e.target.value})}></input>
                                <input style={{margin:'0.5rem'}} type="number" className="input-group-text col"placeholder="Rows Count" value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}></input>
                            </div>
                            <div className="row" style={{paddingTop:'3rem'}}>    
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col"><i style={{cursor:'pointer'}} class="fas fa-sort-up" onClick={this.sortPopularityUp}/>Popularity<i style={{cursor:'pointer'}} class="fas fa-sort-down" onClick={this.sortPopularityDown}/></th>
                                    <th scope="col"><i style={{cursor:'pointer'}} class="fas fa-sort-up" onClick={this.sortRatingDesc}/>Rating<i style={{cursor:'pointer'}} class="fas fa-sort-down" onClick={this.sortRatingAsc}/></th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterArr.map((movieObj)=>(
                                            <tr>  
                                                <td>
                                                    <img style={{width:'8rem',height:'4rem'}}
                                                        src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                                        className="card-img-top movie-img"
                                                        alt={movieObj.original_title}
                                                    />
                                                    {movieObj.original_title || movieObj.name || movieObj.original_name}
                                                </td>
                                                <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                <td>{movieObj.popularity}</td>
                                                <td>{movieObj.vote_average}</td>
                                                <td><button className="btn btn-danger" style={{cursor:'pointer'}}  onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                                            </tr>
                                        ))
                                    } 
                                </tbody>
                            </table>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination" >
                                        {
                                        pagesarr.map((page)=>(
                                            <li className="page-item"><a style={{cursor:'pointer'}} className="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                                        ))
                                        }
                                        
                                    </ul>
                                </nav>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
