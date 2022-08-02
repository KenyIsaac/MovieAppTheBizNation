import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Movielogo from '../movieapplogo.png';
import Favoritos from '../favoritos.png';

export default class Navbar extends Component {
    render() {
        return (
            <div style={{display:'flex',padding:'0.5', backgroundColor:'#372932'}}>
                <Link to="/" style={{marginLeft:'10rem'}}><img src={Movielogo} alt='Movie Logo' /></Link>
                <Link to="/favourites" style={{marginLeft:'50rem'}}><img src={Favoritos} alt='Favoritos' /></Link>
                
                
            </div>
        )
    }
}
