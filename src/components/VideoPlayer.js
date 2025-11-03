"use client";
import React from 'react';
import ReactPlayer from 'react-player';
// styles imported globally

const VideoPlayer = () => {

  const headingStyle = {
    fontSize: 'calc(1.3rem + 1vw)', // Set the font size for headings
    fontFamily: 'Orbitron, sans-serif', // Specify Orbitron font', // Set a stylized font
    marginBottom: 'calc(0.2rem + 1vw)', // Add some bottom margin for spacing,
    color: "white"
  };

  const textStyle = {
    fontSize: 'calc(0.3rem + 1vw)', // Set the font size for text
    fontFamily: 'Orbitron', // Specify Orbitron font', // Set a stylized font
    color: "white",
    marginLeft: "0.1rem +0.5vh"
  };
  return (
    <div className="video-container">
      {/* <video src={require("../assets/socait_glitch.mp4")}
        autoplay loop muted playsinline
        width="100%"
        height="100%" >

<source src={require("../assets/socait_glitch.mp4")} type="video/mp4" />
    Your browser does not support the video tag.</video> */}
      <ReactPlayer
        url={'/assets/socait_glitch.mp4'}
        playing={true}
        loop={true}
        controls={false}
        muted={true}
        playsinline={true}
        width="100%"
        height="100%"
        //style={{ position: 'absolute', top: 0, left: 0 }}
      />

      <div className="text-overlay" >
        {/* <h1  style={headingStyle} className="heading">Welcome to SOCAIT</h1> */}
        <p style={textStyle}> AI-based apps for a better society. For the people.</p>
      </div> 
    </div>
  );
};

export default VideoPlayer;
