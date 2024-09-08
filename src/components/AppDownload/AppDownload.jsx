import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/frontend_assets/assets';

const AppDownload = () => {
  return (
    <div className='app-container'>
      <div className='app-content'>
      <h2>About</h2>
        <h1>Smart Food</h1>
        <p>
        We’re a passionate team dedicated to crafting delicious food experiences. Using only the finest ingredients, we strive to create dishes that are both satisfying and memorable. 
        Come savor the flavors at Smart Food System.
        </p>
        {/* <button className="app-button">Our Story</button> */}
      </div>
      <div className='app-image'>
        <img src={assets.about_us_2} alt="Delicious food" />
      </div>
    </div>
  );
};

export default AppDownload;
