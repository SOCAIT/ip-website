"use client";
import React from 'react';
import Image from 'next/image';

const degrees = [
  {
    school: "University of Cyprus",
    degree: "MSc in Artificial Intelligence",
    grade: "8.94 / 10",
    courses: "Deep Learning, NLP, Computer Vision, AI Ethics",
    period: "2022 – 2024",
    logo: "/assets/ucy.png",
  },
  {
    school: "University of Cyprus",
    degree: "BSc in Computer Science",
    grade: "8.32 / 10",
    courses: "Data Structures, Algorithms, Machine Learning, OS",
    period: "2016 – 2021",
    logo: "/assets/ucy.png",
  },
];

function Education() {
  return (
    <section id="education" className="editorial-section">
      <h2 className="editorial-title">Education</h2>
      <div className="education-grid">
        {degrees.map((deg) => (
          <div key={deg.degree} className="education-card">
            <div className="education-card-top">
              <Image
                src={deg.logo}
                alt={`${deg.school} logo`}
                className="education-logo"
                width={36}
                height={36}
                loading="lazy"
              />
              <span className="education-period">{deg.period}</span>
            </div>
            <h3 className="education-degree">{deg.degree}</h3>
            <p className="education-school">{deg.school}</p>
            <div className="education-meta">
              <span className="education-grade">{deg.grade}</span>
            </div>
            <p className="education-courses">{deg.courses}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;
