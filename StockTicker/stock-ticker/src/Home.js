import React from 'react';
import Footer from './Footer';
import stockPic from './images/stock-market-wallpapers.jpg';
import Navbar from './Navbar';


export default function Home() {
    return (
        <>
            <div className="home">
                <img src={stockPic} alt="stock-ticker pic" />
                <h1 id="slide">Market Data  <br />in Real-Time</h1>
                <Navbar />
                <Footer />
            </div>
        </>
    );
}