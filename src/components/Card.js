"use client";
import React, { useState } from "react";
// styles imported globally in app/globals.css

const Card = ({ image, title, subtitle,link }) => {
    const [hovered, setHovered] = useState(false);

    const handleClick = () => {
      window.location.href = link;
  };
  
    return (
      <div
        className="card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={ link ? handleClick : null} // Redirect on click
        style={{ cursor: "pointer" }} // Change cursor to indicate clickable
      >
        <img src={image} alt={title} className="card-image" />
      <div className={`card-overlay ${hovered ? "fade" : ""}`}>
        <h2 className="card-title">{title}</h2>
        <p className="card-subtitle">{subtitle}</p>
      </div>
      </div>
    );
  };
  
  export default Card;