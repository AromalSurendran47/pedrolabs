import React from 'react';
import './Preloader.css'; // Optional: Keep the rest of the loader styles in CSS

const Loader = () => {
  return (
    <div style={{ background: '', width: '100%', height: '100vh', }} className="back">
      <div id="load" >
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
    </div>
  );
};

export default Loader;

