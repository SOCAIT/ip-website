"use client";
import React from 'react';
import Image from 'next/image';
// styles imported globally in app/globals.css

function Education() {
  return (
    <section id="education" className="education-section">
      <h2 className="education-title">Education</h2>
      <div className="education-container">
        <div className="education-item">
          <div className="education-logo-column">
            <Image src="/assets/ucy.png" alt="University of Cyprus logo - Master's degree" className="education-logo" width={60} height={80} loading="lazy" />
          </div>
          <div className="education-description-column">
            <h3>University of Cyprus</h3>
            <p>MSc in Artificial Intelligence</p>
            <p className="education-details">Grade: 8.94/10</p>
            <p className="education-details">
              Courses: Deep Learning, NLP, Computer Vision, AI Ethics
            </p>
            <p className="education-details">2022-2024</p>
          </div>
        </div>

        <div className="education-item">
          <div className="education-logo-column">
            <Image src="/assets/ucy.png" alt="University of Cyprus logo - Bachelor's degree" className="education-logo" width={60} height={80} loading="lazy" />
          </div>
          <div className="education-description-column">
            <h3>University of Cyprus</h3>
            <p>BSc in Computer Science</p>
            <p className="education-details">Grade: 8.32/10</p>
            <p className="education-details">
              Courses: Data Structures, Algorithms, Machine Learning, Operating Systems
            </p>
            <p className="education-details">2016-2021</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;