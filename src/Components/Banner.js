import {movies} from './getMovies';
import React, { Component } from 'react';
import Video from '../video-baner.mp4';
import Imag from '../ima-banner.png';

export default class Banner extends Component {
    
    render() {
        let movie = movies.results[0]
        
        return (
            <>
            {   movie == ''?
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando películas, por favor espere</span>
                </div>:
                <div className="card banner-card">
                <video width="100%" height="70%" autoPlay loop muted>
                        <source src={Video} type="video/mp4" />
                </video>
                <img src={Imag} alt='Movie Banner' style={{marginLeft:'550px'}} />                
               
                </div>
            }
            </>
        )
    }
}
