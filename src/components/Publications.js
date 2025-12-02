"use client";
import React from 'react';
import './css/Publications.css';

const publications = [
  {
    title: "Adaptive Policy-Driven Network Intelligence for Edge-to-Cloud Continuum",
    venue: "31st ICE IEEE/ITMC Conference (Valencia, Spain)",
    year: "2025",
    link: "https://orcid.org/0009-0008-2648-7910", // Using ORCID profile as fallback link since specific URL wasn't provided
    authors: "I. Pastellas, S. Karagiorgou, M. Konidi"
  },
  {
    title: "Explanation-Driven Adversarial Attacks against Multimedia Edge Applications",
    venue: "6th International Conference in EEITE, Greece",
    year: "2025",
    link: "https://www.cygnus-project.eu/images/publications/Explanation_Driven_Adversarial_Attacks_against_Multimedia_Edge_Applications_1.pdf",
    authors: "T. Anastasiou, I. Pastellas, S. Karagiorgou, M. Konidi"
  },
  {
    title: "Adversarial Explanations for Informed Civilian and Environmental Protection",
    venue: "IEEE International Conference on Big Data (pp. 2672-2681)",
    year: "2024",
    link: "https://www.cygnus-project.eu/images/publications/2024_Adversarial-Explanations-for-Informed-Civilian.pdf", // Found likely link
    authors: "T. Anastasiou, I. Pastellas, S. Karagiorgou"
  },
  {
    title: "AI-fuelled Dimensioning and Optimal Resource Allocation of 5G/6G Wireless Communication Networks",
    venue: "IEEE MeditCom (pp. 413-418)",
    year: "2024",
    link: "https://ieeexplore.ieee.org/document/10635639", // Found likely link
    authors: "P. Papaioannou, I. Pastellas, C. Tranoris, S. Karagiorgou, S. Denazis"
  }
];

function Publications() {
  return (
    <section id="publications" className="publications-section">
      <h2 className="publications-title">Publications</h2>
      <div className="publications-container">
        {publications.map((pub, index) => (
          <a 
            href={pub.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="publication-item"
            key={index}
          >
            <div className="publication-content">
              <div className="publication-header">
                <span className="publication-year">{pub.year}</span>
                <h3>{pub.title}</h3>
              </div>
              <p className="publication-venue">{pub.venue}</p>
              <p className="publication-authors">{pub.authors}</p>
            </div>
            <div className="publication-icon">
              📄
            </div>
          </a>
        ))}
        
        <div className="orcid-container">
            <a 
              href="https://orcid.org/0000-0002-1193-6280" 
              target="_blank" 
              rel="noopener noreferrer"
              className="orcid-link"
            >
              <img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" alt="ORCID logo" className="orcid-logo" />
              View my full profile on ORCID
            </a>
        </div>
      </div>
    </section>
  );
}

export default Publications;
