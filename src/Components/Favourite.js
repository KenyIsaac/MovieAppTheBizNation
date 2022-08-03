import React, { Component } from 'react';
import {movies} from './getMovies'

export default class Favourite extends Component {
    constructor(){
        super();
        this.state={
            genres:[],
            currgen:'All Genres',
            movies:[],
            currText:'',
            limit:5,
            currPage:1
        }
    }
    componentDidMount(){
        let genreids = {28:'Acción',12:'Aventura',16:'Animación',35:'Comedia',80:'Crimen',99:'Documentales',18:'Drama',10751:'Familiar',14:'Fantasía',36:'Historia',
                        27:'Horror',10402:'Musicales',9648:'Mistero',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Terror',10752:'Guerra',37:'Oeste'};
        let data = JSON.parse(localStorage.getItem("movies-app") || "[]")
        let temp = []
        data.forEach((movieObj)=>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
         })
         temp.unshift('Todos los géneros');
         this.setState({
             genres:[...temp],
             movies:[...data]
         })
    }
    handleGenreChange=(genre)=>{
        this.setState({
            currgen:genre
        })
    }
    sortPopularityDesc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objB.popularity-objA.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortPopularityAsc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objA.popularity-objB.popularity
        })
        this.setState({
            movies:[...temp]
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
        localStorage.setItem("movies-app",JSON.stringify(newarr))
    }
    render() {
        let genreids = {28:'Acción',12:'Aventura',16:'Animación',35:'Comedia',80:'Crimen',99:'Documentales',18:'Drama',10751:'Familiar',14:'Fantasía',36:'Historia',
        27:'Horror',10402:'Musicales',9648:'Mistero',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Terror',10752:'Guerra',37:'Oeste'};
        
        let filterarr = [];

        if(this.state.currText===''){
            filterarr=this.state.movies
        }else{
            filterarr=this.state.movies.filter((movieObj)=>{
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase())
            })
        }

       
        if(this.state.currgen!="All Genres"){
            filterarr = this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currgen)
        }
        let pages = Math.ceil(filterarr.length/this.state.limit);
        let pagesarr = [];
        for(let i=1;i<=pages;i++){
            pagesarr.push(i);
        }
        let si = (this.state.currPage-1)*this.state.limit;
        let ei = si+this.state.limit;
        filterarr = filterarr.slice(si,ei);
        return (
            <div>
                <>
                    <div className="main">
                        <div className="row">
                            <div className="col-lg-3 col-sm-12" style={{}}>
                            <ul class="list-group favourites-genres" >
                                {
                                    this.state.genres.map((genre)=>(
                                        this.state.currgen == genre ?
                                        <li class="list-group-item" style={{border:'1px solid white', borderRadius:'25px', background:'#372932',color:'white',fontWeight:'bold', textAlign:'center'}} >{genre}</li> :
                                        <li class="list-group-item" style={{border:'1px solid white', borderRadius:'25px', background:'#372932',color:'white', textAlign:'justify', margin:'5px', padding:'5px'}} onClick={()=>this.handleGenreChange(genre)}>{genre}</li>
                                    ))
                                }
                            </ul>
                            </div>
                            <div className="col-lg-9 favourites-table col-sm-12">
                                <div className="row" style={{marginLeft:'35rem', marginBottom:'3em'}}>
                                    <input type="text" className="input-group-text col" placeholder="Buscar película" style={{marginRight:'2em', padding:'10px', border:'3px solid white', borderRadius:'25px'}} value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}/>
                                    <input type="number" className="input-group-text col" placeholder="Rows Count" style={{ padding:'10px', border:'3px solid white', borderRadius:'25px'}} value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
                                </div>
                                <div className="row" style={{marginLeft:'25rem'}}>
                                <table class="table" style={{color:'white'}}>
                                    <thead>
                                        <tr style={{margin:'70px'}}>
                                        <th scope="col">Título</th>
                                        <th scope="col">Género</th>
                                        <th scope="col"><i class="fas fa-sort-up" onClick={this.sortPopularityDesc}/>Popularidad<i class="fas fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                                        <th scope="col"><i class="fas fa-sort-up" onClick={this.sortRatingDesc}></i>Rating<i class="fas fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                                        <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterarr.map((movieObj)=>(
                                                <tr>
                                                    <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width:'5rem'}}/> {movieObj.original_title}</td>
                                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)} style={{backgroundColor:'#372932', border:'3px solid white', borderRadius:'25px', cursor:'pointer', color:'white', padding:'5px'}}>Eliminar</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        {
                                            pagesarr.map((page)=>(
                                                <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}
