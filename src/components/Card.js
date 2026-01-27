"use client";
import React, { useState } from "react";
import Image from "next/image";
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
        <Image 
          src={image} 
          alt={title} 
          className="card-image"
          width={600}
          height={400}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQADAD8BtJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//Z"
        />
      <div className={`card-overlay ${hovered ? "fade" : ""}`}>
        <h2 className="card-title">{title}</h2>
        <p className="card-subtitle">{subtitle}</p>
      </div>
      </div>
    );
  };
  
  export default Card;