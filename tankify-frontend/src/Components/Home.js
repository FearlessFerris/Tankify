// Home Component Implementation 


// Dependencies 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


// Components & Necessary Files 
import Carousel from './Carousel';


// Home Component 
function Home(){

    

    return( 
        <div
            className = 'home-component'
            style = {{
                color: '#eceff1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10rem'
            }}
        >
            <Carousel /> 
        </div>
    )
}

export default Home;