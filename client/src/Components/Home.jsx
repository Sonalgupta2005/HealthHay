import React from 'react'
import Navbar from './Navbar'
import Description from './Description'
import Footer from './Footer'
import "../App.css"


function Home() {
    return (
        <div >
            <div className='body'>
            <Navbar/>
            <Description className="Description"/>
            </div>
        
        <Footer />
        </div>
    )
}

export default Home
